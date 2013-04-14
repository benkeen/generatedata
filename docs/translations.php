<?php
$page = "translations";
require_once("templates/header.php");
?>

<div class="container">
	<div class="row">

		<div class="span3 bs-docs-sidebar" id="pagenav">
			<ul class="nav nav-list bs-docs-sidenav" data-spy="affix">
				<li><a href="#about"><i class="icon-chevron-right"></i> About the Translations</a></li>
				<li><a href="#help"><i class="icon-chevron-right"></i> Help Translate</a></li>
			</ul>
		</div>
		<div class="span9"> 

			<section id="about">
				<div class="page-header">
					<h1>Translations</h1>
				</div>
				<p class="lead">
					Provide alternative translations for the user interface.
				</p>
			</section>

			<section>
				<h2>About the Translations</h2>

				<p>
					Because I don't speak any other language besides English (and my English is pretty poor at that) 
					the available translations have been created by Google Translate. I decided that having 
					some default, poor translations is better than no translations at all. 
				</p>
				<p>
					The translations are stored in PHP files, each containing a single <code>$L</code> array containing 
					all the strings. They are found at the following locations:
				</p>
				<ul>
					<li><code>/resources/lang/</code> - the translations for the Core script.</li>
					<li><code>/plugins/dataTypes/[data type folder/lang/</code> - this folder contains the translations for the 
						Data Type.</li>
					<li><code>/plugins/exportTypes/[export type folder/lang/</code> - this folder contains the translations for the 
						Export Type.</li>
				</ul>
				<p>
					So, when you make a translation, ideally you'd make translations for all locations: the Core, all Data Types and 
					all Export Types.
				</p>
			</section>


			<section id="help">
				<h2>Help Translate</h2>

				<p>
					If you'd like to help translate, you can do one of two things.
				</p>
				<ol>
					<li><b>The translation already exists</b>, but needs improvement. In this case, the best way to proceed is 
						to <a href="https://github.com/benkeen/generatedata/" target="_blank">fork the project on github</a>. It's 
						really easy, honest. Once you've forked it you can just make your changes and submit a pull request for 
						me to merge in your changes. This is my preferred method for integrating changes, but if you don't feel up 
						to you can instead just make the changes directly to the PHP files and email them to me. 
					</li>
					<li><b>The translation doesn't exist yet.</b> If this is the case, you can either forge ahead and add it from 
						scratch - just creating new files for your language. However, if you'd like to save time and have me 
						create a base auto-translated version in your language, <a href="mailto:ben.keen@gmail.com">just let me 
						know</a>. It's no problem: I've written a script to automate the translations.
					 </li>
				</ol>

				<p class="alert alert-info">
					<b>Please Note:</b> I <i>don't</i> manually input translations sent to me in other formats, like Excel or via 
					email. Sorry to sound like a hard-nose, but I've done this in the past and it soaks up a tremendous amount of 
					my time.
				</p>

				<p>
					Thanks for your help! 
				</p>
			</section>

		</div>
	</div>
</div>

<?php
require_once("templates/footer.php");
?>