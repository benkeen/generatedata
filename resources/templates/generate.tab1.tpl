<form id="gdData" method="post">
	{* here because the new window/tab export format option uses a simple POST. This standardizes it all
	   so that for all export formats we can just serialize the form *}
	<input type="hidden" name="gdRowOrder" id="gdRowOrder" />
	<input type="hidden" name="gdExportType" id="gdExportType" />
	<input type="hidden" name="gdNumCols" id="gdNumCols" />
	<input type="hidden" name="gdExportFormat" id="gdExportFormat" />

	<div id="gdGenerateSubtab1">

		<h1>{$L.country_specific_data}</h1>
		<ul class="gdSectionHelpTip ui-widget ui-helper-clearfix" data-tip="country-specific-data">
			<li class="ui-state-default ui-corner-all"><span class="ui-icon ui-icon-help" title="Help"></span></li>
		</ul>

		{country_list}

		<div id="gdMessages" class="gdMessage">
			<a class="gdMessageClose" title="{$L.hide_error}" href="#">X</a>
			<div></div>
		</div>
		<hr class="divider" />

		<h1>{$L.data_set}</h1>
		<ul class="gdSectionHelpTip ui-widget ui-helper-clearfix" data-tip="data-set">
			<li class="ui-state-default ui-corner-all"><span class="ui-icon ui-icon-help" title="Help"></span></li>
		</ul>
		<div class="gdClear"></div>

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
		<!-- <button class="gdSecondaryButton" id="gdEmptyForm">{$L.empty_form}</button> -->

		<div class="gdClear gdVerticalPad"></div>

		{$L.add} <input type="text" name="gdNumRowsToAdd" id="gdNumRowsToAdd" value="1" size="2" />
		<input type="button" value="{$L.row_sp}" class="gdAddRowsBtn" />

		<hr class="divider" />

		<h1>{$L.data_format}</h1>
		<ul class="gdSectionHelpTip ui-widget ui-helper-clearfix" data-tip="data-format">
			<li class="ui-state-default ui-corner-all"><span class="ui-icon ui-icon-help" title="Help"></span></li>
		</ul>
		<div class="gdClear"></div>

		<div id="gdExportTypeTabs">
			<span id="gdShowSettingsLink">
				<span>+</span>
				<a href="#">show data format options</a>
			</span>
			{export_type_tabs}
			{foreach from=$exportTypeAdditionalSettings key=k item=i}
				<div id="gdExportTypeAdditionalSettings_{$k}" class="gdExportTypeTabSettings">{$i}</div>
			{/foreach}
		</div>

		<div class="gdClear gdVerticalPad"></div>

		<hr class="divider" style="margin-bottom: 16px;" />

		<div id="gdGenerateSection">
			<button style="float: right" class="gdPrimaryButton" id="gdGenerateButton">{$L.generate}</button>
			Generate <input type="text" style="width:45px" name="gdNumRowsToGenerate" id="gdNumRowsToGenerate" value="1000" /> rows

			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

			<input type="radio" name="gdExportTarget" id="gdExportTarget1" value="inPage" checked="checked" />
				<label for="gdExportTarget1">Generate in-page</label>
			<input type="radio" name="gdExportTarget" id="gdExportTarget2" value="newTab" />
				<label for="gdExportTarget2">New window/tab</label>
			<input type="radio" name="gdExportTarget" id="gdExportTarget3" value="download" disabled="disabled" />
				<label for="gdExportTarget3">Prompt to download</label>
		</div>
	</div>

	<div id="gdGenerateSubtab2" class="hidden">
		<div class="gdVerticalPad"></div>

		<div style="margin-bottom: 4px;">
			Generated <span id="gdGenerateCount"></span> of <span id="gdGenerateTotal"></span> results
			<span id="gdGenerateInPageLoading"></span>
			<ul id="gdTextSize">
				<li class="small">A</li>
				<li class="medium selected">A</li>
				<li class="large">A</li>
			</ul>
			<div class="gdClear"></div>
		</div>

		<textarea id="gdGeneratedData" style="height: 600px"></textarea>

		<button class="gdPrimaryButton" id="gdBackButton" title="Back">&laquo;</button>
		<button class="gdPrimaryButton" id="gdRegenerateButton">Regenerate</button>
		<div class="gdClear"></div>
	</div>

</form>

<div id="gdHelpPopup"></div>
<div class="hidden">
	<div id="gdTableRowTemplate">
		<ul>
			<li class="gdColOrder">%ROW%</li>
			<li class="gdColTitle"><input type="text" name="gdTitle_%ROW%" id="gdTitle_%ROW%" /></li>
			<li class="gdColDataType">{data_types_dropdown}</li>
			<li class="gdColExamples" id="gdColExamples_%ROW%">&nbsp;</li>
			<li class="gdColOptions" id="gdColOptions_%ROW%">&nbsp;</li>
			<li class="gdColHelp" id="gdColHelp_%ROW%">&nbsp;</li>
			<li class="gdColDelete"><input type="checkbox" class="gdDeleteRows" name="gdDeleteRows_%ROW%" /></li>
		</ul>
	</div>
	<div id="gdHelpIcon">
		<ul class="ui-widget ui-helper-clearfix">
			<li class="ui-state-default ui-corner-all" onmouseover="$(this).addClass('ui-state-hover')"
				onmouseout="$(this).removeClass('ui-state-hover')"><span class="ui-icon ui-icon-help"></span></li>
		</ul>
	</div>
	{data_type_resources}
</div>
