<h3>{$L.user_accounts} <span id="gdNumUserAccounts"></span></h3>

<p>
	{$L.user_account_section_intro}
</p>

<div id="gdAccountList" class="hidden">
	<div id="gdAccountListEmpty">
		<div class="gdMessage gdNotify gdStickyMessage" style="display:block">
			<p>{$L.no_user_accounts_defined}</p>
		</div>
	</div>
	<div id="gdAccountListNonEmpty">
		<table cellpadding="0" cellspacing="0" class="tablesorter tablesorter-default">
		<thead>
			<tr>
				<th width="40">ID</th>
				<th>{$L.first_name}</th>
				<th>{$L.last_name}</th>
				<th>{$L.email}</th>
				<th align="center">{$L.num_records_generated}</th>
				<th>{$L.last_logged_in}</th>
				<th>{$L.date_created}</th>
				<th data-sorter="false" width="18"></th>
				<th data-sorter="false" width="18"></th>
			</tr>
		</thead>
		<tbody></tbody>
		</table>
	</div>
</div>

<button class="gdPrimaryButton" id="gdCreateAccount">{$L.create_account_rightarrow}</button>