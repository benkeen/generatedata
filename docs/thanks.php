<?php
$page = "other";
require_once("templates/header.php");
?>

<div class="container">
	<div class="row">
		<div class="span3 bs-docs-sidebar" id="pagenav">
			<ul class="nav nav-list bs-docs-sidenav" data-spy="affix">
				<li class="active"><a href="#scripts"><i class="icon-chevron-right"></i> Scripts / Tools Used</a></li>
				<li><a href="#books"><i class="icon-chevron-right"></i> Books &amp; Other Resources</a></li>
			</ul>
		</div>
		<div class="span9">

			<section id="scripts">
				<h2>Scripts / Tools Used</h2>

				<p>
					The Data Generator uses the work of a LOT of people. Thanks to the everybody involved in the 
					following. You all rock. I would be <i>proud</i> if any of you wanted to date my sister.
				</p>

				<ul>
					<li><a href="http://jquery.com/" target="_blank">jQuery</a></li>
					<li><a href="http://jqueryui.com/" target="_blank">jQuery UI</a></li>
					<li><a href="http://requirejs.org/" target="_blank">RequireJS</a></li>
					<li><a href="http://codemirror.net/" target="_blank">CodeMirror</a></li>
					<li><a href="http://www.smarty.net/" target="_blank">Smarty PHP</a></li>
					<li><a href="http://harvesthq.github.com/chosen/" target="_blank">Chosen</a> - select box enhancement script</li>
					<li><a href="http://code.google.com/p/jquery-json/" target="_blank">jQuery JSON plugin</a></li>
					<li><a href="http://twitter.github.com/bootstrap/" target="_blank">Bootstrap</a> - used for the doc only</li>
					<li><a href="http://sass-lang.com/" target="_blank">Sass</a> - Syntactically Awesome Stylesheets</li>
					<li><a href="https://github.com/benkeen/spinners" target="_blank">Spinners, Canvas library</a> - this is a fork of mine by Nick Stakenburg to allow for a few extra features</li>
					<li><a href="http://excanvas.sourceforge.net/" target="_blank">ExplorerCanvas</a> - used as a fallback for IE for Canvas</li>
					<li><a href="http://www.iconfinder.com/icondetails/50830/128/dice_icon" target="_blank">La Glanz Studio - dice icon (main logo)</a></li>
					<li><a href="http://led24.de/iconset/" target="_blank">Nice bug icon</a></li>
				</ul>
			</section>

			<section id="books">
				<h3>Books &amp; Other Resources</h3>
				<p>
					A big thanks to Addy Osmani for his brilliant article 
					<a href="http://addyosmani.com/largescalejavascript/" target="_blank">Patterns For Large-Scale JavaScript Application 
					Architecture</a>. That was a real eye-opener for me and client-side code architecture was largely based on a slightly
					simplified version of it. I probably totally misinterpreted what he was saying, but hey, it works for me. ;-)
				</p>
				<p>
					The following books have also been extremely useful. All JS, you'll note. That's where the action's at.
				</p>
				<ul>
					<li><a href="http://shop.oreilly.com/product/9780596806767.do" target="_blank">JavaScript Patterns</a> - Stoyan Stefanov</li>
					<li><a href="http://shop.oreilly.com/product/0636920025832.do" target="_blank">Learning JavaScript Design Patterns</a> - Addy Osmani</li>
					<li><a href="http://shop.oreilly.com/product/0636920018421.do" target="_blank">JavaScript Web Applications</a> - Alex MacCaw</li>
					<li><a href="http://shop.oreilly.com/product/9780596802806.do" target="_blank">High Performance JavaScript</a> - Nicolas Zakas</li>
				</ul>
			</section>
		</div>
	</div>
</div>

<?php
require_once("templates/footer.php");
?>