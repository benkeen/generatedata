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


<div id="gdManageAccountDialog" class="hidden">
	<table>
	<tr>
		<td width="160">{$L.first_name}</td>
		<td><input type="text" id="gdManageAccount_firstName" /></td>
	</tr>
	<tr>
		<td>{$L.last_name}</td>
		<td><input type="text" id="gdManageAccount_lastName" /></td>
	</tr>
	<tr>
		<td>{$L.email}</td>
		<td><input type="text" id="gdManageAccount_email" /></td>
	</tr>
	<tr>
		<td>{$L.password}</td>
		<td>
			<div id="gdManageAccount_pwdCreate">
				<input type="text" id="gdManageAccount_password" value="" />
				<span id="gdRefreshPassword"></span>
			</div>
			<div id="gdManageAccount_pwdEdit">********</div>
		</td>
	</tr>
	</table>

	<p id="gdManageAccountDialogEmailRow">
		<input type="checkbox" id="gdAutoEmailAccountDetails" checked="checked" />
			<label for="gdAutoEmailAccountDetails">{$L.email_user_login_info}</label>
	</p>
</div>


<div id="gdDeleteAccountDialog" class="hidden">
	<div class="gdIconWarning"></div>
	<div>
		<p>
			{$L.confirm_delete_user_account}
		</p>
		<table>
		<tr>
			<th width="120">{$L.first_name}</th>
			<td id="gdDeleteAccount_firstName"></td>
		</tr>
		<tr>
			<th>{$L.last_name}</th>
			<td id="gdDeleteAccount_lastName"></td>
		</tr>
		<tr>
			<th>{$L.email}</th>
			<td id="gdDeleteAccount_email"></td>
		</tr>
		</table>
	</div>
</div>
