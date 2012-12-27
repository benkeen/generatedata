<div id="gdMainDialog" class="hidden">
	<div id="gdMainDialogTabs">
		<ul>
			<li id="gdMainDialogTab1" class="gdSelected">Your Account</li>
			<li id="gdMainDialogTab2">Your Data Sets</li>
			<li id="gdMainDialogTab3">Data Types</li>
		</ul>
	</div>

	<div id="gdMainDialogContent">
		<div id="gdMainDialogTab1Content">
			<table>
			<tr>
				<td width="200"><b>Account type</b></td>
				<td id="gdAccount_AccountType"></td>
			</tr>
			<tr>
				<td><b>Num Saved Data Sets</b></td>
				<td id="gdAccount_NumSavedDataSets"></td>
			</tr>
			<tr>
				<td><b>Total rows generated</b></td>
				<td id="gdAccount_TotalRowsGenerated"></td>
			</tr>
			<tr>
				<td><b>Date account created</b></td>
				<td id="gdAccount_DateAccountCreated"></td>
			</tr>
			</table>
		</div>

		<div id="gdMainDialogTab2Content" class="hidden">
			<p id="gdNoAccountDataSets" class="hidden">You don't have any saved data sets.</p>
			<table width="100%" cellpadding="0" cellspacing="1" id="gdAccountDataSets">
				<thead>
					<tr>
						<th class="leftAligned">Data Set Name</th>
						<th class="leftAligned">Data Created</th>
						<th class="leftAligned">Last Used</th>
						<th align="center">Rows Generated</th>
						<th width="60" align="center">Load</th>
						<th width="30" align="center"><input type="checkbox" id="gdSelectAllDataSets" /></th>
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
