<?php /* Smarty version Smarty-3.1.8, created on 2013-11-10 01:49:55
         compiled from "/Users/rsicher1/Documents/Websites/generatedata/resources/templates/index.tpl" */ ?>
<?php /*%%SmartyHeaderCode:124870597252782868cb58f0-11350200%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '2ab3cd4f09978979f5eb8bc9d5e629e235aac1d7' => 
    array (
      0 => '/Users/rsicher1/Documents/Websites/generatedata/resources/templates/index.tpl',
      1 => 1384044114,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '124870597252782868cb58f0-11350200',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.8',
  'unifunc' => 'content_52782868de8956_59619517',
  'variables' => 
  array (
    'L' => 0,
    'useMinifiedResources' => 0,
    'minifiedResourcePaths' => 0,
    'theme' => 0,
    'cssIncludes' => 0,
    'codeMirrorIncludes' => 0,
    'currLang' => 0,
    'isLoggedIn' => 0,
    'settings' => 0,
    'accountType' => 0,
    'exportTypeJSModules' => 0,
    'dataTypeJSModules' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_52782868de8956_59619517')) {function content_52782868de8956_59619517($_smarty_tpl) {?><?php if (!is_callable('smarty_function_language_dropdown')) include '/Users/rsicher1/Documents/Websites/generatedata/resources/libs/smarty/plugins/function.language_dropdown.php';
?><!DOCTYPE html>
<html>
<head>
	<title><?php echo $_smarty_tpl->tpl_vars['L']->value['title'];?>
</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="description" content="<?php echo $_smarty_tpl->tpl_vars['L']->value['meta_description'];?>
" />
	<meta name="keywords" content="<?php echo $_smarty_tpl->tpl_vars['L']->value['meta_keywords'];?>
" />

	<?php if ($_smarty_tpl->tpl_vars['useMinifiedResources']->value&&$_smarty_tpl->tpl_vars['minifiedResourcePaths']->value!=false){?>
		<link rel="stylesheet" type="text/css" href="<?php echo $_smarty_tpl->tpl_vars['minifiedResourcePaths']->value['coreCSS'];?>
" />
		<link rel="stylesheet" type="text/css" href="resources/css/smoothness/jquery-ui.min.css" />
		<link rel="stylesheet" type="text/css" href="resources/css/chosen/chosen.css" />
		<link rel="stylesheet" type="text/css" href="resources/themes/<?php echo $_smarty_tpl->tpl_vars['theme']->value;?>
/compiled/styles.css" />
		<script src="<?php echo $_smarty_tpl->tpl_vars['minifiedResourcePaths']->value['coreJS'];?>
"></script>
	<?php }else{ ?>

		<link rel="stylesheet" type="text/css" href="resources/css/smoothness/jquery-ui.min.css" />
		<link rel="stylesheet" type="text/css" href="resources/css/chosen/chosen.css" />
		<link rel="stylesheet" type="text/css" href="resources/css/tablesorter.theme.css" />
		<link rel="stylesheet" type="text/css" href="resources/libs/codemirror/lib/codemirror.css" />
		<link rel="stylesheet" type="text/css" href="resources/themes/<?php echo $_smarty_tpl->tpl_vars['theme']->value;?>
/compiled/styles.css" />

		<script src="resources/libs/codemirror/lib/codemirror.min.js"></script>
		<script src="resources/scripts/libs/jquery.min.js"></script>
		<script src="resources/scripts/libs/jquery-ui.min.js"></script>
		<script src="resources/scripts/libs/jquery.json-2.2.min.js"></script>
		<script src="resources/scripts/libs/chosen.jquery.min.js"></script>
		<script src="resources/scripts/libs/require.js"></script>
		<script src="resources/scripts/requireConfig.js"></script>
		<script src="resources/scripts/libs/spinners.js"></script>

		<!--[if lt IE 9]>
		<script src="resources/scripts/libs/html5shiv.js"></script>
		<script src="resources/scripts/libs/excanvas.js"></script>
		<![endif]-->
	<?php }?>

	<?php echo $_smarty_tpl->tpl_vars['cssIncludes']->value;?>

	<?php echo $_smarty_tpl->tpl_vars['codeMirrorIncludes']->value;?>

</head>
<body data-lang="<?php echo $_smarty_tpl->tpl_vars['currLang']->value;?>
" data-logged-in="<?php echo $_smarty_tpl->tpl_vars['isLoggedIn']->value;?>
" data-user-account-setup="<?php echo $_smarty_tpl->tpl_vars['settings']->value['userAccountSetup'];?>
">
	<header>
		<nav class="gdHideNoJS">
			<ul>
				<li id="gdUserAccount"<?php if (!$_smarty_tpl->tpl_vars['isLoggedIn']->value||$_smarty_tpl->tpl_vars['settings']->value['userAccountSetup']=="anonymousAdmin"){?> style="display:none"<?php }?>>
					<a href="#"><?php echo $_smarty_tpl->tpl_vars['L']->value['your_account'];?>
</a> |
				</li>
				<li id="gdLogin"<?php if ($_smarty_tpl->tpl_vars['isLoggedIn']->value||$_smarty_tpl->tpl_vars['settings']->value['userAccountSetup']=="anonymousAdmin"){?> style="display:none"<?php }?>>
					<a href="#"><?php echo $_smarty_tpl->tpl_vars['L']->value['login'];?>
</a> |
				</li>
				<li id="gdLogout"<?php if (!$_smarty_tpl->tpl_vars['isLoggedIn']->value||$_smarty_tpl->tpl_vars['settings']->value['userAccountSetup']=="anonymousAdmin"){?> style="display:none"<?php }?>>
					<a href="#"><?php echo $_smarty_tpl->tpl_vars['L']->value['logout'];?>
</a> |
				</li>
			</ul>
			<?php echo smarty_function_language_dropdown(array('nameId'=>"gdSelectLanguage"),$_smarty_tpl);?>

		</nav>
	</header>
	<nav id="gdMainTabs" class="gdHideNoJS">
		<span id="gdDataSetStatusLine"></span>
		<span id="gdProcessingIcon"></span>
		<ul>
			<li id="gdMainTab1" class="gdSelected"><?php echo $_smarty_tpl->tpl_vars['L']->value['generate'];?>
</li>
			<li id="gdMainTab2" <?php if ($_smarty_tpl->tpl_vars['settings']->value['userAccountSetup']!="multiple"||$_smarty_tpl->tpl_vars['accountType']->value!="admin"){?>style="display:none"<?php }?>><?php echo $_smarty_tpl->tpl_vars['L']->value['accounts'];?>
</li>
			<li id="gdMainTab3" <?php if ($_smarty_tpl->tpl_vars['settings']->value['userAccountSetup']!="anonymousAdmin"&&$_smarty_tpl->tpl_vars['accountType']->value!="admin"){?>style="display:none"<?php }?>><?php echo $_smarty_tpl->tpl_vars['L']->value['settings'];?>
</li>
			<li id="gdMainTab4"><?php echo $_smarty_tpl->tpl_vars['L']->value['about'];?>
</li>
		</ul>
	</nav>
	<noscript><p><?php echo $_smarty_tpl->tpl_vars['L']->value['no_js'];?>
</p></noscript>
	<section class="gdHideNoJS">
		<div id="gdContent">
			<ul class="gdMainTabContent">
				<li id="gdMainTab1Content"><?php echo $_smarty_tpl->getSubTemplate ("generate.tab1.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>
</li>
				<li id="gdMainTab2Content" style="display:none"><?php echo $_smarty_tpl->getSubTemplate ("generate.tab2.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>
</li>
				<li id="gdMainTab3Content" style="display:none"><?php echo $_smarty_tpl->getSubTemplate ("generate.tab3.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>
</li>
				<li id="gdMainTab4Content" style="display:none"><?php echo $_smarty_tpl->getSubTemplate ("generate.tab4.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>
</li>
			</ul>
		</div>
	</section>

	<div id="gdPageLoad"><?php echo $_smarty_tpl->tpl_vars['L']->value['loading'];?>
</div>

	<?php echo $_smarty_tpl->getSubTemplate ("footer.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>


	<?php if ($_smarty_tpl->tpl_vars['useMinifiedResources']->value&&$_smarty_tpl->tpl_vars['minifiedResourcePaths']->value!=false){?>
		<script src="resources/scripts/libs/require.js"></script>
		<script src="resources/scripts/requireConfig.js"></script>
		<script>require(["<?php echo $_smarty_tpl->tpl_vars['minifiedResourcePaths']->value['appStart'];?>
"], function() {});</script>
	<?php }else{ ?>
		<script>
		require([
			"manager",
			"generator",
			"accountManager",
			<?php echo $_smarty_tpl->tpl_vars['exportTypeJSModules']->value;?>
,
			<?php echo $_smarty_tpl->tpl_vars['dataTypeJSModules']->value;?>
,
			"pageInit"
		], function(manager) {
			manager.start();
		});
		</script>
	<?php }?>


</body>
</html>
<?php }} ?>