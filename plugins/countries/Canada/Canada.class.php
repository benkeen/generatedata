<?php

class Country_Canada extends CountryPlugin {
	protected $countryName = "Canada";
	protected $countrySlug = "canada";
  protected $regionNames = "Provinces";
  protected $zipFormat = "LXL XLx";

	static function install() {
		return;
	}
}