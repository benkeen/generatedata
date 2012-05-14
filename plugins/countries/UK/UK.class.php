<?php

class Country_UK extends CountryPlugin {
	protected $countryName = "United Kingdom";
	protected $countrySlug = "united_kingdom";
  protected $regionNames = "UK Counties";
  protected $zipFormat = "Lx xLL|Lxx xLL|LxL xLL|LLx xLL|LLxx xLL|LLxL xLL";

	static function install() {
		return;
	}
}