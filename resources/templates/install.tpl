<!DOCTYPE html>
<html>
<head>
	<title>{$L.title}</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="description" content="{$L.meta_description}" />
	<meta name="keywords" content="{$L.meta_keywords}" />
	<link rel="stylesheet" type="text/css" href="resources/themes/{$theme}/compiled/styles.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/smoothness/jquery-ui-1.8.23.custom.css" />
	<script src="scripts/libs/jquery.js"></script>
	<script src="scripts/libs/chosen.jquery.min.js"></script>
	<script data-main="scripts/install" src="scripts/libs/require.js"></script>
	<script src="scripts/requireConfig.js"></script>
</head>
<body class="gdInstallPage">
	<header>
		<nav>
			<a href="http://www.generatedata.com">{$L.website}</a> |
			<a href="http://forums.generatedata.com">{$L.forums}</a> <span class="gdHideNoJS">|</span>
			<span class="hideNoJS">{language_dropdown nameId="gdSelectLanguage"}</span>
		</nav>
	</header>
	<nav id="gdTabs">
		<span id="gdProcessingIcon"></span>
		<ul>
			<li id="gdTab1" class="gdSelected">{$L.install}</li>
			<li id="gdTab2" class="gdHideNoJS">{$L.help}</li>
		</ul>
	</nav>
	<section>
		<p class="gdNoJS">{$L.no_js}</p>
		<div id="gdContent" class="gdHideNoJS">
			<ul class="gdTabContent">
				<li id="gdTab1Content">{include file="install.tab1.tpl"}</li>
				<li id="gdTab2Content" style="display:none">{include file="install.tab2.tpl"}</li>
			</ul>
		</div>
	</section>
	<footer>
		{$L.version} {$version} - <a href="https://github.com/benkeen/generatedata" target="_blank">github</a>
	</footer>
</body>
</html>