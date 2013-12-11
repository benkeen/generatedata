<?php

/**
 * Functions for interacting with Smarty templates, and anything relating to actually generating or displaying markup.
 * @author Ben Keen <ben.keen@gmail.com>
 * @package Core
 */
class Templates {

	/**
	 * Used to generate the main index and install pages.
	 * @param string $template the path from the GD root to the template
	 * @param array $pageVars
	 * @param string $action "display" displays the result (default) or "return" to return the value
	 * @return mixed
	 */
	public static function displayPage($template, $pageVars = array(), $action = "display") {

		// check the compile directory has the write permissions
		if (!is_writable(Core::$smarty->compile_dir) && is_readable(Core::$smarty->compile_dir)) {
			Templates::displaySeriousError("The <b>/cache</b> folder isn't writable. This folder is used by Smarty to generate temporary files for speedy page loads. You'll need to update that folder's permissions to allow read and write permissions (777 on unix/mac).");
			exit;
		}

		// check that the user is running a recent enough version of PHP. This is needed for json_encode,
		// json_decode and for Smarty 3
		$minimumPHPVersion = Core::getMinimumPHPVersion();
		$currentVersion = PHP_VERSION;
		if (version_compare($currentVersion, $minimumPHPVersion) < 0) {
			Templates::displaySeriousError("Sorry, you need to be running PHP <b>$minimumPHPVersion</b> or later. You're currently running <b>$currentVersion</b>.");
			exit;
		}

		Core::$smarty->assign("L", Core::$language->getCurrentLanguageStrings());
		Core::$smarty->assign("currLang", Core::$language->getCurrentLanguageFile());
		Core::$smarty->assign("queryString", $_SERVER["QUERY_STRING"]);

		// this sucks. Needs to cache the DB value
		$theme = isset($pageVars["theme"]) ? $pageVars["theme"] : Settings::getSetting("theme");

		Core::$smarty->assign("theme", $theme);
		Core::$smarty->assign("inDemoMode", Core::checkDemoMode());
		Core::$smarty->assign("allowThemes", Core::$allowThemes);

		// now add the custom variables for this template, as defined in $page_vars
		foreach ($pageVars as $key=>$value) {
			Core::$smarty->assign($key, $value);
		}

		// "success" and "message" are special
		if (!isset($pageVars["success"])) {
			Core::$smarty->assign("success", null);
		}
		if (!isset($pageVars["message"])) {
			Core::$smarty->assign("message", null);
		}

		try {
			$templatePath = realpath(__DIR__ . "/../../$template");

			if ($action == "display") {
				Core::$smarty->display($templatePath);
			} else {
				return Core::$smarty->fetch($templatePath);
			}
		} catch (Exception $e) {
			Templates::displaySeriousError("Smarty encountered a problem writing to the /cache folder. The (probably indecipherable) error message returned is:", $e);
			exit;
		}
	}

	/**
	 * Helper function for use by any of the modules (or Core). It lets
	 * @param string $template the template (.tpl file) and path from the Generate Data root.
	 * @param array $placeholders
	 * @return string
	 */
	public static function evalSmartyTemplate($template, $placeholders) {
		return Templates::displayPage($template, $placeholders, "return");
	}

	/**
	 * A more lightweight version of evalSmartyTemplate, this evaluates a string containing Smarty content.
	 * @param $placeholderStr
	 * @param $placeholders
	 * @return string
	 */
	public static function evalSmartyString($placeholderStr, $placeholders) {
		$smarty = new SecureSmarty();
		$smarty->template_dir = realpath(__DIR__ . "/../libs/smarty");
		$smarty->compile_dir  = realpath(__DIR__ . "/../../cache");

		if (!empty($placeholders)) {
			while (list($key, $value) = each($placeholders)) {
				$smarty->assign($key, $value);
			}
		}
		return $smarty->fetch("string:" . $placeholderStr);
	}

	/**
	 * This is used for serious errors: when no database connection can be made or the Smarty cache folder isn't writable.
	 * All it does is output the error string with no other dependencies - not even language strings. The paths assume
	 * that we're in the application root (otherwise they won't work).
	 *
	 * This function only handles English. For problems of this severity, I think that's okay.
	 * @param $error
	 * @param string $errorDetails
	 */
	public static function displaySeriousError($error, $errorDetails = "") {
		$notFixedMessage = "";
		if (isset($_GET["source"])) {
			$notFixedMessage = "<p id=\"gdNotFixed\">Nope, ain't fixed yet. Try again.</p>";
		}

		if (!empty($errorDetails)) {
			$errorDetails = "<div id=\"gdSeriousError\">" . htmlspecialchars($errorDetails) . "</div>";
		}

		echo <<< END
	<!DOCTYPE html>
	<html>
	<head>
		<title>Things just ain't right.</title>
		<link rel="stylesheet" type="text/css" href="resources/themes/classic/compiled/styles.css">
		<script src="resources/scripts/libs/jquery.min.js"></script>
		<script>
		$(function() {
			$("button").bind("click", function() { window.location = "index.php?source=fromerrorpage"; });
		});
		</script>
	</head>
	<body class="gdErrorPage">
	<div id="gdBox">
		<h1>Uh-oh.</h1>
		$notFixedMessage
		<p>$error</p>

		$errorDetails
		<button class="gdPrimaryButton">Click here when you think you've fixed it.</button>
	</div>
	</body>
	</html>
END;
	}
}
