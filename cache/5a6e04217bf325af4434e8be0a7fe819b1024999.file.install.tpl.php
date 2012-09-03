<?php /* Smarty version Smarty-3.1.8, created on 2012-08-26 09:59:49
         compiled from "/Applications/MAMP/htdocs/generatedata/templates/install.tpl" */ ?>
<?php /*%%SmartyHeaderCode:15310551304fef705c1a44e8-34503762%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '5a6e04217bf325af4434e8be0a7fe819b1024999' => 
    array (
      0 => '/Applications/MAMP/htdocs/generatedata/templates/install.tpl',
      1 => 1346000389,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '15310551304fef705c1a44e8-34503762',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.8',
  'unifunc' => 'content_4fef705c3abea2_97047407',
  'variables' => 
  array (
    'L' => 0,
    'tablePrefix' => 0,
    'randomPassword' => 0,
    'version' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_4fef705c3abea2_97047407')) {function content_4fef705c3abea2_97047407($_smarty_tpl) {?><?php if (!is_callable('smarty_function_language_dropdown')) include '/Applications/MAMP/htdocs/generatedata/smarty/plugins/function.language_dropdown.php';
?><!DOCTYPE html>
<html>
<head>
	<title><?php echo $_smarty_tpl->tpl_vars['L']->value['title'];?>
</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="description" content="<?php echo $_smarty_tpl->tpl_vars['L']->value['meta_description'];?>
" />
	<meta name="keywords" content="<?php echo $_smarty_tpl->tpl_vars['L']->value['meta_keywords'];?>
" />
	<link rel="stylesheet" type="text/css" href="css/styles.css">
	<link rel="stylesheet" type="text/css" href="css/smoothness/jquery-ui-1.8.19.custom.css" />
	<script src="scripts/libs/jquery.js"></script>
	<script data-main="scripts/install" src="scripts/libs/require.js"></script>
	<script src="scripts/require_config.js"></script>
</head>
<body class="gdInstallPage">
	<header>
		<nav>
			<a href="http://www.generatedata.com"><?php echo $_smarty_tpl->tpl_vars['L']->value['website'];?>
</a> |
			<a href="http://forums.generatedata.com"><?php echo $_smarty_tpl->tpl_vars['L']->value['forums'];?>
</a> <span class="gdHideNoJS">|</span>
			<span class="hideNoJS"><?php echo smarty_function_language_dropdown(array('nameId'=>"gdSelectLanguage"),$_smarty_tpl);?>
</span>
		</nav>
	</header>
	<nav id="gdTabs">
		<ul>
			<li id="gdTab1" class="gdSelected"><?php echo $_smarty_tpl->tpl_vars['L']->value['install'];?>
</li>
			<li id="gdTab2" class="gdHideNoJS"><?php echo $_smarty_tpl->tpl_vars['L']->value['help'];?>
</li>
		</ul>
	</nav>
	<section>
		<div class="gdNoJS">Please enable javascript in your browser.</div>

		<div id="gdContent" class="gdHideNoJS">
			<div id="gdTab1Content" class="gdTabContent">

				<div id="gdProcessingIcon"></div>

				<h1><?php echo $_smarty_tpl->tpl_vars['L']->value['installation'];?>
</h1>
				<p>
					<?php echo $_smarty_tpl->tpl_vars['L']->value['installation_intro'];?>

				</p>

				<div id="gdInstallError">
					<div class="gdIcon"></div>
					<h3>Uh-oh.</h3>
					<span class="gdResponse"></span>
				</div>

				<h2>1. <?php echo $_smarty_tpl->tpl_vars['L']->value['database_info'];?>
</h2>
				<form>
					<div class="gdFields gdInstallForm">
						<div class="gdField">
							<label for="dbHostname"><?php echo $_smarty_tpl->tpl_vars['L']->value['host_name'];?>
</label>
							<input type="text" id="dbHostname" value="localhost" />
						</div>
						<div class="gdError" id="dbHostname_error"></div>
						<div class="gdField">
							<label for="dbName"><?php echo $_smarty_tpl->tpl_vars['L']->value['database_name'];?>
</label>
							<input type="text" id="dbName" value="" />
						</div>
						<div class="gdError" id="dbName_error"></div>
						<div class="gdField">
							<label for="dbUsername"><?php echo $_smarty_tpl->tpl_vars['L']->value['mysql_username'];?>
</label>
							<input type="text" id="dbUsername" value="" />
						</div>
						<div class="gdError" id="dbUsername_error"></div>
						<div class="gdField">
							<label for="dbPassword"><?php echo $_smarty_tpl->tpl_vars['L']->value['mysql_password'];?>
</label>
							<input type="text" id="dbPassword" value="" class="pwdField" />
						</div>
						<div class="gdError" id="dbPassword_error"></div>
						<div class="gdField">
							<label for="tablePrefix"><?php echo $_smarty_tpl->tpl_vars['L']->value['table_prefix'];?>
</label>
							<input type="text" id="tablePrefix" value="<?php echo $_smarty_tpl->tpl_vars['tablePrefix']->value;?>
" maxlength="10" />
						</div>
						<div class="gdError" id="tablePrefix_error"></div>
						<div class="gdField">
							<label for="defaultLanguage"><?php echo $_smarty_tpl->tpl_vars['L']->value['default_language'];?>
</label>
							<?php echo smarty_function_language_dropdown(array('name_id'=>"defaultLanguage",'default'=>"en"),$_smarty_tpl);?>

						</div>
						<div class="gdError" id="defaultLanguage_error"></div>
					</div>

					<div class="gdClear gdVerticalPad"></div>

					<h2>2. <?php echo $_smarty_tpl->tpl_vars['L']->value['user_accounts'];?>
</h2>
					<div class="gdFields gdInstallForm">
						<div class="gdField">
							<label><?php echo $_smarty_tpl->tpl_vars['L']->value['employ_user_accounts'];?>
</label>
							<div class="gdRadioGroup">
								<input type="radio" name="employUserAccounts" id="eua1" value="yes" />
									<label for="eua1"><?php echo $_smarty_tpl->tpl_vars['L']->value['yes'];?>
</label>
								<input type="radio" name="employUserAccounts" id="eua2" value="no" checked="checked" />
									<label for="eua2"><?php echo $_smarty_tpl->tpl_vars['L']->value['no'];?>
</label>
							</div>
						</div>
						<div class="gdField gdFirstNameRow gdDisabledRow">
							<label for="email"><?php echo $_smarty_tpl->tpl_vars['L']->value['first_name'];?>
</label>
							<input type="text" id="firstName" value="" disabled="disabled" />
						</div>
						<div class="gdError" id="firstName_error"></div>
						<div class="gdField gdLastNameRow gdDisabledRow">
							<label for="email"><?php echo $_smarty_tpl->tpl_vars['L']->value['last_name'];?>
</label>
							<input type="text" id="lastName" value="" disabled="disabled" />
						</div>
						<div class="gdError" id="lastName_error"></div>
						<div class="gdField gdEmailRow gdDisabledRow">
							<label for="email"><?php echo $_smarty_tpl->tpl_vars['L']->value['email'];?>
</label>
							<input type="text" id="email" value="" disabled="disabled" />
						</div>
						<div class="gdError" id="email_error"></div>
						<div class="gdField gdPasswordRow gdDisabledRow">
							<label for="password"><?php echo $_smarty_tpl->tpl_vars['L']->value['password'];?>
</label>
							<input type="text" id="password" value="<?php echo $_smarty_tpl->tpl_vars['randomPassword']->value;?>
" class="pwdField" disabled="disabled" />
						</div>
						<div class="gdError" id="password_error"></div>
					</div>

					<div class="gdClear"></div>
					<button class="gdGreenButton"><?php echo $_smarty_tpl->tpl_vars['L']->value['install'];?>
</button>
				</form>
			</div>

			<div id="gdTab2Content" style="display:none">
				<h1><?php echo $_smarty_tpl->tpl_vars['L']->value['help'];?>
</h1>
				<p>
					<?php echo $_smarty_tpl->tpl_vars['L']->value['help_intro'];?>

				</p>

				<h2><?php echo $_smarty_tpl->tpl_vars['L']->value['help_prerequisites'];?>
</h2>
				<p>
					<?php echo $_smarty_tpl->tpl_vars['L']->value['help_prereq_info'];?>

				</p>

				<h2><?php echo $_smarty_tpl->tpl_vars['L']->value['what_each_field_means'];?>
</h2>
				<div class="doc">
					<div>
						<label><?php echo $_smarty_tpl->tpl_vars['L']->value['host_name'];?>
</label>
						<div><?php echo $_smarty_tpl->tpl_vars['L']->value['host_name_desc'];?>
</div>
					</div>
					<div>
						<label><?php echo $_smarty_tpl->tpl_vars['L']->value['database_name'];?>
</label>
						<div><?php echo $_smarty_tpl->tpl_vars['L']->value['database_name_desc'];?>
</div>
					</div>
					<div>
						<label><?php echo $_smarty_tpl->tpl_vars['L']->value['mysql_username'];?>
</label>
						<div><?php echo $_smarty_tpl->tpl_vars['L']->value['mysql_username_desc'];?>
</div>
					</div>
					<div>
						<label><?php echo $_smarty_tpl->tpl_vars['L']->value['mysql_password'];?>
</label>
						<div><?php echo $_smarty_tpl->tpl_vars['L']->value['mysql_password_desc'];?>
</div>
					</div>
					<div>
						<label><?php echo $_smarty_tpl->tpl_vars['L']->value['table_prefix'];?>
</label>
						<div><?php echo $_smarty_tpl->tpl_vars['L']->value['mysql_table_prefix_desc'];?>
</div>
					</div>
					<div>
						<label><?php echo $_smarty_tpl->tpl_vars['L']->value['default_language'];?>
</label>
						<div><?php echo $_smarty_tpl->tpl_vars['L']->value['default_lang_desc'];?>
</div>
					</div>
					<div>
						<label><?php echo $_smarty_tpl->tpl_vars['L']->value['employ_user_accounts'];?>
</label>
						<div><?php echo $_smarty_tpl->tpl_vars['L']->value['employ_user_accounts_desc'];?>
</div>
					</div>
					<div>
						<label><?php echo $_smarty_tpl->tpl_vars['L']->value['email'];?>
</label>
						<div><?php echo $_smarty_tpl->tpl_vars['L']->value['email_desc'];?>
</div>
					</div>
					<div>
						<label><?php echo $_smarty_tpl->tpl_vars['L']->value['password'];?>
</label>
						<div><?php echo $_smarty_tpl->tpl_vars['L']->value['password_desc'];?>
</div>
					</div>
				</div>

				<div class="gdClear"></div>

				<h2><?php echo $_smarty_tpl->tpl_vars['L']->value['still_stuck'];?>
</h2>
				<p>
					<?php echo $_smarty_tpl->tpl_vars['L']->value['still_stuck_info'];?>

				</p>
			</div>
		</div>
	</section>

	<footer>
		<?php echo $_smarty_tpl->tpl_vars['L']->value['version'];?>
 <?php echo $_smarty_tpl->tpl_vars['version']->value;?>
 - <a href="https://github.com/benkeen/generatedata" target="_blank">github</a>
	</footer>

</body>
</html>
<?php }} ?>