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
			      	Welcome to the developer documentation! This explains more than you ever wanted to know about the Data Generator and how to extend it, writing new
			      	Data Types, Export Types, adding new Country-specific data and providing new, better translations.
			      </p>
						<p><a href="core.php" class="btn btn-primary btn-large">Learn about the Core Script &raquo;</a></p>
			    </div>

          <div class="page-header"><h1></h1></div>
          <h3>Overview</h3>
          <p>
          	This document assumes you have at least a passing familiarity with the script in terms of how it looks and works, so in case you haven't
          	already done so, check out the online version and generate a few random data sets. The Data Generator has three types of plugins. To
          	learn more, click on the appropriate link.
          </p>

          <table class="table table-bordered table-striped">
          <tr>
          	<td width="120"><a href="">Data Types</a></td>
          	<td>
          		We strongly recommend you read the <a href="">Core Script</a> section first.
          	</td>
          </tr>
          <tr>
          	<td><a href="">Export Types</a></td>
          	<td>
          	</td>
          </tr>
          <tr>
          	<td><a href="">Country Data</a></td>
          	<td>
          	</td>
          </tr>
          <tr>
          	<td><a href="">Translations</a></td>
          	<td>
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