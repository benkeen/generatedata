<?php
require_once("templates/header.php");
?>

<div class="container">
	<div class="row">
		<div class="span3 bs-docs-sidebar" id="pagenav">
			<ul class="nav nav-list bs-docs-sidenav" data-spy="affix">
				<li><a href="#intro"><i class="icon-chevron-right"></i> Introduction</a></li>
				<li><a href="#modules"><i class="icon-chevron-right"></i> Module Types</a></li>
				<li><a href="#code"><i class="icon-chevron-right"></i> Code Architecture</a></li>
				<li><a href="#generatingDoc"><i class="icon-chevron-right"></i> JSDoc and PHPDoc</a></li>
			</ul>
		</div>

		<div class="span9">

			<a id="intro"></a>
			<section id="global">
				<div class="hero-unit">
					<h1>Developer Doc</h1>
					<p>
						This document explains more than you ever wanted to know about the Data Generator:
						how it works, how it's structured, and how to extend it. May the thrills commence.
					</p>
				</div>

				<h2>Introduction</h2>
				<p>
					If you haven't already done so check out the <a href="http://www.generatedata.com" target="_blank">script
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
					The Developer Doc focuses on how you, as a developer, can write new modules. Different module types require 
					degrees of technical knowledge. Providing new translations is very basic; providing new country plugins is 
					fairly simple, but requires basic PHP; creating new Export and Data Types are complicated and will require
					both JS and PHP expertise. But I'm getting ahead of myself...
				</p>
			</section>

			<a id="modules"></a>
			<section id="global">
				<h2>Module Types</h2>

				<p>
					<i>Note: the words <b>plugin</b> and <b>module</b> are used synonymously</i>. The Data Generator accommodates 
					the following types of module:
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
					<td><a href="countryData.php">Country Plugins</a></td>
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

			<a id="code"></a>
			<section>
				<h2>Code Architecture</h2>

				<p>
					A few words on how the code is organized, to give you a sense of how it all fits together. Technically 
					you don't need to know all this, but it's a helpful overview all the same.
				</p>

				<h3>PHP</h3>

				<p>
					The <code>settings.php</code> found in the root folder contains the unique settings for the current
					installation - MySQL database settings and so on. This file is automatically created by 
					the installation script. <i>This is the only file that contains custom information for 
					the installation</i>.
				</p>

				<p>
					The PHP codebase is <b>object-oriented</b>, with all core classes found in <code>/resources/classes</code>. 
					The <code>library.php</code> file - again found in the root - is used as the main entry point: all code
					that needs access to the core codebase just needs to include that single file. 
				</p>

				<h4>Core.class.php</h4>

				<p>
					The <code>Core.class.php</code> file is special. It's a static class (or would be if PHP permitted it!) 
					that acts as the global namespace for the backend code. When <code>Core::init()</code> is run, it does 
					all the stuff you need to run the script:
				</p>

				<ul>
					<li>Parses the <code>settings.php</code> file and stores all the custom settings for the environment.</li>
					<li>Makes a connection to the database.</li>
					<li>Automatically handles serious errors like database connection problems, or Smarty not being able to generate
						the page.</li>
					<li>Loads up all Data Types, Export Types and Country plugins and renders them appropriately on the screen.</li>
					<li>Loads the current language file.</li>
				</ul>

				<p>
					It also contains numerous helper functions. Check out the source code for more details.
				</p>

				<h4>Smarty Templates</h4>
				<p>
					<i>Where the hell's the markup?!</i> Check out <code>/resources/templates</code>. That contains the bulk of
					the HTML used to generate the script webpages. You can read more about Smarty 
					<a href="http://smarty.net" target="_blank">on their website</a>. The script uses version 3.
				</p>

				<h4>Custom Smarty Functions</h4>
				<p>
					When you look through the templates, you may notice the occasional non-standard Smarty function, like 
					<code>{country_plugins}</code>. These are all found in <code>/resources/libs/smarty/plugins</code>.
				</p>

				<h3>JavaScript</h3>

				<p>
					The client-side code is built around <a href="http://requirejs.org/" target="_blank">requireJS</a>. All the 
					JS module code works the same way, regardless of whether the code is the Core, for a Data Type or Export 
					Type. A few bullet points to help explain how it works:
				</p>

				<ul>
					<li>Each module is sandboxed by RequireJS, to ensure it doesn't pollute the global namespace.</li>
					<li>Modules interact with one another using <b>publish / subscribe messages</b>, not by calling one another directly.</li>
					<li>All modules register themselves with the <b>Manager</b>. This is found here: 
						<code>/resources/scripts/manager.js</code>. The manager handles all pub/sub messaging and ensuring 
						that the module being registered contains all the required functions in order to integrate with the 
						script.</li>
				</ul>

				<p>
					The pub/sub messages can be viewed right in the Data Generator by going to the <code>Settings</code> tab and 
					choosing which information you want to see in your browser console through the <code>Developer</code> section.
				</p>

				<p>
					See the appropriate module documentation section for more info on how all this works from a practical
					viewpoint.
				</p>
			</section>

			<a id="generatingDoc"></a>
			<section>
				<h2>JSDoc and PHPDoc</h2>
				<p>
					We've bundled JSDoc and PHPDocumentor with the Data Generator script so that to add documentation of your plugins
					to the <a href="jsdoc/">JS Documentation</a> and <a href="phpdoc/">PHP documentation</a> sections, you can do so very easily.
				</p>

				<h4>Updating the JSDoc</h4>
				<p>
					JSDoc requires you to have the Java runtime installed. On the command line, go to your
					<code>[generatedata root]/libs/jsdoc-toolkit/</code> folder and enter the following command:
				</p>

				<pre>java -jar jsrun.jar app/run.js -a -D="noGlobal:true" -t=templates/bootstrap -d=../../docs/jsdoc ../../scripts/generator.js ../../scripts/utils.js ../../scripts/manager.js -r=2 ../../plugins/*</pre>

				<h4>Updating the PHPDoc</h4>
			</section>


		</div>
	</div>
</div>

<?php
require_once("templates/footer.php");
?>
