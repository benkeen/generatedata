<?php
$page = "translations";
require_once("templates/header.php");
?>

<div class="container">
	<div class="row">

		<div class="span3 bs-docs-sidebar" id="pagenav">
			<ul class="nav nav-list bs-docs-sidenav" data-spy="affix">
				<li><a href="#overview"><i class="icon-chevron-right"></i> Overview</a></li>
			</ul>
		</div>
		<div class="span9"> 

			<a id="overview"></a>
			<section>
				<div class="page-header">
					<h1>Translations</h1>
				</div>
				<p class="lead">
					Provide alternative translations for the user interface.
				</p>
			</section>

		</div>
	</div>
</div>

<?php
require_once("templates/footer.php");
?>