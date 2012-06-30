<?php

// TODO this really sucks. We've already initialized Core in the calling page. Can't we get around re-doing it here?
// Check sessions? What's stored there? Could we store everything, or would it be better to just re-init Core like now?
require_once("../library.php");

/*
session_start();
header("Cache-control: private");
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
header("Content-type: application/x-javascript");
*/

$js = Core::$language->getCurrentLanguageStringsJS();
?>
define([
], function() {

	<?php echo $js?>

	return L;
});