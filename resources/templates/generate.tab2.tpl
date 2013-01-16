	<h3>User Accounts</h3>

	<p>
		This section lets you create any number of users accounts to allow people access to the script. Only you,
		the administrator, have permissions to create or delete accounts.
	</p>

	<div id="gdAccountList" class="hidden">
		<div id="gdAccountListEmpty">
			<div class="gdMessage gdNotify" style="display:block">
				<p>No user accounts defined.</p>
			</div>
		</div>
		<div id="gdAccountListNonEmpty">
			<table cellpadding="1" cellspacing="0">
			<thead>
				<tr>
					<td>First Name</td>
					<td>Last Name</td>
					<td>Email</td>
					<td>Num Records Generated</td>
					<td>Last Logged In</td>
					<td>Date Created</td>
					<td align="center" width="80">EDIT</td>
					<td align="center" width="80">DELETE</td>
				</tr>
			</thead>
			<tbody></tbody>
			</table>
		</div>
	</div>

	<button class="gdPrimaryButton" id="gdCreateAccount">Create Account &raquo;</button>

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

		<p>
			<input type="checkbox" id="gdAutoEmailAccountDetails" checked="checked" />
				<label for="gdAutoEmailAccountDetails">Email the user their login information</label>
		</p>
	</div>