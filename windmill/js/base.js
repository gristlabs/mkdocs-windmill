/* global window, document, $, hljs */
"use strict";

function getSearchTerm()
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == 'q')
        {
            return sParameterName[1];
        }
    }
}

// TODO
// Change links to use top-level nav changing hash only.
// Nothing should change iframe's src except via updateIframe()

// The full page consists of a main window (top-frame.html) with navigation and table of contents,
// and an inner iframe containing the current article. Which article is shown is determined by the
// main window's #hash portion of the URL. In fact, we use the simple rule: main window's URL of
// "rootUrl#relPath" corresponds to iframe's URL of "rootUrl/relPath".

// Links with class 'iframe' will be automatically adjusted to do the right thing (i.e. redirect
// the top-level page instead, to a modified hash part of the URL).

function startsWith(str, prefix) { return str.lastIndexOf(prefix, 0) === 0; }
function endsWith(str, suffix) { return str.indexOf(suffix, str.length - suffix.length) !== -1; }

/**
 * Returns the portion of the given URL ending at the last slash before the first '#' or '?' sign.
 */
function getRootUrl(url) {
  return url.replace(/[^/?#]*([?#].*)?$/, '');
}

/**
 * Returns the full URL for the top window given the full URL of the iframe and optional rootUrl
 */
function getTopUrlFromIframe(iframeUrl, optRootUrl) {
  var rootUrl = optRootUrl || getRootUrl(window.location.href);
  var prefix = rootUrl + (endsWith(rootUrl, '/') ? '' : '/');
  console.log("getTopUrlFromIframe(%s, %s)", iframeUrl, rootUrl);
  if (startsWith(iframeUrl, prefix)) {
    var relPath = iframeUrl.slice(prefix.length);
    return rootUrl + '#' + relPath;
  }
  return null;
}

/**
 * Returns the full URL for the iframe given the full URL of the top window and optional rootUrl.
 */
function getIframeUrlFromTop(topUrl, optRootUrl) {
  var rootUrl = optRootUrl || getRootUrl(window.location.href);
  console.log("getIframeUrlFromTop(%s, %s)", topUrl, rootUrl);
  if (topUrl.startsWith(rootUrl + '#')) {
    var relPath = topUrl.slice(rootUrl.length + 1);
    var prefix = rootUrl + (endsWith(rootUrl, '/') ? '' : '/');
    return prefix + relPath;
  }
  return null;
}

/**
 * Redirects the iframe to reflect the path represented by the main window's current URL.
 */
function updateIframe(iframe, enableForwardNav) {
  enableForward(enableForwardNav);

  var iframeUrl = getIframeUrlFromTop(window.location.href);
  if (!iframeUrl) { return; }
  var loc = iframe.contentWindow.location;

  console.log("updateIframe: %s -> %s (%s)", loc.href, iframeUrl,
    loc.href === iframeUrl ? "same" : "replacing");

  if (loc.href !== iframeUrl) {
    loc.replace(iframeUrl);
  }
}

function enableForward(enable) {
  $('#hist-fwd').toggleClass('greybtn', !enable);
}

function updateTocButtonState() {
  var shown;
  if (window.matchMedia("(max-width: 600px)").matches) {
    shown = $('.wm-toc-pane').hasClass('wm-toc-dropdown');
  } else {
    shown = !$('#main-content').hasClass('wm-toc-hidden');
  }
  $('#toc-button').toggleClass('active', shown);
}

function closeTocDropdown() {
  $('.wm-toc-dropdown').removeClass('wm-toc-dropdown');
  updateTocButtonState();
}

$(document).ready(function() {

  var search_term = getSearchTerm(),
    $search_modal = $('#mkdocs_search_modal');

  if(search_term){
    $search_modal.modal();
  }

  // make sure search input gets autofocus everytime modal opens.
  $search_modal.on('shown.bs.modal', function () {
    $search_modal.find('#mkdocs-search-query').focus();
  });

  // Highlight.js
  hljs.initHighlightingOnLoad();
  $('table').addClass('table table-striped table-hover');


  // toc-button either opens the table of contents in the side-pane, or (on smaller screens) shows
  // the side-pane as a drop-down.
  $('#toc-button').on('click', function(e) {
    if (window.matchMedia("(max-width: 600px)").matches) {
      $('.wm-toc-pane').toggleClass('wm-toc-dropdown');
      $('#main-content').removeClass('wm-toc-hidden');
    } else {
      $('#main-content').toggleClass('wm-toc-hidden');
      closeTocDropdown();
    }
    updateTocButtonState();
  });

  // Update the state of the toc-button
  updateTocButtonState();
  $(window).on('resize', updateTocButtonState);

  // Connect up the Back and Forward buttons (if present).
  $('#hist-back').on('click', function(e) { window.history.back(); });
  $('#hist-fwd').on('click', function(e) { window.history.forward(); });

  // When the side-pane is a dropdown, hide it on click-away.
  $(window).on('blur', closeTocDropdown);

  // When we click on an opener in the table of contents, open it.
  $('.wm-toc-pane').on('click', '.wm-toc-opener', function(e) { $(this).toggleClass('open'); });

  // Once the article loads in the side-pane, close the dropdown.
  $('.wm-article').on('load', closeTocDropdown);

  var iframe = $('.wm-article')[0];

  // Initialize links that should load into the iframe.
  $('body').on('click', 'a.iframe', function(e) {
    e.preventDefault();
    var newUrl = getTopUrlFromIframe(this.href);
    if (newUrl !== window.location.href) {
      window.history.pushState(null, '', newUrl);
      updateIframe(iframe, false);
    }
  });

  // Load the iframe now, and whenever we navigate the top frame.
  updateIframe(iframe, false);
  $(window).on('popstate', function() { updateIframe(iframe, true); });
});


/* Prevent disabled links from causing a page reload */
$("li.disabled a").click(function(event) {
    event.preventDefault();
});
