<?php

class Country_Netherlands extends CountryPlugin {
	protected $countryName = "Netherlands";
	protected $countrySlug = "netherlands";
	protected $regionNames = "Netherlands Prov.";
	protected $zipFormat = "xxxxLL";

	public function install() {
		return array(true, "");
	}
}
