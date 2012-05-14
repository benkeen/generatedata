<?php

class Country_Australia extends CountryPlugin {
	protected $countryName = "Australia";
	protected $countrySlug = "australia";
  protected $regionNames = "Australian St./Terr.";
  protected $zipFormat = "Xxxx";

	static function install() {
		return;
	}
}