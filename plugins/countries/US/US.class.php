<?php

class Country_US extends CountryPlugin {
	protected $countryName = "United States";
  protected $regionNames = "US States";
  protected $zipFormat = "xxxxx";

	static function install() {
		return;
	}
}