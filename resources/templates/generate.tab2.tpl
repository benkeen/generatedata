	<h3>User Accounts</h3>

	<p>
		This section lets you create any number of users accounts to allow people access to the script. Only you,
		the administrator, have permissions to create or delete accounts.
	</p>

	<div id="gdAccountList"></div>


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
	</div>