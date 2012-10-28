<form id="gdData">
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

		{$L.add} <input type="text" name="gdNumRows" id="gdNumRows" value="1" size="2" />
		<input type="button" value="{$L.row_sp}" class="gdAddRowsBtn" />

		<hr class="divider" />

		<h1>{$L.data_format}</h1>
		<ul class="gdSectionHelpTip ui-widget ui-helper-clearfix" data-tip="data-format">
			<li class="ui-state-default ui-corner-all"><span class="ui-icon ui-icon-help" title="Help"></span></li>
		</ul>
		<div class="gdClear"></div>

		<div id="gdExportTypeTabs">
			<a href="#" id="gdShowSettingsLink">show additional settings</a>
			{export_type_tabs}
			{foreach from=$exportTypeAdditionalSettings key=k item=i}
				<div id="gdExportTypeAdditionalSettings_{$k}" class="gdExportTypeTabSettings">{$i}</div>
			{/foreach}
		</div>

		<div class="gdClear gdVerticalPad"></div>
 		<button class="gdPrimaryButton gdGenerateButton">{$L.generate}</button>
		<input type="text" style="width:45px" name="gdNumResults" id="gdNumResults" value="100" /> rows
	</div>


	<div id="gdGenerateSubtab2" style="display:none">
		<div class="gdVerticalPad"></div>

		<div id="gdResponsePanel" class="hidden">
			<div>Generated <b>0</b> of <b>100</b> results</div>
			<textarea id="gdGeneratedContent"></textarea>
			<div>
				<input type="checkbox" id="gdEnableSyntaxHighlighting" checked="checked" />
				<label>Enable syntax highlighting</label>

				<ul id="gdTextSize">
					<li class="small">A</li>
					<li class="medium">A</li>
					<li class="large">A</li>
				</ul>
			</div>
		</div>
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

{include file="export.dialog.tpl"}