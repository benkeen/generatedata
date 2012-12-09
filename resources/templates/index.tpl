<!DOCTYPE html>
<html>
<head>
	<title>{$L.title}</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="description" content="{$L.meta_description}" />
	<meta name="keywords" content="{$L.meta_keywords}" />
	<link rel="stylesheet" type="text/css" href="resources/themes/{$theme}/compiled/styles.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/smoothness/jquery-ui-1.8.23.custom.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/chosen/chosen.css" />
	<link rel="stylesheet" type="text/css" href="resources/libs/codemirror/lib/codemirror.css" />
	<script src="resources/libs/codemirror/lib/codemirror.js"></script>
	<script src="resources/scripts/libs/jquery.js"></script>
	<script src="resources/scripts/libs/chosen.jquery.min.js"></script>
	<script src="resources/scripts/libs/require.js"></script>
	<script src="resources/scripts/requireConfig.js"></script>
	{$cssIncludes}
	{$codeMirrorIncludes}
</head>
<body>
	<header>
		<nav>
			{if $settings.userAccountSetup != "anonymous"}<a href="#" id="gdUserAccountLink">Your Account</a> |{/if}
			<a href="http://www.generatedata.com">{$L.website}</a> |
			<a href="http://www.generatedata.com/forums/">{$L.forums}</a> <span class="gdHideNoJS">|</span>
			{language_dropdown nameId="gdSelectLanguage"}
		</nav>
	</header>
	<nav id="gdMainTabs">
		<span id="gdProcessingIcon"></span>
		<ul>
			<li id="gdMainTab1" class="gdSelected">{$L.generate}</li>
			{if $settings.userAccountSetup == "multiple"}<li id="gdMainTab2" class="gdHideNoJS">{$L.accounts}</li>{/if}
			<li id="gdMainTab3" class="gdHideNoJS">{$L.settings}</li>
		</ul>
	</nav>
	<section>
		<noscript><p>{$L.no_js}</p></noscript>
		<div id="gdContent" class="gdHideNoJS">
			<ul class="gdMainTabContent">
				<li id="gdMainTab1Content">{include file="generate.tab1.tpl"}</li>
				{if $settings.userAccountSetup == "multiple"}<li id="gdMainTab2Content" style="display:none">{include file="generate.tab2.tpl"}</li>{/if}
				<li id="gdMainTab3Content" style="display:none">{include file="generate.tab3.tpl"}</li>
			</ul>
		</div>
	</section>

	{include file="footer.tpl"}

	<script>
	require([
		"manager",
		"generator",
		"mainDialog",
		"accountManager",
		{$exportTypeJSModules},
		{$dataTypeJSModules},
		"pageinit"
	], function(manager) { manager.start(); });
	</script>

</body>
</html>
