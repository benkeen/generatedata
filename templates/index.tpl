<!DOCTYPE html>
<html>
<head>
	<title>{$L.title}</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="description" content="{$L.meta_description}" />
	<meta name="keywords" content="{$L.meta_keywords}" />
	<link rel="stylesheet" type="text/css" href="css/styles.css">
	<link rel="stylesheet" type="text/css" href="css/smoothness/jquery-ui-1.8.19.custom.css" />
	<script src="scripts/libs/jquery.js"></script>
	<script src="scripts/libs/require.js"></script>
	<script src="scripts/require_config.js"></script>
</head>
<body>
	<header>
		<nav>
			<a href="http://www.generatedata.com">{$L.website}</a> |
			<a href="http://www.generatedata.com/forums/">{$L.forums}</a> <span class="gdHideNoJS">|</span>
			{language_dropdown nameId="gdSelectLanguage"}
		</nav>
	</header>
	<nav id="gdTabs">
		<ul>
			<li id="gdTab1" class="gdSelected">{$L.generate}</li>
			<li id="gdTab2" class="gdHideNoJS">{$L.settings}</li>
			<li id="gdTab3" class="gdHideNoJS">{$L.help}</li>
		</ul>
	</nav>
	<section>
		<div class="gdNoJS">Please enable javascript in your browser.</div>
		<div id="gdContent" class="gdHideNoJS">
			<div id="gdLoadingIcon"></div>

			<div id="gdTab1Content" class="gdTabContent ">

				{*{if $g_show_save_panel}
				<div id="controlPanelWindow" class="box">
					<div id="controlPanel">
						<div>
							<input type="text" name="saveFormName" id="saveFormName" placeholder="{$L.default_save_form_empty_str}" value=""
								maxlength="35" />
							<button type="button" class="button buttonType2" onclick="io.saveForm()">{$L.save_uc}</button>
						</div>
						<div>
							<select name="formList" id="formList">
								<option value=""><?php echo $L["please_select"]?></option>
								<?php
								for ($i=0; $i<count($forms); $i++)
								{
									$form_id   = $forms[$i][0];
									$form_name = $forms[$i][1];
									echo "<option value=\"$form_id\">$form_name</option>\n";
								}
								?>
							</select>
							<button type="button" class="button buttonType2" onclick="io.loadForm()">{$L.load_uc}</button>
							<button type="button" class="button buttonType3" onclick="io.deleteForm()">{$L.del_uc}</button>
						</div>
					</div>
				</div>
				{/if}*}

				<form action="process.php" method="post" name="gdData" id="gdData" target="hiddenIframe">
					<input type="hidden" name="gdNumCols" id="gdNumCols" value="" />
					<input type="hidden" name="gdRowOrder" id="gdRowOrder" value="" />
					<input type="hidden" name="gdDeletedRows" id="gdDeletedRows" value="" />

					<div class="gdSetting">
						<label>{$L.result_type}</label>
						<div>
							{export_types}
						</div>
						<div class="gdClear"></div>
					</div>
					<div class="gdSetting">
						<label>{$L.countries}</label>
						<div id="gdCountryList">
							{country_list}
						</div>
						<div class="gdClear"> </div>
					</div>
					<div class="gdClear"></div>

					{foreach from=$exportTypeAdditionalSettings key=k item=i}
						<div id="gdExportTypeAdditionalSettings_{$k}" class="gdExportTypeAdditionalSettings">{$i}</div>
					{/foreach}

					<div id="gdMessages">
						<a class="gdClose" title="{$L.hide_error}" onclick="return g.hideErrors(false)" href="#">X</a>
						<div></div>
					</div>

					<div class="gdVerticalPad"></div>

					<ul class="gdTableHeadings">
						<li class="gdColOrder">{$L.order}</li>
						<li class="gdColTitle" id="gdColTitleTop">{$L.column_title}</li>
						<li class="gdColDataType">{$L.data_type}</li>
						<li class="gdColExamples">{$L.examples}</li>
						<li class="gdColOptions">{$L.options}</li>
						<li class="gdColHelp">{$L.help}</li>
						<li class="gdColDelete"><input type="button" class="gdDeleteRowsBtn" value="{$L.del}" /></li>
					</ul>
					<ul id="gdTableRows"></ul>
					<ul class="gdTableHeadings">
						<li class="gdColOrder">{$L.order}</li>
						<li class="gdColTitle" id="gdColTitleBottom">{$L.column_title}</li>
						<li class="gdColDataType">{$L.data_type}</li>
						<li class="gdColExamples">{$L.examples}</li>
						<li class="gdColOptions">{$L.options}</li>
						<li class="gdColHelp">{$L.help}</li>
						<li class="gdColDelete"><input type="button" class="gdDeleteRowsBtn" value="{$L.del}" /></li>
					</ul>

					<div class="gdClear"></div>
					<div class="gdVerticalPad"></div>

					<div style="float: right"><input type="button" id="gdEmptyForm" value="{$L.empty_form}" /></div>
					{$L.add} <input type="text" name="gdNumRows" id="gdNumRows" value="1" size="2" />
					<input type="button" value="{$L.row_sp}" class="gdAddRowsBtn" />


					{* hidden iframe, to which the form is submitted *}
					<iframe name="hiddenIframe" src="" frameborder="0" scrolling="no" style="height: 0px; width: 0px;"></iframe>

					<div class="gdVerticalPad"></div>
					<div>
						<button class="gdGreenButton gdGenerateButton">{$L.generate}</button>
						<input type="text" style="width:45px;" name="gdNumResults" id="gdNumResults" value="100" /> rows
					</div>

					<div class="hidden">
						<div id="HTML_Row">
							<ul>
								<li class="gdColOrder">$ROW$</li>
								<li class="gdColTitle"><input type="text" name="title_$ROW$" id="title_$ROW$" /></li>
								<li class="gdColDataType">{data_types_dropdown}</li>
								<li class="gdColExamples" id="gdColExamples_$ROW$">&nbsp;</li>
								<li class="gdColOptions" id="gdColOptions_$ROW$">&nbsp;</li>
								<li class="gdColHelp" id="gdColHelp_$ROW$">&nbsp;</li>
								<li class="gdColDelete"><input type="checkbox" class="gdDeleteRows" name="gdDeleteRows_$ROW$" /></li>
							</ul>
						</div>

						<div id="HTML_question">
							<ul class="ui-widget ui-helper-clearfix">
								<li class="ui-state-default ui-corner-all" onmouseover="$(this).addClass('ui-state-hover')"
									onmouseout="$(this).removeClass('ui-state-hover')"
									onclick="gd.showHelpDialog($ROW$)"
									id="helpLink_$ROW$"><span class="ui-icon ui-icon-help" /></li>
							</ul>
						</div>

						{data_type_resources}

					</div>
				</form>
				<div id="gdHelpPopup"></div>
			</div>

			<div class="gdTabContent" id="gdTab2Content">
			</div>

			<div class="gdTabContent" id="gdTab3Content">
			</div>
		</div>
	</section>

	<footer>
		{$L.version} {$version} - <a href="https://github.com/benkeen/generatedata" target="_blank">github</a>
	</footer>

	<script>
	require([
		"mediator",
		"generator",

		// Export Type modules
		{$exportTypeJSModules},

		// Data Type modules
		{$dataTypeJSModules},

		"pageinit"
	], function(mediator) { mediator.start(); });
	</script>

</body>
</html>
