<?php

require_once(realpath(dirname(__FILE__) . "/../../library.php"));
Core::init();

header("Cache-control: private");
header("Cache-Control: no-cache, must-revalidate");
header("Content-Type: text/javascript; charset=utf-8");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
header("Content-type: application/x-javascript");

$js = Core::$language->getLanguageStringsJS();
?>
define([
], function() {

	<?php echo $js?>

	return L;
});