<?php
$page = "dataTypes";
require_once("templates/header.php");
?>

<div class="container">
	<div class="row">

		<div class="span3 bs-docs-sidebar" id="pagenav">
			<ul class="nav nav-list bs-docs-sidenav" data-spy="affix">
				<li class="active"><a href="#overview"><i class="icon-chevron-right"></i> Overview</a></li>
				<li><a href="#anatomy"><i class="icon-chevron-right"></i> Anatomy of a Data Type</a></li>
			</ul>
		</div>
		<div class="span9">

			<a id="overview"></a>
			<section>
				<div class="page-header">
					<h1>Data Types</h1>
				</div>
				<p class="lead">
					Provide new types of data for generation.
				</p>
			</section>

			<section>
				<h2>Overview</h2>

				<p>
					This document explains how to add your own data types so you can generate pretty much whatever information you want.
				</p>
				<p>
					Data Types are self-contained plugins that generate a single random data item, like a name, email address, country name,
					country code, image, picture, URL, barcode image, binary string - really anything you want. Data Types can offer basic 
					functionality, like the <code>Email Address</code> Data Type which has no options, examples or help doc, or they can 
					be more advanced, like the <code>Date</code> Data Type, which contains examples of date formats for easy generation, 
					contains a date picker dialog (courtesy of jQuery UI), and a custom help dialog window. Data Types can be standalone 
					and generate data that has no bearing on other fields (like the <code>Alpha Numeric</code> Data Type), or make 
					decisions about its content based on other rows in the data set (like <code>Region</code>, which intelligently generates
					a region within whatever country has been randomly generated for that row).
				</p>
				<p>
					When creating your new Data Type, you can add anything you need - from client-side validation to
					custom dynamic JS/DOM manipulation, to the actual data generated, whether it has any dependencies on the
					other fields in the submission and whether is should show something different, depending on the export type. There's a
					great deal of flexibility allowed, so hopefully you won't run into any brick walls.
				</p>
				<p>
					If you feel that your Data Type could be of use to other people, send it our way! I'd love to take a look at it,
					and maybe even include it in the core script for others to download. Just fork the project on gibhub and submit 
					a pull request.
				</p>
				<p>
					Let's start with looking at the actual files and folders that make up a Data Type.
				</p>
			</section>

			<a id="anatomy"></a>
			<section>
				<h2>Anatomy of a Data Type</h2>
			</section>

		</div>
	</div>
</div>

<?php
require_once("templates/footer.php");
?>
