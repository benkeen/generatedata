<?php
$page = "core";
require_once("templates/header.php");
?>

	<div class="container">
    <div class="row">

	    <div class="span3 bs-docs-sidebar">
        <ul class="nav nav-list bs-docs-sidenav affix">
          <li><a href="#overview"><i class="icon-chevron-right"></i> Overview</a></li>
          <li><a href="#anatomy"><i class="icon-chevron-right"></i> Anatomy of a Data Type</a></li>
          <li><a href="#installation"><i class="icon-chevron-right"></i> Installation Script</a></li>
          <li><a href="#database"><i class="icon-chevron-right"></i> Database / raw Data</a></li>
          <li><a href="#i18n"><i class="icon-chevron-right"></i> I18N</a></li>
        </ul>
      </div>
      <div class="span9">

				<a name="overview"></a>

				<section>
					<div class="hero-unit">
						<div>
							<h1>The Core Script</h1>
						</div>
					</div>

					<h2>Overview / What can be extended?</h2>

					<p>
						The Data Generator is a customizable framework for generating random data. It provides a simple user interface
						to quickly generate and save custom data set configurations and create user accounts. The entire codebase is
						open source and available on github. It's written in PHP, MySQL and javascript and employs a number of awesome
						open source libraries, namely: jQuery, jQuery UI, CodeMirror and Smarty.
					</p>
					<p>
						Most people will just use the script as is: the out-the-box functionality includes the most common data sets
						and export formats you're likely to need to - names, email addresses, random lists, dates, times, addresses,
						countries, numbers etc. However, the Data Generator was designed to be extended in a number of key ways:
					</p>

					<ul>
						<li><b>Data Types</b> -</li>
						<li><b>Export Types</b> -</li>
						<li><b>Country Data</b> -</li>
						<li><b>Translations</b> - Lastly, the user interface language is entirely pulled from separate language files, so it can always be converted into the language of your choice. The existing translations are mostly auto-translated (meaning: they're god-awful) but hopefully they'll serve as a starting-point for budding translators who want to de-suck the interface strings in whatever language they speak.
						</li>
					</ul>

				</div>
	    </div>
    </div>
  </div>

<?php
require_once("templates/footer.php");
?>