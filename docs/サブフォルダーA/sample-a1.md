# コードハイライト

## サブヘッディング 1

 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fringilla volutpat odio, nec iaculis tortor laoreet vitae. Suspendisse dictum nibh nulla, non fringilla sapien mollis sed. Nunc vehicula facilisis tellus, ut tempor massa bibendum sed. Aenean non justo eu nulla luctus aliquam. Nullam eget arcu a urna ultrices volutpat lobortis ut sapien. Fusce vitae dapibus tellus, nec tincidunt metus. Etiam scelerisque orci ac ligula fermentum rhoncus. Ut at nisi quis tellus imperdiet porta. In semper mollis urna, nec ultricies purus bibendum non.

## サブヘッディング 2

私は絶対おおかたそのお話順という事の時の描いでしょあり。ほとんど場合をぼんやりどもはどうしてもその教育ですませまでを受けからいるたくには講義行っでならて、ちょっとには行っですらしでた。国家の突き破っなら方もいよいよ場合を人知れずないないた。もし嘉納君に説明気更に講演にあるな原因こういう田舎やつか説明がに対するご使用べきですたありて、このほかも私か個人同年輩に思って、嘉納さんの事が世界のそれにことにご推測と云いばあなた義務が今発会で降るようによくご担任へしなだから、かつてほとんど応用を降るないばいでし事にいうました。またそれならお町内で当て事はああ必要ときまらたいて、その自分にはしありばといった中学に離れて得でなら。

## コードハイライト

**PHP**

```php
<?php
/**
 * Requests collector.
 *
 *  This file collects requests if:
 *	- no mod_rewrite is available or .htaccess files are not supported
 *  - requires App.baseUrl to be uncommented in app/Config/core.php
 *	- app/webroot is not set as a document root.
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @since         CakePHP(tm) v 0.2.9
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */

/**
 *  Get CakePHP's root directory
 */
define('APP_DIR', 'app');
define('DS', DIRECTORY_SEPARATOR);
define('ROOT', dirname(__FILE__));
define('WEBROOT_DIR', 'webroot');
define('WWW_ROOT', ROOT . DS . APP_DIR . DS . WEBROOT_DIR . DS);

/**
 * This only needs to be changed if the "cake" directory is located
 * outside of the distributed structure.
 * Full path to the directory containing "cake". Do not add trailing directory separator
 */
if (!defined('CAKE_CORE_INCLUDE_PATH')) {
	define('CAKE_CORE_INCLUDE_PATH', ROOT . DS . 'lib');
}

require APP_DIR . DS . WEBROOT_DIR . DS . 'index.php';

```

**Pyhton**

```python
def which_cmd(name):
    ''' Return fullpath to executation of provided command '''
    import subprocess
    cmd = subprocess.Popen(
        "which %s 2>/dev/null" % name, 
        shell=True, 
        stdout=subprocess.PIPE
    ).stdout.read()
    cmd = cmd.strip()
    if not cmd:
        raise EnvironmentError('Command not found [%s]' % name)
    return cmd.decode('utf-8')
```

**Java**

```Java
public class SampleJava {

  public static void main(String[] args) {
    System.out.println("Hello World!");
  }

}
```