<?php
$page = (isset($page)) ? $page : "home";
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title></title>
    <link href="assets/css/bootstrap.css" rel="stylesheet">
    <link href="assets/css/bootstrap-responsive.css" rel="stylesheet">
    <link href="assets/css/docs.css" rel="stylesheet">
    <link href="assets/js/google-code-prettify/prettify.css" rel="stylesheet">
    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
  </head>
  <body data-spy="scroll" data-target=".bs-docs-sidebar">

    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container-fluid">
          <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="brand" href="../">generatedata.com</a>
          <div class="nav-collapse collapse">
            <ul class="nav">
              <li <?php if ($page == "home") echo 'class="active"'; ?>><a href="index.php">Home</a></li>
              <li <?php if ($page == "core") echo 'class="active"'; ?>><a href="core.php">The Core Script</a></li>
              <li <?php if ($page == "data_types") echo 'class="active"'; ?>><a href="data_types.php">Data Types</a></li>
              <li <?php if ($page == "export_types") echo 'class="active"'; ?>><a href="export_types.php">Export Types</a></li>
              <li <?php if ($page == "country") echo 'class="active"'; ?>><a href="country_data.php">Country Data</a></li>
              <li <?php if ($page == "translations") echo 'class="active"'; ?>><a href="translations.php">Translations</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
