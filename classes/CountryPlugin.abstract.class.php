<?php

abstract class CountryPlugin {
	protected $countryName;
	protected $countrySlug;
	protected $regionNames;
	protected $zipFormat;

	public function install() {
		return array(true, "");
	}

	final public function getName() {
        return $this->countryName;
	}

	final public function getSlug() {
		return $this->countrySlug;
	}

	final public function getRegionNames() {
		return $this->regionNames;
	}
}
