<?php
$page = "country";
require_once("templates/header.php");
?>

<div class="container">
	<div class="row">

		<div class="span3 bs-docs-sidebar" id="pagenav">
			<ul class="nav nav-list bs-docs-sidenav" data-spy="affix">
				<li class="active"><a href="#overview"><i class="icon-chevron-right"></i> Overview</a></li>
				<li><a href="#limitations"><i class="icon-chevron-right"></i> Limitations</a></li>
				<li><a href="#add_your_own"><i class="icon-chevron-right"></i> Add your own</a></li>
				<li><a href="#contribute"><i class="icon-chevron-right"></i> Contribute your plugin</a></li>
			</ul>
		</div>
		<div class="span9"> 

			<section id="overview">
				<div class="page-header">
					<h1>Country Plugins</h1>
				</div>
				<p class="lead">
					Allow the script to generate more realistic, country-specific data.
				</p>
			</section>

			<section>
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

			<section id="limitations">
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

			<section id="add_your_own">
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
						is the name of the folder you just created) and add in the following PHP.</li>
				</ol>

<pre class="prettyprint linenums">
&lt;?php

/**
 * @package Countries
 */

class Country_PapuaNewGuinea extends CountryPlugin {
	protected $countryName = "Papua New Guinea";
	protected $countrySlug = "papuanewguinea";
	protected $regionNames = "Papua New Guinean Provinces";
	protected $zipFormat = "Xxx";
	protected $continent = "oceania";

	public function install() {
		$data = array(
			array(
				"regionName" => "Province Name 1",
				"regionShort" => "PN1",
				"regionSlug" => "province_name_1",
				"weight" => "1",
				"cities" => array(
					"City Name 1", "City Name 2"
				)
			),
			array(
				"regionName" => "Province Name 2",
				"regionShort" => "PN2",
				"regionSlug" => "province_name_2",
				"weight" => "1",
				"cities" => array(
					"City Name 3", "City Name 4"
				)
			)
		);

		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $data);
	}
}
</pre>

			<ol start="3">
				<li>Now edit that file for your own country data. Here's the important stuff.
					<ul>
						<li>
							<b>First line</b>. On this line, all you need to do is change the class name to end with 
							<code>_YourCountry</code>. e.g. 

							<pre class="prettyprint">class Country_YourCountry extends CountryPlugin {</pre>
						</li>
						<li><b>$countryName</b>. This is your country name. </li>
						<li><b>$countrySlug</b>. This is the country name without any spaces or non a-Z characters.</li>
						<li><b>$regionNames</b>. Different countries subdivide their political geographic regions in 
							different ways. For example, Canada has provinces, the US has states, the UK has counties and 
							so on. Just enter a string like "UK Counties"; this is used in the interface of the Region
							Data Type to let users know what data they want to generate.
						</li>
						<li><b>$zipFormat</b>. This is a placeholder string that describes the format. Any of the following
							characters will be converted to their equivalents, and randomized. Any other characters will just 
							appear in the generated data unchanged.

							<table>
							<tbody><tr>
									<td width="20"><h4>L</h4></td>
									<td width="200">An uppercase <b>L</b>etter.</td>
									<td width="20"><h4>V</h4></td>
									<td>An uppercase <b>V</b>owel.</td>
								</tr>
								<tr>
									<td><h4>l</h4></td>
									<td>A lowercase <b>l</b>etter.</td>
									<td><h4>v</h4></td>
									<td>A lowercase <b>v</b>owel.</td>
								</tr>
								<tr>
									<td><h4>D</h4></td>
									<td>A letter (upper or lower).</td>
									<td><h4>F</h4></td>
									<td>A vowel (upper or lower).</td>
								</tr>
								<tr>
									<td><h4>C</h4></td>
									<td>An uppercase <b>C</b>onsonant.</td>
									<td><h4>x</h4></td>
									<td>Any number, 0-9.</td>
								</tr>
								<tr>
									<td><h4>c</h4></td>
									<td>A lowercase <b>c</b>onsonant.</td>
									<td><h4>X</h4></td>
									<td>Any number, 1-9.</td>
								</tr>
								<tr>
									<td><h4>E</h4></td>
									<td>A consonant (upper or lower).</td>
									<td><h4>H</h4></td>
									<td>An <b>H</b>exidecimal number (0-F)</td>
								</tr>
								</tbody>
							</table>
						</li>
						<li><b>$continent</b>. This is the name of the continent. The following options are 
							available (note: these must be entered <i>exactly</i> as written, otherwise your 
							plugin won't show up: <code>africa</code>, <code>asia</code>, <code>europe</code>, 
							<code>north_america</code>, <code>oceania</code>, <code>south_america</code>
						</li>

						<li>
							<b>The actual data</b>. The regions and cities/towns are all stored in a single data 
							structure, grouped by region. Hopefully it's pretty self-explanatory from looking at the 
							example above, but there are a couple of things to note:

							<ul>
								<li><b>regionShort</b>. This is whatever form of abbreviation is use for the region. 
								e.g. US States have a single two-letter code for states, as do Canadian provinces. If 
								your country doesn't use abbreviations for the region, just enter the full region name again.</li>
								<li><b>weight</b>. This field lets you optionally weight the region to increase / decrease the 
								likelihood of random data being pulled from this region. If, say, one of your regions contained
								90% of the population, you could enter "90" for this value, then have the rest of the regions 
								add up to 10. Note: the weights don't need to add up to any particular value. They simply 
								reflect the <i>relative</i> weights.
							</ul>
						</li>
					</ul>
				</li>
				<li>
					Lastly, to get your Country plugin to show up, go to the Settings tab in the generator and 
					click the "Reset Plugins" button.
				</li>
			</ol>

			<p>
				And that's it!
			</p>
			
			</section>

			<section id="contribute">
				<h2>Contribute your plugin</h2>
				<p>
					Sharing is much appreciated! To contribute your plugin, please just 
					<a href="https://github.com/benkeen/generatedata" target="_blank">fork 
					the project</a> on github and submit your changes via a pull request. This is certainly 
					the preferred method to contribute code, but if you don't think you're up for it you can 
					always <a href="mailto:ben.keen@gmail.com">email me</a> and I'll manually add it in. Please note, 
					all contributions will be expected to be available under the GPL license and released along with the 
					rest of the code. I'll be sure to add in your name as a contributor.
				</p>
			</section>

		</div>
	</div>
</div>

<?php
require_once("templates/footer.php");
?>
