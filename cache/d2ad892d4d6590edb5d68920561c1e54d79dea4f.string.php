<?php /* Smarty version Smarty-3.1.8, created on 2013-11-05 00:01:15
         compiled from "d2ad892d4d6590edb5d68920561c1e54d79dea4f" */ ?>
<?php /*%%SmartyHeaderCode:20109337365278273b1f20a1-76652650%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'd2ad892d4d6590edb5d68920561c1e54d79dea4f' => 
    array (
      0 => 'd2ad892d4d6590edb5d68920561c1e54d79dea4f',
      1 => 0,
      2 => 'string',
    ),
  ),
  'nocache_hash' => '20109337365278273b1f20a1-76652650',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'db_connection_error' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.8',
  'unifunc' => 'content_5278273b211733_39141768',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5278273b211733_39141768')) {function content_5278273b211733_39141768($_smarty_tpl) {?>We were unable to connect to the database using the information you supplied. The error message the database returned is: <i><?php echo $_smarty_tpl->tpl_vars['db_connection_error']->value;?>
</i><?php }} ?>