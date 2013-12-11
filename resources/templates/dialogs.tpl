<div id="gdEmptyFormDialog"></div>

<div id="gdMainDialog" class="hidden">
	<div id="gdMainDialogTabs" class="gdModalTabs gdThreeCols">
		<ul>
			<li id="gdMainDialogTab1" class="gdSelected">{$L.your_account}</li>
			<li id="gdMainDialogTab2">{$L.your_data_sets}</li>
			<li id="gdMainDialogTab3">{$L.data_types}</li>
		</ul>
	</div>

	<div id="gdMainDialogContent">
		<div id="gdMainDialogTab1Content">
			<div style="display:none" class="gdMessage gdNotify gdMarginTop" id="gdMainDialogTab1Message">
				<a class="gdMessageClose" href="#">X</a>
				<p>{$L.account_updated}</p>
			</div>

			<div style="float:left; width: 400px">
				<h2>{$L.account_info}</h2>
				<form>
					<table cellpadding="0" cellspacing="1">
					<tr>
						<td width="160"><label for="gdUserAccount_firstName">{$L.first_name}</label></td>
						<td><input type="text" id="gdUserAccount_firstName" class="medium" /></td>
					</tr>
					<tr>
						<td><label for="gdUserAccount_lastName">{$L.last_name}</label></td>
						<td><input type="text" id="gdUserAccount_lastName" class="medium" /></td>
					</tr>
					<tr>
						<td><label for="gdUserAccount_email">{$L.email}</label></td>
						<td><input type="text" id="gdUserAccount_email" class="medium" /></td>
					</tr>
					<tr>
						<td colspan="2" class="mediumGrey">
							<br />
							<i>{$L.password_change_note}</i>
						</td>
					</tr>
					<tr>
						<td><label for="gdUserAccount_password">{$L.password}</label></td>
						<td>
							<input type="password" id="gdUserAccount_password" value="" />
						</td>
					</tr>
					<tr>
						<td><label for="gdUserAccount_password2">{$L.reenter_password}</label></td>
						<td>
							<input type="password" id="gdUserAccount_password2" value="" />
						</td>
					</tr>
					</table>
					<p>
						<button class="gdPrimaryButton" id="gdUpdateAccountInfo">{$L.update_account}</button>
					</p>
				</form>
			</div>

			<div style="float:left; width: 300px">
				<h2>{$L.info_and_stats}</h2>

				<table cellpadding="0" cellspacing="0">
				<tr>
					<td valign="top" width="180">{$L.account_type}</td>
					<td id="gdAccount_AccountType"></td>
				</tr>
				<tr>
					<td>{$L.num_saved_data_sets}</td>
					<td id="gdAccount_NumSavedDataSets"></td>
				</tr>
				<tr>
					<td>{$L.total_rows_generated}</td>
					<td id="gdAccount_TotalRowsGenerated"></td>
				</tr>
				<tr>
					<td>{$L.date_account_created}</td>
					<td id="gdAccount_DateAccountCreated"></td>
				</tr>
				</table>
			</div>
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
						<th width="24" align="center" class="gdDataSetCheckRowCell"><input type="checkbox" id="gdSelectAllDataSets" /></th>
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
	<div style="display:none" class="gdMessage gdNotify gdMarginTop gdMarginBottom" id="gdManageAccountDialogMessage">
		<a class="gdMessageClose" href="#">X</a>
		<div></div>
	</div>

	<table>
	<tr>
		<td width="160">{$L.first_name}</td>
		<td><input type="text" id="gdManageAccount_firstName" class="medium" /></td>
	</tr>
	<tr>
		<td>{$L.last_name}</td>
		<td><input type="text" id="gdManageAccount_lastName" class="medium" /></td>
	</tr>
	<tr>
		<td>{$L.email}</td>
		<td><input type="text" id="gdManageAccount_email" class="medium" /></td>
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

<div id="gdLoginDialog" class="hidden">
	<div id="gdLoginDialogTabs" class="gdModalTabs gdTwoCols">
		<ul>
			<li id="gdLoginDialogTab1" class="gdSelected">{$L.login}</li>
			<li id="gdLoginDialogTab2">{$L.forgotten_your_password_q}</li>
		</ul>
	</div>
	<div id="gdLoginDialogContent">
		<div id="gdLoginDialogTab1Content">
			<div class="gdMessage gdErrors" id="gdLoginError">
				<a class="gdMessageClose" href="#">X</a>
				<div></div>
			</div>
			<div style="padding: 6px 10px;">
				<form>
					<table>
						<tr>
							<th width="120">{$L.email}</th>
							<td><input type="text" name="gdLogin_email" id="gdLogin_email" /></td>
						</tr>
						<tr>
							<th>{$L.password}</th>
							<td><input type="password" name="gdLogin_password" id="gdLogin_password" /></td>
						</tr>
					</table>
				</form>
			</div>
		</div>
		<div id="gdLoginDialogTab2Content" class="hidden">
			<div class="gdMessage gdErrors" id="gdResetPasswordMessage">
				<a class="gdMessageClose" href="#">X</a>
				<div></div>
			</div>
			<div style="padding: 6px 10px;">
				<div style="padding-bottom: 2px">
					{$L.enter_email_address_to_reset_password}
				</div>
				<form>
					<table>
						<tr>
							<th width="120">{$L.email}</th>
							<td><input type="text" name="gdEmailReminder" id="gdEmailReminder" style="width: 200px" /></td>
						</tr>
					</table>
				</form>
			</div>
		</div>
	</div>
</div>
