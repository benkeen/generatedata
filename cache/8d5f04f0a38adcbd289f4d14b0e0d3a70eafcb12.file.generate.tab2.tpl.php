<?php /* Smarty version Smarty-3.1.8, created on 2013-11-05 00:06:17
         compiled from "/Users/rsicher1/Documents/Websites/generatedata/resources/templates/generate.tab2.tpl" */ ?>
<?php /*%%SmartyHeaderCode:9348172575278286916cd87-36499990%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '8d5f04f0a38adcbd289f4d14b0e0d3a70eafcb12' => 
    array (
      0 => '/Users/rsicher1/Documents/Websites/generatedata/resources/templates/generate.tab2.tpl',
      1 => 1383605683,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '9348172575278286916cd87-36499990',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'L' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.8',
  'unifunc' => 'content_527828691a45e9_70161511',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_527828691a45e9_70161511')) {function content_527828691a45e9_70161511($_smarty_tpl) {?><h3><?php echo $_smarty_tpl->tpl_vars['L']->value['user_accounts'];?>
 <span id="gdNumUserAccounts"></span></h3>

<p>
	<?php echo $_smarty_tpl->tpl_vars['L']->value['user_account_section_intro'];?>

</p>

<div id="gdAccountList" class="hidden">
	<div id="gdAccountListEmpty">
		<div class="gdMessage gdNotify gdStickyMessage" style="display:block">
			<p><?php echo $_smarty_tpl->tpl_vars['L']->value['no_user_accounts_defined'];?>
</p>
		</div>
	</div>
	<div id="gdAccountListNonEmpty">
		<table cellpadding="0" cellspacing="0" class="tablesorter tablesorter-default">
		<thead>
			<tr>
				<th width="40">ID</th>
				<th><?php echo $_smarty_tpl->tpl_vars['L']->value['first_name'];?>
</th>
				<th><?php echo $_smarty_tpl->tpl_vars['L']->value['last_name'];?>
</th>
				<th><?php echo $_smarty_tpl->tpl_vars['L']->value['email'];?>
</th>
				<th align="center"><?php echo $_smarty_tpl->tpl_vars['L']->value['num_records_generated'];?>
</th>
				<th><?php echo $_smarty_tpl->tpl_vars['L']->value['last_logged_in'];?>
</th>
				<th><?php echo $_smarty_tpl->tpl_vars['L']->value['date_created'];?>
</th>
				<th data-sorter="false" width="18"></th>
				<th data-sorter="false" width="18"></th>
			</tr>
		</thead>
		<tbody></tbody>
		</table>
	</div>
</div>

<button class="gdPrimaryButton" id="gdCreateAccount"><?php echo $_smarty_tpl->tpl_vars['L']->value['create_account_rightarrow'];?>
</button><?php }} ?>