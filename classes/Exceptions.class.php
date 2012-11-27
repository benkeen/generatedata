<?php


/**
 * A storage class for all Exception codes. This provides a little more meaning than just embedding
 * numbers all over the place.
 * @author Ben Keen <ben.keen@gmail.com>
 * @package Core
 */
class Exceptions {
	const NOTLOGGEDIN        = 1;
	const SETTINGSFILEEXISTS = 2;
	const MISSINGFIELDS      = 3;
	const NOTNUMERICFIELD    = 4;

}