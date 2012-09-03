<?php /* Smarty version Smarty-3.1.8, created on 2012-09-03 09:57:11
         compiled from "/Applications/MAMP/htdocs/generatedata/templates/index.tpl" */ ?>
<?php /*%%SmartyHeaderCode:16633185474fef7140823299-31170757%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '4f69f00cf40379325b348a789012b5fc1a1afc8a' => 
    array (
      0 => '/Applications/MAMP/htdocs/generatedata/templates/index.tpl',
      1 => 1346691409,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '16633185474fef7140823299-31170757',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.8',
  'unifunc' => 'content_4fef71408e35e3_48669617',
  'variables' => 
  array (
    'L' => 0,
    'exportTypeAdditionalSettings' => 0,
    'k' => 0,
    'i' => 0,
    'settings' => 0,
    'version' => 0,
    'exportTypeJSModules' => 0,
    'dataTypeJSModules' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_4fef71408e35e3_48669617')) {function content_4fef71408e35e3_48669617($_smarty_tpl) {?><?php if (!is_callable('smarty_function_language_dropdown')) include '/Applications/MAMP/htdocs/generatedata/smarty/plugins/function.language_dropdown.php';
if (!is_callable('smarty_function_export_types')) include '/Applications/MAMP/htdocs/generatedata/smarty/plugins/function.export_types.php';
if (!is_callable('smarty_function_country_list')) include '/Applications/MAMP/htdocs/generatedata/smarty/plugins/function.country_list.php';
if (!is_callable('smarty_function_data_types_dropdown')) include '/Applications/MAMP/htdocs/generatedata/smarty/plugins/function.data_types_dropdown.php';
if (!is_callable('smarty_function_data_type_resources')) include '/Applications/MAMP/htdocs/generatedata/smarty/plugins/function.data_type_resources.php';
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
	<link rel="stylesheet" type="text/css" href="css/smoothness/jquery-ui-1.8.23.custom.css" />
	<script src="scripts/libs/jquery.js"></script>
	<script src="scripts/libs/require.js"></script>
	<script src="scripts/requireConfig.js"></script>
</head>
<body>
	<header>
		<nav>
			<a href="http://www.generatedata.com"><?php echo $_smarty_tpl->tpl_vars['L']->value['website'];?>
</a> |
			<a href="http://www.generatedata.com/forums/"><?php echo $_smarty_tpl->tpl_vars['L']->value['forums'];?>
</a> <span class="gdHideNoJS">|</span>
			<?php echo smarty_function_language_dropdown(array('nameId'=>"gdSelectLanguage"),$_smarty_tpl);?>

		</nav>
	</header>
	<nav id="gdTabs">
		<ul>
			<li id="gdTab1" class="gdSelected"><?php echo $_smarty_tpl->tpl_vars['L']->value['generate'];?>
</li>
			<li id="gdTab2" class="gdHideNoJS"><?php echo $_smarty_tpl->tpl_vars['L']->value['settings'];?>
</li>
			<li id="gdTab3" class="gdHideNoJS"><?php echo $_smarty_tpl->tpl_vars['L']->value['help'];?>
</li>
		</ul>
	</nav>
	<section>
		<div class="gdNoJS">Please enable javascript in your browser.</div>
		<div id="gdContent" class="gdHideNoJS">
			<div id="gdLoadingIcon"></div>

			<div id="gdTab1Content" class="gdTabContent ">

				

				<form action="process.php" method="post" name="gdData" id="gdData" target="hiddenIframe">
					<input type="hidden" name="gdNumCols" id="gdNumCols" value="" />
					<input type="hidden" name="gdRowOrder" id="gdRowOrder" value="" />
					<input type="hidden" name="gdDeletedRows" id="gdDeletedRows" value="" />

					<div class="gdSetting">
						<label><?php echo $_smarty_tpl->tpl_vars['L']->value['result_type'];?>
</label>
						<div>
							<?php echo smarty_function_export_types(array(),$_smarty_tpl);?>

						</div>
						<div class="gdClear"></div>
					</div>
					<div class="gdSetting">
						<label><?php echo $_smarty_tpl->tpl_vars['L']->value['countries'];?>
</label>
						<div id="gdCountryList">
							<?php echo smarty_function_country_list(array(),$_smarty_tpl);?>

						</div>
						<div class="gdClear"> </div>
					</div>
					<div class="gdClear"></div>

					<?php  $_smarty_tpl->tpl_vars['i'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['i']->_loop = false;
 $_smarty_tpl->tpl_vars['k'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['exportTypeAdditionalSettings']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['i']->key => $_smarty_tpl->tpl_vars['i']->value){
$_smarty_tpl->tpl_vars['i']->_loop = true;
 $_smarty_tpl->tpl_vars['k']->value = $_smarty_tpl->tpl_vars['i']->key;
?>
						<div id="gdExportTypeAdditionalSettings_<?php echo $_smarty_tpl->tpl_vars['k']->value;?>
" class="gdExportTypeAdditionalSettings"><?php echo $_smarty_tpl->tpl_vars['i']->value;?>
</div>
					<?php } ?>

					<div id="gdMessages">
						<a class="gdClose" title="<?php echo $_smarty_tpl->tpl_vars['L']->value['hide_error'];?>
" onclick="return g.hideErrors(false)" href="#">X</a>
						<div></div>
					</div>

					<div class="gdVerticalPad"></div>

					<ul class="gdTableHeadings">
						<li class="gdColOrder"><?php echo $_smarty_tpl->tpl_vars['L']->value['order'];?>
</li>
						<li class="gdColTitle" id="gdColTitleTop"><?php echo $_smarty_tpl->tpl_vars['L']->value['column_title'];?>
</li>
						<li class="gdColDataType"><?php echo $_smarty_tpl->tpl_vars['L']->value['data_type'];?>
</li>
						<li class="gdColExamples"><?php echo $_smarty_tpl->tpl_vars['L']->value['examples'];?>
</li>
						<li class="gdColOptions"><?php echo $_smarty_tpl->tpl_vars['L']->value['options'];?>
</li>
						<li class="gdColHelp"><?php echo $_smarty_tpl->tpl_vars['L']->value['help'];?>
</li>
						<li class="gdColDelete"><input type="button" class="gdDeleteRowsBtn" value="<?php echo $_smarty_tpl->tpl_vars['L']->value['del'];?>
" /></li>
					</ul>
					<ul id="gdTableRows"></ul>
					<ul class="gdTableHeadings">
						<li class="gdColOrder"><?php echo $_smarty_tpl->tpl_vars['L']->value['order'];?>
</li>
						<li class="gdColTitle" id="gdColTitleBottom"><?php echo $_smarty_tpl->tpl_vars['L']->value['column_title'];?>
</li>
						<li class="gdColDataType"><?php echo $_smarty_tpl->tpl_vars['L']->value['data_type'];?>
</li>
						<li class="gdColExamples"><?php echo $_smarty_tpl->tpl_vars['L']->value['examples'];?>
</li>
						<li class="gdColOptions"><?php echo $_smarty_tpl->tpl_vars['L']->value['options'];?>
</li>
						<li class="gdColHelp"><?php echo $_smarty_tpl->tpl_vars['L']->value['help'];?>
</li>
						<li class="gdColDelete"><input type="button" class="gdDeleteRowsBtn" value="<?php echo $_smarty_tpl->tpl_vars['L']->value['del'];?>
" /></li>
					</ul>

					<div class="gdClear"></div>
					<div class="gdVerticalPad"></div>

					<div style="float: right"><input type="button" id="gdEmptyForm" value="<?php echo $_smarty_tpl->tpl_vars['L']->value['empty_form'];?>
" /></div>
					<?php echo $_smarty_tpl->tpl_vars['L']->value['add'];?>
 <input type="text" name="gdNumRows" id="gdNumRows" value="1" size="2" />
					<input type="button" value="<?php echo $_smarty_tpl->tpl_vars['L']->value['row_sp'];?>
" class="gdAddRowsBtn" />


					
					<iframe name="hiddenIframe" src="" frameborder="0" scrolling="no" style="height: 0px; width: 0px;"></iframe>

					<div class="gdVerticalPad"></div>
					<div>
						<button class="gdGreenButton gdGenerateButton"><?php echo $_smarty_tpl->tpl_vars['L']->value['generate'];?>
</button>
						<input type="text" style="width:45px;" name="gdNumResults" id="gdNumResults" value="100" /> rows
					</div>

					<div class="hidden">
						<div id="HTML_Row">
							<ul>
								<li class="gdColOrder">$ROW$</li>
								<li class="gdColTitle"><input type="text" name="title_$ROW$" id="title_$ROW$" /></li>
								<li class="gdColDataType"><?php echo smarty_function_data_types_dropdown(array(),$_smarty_tpl);?>
</li>
								<li class="gdColExamples" id="gdColExamples_$ROW$">&nbsp;</li>
								<li class="gdColOptions" id="gdColOptions_$ROW$">&nbsp;</li>
								<li class="gdColHelp" id="gdColHelp_$ROW$">&nbsp;</li>
								<li class="gdColDelete"><input type="checkbox" class="gdDeleteRows" name="gdDeleteRows_$ROW$" /></li>
							</ul>
						</div>
						<div id="gdHelpIcon">
							<ul class="ui-widget ui-helper-clearfix">
								<li class="ui-state-default ui-corner-all" onmouseover="$(this).addClass('ui-state-hover')"
									onmouseout="$(this).removeClass('ui-state-hover')"><span class="ui-icon ui-icon-help"></span></li>
							</ul>
						</div>
						<?php echo smarty_function_data_type_resources(array(),$_smarty_tpl);?>

					</div>

				</form>
				<div id="gdHelpPopup"></div>
			</div>

			<div class="gdTabContent" id="gdTab2Content">
				<form method="post">
					<h3>Developer Settings</h3>
					<div>
						<input type="checkbox" name="consoleEventsPublish" id="gdSettingsConsoleEventsPublish"
							value="enabled" <?php if ($_smarty_tpl->tpl_vars['settings']->value['consoleEventsPublish']=="enabled"){?>checked="checked"<?php }?> />
							<label for="gdSettingsConsoleEventsPublish">List console.log() <b>publish</b> events</label>
					</div>
					<div>
						<input type="checkbox" name="consoleEventsSubscribe" id="gdSettingsConsoleEventsSubscribe"
							value="enabled" <?php if ($_smarty_tpl->tpl_vars['settings']->value['consoleEventsSubscribe']=="enabled"){?>checked="checked"<?php }?> />
							<label for="gdSettingsConsoleEventsSubscribe">List console.log() <b>subscribe</b> events</label>
					</div>
					<p>
						<input type="submit" name="submit" value="Update" />
					</p>
				</form>
			</div>

			<div class="gdTabContent" id="gdTab3Content">
			</div>
		</div>
	</section>

	<footer>
		<?php echo $_smarty_tpl->tpl_vars['L']->value['version'];?>
 <?php echo $_smarty_tpl->tpl_vars['version']->value;?>
 - <a href="https://github.com/benkeen/generatedata" target="_blank">github</a>
	</footer>

	<script>
	require([
		"manager",
		"generator",

		// Export Type modules
		<?php echo $_smarty_tpl->tpl_vars['exportTypeJSModules']->value;?>
,

		// Data Type modules
		<?php echo $_smarty_tpl->tpl_vars['dataTypeJSModules']->value;?>
,

		"pageinit"
	], function(manager) { manager.start(); });
	</script>

</body>
</html>
<?php }} ?>