<?php /* Smarty version Smarty-3.1.8, created on 2013-11-05 00:06:16
         compiled from "/Users/rsicher1/Documents/Websites/generatedata/resources/templates/generate.tab1.tpl" */ ?>
<?php /*%%SmartyHeaderCode:98096108952782868df00f2-14103980%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'a7650d8c991bb1f875eb133b8858e46e62e446ea' => 
    array (
      0 => '/Users/rsicher1/Documents/Websites/generatedata/resources/templates/generate.tab1.tpl',
      1 => 1383605683,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '98096108952782868df00f2-14103980',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'theme' => 0,
    'L' => 0,
    'exportTypeAdditionalSettings' => 0,
    'k' => 0,
    'defaultExportType' => 0,
    'i' => 0,
    'defaultNumRows' => 0,
    'inDemoMode' => 0,
    'isLoggedIn' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.8',
  'unifunc' => 'content_52782869067f99_18051326',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_52782869067f99_18051326')) {function content_52782869067f99_18051326($_smarty_tpl) {?><?php if (!is_callable('smarty_function_country_plugins')) include '/Users/rsicher1/Documents/Websites/generatedata/resources/libs/smarty/plugins/function.country_plugins.php';
if (!is_callable('smarty_function_export_type_tabs')) include '/Users/rsicher1/Documents/Websites/generatedata/resources/libs/smarty/plugins/function.export_type_tabs.php';
if (!is_callable('smarty_function_data_types_dropdown')) include '/Users/rsicher1/Documents/Websites/generatedata/resources/libs/smarty/plugins/function.data_types_dropdown.php';
if (!is_callable('smarty_function_data_type_examples')) include '/Users/rsicher1/Documents/Websites/generatedata/resources/libs/smarty/plugins/function.data_type_examples.php';
if (!is_callable('smarty_function_data_type_options')) include '/Users/rsicher1/Documents/Websites/generatedata/resources/libs/smarty/plugins/function.data_type_options.php';
?><ul id="gdActionIcons">
	<li id="gdLoadLink" class="loading"><img src="resources/themes/<?php echo $_smarty_tpl->tpl_vars['theme']->value;?>
/images/load.png" title="<?php echo $_smarty_tpl->tpl_vars['L']->value['your_data_sets'];?>
" /></li>
	<li id="gdEmptyForm"><img src="resources/themes/<?php echo $_smarty_tpl->tpl_vars['theme']->value;?>
/images/trash.png" title="<?php echo $_smarty_tpl->tpl_vars['L']->value['clear_the_page'];?>
" /></li>
	<li id="gdDataSetLink" class="loading"><img src="resources/themes/<?php echo $_smarty_tpl->tpl_vars['theme']->value;?>
/images/link.png" title="<?php echo $_smarty_tpl->tpl_vars['L']->value['link_to_this_data_set'];?>
" /></li>
</ul>

<form id="gdData" method="post">
	
	<input type="hidden" name="gdRowOrder" id="gdRowOrder" />
	<input type="hidden" name="gdExportType" id="gdExportType" />
	<input type="hidden" name="gdNumCols" id="gdNumCols" />
	<input type="hidden" name="gdExportFormat" id="gdExportFormat" />
	<input type="hidden" name="configurationID" id="configurationID" /> 

	<div id="gdGenerateSubtab1">
		<input type="text" id="gdDataSetName" placeholder="<?php echo $_smarty_tpl->tpl_vars['L']->value['your_data_set_name_here'];?>
" /><button type="button" id="gdSaveBtn"><?php echo mb_strtoupper($_smarty_tpl->tpl_vars['L']->value['save'], 'UTF-8');?>
</button>
		<div class="gdClear" style="padding-bottom: 20px"></div>		

		<h2>
			<?php echo mb_strtoupper($_smarty_tpl->tpl_vars['L']->value['country_specific_data'], 'UTF-8');?>

			<span data-help-section="countryData" class="gdSectionHelp" title="<?php echo $_smarty_tpl->tpl_vars['L']->value['tip_country_data'];?>
"></span>
		</h2>

		<?php echo smarty_function_country_plugins(array(),$_smarty_tpl);?>


		<div id="gdMessages" class="gdMessage">
			<a class="gdMessageClose" href="#">X</a>
			<div></div>
		</div>

		<div class="gdClear" style="padding-bottom: 20px"></div>

		<h2>
			<?php echo mb_strtoupper($_smarty_tpl->tpl_vars['L']->value['data_set'], 'UTF-8');?>

			<span data-help-section="dataTypes" class="gdSectionHelp" title="<?php echo $_smarty_tpl->tpl_vars['L']->value['data_set_help'];?>
"></span>
		</h2>

		<ul class="gdTableHeadings">
			<li class="gdColOrder"><?php echo $_smarty_tpl->tpl_vars['L']->value['order'];?>
</li>
			<li class="gdColTitle" id="gdColTitleTop"><?php echo $_smarty_tpl->tpl_vars['L']->value['row_label'];?>
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
			<li class="gdColTitle" id="gdColTitleBottom"><?php echo $_smarty_tpl->tpl_vars['L']->value['row_label'];?>
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
		<div class="gdClear gdVerticalPad"></div>

		<div id="gdAddDataSetRowsSection">
			<?php echo $_smarty_tpl->tpl_vars['L']->value['add'];?>
 <input type="text" name="gdNumRowsToAdd" id="gdNumRowsToAdd" value="1" size="2" />
			<input type="button" value="<?php echo $_smarty_tpl->tpl_vars['L']->value['row_sp'];?>
" class="gdAddRowsBtn" />
		</div>
		<div class="gdClear" style="padding-bottom: 30px"></div>

		<h2>
			<?php echo mb_strtoupper($_smarty_tpl->tpl_vars['L']->value['export_types'], 'UTF-8');?>

			<span data-help-section="exportTypes" class="gdSectionHelp" title="<?php echo $_smarty_tpl->tpl_vars['L']->value['export_types_help'];?>
"></span>
		</h2>

		<div id="gdExportTypeTabs" class="gdSmallTabs">
			<span id="gdShowSettingsLink">
				<span>+</span>
				<a href="#"><?php echo $_smarty_tpl->tpl_vars['L']->value['hide_data_format_options'];?>
</a>
			</span>
			<?php echo smarty_function_export_type_tabs(array(),$_smarty_tpl);?>

			<?php  $_smarty_tpl->tpl_vars['i'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['i']->_loop = false;
 $_smarty_tpl->tpl_vars['k'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['exportTypeAdditionalSettings']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['i']->key => $_smarty_tpl->tpl_vars['i']->value){
$_smarty_tpl->tpl_vars['i']->_loop = true;
 $_smarty_tpl->tpl_vars['k']->value = $_smarty_tpl->tpl_vars['i']->key;
?>
				<div id="gdExportTypeAdditionalSettings_<?php echo $_smarty_tpl->tpl_vars['k']->value;?>
" class="gdExportTypeTabSettings"
					<?php if ($_smarty_tpl->tpl_vars['defaultExportType']->value==$_smarty_tpl->tpl_vars['k']->value){?>style="display:block"<?php }?>><?php echo $_smarty_tpl->tpl_vars['i']->value;?>
</div>
			<?php } ?>
		</div>
		<div class="gdClear"></div>

		<div id="gdGenerateSection">
			<button style="float: right" class="gdPrimaryButton" id="gdGenerateButton"><?php echo $_smarty_tpl->tpl_vars['L']->value['generate'];?>
</button>
			<?php echo $_smarty_tpl->tpl_vars['L']->value['generate'];?>
 <input type="text" name="gdNumRowsToGenerate" id="gdNumRowsToGenerate" value="<?php echo $_smarty_tpl->tpl_vars['defaultNumRows']->value;?>
" 
				<?php if ($_smarty_tpl->tpl_vars['inDemoMode']->value=="true"||!$_smarty_tpl->tpl_vars['isLoggedIn']->value){?>readonly="readonly"<?php }?> /> <?php echo $_smarty_tpl->tpl_vars['L']->value['rows'];?>

			<span>
				<input type="radio" name="gdExportTarget" id="gdExportTarget_inPage" value="inPage" checked="checked" />
					<label for="gdExportTarget_inPage" id="gdExportTarget_inPage_label"><?php echo $_smarty_tpl->tpl_vars['L']->value['generate_in_page'];?>
</label>
				<input type="radio" name="gdExportTarget" id="gdExportTarget_newTab" value="newTab" />
					<label for="gdExportTarget_newTab" id="gdExportTarget_newTab_label"><?php echo $_smarty_tpl->tpl_vars['L']->value['new_window_or_tab'];?>
</label>
				<input type="radio" name="gdExportTarget" id="gdExportTarget_promptDownload" value="promptDownload" />
					<label for="gdExportTarget_promptDownload" id="gdExportTarget_promptDownload_label"><?php echo $_smarty_tpl->tpl_vars['L']->value['prompt_to_download'];?>
</label>
			</span>
		</div>
	</div>

	<div id="gdGenerateSubtab2" class="hidden">
		<div id="gdGenerationPanel">
			<div>
				<?php echo $_smarty_tpl->tpl_vars['L']->value['generated_X_of_Y_results'];?>

			</div>
			<progress id="gdProgressMeter" max="" value=""></progress>
			<a href="" id="gdGenerationPanelCancel"><?php echo $_smarty_tpl->tpl_vars['L']->value['cancel'];?>
</a>
		</div>
		<textarea id="gdGeneratedData" style="height: 600px"></textarea>
		<ul id="gdTextSize">
			<li class="small">A</li>
			<li class="medium gdSelected">A</li>
			<li class="large">A</li>
		</ul>
		<button class="gdPrimaryButton" id="gdBackButton" title="<?php echo $_smarty_tpl->tpl_vars['L']->value['back'];?>
">&laquo;</button>
		<button class="gdPrimaryButton" id="gdRegenerateButton"><?php echo $_smarty_tpl->tpl_vars['L']->value['regenerate'];?>
</button>
		<div class="gdClear"></div>
	</div>
</form>

<div class="hidden">
	<div id="gdTableRowTemplate">
		<ul>
			<li class="gdColOrder">%ROW%</li>
			<li class="gdColTitle"><input type="text" name="gdTitle_%ROW%" id="gdTitle_%ROW%" /></li>
			<li class="gdColDataType"><?php echo smarty_function_data_types_dropdown(array(),$_smarty_tpl);?>
</li>
			<li class="gdColExamples" id="gdColExamples_%ROW%"></li>
			<li class="gdColOptions" id="gdColOptions_%ROW%"></li>
			<li class="gdColHelp" id="gdColHelp_%ROW%"></li>
			<li class="gdColDelete"><input type="checkbox" class="gdDeleteRows" name="gdDeleteRows_%ROW%" /></li>
		</ul>
	</div>
	<div id="gdHelpIcon">
		<ul class="ui-widget ui-helper-clearfix">
			<li class="ui-state-default ui-corner-all" onmouseover="$(this).addClass('ui-state-hover')"
				onmouseout="$(this).removeClass('ui-state-hover')"><span class="ui-icon ui-icon-help"></span></li>
		</ul>
	</div>
	<?php echo smarty_function_data_type_examples(array(),$_smarty_tpl);?>

	<?php echo smarty_function_data_type_options(array(),$_smarty_tpl);?>

</div>


<?php echo $_smarty_tpl->getSubTemplate ("dialogs.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>
<?php }} ?>