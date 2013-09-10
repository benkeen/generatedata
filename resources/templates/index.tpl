<!DOCTYPE html>
<html>
<head>
	<title>{$L.title}</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="description" content="{$L.meta_description}" />
	<meta name="keywords" content="{$L.meta_keywords}" />

	{if $useMinifiedResources && $minifiedResourcePaths != false}
		<link rel="stylesheet" type="text/css" href="{$minifiedResourcePaths.coreCSS}" />
		<link rel="stylesheet" type="text/css" href="resources/css/smoothness/jquery-ui.min.css" />
		<link rel="stylesheet" type="text/css" href="resources/css/chosen/chosen.css" />
		<link rel="stylesheet" type="text/css" href="resources/themes/{$theme}/compiled/styles.css" />
		<script src="{$minifiedResourcePaths.coreJS}"></script>
	{else}

		<link rel="stylesheet" type="text/css" href="resources/css/smoothness/jquery-ui.min.css" />
		<link rel="stylesheet" type="text/css" href="resources/css/chosen/chosen.css" />
		<link rel="stylesheet" type="text/css" href="resources/css/tablesorter.theme.css" />
		<link rel="stylesheet" type="text/css" href="resources/libs/codemirror/lib/codemirror.css" />
		<link rel="stylesheet" type="text/css" href="resources/themes/{$theme}/compiled/styles.css" />

		<script src="resources/libs/codemirror/lib/codemirror.min.js"></script>
		<script src="resources/scripts/libs/jquery.min.js"></script>
		<script src="resources/scripts/libs/jquery-ui.min.js"></script>
		<script src="resources/scripts/libs/jquery.json-2.2.min.js"></script>
		<script src="resources/scripts/libs/chosen.jquery.min.js"></script>
		<script src="resources/scripts/libs/require.js"></script>
		<script src="resources/scripts/requireConfig.js"></script>
		<script src="resources/scripts/libs/spinners.js"></script>

		<!--[if lt IE 9]>
		<script src="resources/scripts/libs/html5shiv.js"></script>
		<script src="resources/scripts/libs/excanvas.js"></script>
		<![endif]-->
	{/if}

	{$cssIncludes}
	{$codeMirrorIncludes}
</head>
<body data-lang="{$currLang}" data-logged-in="{$isLoggedIn}" data-user-account-setup="{$settings.userAccountSetup}">
	<header>
		<nav class="gdHideNoJS">
			<ul>
				<li id="gdUserAccount"{if !$isLoggedIn || $settings.userAccountSetup == "anonymousAdmin"} style="display:none"{/if}>
					<a href="#">{$L.your_account}</a> |
				</li>
				<li id="gdLogin"{if $isLoggedIn || $settings.userAccountSetup == "anonymousAdmin"} style="display:none"{/if}>
					<a href="#">{$L.login}</a> |
				</li>
				<li id="gdLogout"{if !$isLoggedIn || $settings.userAccountSetup == "anonymousAdmin"} style="display:none"{/if}>
					<a href="#">{$L.logout}</a> |
				</li>
			</ul>
			{language_dropdown nameId="gdSelectLanguage"}
		</nav>
	</header>
	<nav id="gdMainTabs" class="gdHideNoJS">
		<span id="gdDataSetStatusLine"></span>
		<span id="gdProcessingIcon"></span>
		<ul>
			<li id="gdMainTab1" class="gdSelected">{$L.generate}</li>
			<li id="gdMainTab2" {if $settings.userAccountSetup != "multiple" || $accountType != "admin"}style="display:none"{/if}>{$L.accounts}</li>
			<li id="gdMainTab3" {if $settings.userAccountSetup != "anonymousAdmin" && $accountType != "admin"}style="display:none"{/if}>{$L.settings}</li>
			<li id="gdMainTab4">{$L.about}</li>
		</ul>
	</nav>
	<noscript><p>{$L.no_js}</p></noscript>
	<section class="gdHideNoJS">
		<div id="gdContent">
			<ul class="gdMainTabContent">
				<li id="gdMainTab1Content">{include file="generate.tab1.tpl"}</li>
				<li id="gdMainTab2Content" style="display:none">{include file="generate.tab2.tpl"}</li>
				<li id="gdMainTab3Content" style="display:none">{include file="generate.tab3.tpl"}</li>
				<li id="gdMainTab4Content" style="display:none">{include file="generate.tab4.tpl"}</li>
			</ul>
		</div>
	</section>

	<div id="gdPageLoad">{$L.loading}</div>

	{include file="footer.tpl"}

	{if $useMinifiedResources && $minifiedResourcePaths != false}
		<script src="resources/scripts/libs/require.js"></script>
		<script src="resources/scripts/requireConfig.js"></script>
		<script>require(["{$minifiedResourcePaths.appStart}"], function() {});</script>
	{else}
		<script>
		require([
			"manager",
			"generator",
			"accountManager",
			{$exportTypeJSModules},
			{$dataTypeJSModules},
			"pageInit"
		], function(manager) {
			manager.start();
		});
		</script>
	{/if}


</body>
</html>
