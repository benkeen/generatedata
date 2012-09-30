<?php

class Country_US extends CountryPlugin {
	protected $countryName = "United States";
	protected $countrySlug = "united_states";
	protected $regionNames = "US States";
	protected $zipFormat = "xxxxx";

	public function install() {
		return array(true, "");
	}
}
