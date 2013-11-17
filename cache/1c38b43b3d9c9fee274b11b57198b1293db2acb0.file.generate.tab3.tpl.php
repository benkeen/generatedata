<?php /* Smarty version Smarty-3.1.8, created on 2013-11-05 00:06:17
         compiled from "/Users/rsicher1/Documents/Websites/generatedata/resources/templates/generate.tab3.tpl" */ ?>
<?php /*%%SmartyHeaderCode:1641831514527828691a8a39-95967508%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '1c38b43b3d9c9fee274b11b57198b1293db2acb0' => 
    array (
      0 => '/Users/rsicher1/Documents/Websites/generatedata/resources/templates/generate.tab3.tpl',
      1 => 1383605683,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1641831514527828691a8a39-95967508',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'success' => 0,
    'message' => 0,
    'settings' => 0,
    'L' => 0,
    'useMinifiedResources' => 0,
    'allowThemes' => 0,
    'label1' => 0,
    'label2' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.8',
  'unifunc' => 'content_5278286933d939_81162859',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5278286933d939_81162859')) {function content_5278286933d939_81162859($_smarty_tpl) {?><?php if (!is_callable('smarty_function_data_types_dropdown')) include '/Users/rsicher1/Documents/Websites/generatedata/resources/libs/smarty/plugins/function.data_types_dropdown.php';
if (!is_callable('smarty_function_export_types_dropdown')) include '/Users/rsicher1/Documents/Websites/generatedata/resources/libs/smarty/plugins/function.export_types_dropdown.php';
?><div id="settingsTabMessage" class="gdMessage <?php if ($_smarty_tpl->tpl_vars['success']->value){?>gdNotify<?php }elseif(!$_smarty_tpl->tpl_vars['success']->value){?>gdError<?php }?> gdMarginTop" <?php if ($_smarty_tpl->tpl_vars['message']->value){?>style="display:block"<?php }?>>
	<a href="#" class="gdMessageClose">X</a>
	<p><?php echo $_smarty_tpl->tpl_vars['message']->value;?>
</p>
</div>

<form action="./#t3" method="post" id="gdSettingsForm">
	<input type="hidden" name="updateSettings" value="1" />

	<?php if ($_smarty_tpl->tpl_vars['settings']->value['userAccountSetup']!="anonymousAdmin"){?>
		<h3><?php echo $_smarty_tpl->tpl_vars['L']->value['account_settings'];?>
</h3>

		<div>
			<div>
				<input type="radio" name="userAccountSetup" id="acs2" value="single" <?php if ($_smarty_tpl->tpl_vars['settings']->value['userAccountSetup']=="single"){?>checked="checked"<?php }?> />
				<label for="acs2"><?php echo $_smarty_tpl->tpl_vars['L']->value['single_user_account_requires_login'];?>
</label>
			</div>
			<div style="margin-bottom: 20px">
				<input type="radio" name="userAccountSetup" id="acs3" value="multiple" <?php if ($_smarty_tpl->tpl_vars['settings']->value['userAccountSetup']=="multiple"){?>checked="checked"<?php }?> />
				<label for="acs3"><?php echo $_smarty_tpl->tpl_vars['L']->value['multiple_accounts'];?>
</label>
			</div>
		</div>
	<?php }?>

	<h3><?php echo $_smarty_tpl->tpl_vars['L']->value['plugins'];?>
</h3>

	<p>
		<?php echo $_smarty_tpl->tpl_vars['L']->value['plugins_intro'];?>

	</p>

	<?php if ($_smarty_tpl->tpl_vars['useMinifiedResources']->value){?>
		<div class="gdNotify gdMarginTop" style="display:block">
			<p>
				<?php echo $_smarty_tpl->tpl_vars['L']->value['reset_plugins_with_bundling'];?>

				<button id="gdResetPluginsBtn" class="gdSecondaryButton"><?php echo $_smarty_tpl->tpl_vars['L']->value['reset_plugins'];?>
</button>
			</p>
		</div>
	<?php }else{ ?>
		<button id="gdResetPluginsBtn" class="gdSecondaryButton"><?php echo $_smarty_tpl->tpl_vars['L']->value['reset_plugins'];?>
</button>
	<?php }?>

	<div id="gdPluginInstallation">
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
	</div>

	<h3><?php echo $_smarty_tpl->tpl_vars['L']->value['misc'];?>
</h3>

	<div>
		<?php echo $_smarty_tpl->tpl_vars['L']->value['theme'];?>

		<input type="radio" name="theme" value="default" id="gdTheme1" <?php if ($_smarty_tpl->tpl_vars['settings']->value['theme']=="default"){?>checked="checked"<?php }?> <?php if (!$_smarty_tpl->tpl_vars['allowThemes']->value){?>disabled="disabled"<?php }?> />
		<label for="gdTheme1">Default</label>
		<input type="radio" name="theme" value="classic" id="gdTheme2" <?php if ($_smarty_tpl->tpl_vars['settings']->value['theme']=="classic"){?>checked="checked"<?php }?> />
		<label for="gdTheme2">Classic</label>
	</div>

	<h3><?php echo $_smarty_tpl->tpl_vars['L']->value['developer'];?>
</h3>

	<p>
		<?php echo $_smarty_tpl->tpl_vars['L']->value['developer_intro'];?>

	</p>

	<div class="cols2">
		<div class="col">
			<div>
				<input type="checkbox" name="consoleWarnings" id="gdSettingsConsoleWarnings"
					   value="enabled" <?php if ($_smarty_tpl->tpl_vars['settings']->value['consoleWarnings']=="enabled"){?>checked="checked"<?php }?> />
				<label for="gdSettingsConsoleWarnings"><?php echo $_smarty_tpl->tpl_vars['L']->value['list_console_warn_events'];?>
</label>
			</div>
			<div>
				<input type="checkbox" name="consoleEventsPublish" id="gdSettingsConsoleEventsPublish"
					   value="enabled" <?php if ($_smarty_tpl->tpl_vars['settings']->value['consoleEventsPublish']=="enabled"){?>checked="checked"<?php }?> />
				<label for="gdSettingsConsoleEventsPublish"><?php echo $_smarty_tpl->tpl_vars['L']->value['list_module_publish_events'];?>
</label>
			</div>
			<div>
				<input type="checkbox" name="consoleEventsSubscribe" id="gdSettingsConsoleEventsSubscribe"
					   value="enabled" <?php if ($_smarty_tpl->tpl_vars['settings']->value['consoleEventsSubscribe']=="enabled"){?>checked="checked"<?php }?> />
				<label for="gdSettingsConsoleEventsSubscribe"><?php echo $_smarty_tpl->tpl_vars['L']->value['list_module_subscribe_events'];?>
</label>
			</div>
			<div>
				<input type="checkbox" name="consoleCoreEvents" id="gdSettingsConsoleCoreEvents"
					   value="enabled" <?php if ($_smarty_tpl->tpl_vars['settings']->value['consoleCoreEvents']=="enabled"){?>checked="checked"<?php }?> />
				<label for="gdSettingsConsoleCoreEvents"><?php echo $_smarty_tpl->tpl_vars['L']->value['list_core_events'];?>
</label>
			</div>
		</div>
		<div class="col">
			<label for="consoleEventsModuleList"><?php echo $_smarty_tpl->tpl_vars['L']->value['limit_pub_sub_console_messages'];?>
</label>
			<?php $_smarty_tpl->tpl_vars['label1'] = new Smarty_variable("data-placeholder=\"".($_smarty_tpl->tpl_vars['L']->value['all_data_type_plugins'])."\"", null, 0);?>
			<?php echo smarty_function_data_types_dropdown(array('name'=>"consoleEventsDataTypePlugins",'id'=>"consoleEventsDataTypePlugins",'style'=>"width:500px",'multiple'=>true,'extras'=>$_smarty_tpl->tpl_vars['label1']->value,'includeDefaultOption'=>false,'selected'=>$_smarty_tpl->tpl_vars['settings']->value['consoleEventsDataTypePlugins']),$_smarty_tpl);?>


			<?php $_smarty_tpl->tpl_vars['label2'] = new Smarty_variable("data-placeholder=\"".($_smarty_tpl->tpl_vars['L']->value['all_export_type_plugins'])."\"", null, 0);?>
			<?php echo smarty_function_export_types_dropdown(array('name'=>"consoleEventsExportTypePlugins",'id'=>"consoleEventsExportTypePlugins",'style'=>"width:500px",'multiple'=>true,'extras'=>$_smarty_tpl->tpl_vars['label2']->value,'includeDefaultOption'=>false,'selected'=>$_smarty_tpl->tpl_vars['settings']->value['consoleEventsExportTypePlugins']),$_smarty_tpl);?>

		</div>
	</div>

	<div class="gdClear"></div>
	<p>
		<button class="gdPrimaryButton" id="updateSettingsBtn"><?php echo $_smarty_tpl->tpl_vars['L']->value['update_settings'];?>
</button>
	</p>
</form>
<?php }} ?>