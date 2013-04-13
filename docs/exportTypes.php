<?php
$page = "exportTypes";
require_once("templates/header.php");
?>

<div class="container">
	<div class="row">

		<div class="span3 bs-docs-sidebar" id="pagenav">
			<ul class="nav nav-list bs-docs-sidenav" data-spy="affix">
				<li><a href="#overview"><i class="icon-chevron-right"></i> Overview</a></li>
				<li><a href="#anatomy"><i class="icon-chevron-right"></i> Anatomy of an Export Type</a></li>
				<li><a href="#contribute"><i class="icon-chevron-right"></i> How to Contribute</a></li>
			</ul>
		</div>
		<div class="span9"> 

			<a id="overview"></a>
			<section>
				<div class="page-header">
					<h1>Export Types</h1>
				</div>
				<p class="lead">
					Provide new ways to display and download the data.
				</p>
			</section>

			<section>
				<h2>Overview</h2>
			</section>

			<section id="contribute">
				<h2>How to Contribute</h2>

				<p>
					If you feel that your Data Type could be of use to other people, send it our way! I'd love to take a look at it,
					and maybe even include it in the core script for others to download. Read the <a href="contribute.php">How to Contribute</a>.
				</p>
			</section>

		</div>
	</div>
</div>

<?php
require_once("templates/footer.php");
?>