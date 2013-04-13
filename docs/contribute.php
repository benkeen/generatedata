<?php
$page = "other";
require_once("templates/header.php");
?>

<div class="container">
	<div class="row">
		<div class="span3 bs-docs-sidebar" id="pagenav">
			<ul class="nav nav-list bs-docs-sidenav" data-spy="affix">
				<li class="active"><a href="#contribute"><i class="icon-chevron-right"></i> Contribute</a></li>
				<li><a href="#contactMe"><i class="icon-chevron-right"></i> Contact Me</a></li>
			</ul>
		</div>
		<div class="span9">

			<section id="contribute">
				<h1>Contribute</h1>
				<p>
					Want to contribute your own code? I'm always interested in new and interesting Data and Export Types. The 
					best way to send along your code is by doing a github pull request. That makes my life a whole lot simpler; 
					if you don't know how about github, or haven't tried forking a project yet - now's your chance! It's a very
					useful skill to have. You can find the <a href="https://github.com/benkeen/generatedata">project here</a>.
				</p>
				<p>
					But if you don't fancy using github, you can always email me your code and I'll review it and commit
					it myself.
				</p>
			</section>

			<section id="contactMe">
				<h2>Contact Me</h2>

				<p>
					I get a lot of emails, so I generally prefer being contacted via github. But in case you need to reach me,
					you can email me at <a href="ben.keen@gmail.com">ben.keen@gmail.com</a>.
				</p>
			</section>

		</div>
	</div>
</div>

<?php
require_once("templates/footer.php");
?>