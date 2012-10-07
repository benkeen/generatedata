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

					<div id="gdMessages" class="gdMessage">
						<a class="gdMessageClose" title="{$L.hide_error}" href="#">X</a>
						<div></div>
					</div>

					<div class="gdVerticalPad"></div>

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

					<div class="gdClear"></div>
					<button class="gdSecondaryButton" id="gdEmptyForm">{$L.empty_form}</button>
					<div class="gdVerticalPad"></div>

					{$L.add} <input type="text" name="gdNumRows" id="gdNumRows" value="1" size="2" />
					<input type="button" value="{$L.row_sp}" class="gdAddRowsBtn" />

					{* hidden iframe, to which the form is submitted *}
					<iframe name="hiddenIframe" src="" frameborder="0" scrolling="no" style="height: 0px; width: 0px;"></iframe>

					<div class="gdVerticalPad"></div>
					<div>
						<button class="gdPrimaryButton gdGenerateButton">{$L.generate}</button>
						<input type="text" style="width:45px" name="gdNumResults" id="gdNumResults" value="100" /> rows
					</div>

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

				</form>
				<div id="gdHelpPopup"></div>