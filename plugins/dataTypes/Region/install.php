<?php

$g_db_install_queries[] = "
	CREATE TABLE gd_regions (
	  region_id mediumint(9) NOT NULL auto_increment,
	  country_id smallint(6) NOT NULL,
	  region varchar(35) character set utf8 NOT NULL,
	  region_short char(2) character set utf8 default NULL,
	  weight varchar(3) character set utf8 NOT NULL,
	  PRIMARY KEY  (region_id)
	) AUTO_INCREMENT=337
";
