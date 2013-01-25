<div id="gdEmptyFormDialog"></div>

<div id="gdMainDialog" class="hidden">
	<div id="gdMainDialogTabs">
		<ul>
			<li id="gdMainDialogTab1" class="gdSelected">{$L.your_account}</li>
			<li id="gdMainDialogTab2">{$L.your_data_sets}</li>
			<li id="gdMainDialogTab3">{$L.data_types}</li>
		</ul>
	</div>

	<div id="gdMainDialogContent">
		<div id="gdMainDialogTab1Content">
			<table>
			<tr>
				<td width="200"><b>{$L.account_type}</b></td>
				<td id="gdAccount_AccountType"></td>
			</tr>
			<tr>
				<td><b>{$L.num_saved_data_sets}</b></td>
				<td id="gdAccount_NumSavedDataSets"></td>
			</tr>
			<tr>
				<td><b>{$L.total_rows_generated}</b></td>
				<td id="gdAccount_TotalRowsGenerated"></td>
			</tr>
			<tr>
				<td><b>{$L.date_account_created}</b></td>
				<td id="gdAccount_DateAccountCreated"></td>
			</tr>
			</table>
		</div>

		<div id="gdMainDialogTab2Content" class="hidden">
			<p id="gdNoAccountDataSets" class="hidden">{$L.no_saved_data_sets}</p>
			<table width="100%" cellpadding="0" cellspacing="1" id="gdAccountDataSets" class="highlightTableRows">
				<thead>
					<tr>
						<th class="leftAligned">{$L.data_set_name}</th>
						<th class="leftAligned">{$L.data_created}</th>
						<th class="leftAligned">{$L.last_modified}</th>
						<th align="center">{$L.public_q}</th>
						<th align="center">{$L.rows_generated}</th>
						<th width="60" align="center">{$L.load}</th>
						<th width="24" align="center" class="gdDelDataSetCell"><input type="checkbox" id="gdSelectAllDataSets" /></th>
					</tr>
				</thead>
				<tbody></tbody>
			</table> 
		</div>
		<div id="gdMainDialogTab3Content" class="hidden">
			<div id="gdDataSetHelpNav">
				{data_types_list}
			</div>
			<div id="gdDataSetHelpContent">
				<h3 id="gdFocusedDataTypeHeader"></h3>
				{data_type_help}
			</div>
		</div>
	</div>
</div>

<div id="gdLinkToDataSetDialog" class="hidden">
	<div id="gdLinkToDataSet_incomplete">
		<p>
			{$L.save_data_set_to_link}
		</p>
	</div>
	<div id="gdLinkToDataSet_complete">
		<p>
			<input type="checkbox" id="gdDataSetPublic" /> 
			<label for="gdDataSetPublic">{$L.make_data_set_public_agreement}</label>
		</p>
		<input type="input" id="gdLinkURL" readonly="true" />
	</div>
</div>