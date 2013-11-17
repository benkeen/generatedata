<?php /* Smarty version Smarty-3.1.8, created on 2013-11-04 23:59:46
         compiled from "/Users/rsicher1/Documents/Websites/generatedata/resources/templates/install.tab1.tpl" */ ?>
<?php /*%%SmartyHeaderCode:56885517527826e2ead076-94214741%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '3d32ca99abc98f0e3abfce9bd318ff53b89c122e' => 
    array (
      0 => '/Users/rsicher1/Documents/Websites/generatedata/resources/templates/install.tab1.tpl',
      1 => 1383605683,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '56885517527826e2ead076-94214741',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'L' => 0,
    'currentPage' => 0,
    'tablePrefix' => 0,
    'randomPassword' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.8',
  'unifunc' => 'content_527826e30d3803_25172138',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_527826e30d3803_25172138')) {function content_527826e30d3803_25172138($_smarty_tpl) {?><?php if (!is_callable('smarty_function_language_dropdown')) include '/Users/rsicher1/Documents/Websites/generatedata/resources/libs/smarty/plugins/function.language_dropdown.php';
?>	<h1><?php echo $_smarty_tpl->tpl_vars['L']->value['installation'];?>
</h1>

	<nav id="gdInstallNav">
		<ol>
			<li id="nav1" class="<?php if ($_smarty_tpl->tpl_vars['currentPage']->value==1){?>gdSelected<?php }else{ ?>gdComplete<?php }?>"><?php echo $_smarty_tpl->tpl_vars['L']->value['check_database_info'];?>
</li>
			<li id="nav2" class="<?php if ($_smarty_tpl->tpl_vars['currentPage']->value==2){?>gdSelected<?php }elseif($_smarty_tpl->tpl_vars['currentPage']->value>2){?>gdComplete<?php }?>"><?php echo $_smarty_tpl->tpl_vars['L']->value['create_settings_file'];?>
</li>
			<li id="nav3" class="<?php if ($_smarty_tpl->tpl_vars['currentPage']->value==3){?>gdSelected<?php }elseif($_smarty_tpl->tpl_vars['currentPage']->value>3){?>gdComplete<?php }?>"><?php echo $_smarty_tpl->tpl_vars['L']->value['user_accounts'];?>
</li>
			<li id="nav4" class="<?php if ($_smarty_tpl->tpl_vars['currentPage']->value==4){?>gdSelected<?php }elseif($_smarty_tpl->tpl_vars['currentPage']->value>4){?>gdComplete<?php }?>"><?php echo $_smarty_tpl->tpl_vars['L']->value['plugins'];?>
</li>
			<li id="nav5" class="<?php if ($_smarty_tpl->tpl_vars['currentPage']->value==5){?>gdSelected<?php }?>"><?php echo $_smarty_tpl->tpl_vars['L']->value['complete_excl'];?>
</li>
		</ol>
	</nav>

	<div class="gdInstallSection<?php if ($_smarty_tpl->tpl_vars['currentPage']->value!=1){?> hidden<?php }?>" id="page1">
		<div class="gdInstallTabMessage">
			<div class="gdIcon"></div>
			<h3>Uh-oh.</h3>
			<div class="gdResponse"></div>
		</div>

		<p>
			<?php echo $_smarty_tpl->tpl_vars['L']->value['installation_intro'];?>

		</p>

		<form>
			<div class="gdFields">
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
					<input type="text" id="dbPassword" value="" class="pwdField" size="12" autocomplete="off" />
				</div>
				<div class="gdError" id="dbPassword_error"></div>
				<div class="gdField">
					<label for="dbTablePrefix"><?php echo $_smarty_tpl->tpl_vars['L']->value['table_prefix'];?>
</label>
					<input type="text" id="dbTablePrefix" value="<?php echo $_smarty_tpl->tpl_vars['tablePrefix']->value;?>
" maxlength="10" />
				</div>
				<div class="gdError" id="dbTablePrefix_error"></div>
				<div class="gdField">
					<label for="defaultLanguage"><?php echo $_smarty_tpl->tpl_vars['L']->value['default_language'];?>
</label>
					<?php echo smarty_function_language_dropdown(array('nameId'=>"gdDefaultLanguage",'default'=>"en"),$_smarty_tpl);?>

				</div>
				<div class="gdError" id="defaultLanguage_error"></div>
			</div>

			<div class="gdClear"></div>

			<button class="gdPrimaryButton"><?php echo $_smarty_tpl->tpl_vars['L']->value['continue_rightarrow'];?>
</button>
		</form>
	</div>

	<div class="gdInstallSection<?php if ($_smarty_tpl->tpl_vars['currentPage']->value!=2){?> hidden<?php }?>" id="page2">

		<div class="gdInstallTabMessage">
			<div class="gdIcon"></div>
			<h3>Uh-oh.</h3>
			<div class="gdResponse"></div>
		</div>

		<div id="gdInstallCreateSettingsFile">
			<p>
				<?php echo $_smarty_tpl->tpl_vars['L']->value['installation_step2_intro'];?>

			</p>

			<form>
				<button class="gdPrimaryButton"><?php echo $_smarty_tpl->tpl_vars['L']->value['create_file_rightarrow'];?>
</button>
			</form>
		</div>

		<div id="gdInstallCreateSettingsFileErrorScenario" class="hidden">
			<p>
				<?php echo $_smarty_tpl->tpl_vars['L']->value['installation_failed_create_settings_file_msg'];?>

			</p>

			<textarea id="gdSettingsFileContents"></textarea>

			<form>
				<button class="gdPrimaryButton"><?php echo $_smarty_tpl->tpl_vars['L']->value['confirm_file_exists'];?>
</button>
			</form>
		</div>

	</div>

	<div class="gdInstallSection<?php if ($_smarty_tpl->tpl_vars['currentPage']->value!=3){?> hidden<?php }?>" id="page3">

		<div class="gdInstallTabMessage">
			<div class="gdIcon"></div>
			<h3>Uh-oh.</h3>
			<div class="gdResponse"></div>
		</div>

		<p>
			<?php echo $_smarty_tpl->tpl_vars['L']->value['installation_step3_intro'];?>

		</p>

		<form>
			<div>
				<input type="radio" name="userAccountSetup" id="acs1" value="anonymousAdmin" checked="checked" />
					<label for="acs1"><?php echo $_smarty_tpl->tpl_vars['L']->value['single_anonymous_user_account'];?>
</label>
			</div>
			<div>
				<input type="radio" name="userAccountSetup" id="acs2" value="single" />
					<label for="acs2"><?php echo $_smarty_tpl->tpl_vars['L']->value['single_user_account_requires_login'];?>
</label>
			</div>
			<div style="margin-bottom: 20px">
				<input type="radio" name="userAccountSetup" id="acs3" value="multiple" />
					<label for="acs3"><?php echo $_smarty_tpl->tpl_vars['L']->value['multiple_accounts'];?>
</label>
			</div>

			<div class="gdFields">
				<div class="gdCol" id="gdInstallAccountDetails" style="display:none">
					<h3 id="gdInstallAccountDetailsMessage"></h3>

					<div class="gdError" id="firstName_error"></div>
					<div class="gdError" id="lastName_error"></div>
					<div class="gdError" id="email_error"></div>
					<div class="gdError" id="password_error"></div>

					<div class="gdField gdFirstNameRow">
						<label for="firstName"><?php echo $_smarty_tpl->tpl_vars['L']->value['first_name'];?>
</label>
						<input type="text" id="firstName" value="" />
					</div>

					<div class="gdField gdLastNameRow">
						<label for="lastName"><?php echo $_smarty_tpl->tpl_vars['L']->value['last_name'];?>
</label>
						<input type="text" id="lastName" value="" />
					</div>

					<div class="gdField gdEmailRow">
						<label for="email"><?php echo $_smarty_tpl->tpl_vars['L']->value['email'];?>
</label>
						<input type="text" id="email" value="" />
					</div>

					<div class="gdField gdPasswordRow">
						<label for="password"><?php echo $_smarty_tpl->tpl_vars['L']->value['password'];?>
</label>
						<input type="text" id="password" value="<?php echo $_smarty_tpl->tpl_vars['randomPassword']->value;?>
" class="pwdField" autocomplete="off" />
						<span id="gdRefreshPassword"></span>
					</div>
				</div>

				<div class="gdCol" id="gdInstallAnonymousUserSettings" style="display:none">
					<span class="rightBox">
						<input type="checkbox" id="allowAnonymousAccess" /><label for="allowAnonymousAccess"><?php echo $_smarty_tpl->tpl_vars['L']->value['feature_enabled'];?>
</label>
					</span>
					<h3><?php echo $_smarty_tpl->tpl_vars['L']->value['anonymous_access'];?>
</h3>
					<div><?php echo $_smarty_tpl->tpl_vars['L']->value['anonymous_user_desc'];?>
</div>
					<div><i><?php echo $_smarty_tpl->tpl_vars['L']->value['anonymous_user_message'];?>
</i></div>
					<textarea id="anonymousUserPermissionDeniedMsg" name="anonymousUserPermissionDeniedMsg" class="gdDisabled"
						disabled="disabled"><?php echo $_smarty_tpl->tpl_vars['L']->value['anonymous_user_default_message'];?>
</textarea>
				</div>
			</div>

			<div class="gdClear"></div>

			<button class="gdPrimaryButton"><?php echo $_smarty_tpl->tpl_vars['L']->value['continue_rightarrow'];?>
</button>
		</form>
	</div>

	<div class="gdInstallSection<?php if ($_smarty_tpl->tpl_vars['currentPage']->value!=4){?> hidden<?php }?>" id="page4">
		<p>
			<?php echo $_smarty_tpl->tpl_vars['L']->value['installation_plugin_intro'];?>

		</p>

		<div id="gdPluginInstallationResults" class="hidden">
			<div>
				<h4>1. <?php echo $_smarty_tpl->tpl_vars['L']->value['data_types'];?>
</h4>
				<div id="gdDataTypeResponse" class="gdResponse"></div>
			</div>
			<div>
				<h4>2. <?php echo $_smarty_tpl->tpl_vars['L']->value['export_types'];?>
</h4>
				<div id="gdExportTypeResponse" class="gdResponse"></div>
			</div>
			<div>
				<h4>3. <?php echo $_smarty_tpl->tpl_vars['L']->value['countries'];?>
</h4>
				<div id="gdCountriesResponse" class="gdResponse"></div>
			</div>
		</div>
		<div class="gdClear"></div>

		<form>
			<button class="gdPrimaryButton" id="gdInstallPluginsBtn"><?php echo $_smarty_tpl->tpl_vars['L']->value['install_plugins_rightarrow'];?>
</button>
		</form>
	</div>

	<div class="gdInstallSection<?php if ($_smarty_tpl->tpl_vars['currentPage']->value!=5){?> hidden<?php }?>" id="page5">
		<p>
			<?php echo $_smarty_tpl->tpl_vars['L']->value['installation_complete_text'];?>

		</p>

		<form action="./">
			<button class="gdPrimaryButton"><?php echo $_smarty_tpl->tpl_vars['L']->value['goto_script_rightarrow'];?>
</button>
		</form>
	</div>

	<div class="gdClear"></div>
<?php }} ?>