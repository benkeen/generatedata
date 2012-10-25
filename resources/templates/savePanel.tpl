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