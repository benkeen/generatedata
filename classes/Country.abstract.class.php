<?php

abstract class Country {
	protected $countryName;
	protected $countrySlug;
  protected $regionNames;
  protected $zipFormat;

	static function install() {
		return;
	}
}