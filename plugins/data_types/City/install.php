<?php

$g_db_install_queries[] = "
	CREATE TABLE gd_cities (
	  city_id mediumint(8) unsigned NOT NULL auto_increment,
	  region_identifier varchar(50) NOT NULL,
	  city varchar(80) character set utf8 NOT NULL,
	  PRIMARY KEY  (city_id)
	) AUTO_INCREMENT=5399
";
