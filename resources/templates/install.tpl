<!DOCTYPE html>
<html>
<head>
	<title>{$L.title}</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="description" content="{$L.meta_description}" />
	<meta name="keywords" content="{$L.meta_keywords}" />
	<link rel="stylesheet" type="text/css" href="resources/themes/{$theme}/compiled/styles.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/smoothness/jquery-ui.min.css" />
	<script src="resources/scripts/libs/jquery.js"></script>
	<script src="resources/scripts/libs/chosen.jquery.min.js"></script>
	<script data-main="resources/scripts/install" src="resources/scripts/libs/require.js"></script>
	<script src="resources/scripts/requireConfig.js"></script>
	<!--[if lt IE 9]>
	<script src="resources/scripts/libs/html5shiv.js"></script>
	<script src="resources/scripts/libs/excanvas.js"></script>
	<![endif]-->
	<script type="text/javascript" src="resources/scripts/libs/spinners.js"></script>
</head>
<body class="gdInstallPage">
	<header>
		<nav>
			<a href="http://www.generatedata.com">{$L.website}</a> |
			<a href="http://www.benjaminkeen.com/category/projects/data-generator/">{$L.blog}</a> <span class="gdHideNoJS">|</span>
			<span class="hideNoJS">{language_dropdown nameId="gdSelectLanguage"}</span>
		</nav>
	</header>
	<nav id="gdMainTabs">
		<span id="gdProcessingIcon"></span>
		<ul>
			<li id="gdMainTab1" class="gdSelected">{$L.install}</li>
			<li id="gdMainTab2" class="gdHideNoJS">{$L.help}</li>
		</ul>
	</nav>
	<section>
		<noscript><p>{$L.no_js}</p></noscript>

		<div id="gdContent" class="gdHideNoJS">
			<ul class="gdMainTabContent">
				<li id="gdMainTab1Content">{include file="install.tab1.tpl"}</li>
				<li id="gdMainTab2Content" style="display:none">{include file="install.tab2.tpl"}</li>
			</ul>
		</div>
	</section>
	{include file="footer.tpl"}
</body>
</html>