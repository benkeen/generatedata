<?php

class Country_US extends CountryPlugin {
	protected $countryName = "United States";
	protected $countrySlug = "united_states";
  protected $regionNames = "US States";
  protected $zipFormat = "xxxxx";

	static function install() {
		return;
	}
}