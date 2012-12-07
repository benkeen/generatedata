<ul id="gdActionIcons">
	<li id="gdLoadLink" class="loading"><img src="resources/themes/{$theme}/images/load.png" title="Your Data Sets" /></li>
	<li id="gdEmptyForm"><img src="resources/themes/{$theme}/images/trash.png" title="Clear the page" /></li>
	<li id="gdDataSetLink" class="loading"><img src="resources/themes/{$theme}/images/link.png" title="Link to this Data Set" /></li>
	<li id="gdHelpLink"><img src="resources/themes/{$theme}/images/help.png" title="Argh, help!" /></li>
</ul>

<form id="gdData" method="post">
	{* here because the new window/tab export format option uses a simple POST. This standardizes it all
	   so that for all export formats we can just serialize the form *}
	<input type="hidden" name="gdRowOrder" id="gdRowOrder" />
	<input type="hidden" name="gdExportType" id="gdExportType" />
	<input type="hidden" name="gdNumCols" id="gdNumCols" />
	<input type="hidden" name="gdExportFormat" id="gdExportFormat" />

	<div id="gdGenerateSubtab1">
		<input type="text" id="gdDataSetName" placeholder="Your data set name here..." /><button id="gdSaveBtn">SAVE</button>

		<div class="gdClear" style="padding-bottom: 20px"></div>		

		<h2>
			COUNTRY-SPECIFIC DATA
			<span data-help-section="countryData" class="gdSectionHelp"></span>
		</h2>

		{country_list}

		<div id="gdMessages" class="gdMessage">
			<a class="gdMessageClose" title="{$L.hide_error}" href="#">X</a>
			<div></div>
		</div>

		<div class="gdClear" style="padding-bottom: 20px"></div>

		<h2>
			DATA SET
			<span data-help-section="dataTypes" class="gdSectionHelp"></span>
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

		<div style="background-color: #f2f2f2; border-radius: 3px; padding: 4px 4px 4px 8px; display:inline-block">
			{$L.add} <input type="text" name="gdNumRowsToAdd" id="gdNumRowsToAdd" value="1" size="2" />
			<input type="button" value="{$L.row_sp}" class="gdAddRowsBtn" />
		</div>
		<div class="gdClear" style="padding-bottom: 30px"></div>

		<h2>
			EXPORT TYPES
			<span data-help-section="exportTypes" class="gdSectionHelp"></span>
		</h2>

		<div id="gdExportTypeTabs" class="gdSmallTabs">
			<span id="gdShowSettingsLink">
				<span>+</span>
				<a href="#">hide data format options</a>
			</span>
			{export_type_tabs}
			{foreach from=$exportTypeAdditionalSettings key=k item=i}
				<div id="gdExportTypeAdditionalSettings_{$k|replace:' ':''}" class="gdExportTypeTabSettings"
					{if $defaultExportType == $k}style="display:block"{/if}>{$i}</div>
			{/foreach}
		</div>

		<div class="gdClear"></div>

		<div id="gdGenerateSection">
			<button style="float: right" class="gdPrimaryButton" id="gdGenerateButton">{$L.generate}</button>
			Generate <input type="text" name="gdNumRowsToGenerate" id="gdNumRowsToGenerate" value="1000" /> rows
			<span>
				<input type="radio" name="gdExportTarget" id="gdExportTarget1" value="inPage" checked="checked" />
					<label for="gdExportTarget1">Generate in-page</label>
				<input type="radio" name="gdExportTarget" id="gdExportTarget2" value="newTab" />
					<label for="gdExportTarget2">New window/tab</label>
				<input type="radio" name="gdExportTarget" id="gdExportTarget3" value="promptDownload" />
					<label for="gdExportTarget3">Prompt to download</label>
			</span>
		</div>
	</div>

	<div id="gdGenerateSubtab2" class="hidden">
		<div id="gdGenerationPanel">
			<div>
				Generated <span id="gdGenerateCount"></span> of <span id="gdGenerateTotal"></span> results
			</div>
			<progress id="gdProgressMeter" max="" value=""></progress>
			<a href="">cancel</a>
		</div>
		<textarea id="gdGeneratedData" style="height: 600px"></textarea>
		<ul id="gdTextSize">
			<li class="small">A</li>
			<li class="medium selected">A</li>
			<li class="large">A</li>
		</ul>
		<button class="gdPrimaryButton" id="gdBackButton" title="Back">&laquo;</button>
		<button class="gdPrimaryButton" id="gdRegenerateButton">Regenerate</button>
		<div class="gdClear"></div>
	</div>

</form>

<div id="gdEmptyFormDialog"></div>
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
	{data_type_resources}
</div>

<div id="gdMainDialog" class="hidden">
	<div id="gdMainDialogTabs" class="gdSmallTabs">
		<ul>
			<li id="gdMainDialogTab1" class="gdSelected">Your Account</li>
			<li id="gdMainDialogTab2">Your Data Sets</li>
			<li id="gdMainDialogTab3">General Help</li>
			<li id="gdMainDialogTab4">Data Types</li>
		</ul>
	</div>

	<div id="gdMainDialogContent">
		<div id="gdMainDialogTab1Content">
			Account type: admin/user/anonymous<br />
			Num Data Sets saved: <br />
			Total rows generated: <br />
			Date created: <br />
		</div>
		<div id="gdMainDialogTab2Content" class="hidden">
			<table width="100%" cellpadding="0" cellspacing="1" id="gdAccountDataSets" class="gdTableHeadings">
				<thead>
					<tr>
						<th>Data Set Name</th>
						<th>Data Created</th>
						<th>Last Used</th>
						<th>Rows Generated</th>
						<th width="60">Load</th>
						<th width="50">Delete</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
		<div id="gdMainDialogTab3Content" class="hidden">
			<p>
				The Data Generator provides a simple interface to let you quickly generate large volumes of custom data 
				in a variety of formats for use in testing software, populating databases, etc. The page is arranged in
				four sections:
			</p>

			<div class="gdHelpSection">
				<h3>Data Set Name / Action icons</h3>
				<p>
					The top row lets you enter a name for the data set you're generating. This may be used in the generated
					content (e.g. the &lt;title&gt; in the HTML Export Type) but mostly it's just used so you can easily 
					find it later on, should you wish to save it.
				</p>
				<p>
					The icons provide the primary functionality: viewing your existing data sets, clearing the form, 
					generating a link to the data set and opening the help documentation.
				</p>
			</div>

			<div class="gdHelpSection" id="gdHelpSection_CountryData">
				<h3>Country-specific data</h3>
				<p>
					This section lets you control what country data should be included in your generated data sets. The 
					values you select here affect certain Data Types that you may select such as <i>Region</i>, <i>Postal/Zip</i> 
					and <i>City</i>.
				</p>
			</div>

			<div class="gdHelpSection" id="gdHelpSection_DataSets">
				<h3>Data Sets</h3>
				<p>
					This is where you define exactly what kind of data you want to generate. Try filling in a row or two and click
					the Generate button. You'll get the hang of it pretty fast. 
				</p>
			</div>

			<div class="gdHelpSection" id="gdHelpSection_ExportTypes">
				<h3>Export Types</h3>
				<p>
					This section controls the generated format of the data. Each format may provide different options to let you 
					customize the output.
				</p>
			</div>
		</div>
		<div id="gdMainDialogTab4Content" class="hidden">
		</div>
	</div>
</div>
