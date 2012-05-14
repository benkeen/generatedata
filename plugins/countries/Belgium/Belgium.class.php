<?php

class Country_Belgium extends CountryPlugin {
	protected $countryName = "Belgium";
	protected $countrySlug = "belgium";
  protected $regionNames = "Belgium Prov.";
  protected $zipFormat = "Xxxx";

	static function install() {
		return;
	}
}