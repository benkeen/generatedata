<?php
$page = "country";
require_once("templates/header.php");
?>

<div class="container">
	<div class="row">

		<div class="span3 bs-docs-sidebar" id="pagenav">
			<ul class="nav nav-list bs-docs-sidenav" data-spy="affix">
				<li><a href="#overview"><i class="icon-chevron-right"></i> Overview</a></li>
				<li><a href="#limitations"><i class="icon-chevron-right"></i> Limitations</a></li>
				<li><a href="#add_your_own"><i class="icon-chevron-right"></i> Add your own</a></li>
				<li><a href="#contribute"><i class="icon-chevron-right"></i> Contribute your plugin</a></li>
			</ul>
		</div>
		<div class="span9"> 

			<section>
				<a id="overview"></a>

				<div class="page-header">
					<h1>Country Plugins</h1>
				</div>
				<p class="lead">
					Allow the script to generate more realistic country-specific data.
				</p>

				<h2>Overview</h2>
				<p>
					The primary purpose of the script is to generate <i>realistic-looking</i> fake/test data. So when it comes 
					to human-centric geographical information, it needs the actual raw data - city and region names - in 
					order to do its job. That's where the Country plugins come in: they let you provide the following information
					about any country:
				</p>

				<ol>
					<li>High-level geographical political groupings: regions / provinces / states / territories, etc.</li>
					<li>City / town names for those regions</li>
					<li>Zip / postal code format for the country</li>
				</ol>
			</section>

			<section>
				<a id="limitations"></a>
				<h2>Limitations</h2>

				<p>
					The Country plugins are currently pretty basic. Right now, all they're used for is to try to keep the data across a single 
					generated row looking as consistent as possible. So if the generated row contains "Canada" for the <code>Country</code>
					field, it will pick a Canadian province for any <code>Region</code> fields, and any cities within that region for any 
					<code>City</code> fields. A few more interesting caveats:
				</p>

				<ul>
					<li>If the user didn't select the "Limit countries to those selected above" for a <code>Country</code> row, it will randomly 
					pick any country from the list (200 or so). If the country being outputted for a row doesn't have a corresponding
					Country-plugin, it will arbitrarily pick any region, city and postal/zip code (since it can't know any better!)</li>
					<li>If the data set being generated doesn't contain a <code>Country</code> or <code>Region</code> field, the cities 
					will just be arbitrarily chosen.</li>
				</ul>

				<p>
					One more limitation: the postal code format is currently only mapped to the country as a whole. So the actual
					generated postal code value may not be correct for the particular region and city. 
				</p>
			</section>

			<section>
				<a id="add_your_own"></a>
				<h2>Add your own</h2>

				<p>
					Adding your own country-plugin is very simple. Knowing a little PHP would help a lot, but with common 
					sense and a bit of patience, you can probably get by just fine. But before we get into the details, remember 
					this:
				</p>

				<p class="alert alert-info">
					<b>Important</b>: the purpose of a Country plugin isn't to provide a 100% accurate, 100% complete 
					list of regions and cities for a country: it's to provide <i>enough</i> information so that the 
					generated data looks valid.
				</p>

				<p>
					If you were to add in every region and every city/town within a country, the data set could get 
					extremely large, which could slow down the data generation.
				</p>

				<p>
					Now that's over with, here's how to do it.
				</p>

				<ol>
					<li>
						In the <code>/plugins/countries</code> folder, create a new folder for your country. The folder name 
						should be the country name with no spaces, and camel-case - i.e. an upper case letter for each word
						in the country name, like <code>PapuaNewGuinea</code>.
					</li>
					<li>Create a single file in that folder called <code>PapuaNewGuinea.class.php</code> (where PapuaNewGuinea 
						is the name of the folder your just created) and add in the following PHP.</li>
				</ol>

<pre class="prettyprint linenums">
&lt;?php

/**
 * @package Countries
 */

class Country_PapuaNewGuinea extends CountryPlugin {
	protected $countryName = "Papua New Guinea";
	protected $countrySlug = "papuanewguinea";
	protected $regionNames = "Australian St./Terr.";
	protected $zipFormat = "Xxxx";
	protected $continent = "oceania";

	public function install() {
		$data = array(
			array(
				"regionName" => "Australian Capital Territories",
				"regionShort" => "AC",
				"regionSlug" => "australian_capital_territories",
				"weight" => "3",
				"cities" => array(
					"City Name 1", "City Name 2"
				)
			),
			array(
				"regionName" => "New South Wales",
				"regionShort" => "NS",
				"regionSlug" => "new_south_wales",
				"weight" => "69",
				"cities" => array(
					"City Name 3", "City Name 4"
				)
			)
		);

		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $data);
	}
}
</pre>


			</section>

			<section>
				<a id="contribute"></a>
				<h2>Contribute your plugin</h2>



			</section>

		</div>
	</div>
</div>

<?php
$js = '$(function() { prettyPrint(); });';
require_once("templates/footer.php");
?>





























