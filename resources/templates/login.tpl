<!DOCTYPE html>
<html>
<head>
	<title>{$L.title}</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="description" content="{$L.meta_description}" />
	<meta name="keywords" content="{$L.meta_keywords}" />
	<link rel="stylesheet" type="text/css" href="resources/themes/{$theme}/compiled/styles.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/smoothness/jquery-ui.min.css" />
	<script src="resources/scripts/libs/jquery.min.js"></script>
	<script src="resources/scripts/libs/jquery-ui.min.js"></script>
	<script src="resources/scripts/libs/jquery.json-2.2.min.js"></script>
	<script src="resources/scripts/libs/require.js" data-main="resources/scripts/login"></script>
	<script src="resources/scripts/requireConfig.js"></script>
	<script src="resources/scripts/libs/spinners.js"></script>

	<!--[if lt IE 9 ]>
	<script src="resources/scripts/libs/html5shiv.js"></script>
	<script src="resources/scripts/libs/excanvas.js"></script>
	<![endif]-->
</head>
<body class="gdLoginPage">
	<header>
		<nav>
			{language_dropdown nameId="gdSelectLanguage"}
		</nav>
	</header>
	<nav id="gdMainTabs" class="gdHideNoJS">
		<span id="gdProcessingIcon"></span>
		<ul>
			<li id="gdMainTab1" class="gdSelected">{$L.login}</li>
			<li id="gdMainTab2">{$L.forgot_password}</li>
		</ul>
	</nav>
	<noscript><div><p>{$L.no_js}</p></div></noscript>

	<section class="gdHideNoJS">
		<div id="gdContent">
			<ul class="gdMainTabContent">
				<li id="gdMainTab1Content">
					<form>
						<h1>{$L.please_login}</h1>
						<div id="gdMessages" class="gdMessage" style="margin-bottom: 12px">
							<a class="gdMessageClose" href="#">X</a>
							<div></div>
						</div>
						<div class="gdFields">
							<div class="gdField">
								<label for="email">{$L.email}</label>
								<input type="text" id="email" value="" />
							</div>
							<div class="gdError" id="email_error"></div>
							<div class="gdField">
								<label for="password">{$L.password}</label>
								<input type="password" id="password" value="" />
							</div>
							<div class="gdError" id="password_error"></div>
						</div>
						<div class="gdClear"></div>
						<button class="gdPrimaryButton">{$L.continue_rightarrow}</button>
					</form>
				</li>
				<li id="gdMainTab2Content" class="hidden">
					<form>
						<h1>{$L.forgotten_your_password_q}</h1>
						<div id="gdMessagesReminder" class="gdMessage" style="margin-bottom: 12px">
							<a class="gdMessageClose" href="#">X</a>
							<div></div>
						</div>
						<p>
							{$L.enter_email_address_to_reset_password}
						</p>
						<div class="gdFields">
							<div class="gdField">
								<label for="emailReminder">{$L.email}</label>
								<input type="text" id="emailReminder" value="" />
							</div>
							<div class="gdError" id="emailReminder_error"></div>
						</div>
						<div class="gdClear"></div>
						<button class="gdPrimaryButton">{$L.continue_rightarrow}</button>
					</form>
				</li>
			</ul>
		</div>
	</section>

	{include file="footer.tpl"}
</body>
</html>