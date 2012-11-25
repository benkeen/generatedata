<?php
require_once("templates/header.php");
?>
	<div class="container">
		<div class="row">
			<div class="span12">
			<section id="global">

				<div class="hero-unit">
					<h1>Developer Doc</h1>
					<p>
						This doc explains more than you ever wanted to know about the Data Generator:
						how it works, how it's structured, and how to extend it to add your own Data Types,
						Export Types and Country-specific data. May the thrills commence. Hope you're wearing a diaper.
					</p>
				</div>

				<h3>Intro</h3>
				<p>
					First off, if you haven't already done so check out the <a href="http://www.generatedata.com" target="_blank">script
					online</a> and generate some data. You should have a general sense about what the script does
					before you bother reading any further.
				</p>
				<p>
					Version 3.0.0 of the Data Generator was a complete redesign of the script to make it properly <i>modular</i>:
					it's really nothing more than an <i>engine</i> that provides an interface, installation script, user account
					system, and a standardized way for plugins to be integrated with the script. The really interesting part
					is the plugins themselves: they provide all the functionality of the script.
				</p>
				<p>
					The Data Generator accommodates the following types of plugin:
				</p>

				<table class="table table-bordered table-striped">
				<tr>
					<td width="120"><a href="dataTypes.php">Data Types</a></td>
					<td>
						<p>
							These govern what kind of data can be generated through the interface. You get a huge amount of control and
							customizability out of these suckers. For example:
						</p>
						<ul>
							<li>They can generate anything you want - strings, numbers, URLs, images, binary data, code, ascii art, you
							name it.</li>
							<li>They can display any arbitrary settings to allow in-row configuration by the user, customizing the
							particular output for the Data Type row.</li>
							<li>You can add custom JS validation to ensure the values are well formed.</li>
							<li>They can access and depend on other Data Types in the generated result sets to customize their output.</li>
							<li>They can generate different content depending on the selected Export Type (HTML, CSV, XML, etc.)
							and the export target (in-page, prompt to download, new tab).
						</ul>
						<a href="dataTypes.php" class="btn btn-primary btn-small">More about Data Types &raquo;</a>
					</td>
				</tr>
				<tr>
					<td><a href="exportTypes.php">Export Types</a></td>
					<td>
						<p>
							Export Types are the formats in which the data is actually generated: XML, HTML, CSV, JSON, etc.
						</p>

						<a href="exportTypes.php" class="btn btn-primary btn-small">More about Export Types &raquo;</a>
					</td>
				</tr>
				<tr>
					<td><a href="countryData.php">Country Data</a></td>
					<td>
						<p>
							In order to generate realistic-looking human-related data, you need to actually provide the
							data set to pull from. The Country plugins let you do just this: you provide some data
							country, regions and cities for a particular country. This allows various Data Types to intelligently
							generate rows of data with regions, cities and postal codes that match the country selected. These are
							very simple plugins to create.
						</p>
						<a href="countryData" class="btn btn-primary btn-small">More about Country Data &raquo;</a>
					</td>
				</tr>
				<tr>
					<td><a href="translations.php">Translations</a></td>
					<td>
						<p>The entire Data Generator interface is translatable. At the top right of the interface, there's a dropdown
						that lists all available languages. The default languages other than English were auto-generated with
						Google Translate. As such, they're in need of proper translations! Click the button below to learn more
						about translations and how to provide your own / update the existing ones.</p>
						<a href="translations.php" class="btn btn-primary btn-small">More about Translations &raquo;</a>
					</td>
				</tr>
				</table>
			</section>

		</div>
	</div>
</div>

<?php
require_once("templates/footer.php");
?>
