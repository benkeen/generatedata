<ul id="gdActionIcons">
	<li id="gdLoadLink" class="loading"><img src="resources/themes/{$theme}/images/load.png" title="{$L.your_data_sets}" /></li>
	<li id="gdEmptyForm"><img src="resources/themes/{$theme}/images/trash.png" title="{$L.clear_the_page}" /></li>
	<li id="gdDataSetLink" class="loading"><img src="resources/themes/{$theme}/images/link.png" title="{$L.link_to_this_data_set}" /></li>
</ul>

<form id="gdData" method="post">
	{* here because the new window/tab export format option uses a simple POST. This standardizes it all
	   so that for all export formats we can just serialize the form *}
	<input type="hidden" name="gdRowOrder" id="gdRowOrder" />
	<input type="hidden" name="gdExportType" id="gdExportType" />
	<input type="hidden" name="gdNumCols" id="gdNumCols" />
	<input type="hidden" name="gdExportFormat" id="gdExportFormat" />
	<input type="hidden" name="configurationID" id="configurationID" /> {* TODO should have gd prefix! *}

	<div id="gdGenerateSubtab1">
		<input type="text" id="gdDataSetName" placeholder="{$L.your_data_set_name_here}" /><button type="button" id="gdSaveBtn">{$L.save|upper}</button>
		<div class="gdClear" style="padding-bottom: 20px"></div>		

		<h2>
			{$L.country_specific_data|upper}
			<span data-help-section="countryData" class="gdSectionHelp" title="{$L.tip_country_data}"></span>
		</h2>

		{country_plugins}

		<div id="gdMessages" class="gdMessage">
			<a class="gdMessageClose" href="#">X</a>
			<div></div>
		</div>

		<div class="gdClear" style="padding-bottom: 20px"></div>

		<h2>
			{$L.data_set|upper}
			<span data-help-section="dataTypes" class="gdSectionHelp" title="{$L.data_set_help}"></span>
		</h2>

		<ul class="gdTableHeadings">
			<li class="gdColOrder">{$L.order}</li>
			<li class="gdColTitle" id="gdColTitleTop">{$L.row_label}</li>
			<li class="gdColDataType">{$L.data_type}</li>
			<li class="gdColExamples">{$L.examples}</li>
			<li class="gdColOptions">{$L.options}</li>
			<li class="gdColHelp">{$L.help}</li>
			<li class="gdColDelete"><input type="button" class="gdDeleteRowsBtn" value="{$L.del}" /></li>
		</ul>
		<ul id="gdTableRows"></ul>
		<ul class="gdTableHeadings">
			<li class="gdColOrder">{$L.order}</li>
			<li class="gdColTitle" id="gdColTitleBottom">{$L.row_label}</li>
			<li class="gdColDataType">{$L.data_type}</li>
			<li class="gdColExamples">{$L.examples}</li>
			<li class="gdColOptions">{$L.options}</li>
			<li class="gdColHelp">{$L.help}</li>
			<li class="gdColDelete"><input type="button" class="gdDeleteRowsBtn" value="{$L.del}" /></li>
		</ul>
		<div class="gdClear gdVerticalPad"></div>

		<div id="gdAddDataSetRowsSection">
			{$L.add} <input type="text" name="gdNumRowsToAdd" id="gdNumRowsToAdd" value="1" size="2" />
			<input type="button" value="{$L.row_sp}" class="gdAddRowsBtn" />
		</div>
		<div class="gdClear" style="padding-bottom: 30px"></div>

		<h2>
			{$L.export_types|upper}
			<span data-help-section="exportTypes" class="gdSectionHelp" title="{$L.export_types_help}"></span>
		</h2>

		<div id="gdExportTypeTabs" class="gdSmallTabs">
			<span id="gdShowSettingsLink">
				<span>+</span>
				<a href="#">{$L.hide_data_format_options}</a>
			</span>
			{export_type_tabs}
			{foreach from=$exportTypeAdditionalSettings key=k item=i}
				<div id="gdExportTypeAdditionalSettings_{$k}" class="gdExportTypeTabSettings"
					{if $defaultExportType == $k}style="display:block"{/if}>{$i}</div>
			{/foreach}
		</div>
		<div class="gdClear"></div>

		<div id="gdGenerateSection">
			<button style="float: right" class="gdPrimaryButton" id="gdGenerateButton">{$L.generate}</button>
			{$L.generate} <input type="text" name="gdNumRowsToGenerate" id="gdNumRowsToGenerate" value="{$defaultNumRows}" 
				{if $inDemoMode == "true" || !$isLoggedIn}readonly="readonly"{/if} /> {$L.rows}
			<span>
				<input type="radio" name="gdExportTarget" id="gdExportTarget_inPage" value="inPage" checked="checked" />
					<label for="gdExportTarget_inPage" id="gdExportTarget_inPage_label">{$L.generate_in_page}</label>
				<input type="radio" name="gdExportTarget" id="gdExportTarget_newTab" value="newTab" />
					<label for="gdExportTarget_newTab" id="gdExportTarget_newTab_label">{$L.new_window_or_tab}</label>
				<input type="radio" name="gdExportTarget" id="gdExportTarget_promptDownload" value="promptDownload" />
					<label for="gdExportTarget_promptDownload" id="gdExportTarget_promptDownload_label">{$L.prompt_to_download}</label>
				<input type="checkbox" name="gdExportTarget_promptDownload_zip" id="gdExportTarget_promptDownload_zip" value="doZip" disabled="disabled" />
					<label for="gdExportTarget_promptDownload_zip" id="gdExportTarget_promptDownload_zip_label" class="gdDisabled">{$L.zip_q}</label>
			</span>
		</div>
	</div>

	<div id="gdGenerateSubtab2" class="hidden">
		<div id="gdGenerationPanel">
			<div>
				{$L.generated_X_of_Y_results}
			</div>
			<progress id="gdProgressMeter" max="" value=""></progress>
			<a href="" id="gdGenerationPanelCancel">{$L.cancel}</a>
		</div>
		<textarea id="gdGeneratedData" style="height: 600px"></textarea>
		<ul id="gdTextSize">
			<li class="small">A</li>
			<li class="medium gdSelected">A</li>
			<li class="large">A</li>
		</ul>
		<button class="gdPrimaryButton" id="gdBackButton" title="{$L.back}">&laquo;</button>
		<button class="gdPrimaryButton" id="gdRegenerateButton">{$L.regenerate}</button>
		<div class="gdClear"></div>
	</div>
</form>

<div class="hidden">
	<div id="gdTableRowTemplate">
		<ul>
			<li class="gdColOrder">%ROW%</li>
			<li class="gdColTitle"><input type="text" name="gdTitle_%ROW%" id="gdTitle_%ROW%" /></li>
			<li class="gdColDataType">{data_types_dropdown}</li>
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
	{data_type_examples}
	{data_type_options}
</div>


{include file="dialogs.tpl"}
