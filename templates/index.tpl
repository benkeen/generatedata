<!DOCTYPE html>
<html>
<head>
	<title>{$L.title}</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="description" content="{$L.meta_description}" />
	<meta name="keywords" content="{$L.meta_keywords}" />
	<link rel="stylesheet" type="text/css" href="css/styles.css" />
	<link rel="stylesheet" type="text/css" href="css/smoothness/jquery-ui-1.8.23.custom.css" />
	<link rel="stylesheet" type="text/css" href="css/chosen.css" />
	<script src="scripts/libs/jquery.js"></script>
	<script src="scripts/libs/chosen.jquery.min.js"></script>
	<script src="scripts/libs/require.js"></script>
	<script src="scripts/requireConfig.js"></script>
	{$cssIncludes}
</head>
<body>
	<header>
		<nav>
			<a href="http://www.generatedata.com">{$L.website}</a> |
			<a href="http://www.generatedata.com/forums/">{$L.forums}</a> <span class="gdHideNoJS">|</span>
			{language_dropdown nameId="gdSelectLanguage"}
		</nav>
	</header>
	<nav id="gdTabs">
		<!--
		temporary
		<div style="float:right">
			<img src="images/document_save.png" style="margin-top: 6px" />
		</div>
		-->
		<span id="gdProcessingIcon"></span>
		<ul>
			<li id="gdTab1" class="gdSelected">{$L.generate}</li>
			<li id="gdTab2" class="gdHideNoJS">{$L.user_accounts}</li>
			<li id="gdTab3" class="gdHideNoJS">{$L.settings}</li>
			<li id="gdTab4" class="gdHideNoJS">{$L.help}</li>
		</ul>
	</nav>
	<section>
		<p class="gdNoJS">{$L.no_js}</p>
		<div id="gdContent" class="gdHideNoJS">
			<ul class="gdTabContent">
				<li id="gdTab1Content">{include file="generate_tab1.tpl"}</li>
				<li id="gdTab2Content" style="display:none">{include file="generate_tab2.tpl"}</li>
				<li id="gdTab3Content" style="display:none">{include file="generate_tab3.tpl"}</li>
				<li id="gdTab4Content" style="display:none">{include file="generate_tab4.tpl"}</li>
			</ul>
		</div>
	</section>

	<footer>
		{$L.version} {$version} - <a href="https://github.com/benkeen/generatedata" target="_blank">github</a>
	</footer>

	<script>
	require([
		"manager",
		"generator",
		{$exportTypeJSModules},
		{$dataTypeJSModules},
		"pageinit"
	], function(manager) { manager.start(); });
	</script>

</body>
</html>
