#!/bin/bash

# Usage:
#   ./build         -- just build the test files
#   ./build serve   -- run a development server, start browser, and rebuild test on changes.

# Find the mkdocs command
if hash mkdocs 2>/dev/null; then
  MKDOCS=mkdocs
else
  MKDOCS=`pwd`/env/bin/mkdocs
fi

# If it's not available, show helpful instructions.
if [[ ! -x "$MKDOCS" ]]; then
  echo 'Build requires mkdocs in PATH or in env/.'
  echo 'Please run `virtualenv env && env/bin/pip install mkdocs`.'
  exit 2
fi

cd test/mkdocs

if [[ "$1" = "serve" ]]; then
  $MKDOCS serve -s
else
  $MKDOCS build -s -c -d outputs
fi

