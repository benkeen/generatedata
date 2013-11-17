<?php /* Smarty version Smarty-3.1.8, created on 2013-11-04 23:59:47
         compiled from "/Users/rsicher1/Documents/Websites/generatedata/resources/templates/install.tab2.tpl" */ ?>
<?php /*%%SmartyHeaderCode:189131977527826e30de7b0-33139852%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'fea625b25318e7f8f4c43f1dcddb712545c417f5' => 
    array (
      0 => '/Users/rsicher1/Documents/Websites/generatedata/resources/templates/install.tab2.tpl',
      1 => 1383605683,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '189131977527826e30de7b0-33139852',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'L' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.8',
  'unifunc' => 'content_527826e3106012_25361945',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_527826e3106012_25361945')) {function content_527826e3106012_25361945($_smarty_tpl) {?><h1><?php echo $_smarty_tpl->tpl_vars['L']->value['help'];?>
</h1>
<p>
	<?php echo $_smarty_tpl->tpl_vars['L']->value['help_intro'];?>

</p>

<h2><?php echo $_smarty_tpl->tpl_vars['L']->value['help_prerequisites'];?>
</h2>
<p>
	<?php echo $_smarty_tpl->tpl_vars['L']->value['help_prereq_info'];?>

</p>

<h2><?php echo $_smarty_tpl->tpl_vars['L']->value['still_stuck'];?>
</h2>
<p>
	<?php echo $_smarty_tpl->tpl_vars['L']->value['install_user_doc_link'];?>

</p><?php }} ?>