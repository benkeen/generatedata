<?php /* Smarty version Smarty-3.1.8, created on 2013-11-05 00:06:17
         compiled from "/Users/rsicher1/Documents/Websites/generatedata/resources/templates/dialogs.tpl" */ ?>
<?php /*%%SmartyHeaderCode:68199353052782869075300-66380468%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '2156382e4b4ffb6bd528175a5cfe251f1b86bcba' => 
    array (
      0 => '/Users/rsicher1/Documents/Websites/generatedata/resources/templates/dialogs.tpl',
      1 => 1383605683,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '68199353052782869075300-66380468',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'L' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.8',
  'unifunc' => 'content_527828691627f5_65470880',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_527828691627f5_65470880')) {function content_527828691627f5_65470880($_smarty_tpl) {?><?php if (!is_callable('smarty_function_data_types_list')) include '/Users/rsicher1/Documents/Websites/generatedata/resources/libs/smarty/plugins/function.data_types_list.php';
if (!is_callable('smarty_function_data_type_help')) include '/Users/rsicher1/Documents/Websites/generatedata/resources/libs/smarty/plugins/function.data_type_help.php';
?><div id="gdEmptyFormDialog"></div>

<div id="gdMainDialog" class="hidden">
	<div id="gdMainDialogTabs" class="gdModalTabs gdThreeCols">
		<ul>
			<li id="gdMainDialogTab1" class="gdSelected"><?php echo $_smarty_tpl->tpl_vars['L']->value['your_account'];?>
</li>
			<li id="gdMainDialogTab2"><?php echo $_smarty_tpl->tpl_vars['L']->value['your_data_sets'];?>
</li>
			<li id="gdMainDialogTab3"><?php echo $_smarty_tpl->tpl_vars['L']->value['data_types'];?>
</li>
		</ul>
	</div>

	<div id="gdMainDialogContent">
		<div id="gdMainDialogTab1Content">
			<div style="display:none" class="gdMessage gdNotify gdMarginTop" id="gdMainDialogTab1Message">
				<a class="gdMessageClose" href="#">X</a>
				<p><?php echo $_smarty_tpl->tpl_vars['L']->value['account_updated'];?>
</p>
			</div>

			<div style="float:left; width: 400px">
				<h2><?php echo $_smarty_tpl->tpl_vars['L']->value['account_info'];?>
</h2>
				<form>
					<table cellpadding="0" cellspacing="1">
					<tr>
						<td width="160"><label for="gdUserAccount_firstName"><?php echo $_smarty_tpl->tpl_vars['L']->value['first_name'];?>
</label></td>
						<td><input type="text" id="gdUserAccount_firstName" class="medium" /></td>
					</tr>
					<tr>
						<td><label for="gdUserAccount_lastName"><?php echo $_smarty_tpl->tpl_vars['L']->value['last_name'];?>
</label></td>
						<td><input type="text" id="gdUserAccount_lastName" class="medium" /></td>
					</tr>
					<tr>
						<td><label for="gdUserAccount_email"><?php echo $_smarty_tpl->tpl_vars['L']->value['email'];?>
</label></td>
						<td><input type="text" id="gdUserAccount_email" class="medium" /></td>
					</tr>
					<tr>
						<td colspan="2" class="mediumGrey">
							<br />
							<i><?php echo $_smarty_tpl->tpl_vars['L']->value['password_change_note'];?>
</i>
						</td>
					</tr>
					<tr>
						<td><label for="gdUserAccount_password"><?php echo $_smarty_tpl->tpl_vars['L']->value['password'];?>
</label></td>
						<td>
							<input type="password" id="gdUserAccount_password" value="" />
						</td>
					</tr>
					<tr>
						<td><label for="gdUserAccount_password2"><?php echo $_smarty_tpl->tpl_vars['L']->value['reenter_password'];?>
</label></td>
						<td>
							<input type="password" id="gdUserAccount_password2" value="" />
						</td>
					</tr>
					</table>
					<p>
						<button class="gdPrimaryButton" id="gdUpdateAccountInfo"><?php echo $_smarty_tpl->tpl_vars['L']->value['update_account'];?>
</button>
					</p>
				</form>
			</div>

			<div style="float:left; width: 300px">
				<h2><?php echo $_smarty_tpl->tpl_vars['L']->value['info_and_stats'];?>
</h2>

				<table cellpadding="0" cellspacing="0">
				<tr>
					<td valign="top" width="180"><?php echo $_smarty_tpl->tpl_vars['L']->value['account_type'];?>
</td>
					<td id="gdAccount_AccountType"></td>
				</tr>
				<tr>
					<td><?php echo $_smarty_tpl->tpl_vars['L']->value['num_saved_data_sets'];?>
</td>
					<td id="gdAccount_NumSavedDataSets"></td>
				</tr>
				<tr>
					<td><?php echo $_smarty_tpl->tpl_vars['L']->value['total_rows_generated'];?>
</td>
					<td id="gdAccount_TotalRowsGenerated"></td>
				</tr>
				<tr>
					<td><?php echo $_smarty_tpl->tpl_vars['L']->value['date_account_created'];?>
</td>
					<td id="gdAccount_DateAccountCreated"></td>
				</tr>
				</table>
			</div>
		</div>

		<div id="gdMainDialogTab2Content" class="hidden">
			<p id="gdNoAccountDataSets" class="hidden"><?php echo $_smarty_tpl->tpl_vars['L']->value['no_saved_data_sets'];?>
</p>
			<table width="100%" cellpadding="0" cellspacing="1" id="gdAccountDataSets" class="highlightTableRows">
				<thead>
					<tr>
						<th class="leftAligned"><?php echo $_smarty_tpl->tpl_vars['L']->value['data_set_name'];?>
</th>
						<th class="leftAligned"><?php echo $_smarty_tpl->tpl_vars['L']->value['data_created'];?>
</th>
						<th class="leftAligned"><?php echo $_smarty_tpl->tpl_vars['L']->value['last_modified'];?>
</th>
						<th align="center"><?php echo $_smarty_tpl->tpl_vars['L']->value['public_q'];?>
</th>
						<th align="center"><?php echo $_smarty_tpl->tpl_vars['L']->value['rows_generated'];?>
</th>
						<th width="60" align="center"><?php echo $_smarty_tpl->tpl_vars['L']->value['load'];?>
</th>
						<th width="24" align="center" class="gdDelDataSetCell"><input type="checkbox" id="gdSelectAllDataSets" /></th>
					</tr>
				</thead>
				<tbody></tbody>
			</table> 
		</div>
		<div id="gdMainDialogTab3Content" class="hidden">
			<div id="gdDataSetHelpNav">
				<?php echo smarty_function_data_types_list(array(),$_smarty_tpl);?>

			</div>
			<div id="gdDataSetHelpContent">
				<h3 id="gdFocusedDataTypeHeader"></h3>
				<?php echo smarty_function_data_type_help(array(),$_smarty_tpl);?>

			</div>
		</div>
	</div>
</div>

<div id="gdLinkToDataSetDialog" class="hidden">
	<div id="gdLinkToDataSet_incomplete">
		<p>
			<?php echo $_smarty_tpl->tpl_vars['L']->value['save_data_set_to_link'];?>

		</p>
	</div>
	<div id="gdLinkToDataSet_complete">
		<p>
			<input type="checkbox" id="gdDataSetPublic" /> 
			<label for="gdDataSetPublic"><?php echo $_smarty_tpl->tpl_vars['L']->value['make_data_set_public_agreement'];?>
</label>
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
		<td width="160"><?php echo $_smarty_tpl->tpl_vars['L']->value['first_name'];?>
</td>
		<td><input type="text" id="gdManageAccount_firstName" class="medium" /></td>
	</tr>
	<tr>
		<td><?php echo $_smarty_tpl->tpl_vars['L']->value['last_name'];?>
</td>
		<td><input type="text" id="gdManageAccount_lastName" class="medium" /></td>
	</tr>
	<tr>
		<td><?php echo $_smarty_tpl->tpl_vars['L']->value['email'];?>
</td>
		<td><input type="text" id="gdManageAccount_email" class="medium" /></td>
	</tr>
	<tr>
		<td><?php echo $_smarty_tpl->tpl_vars['L']->value['password'];?>
</td>
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
			<label for="gdAutoEmailAccountDetails"><?php echo $_smarty_tpl->tpl_vars['L']->value['email_user_login_info'];?>
</label>
	</p>
</div>

<div id="gdDeleteAccountDialog" class="hidden">
	<div class="gdIconWarning"></div>
	<div>
		<p>
			<?php echo $_smarty_tpl->tpl_vars['L']->value['confirm_delete_user_account'];?>

		</p>
		<table>
		<tr>
			<th width="120"><?php echo $_smarty_tpl->tpl_vars['L']->value['first_name'];?>
</th>
			<td id="gdDeleteAccount_firstName"></td>
		</tr>
		<tr>
			<th><?php echo $_smarty_tpl->tpl_vars['L']->value['last_name'];?>
</th>
			<td id="gdDeleteAccount_lastName"></td>
		</tr>
		<tr>
			<th><?php echo $_smarty_tpl->tpl_vars['L']->value['email'];?>
</th>
			<td id="gdDeleteAccount_email"></td>
		</tr>
		</table>
	</div>
</div>

<div id="gdLoginDialog" class="hidden">
	<div id="gdLoginDialogTabs" class="gdModalTabs gdTwoCols">
		<ul>
			<li id="gdLoginDialogTab1" class="gdSelected"><?php echo $_smarty_tpl->tpl_vars['L']->value['login'];?>
</li>
			<li id="gdLoginDialogTab2"><?php echo $_smarty_tpl->tpl_vars['L']->value['forgotten_your_password_q'];?>
</li>
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
							<th width="120"><?php echo $_smarty_tpl->tpl_vars['L']->value['email'];?>
</th>
							<td><input type="text" name="gdLogin_email" id="gdLogin_email" /></td>
						</tr>
						<tr>
							<th><?php echo $_smarty_tpl->tpl_vars['L']->value['password'];?>
</th>
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
					<?php echo $_smarty_tpl->tpl_vars['L']->value['enter_email_address_to_reset_password'];?>

				</div>
				<form>
					<table>
						<tr>
							<th width="120"><?php echo $_smarty_tpl->tpl_vars['L']->value['email'];?>
</th>
							<td><input type="text" name="gdEmailReminder" id="gdEmailReminder" style="width: 200px" /></td>
						</tr>
					</table>
				</form>
			</div>
		</div>
	</div>
</div>
<?php }} ?>