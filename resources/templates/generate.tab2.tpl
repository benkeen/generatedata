	<h3>{$L.user_accounts}</h3>

	<p>
		{$L.user_account_section_intro}
	</p>

	<div id="gdAccountList" class="hidden">
		<div id="gdAccountListEmpty">
			<div class="gdMessage gdNotify" style="display:block">
				<p>{$L.no_user_accounts_defined}</p>
			</div>
		</div>
		<div id="gdAccountListNonEmpty">
			<table cellpadding="0" cellspacing="0" class="highlightTableRows">
			<thead>
				<tr>
					<td>{$L.first_name}</td>
					<td>{$L.last_name}</td>
					<td>{$L.email}</td>
					<td align="center">{$L.num_records_generated}</td>
					<td>{$L.last_logged_in}</td>
					<td>{$L.date_created}</td>
					<td align="center" width="70">{$L.edit|upper}</td>
					<td align="center" width="70">{$L.delete|upper}</td>
				</tr>
			</thead>
			<tbody></tbody>
			</table>
		</div>
	</div>

	<button class="gdPrimaryButton" id="gdCreateAccount">{$L.create_account_rightarrow}</button>

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