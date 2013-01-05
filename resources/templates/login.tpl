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
	<script data-main="resources/scripts/login" src="resources/scripts/libs/require.js"></script>
	<script src="resources/scripts/requireConfig.js"></script>
	<!--[if lt IE 9]>
	<script src="resources/scripts/libs/html5shiv.js"></script>
	<script src="resources/scripts/libs/excanvas.js"></script>
	<![endif]-->
	<script src="resources/scripts/libs/spinners.js"></script>
	{$cssIncludes}
	{$codeMirrorIncludes}
</head>
<body>
	<header>
		<nav>
			<a href="http://www.generatedata.com">{$L.website}</a> |
			<a href="http://www.benjaminkeen.com/category/projects/data-generator/">{$L.blog}</a> |
			{language_dropdown nameId="gdSelectLanguage" disabled=true}
		</nav>
	</header>
	<nav id="gdMainTabs" class="gdHideNoJS">
		<span id="gdProcessingIcon"></span>
		<ul>
			<li id="gdMainTab1" class="gdSelected">Login</li>
			<li id="gdMainTab2">Forgot Password</li>
		</ul>
	</nav>
	<noscript><p>{$L.no_js}</p></noscript>

	<section class="gdHideNoJS">
		<div id="gdContent">
			<ul class="gdMainTabContent">
				<li id="gdMainTab1Content">

					<h2>Please login below</h2>

				</li>
				<li id="gdMainTab2Content">

				</li>
			</ul>
		</div>
	</section>

	{include file="footer.tpl"}
</body>
</html>