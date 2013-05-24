<!DOCTYPE html>
<html>
<head>
	<title>{$L.title}</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="description" content="{$L.meta_description}" />
	<meta name="keywords" content="{$L.meta_keywords}" />
	<link rel="stylesheet" type="text/css" href="resources/themes/{$theme}/compiled/styles.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/smoothness/jquery-ui.min.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/chosen/chosen.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/tablesorter.theme.css" />
	<link rel="stylesheet" type="text/css" href="resources/libs/codemirror/lib/codemirror.css" />
	<script src="resources/libs/codemirror/lib/codemirror.min.js"></script>
	<script src="resources/scripts/libs/jquery.js"></script>
	<script src="resources/scripts/libs/chosen.jquery.min.js"></script>
	<script src="resources/scripts/libs/require.js"></script>
	<script src="resources/scripts/requireConfig.js"></script>
	<!--[if lt IE 9]>
	<script src="resources/scripts/libs/html5shiv.js"></script>
	<script src="resources/scripts/libs/excanvas.js"></script>
	<![endif]-->
	<script src="resources/scripts/libs/spinners.js"></script>
	{$cssIncludes}
	{$codeMirrorIncludes}
</head>
<body data-lang="{$currLang}" data-logged-in="{$isLoggedIn}">
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

	<div id="gdPageLoad">Loading...</div>

	{include file="footer.tpl"}

	<script>
	require([
		"manager",
		"generator",
		{if $isLoggedIn && $settings.userAccountSetup == "multiple"}"accountManager",{/if}
		{$exportTypeJSModules},
		{$dataTypeJSModules},
		"pageInit"
	], function(manager) { 
		manager.start();
	});
	</script>

</body>
</html>