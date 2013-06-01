<?php

/**
 * A storage class for all error codes. This provides a little more meaning than just embedding
 * magic numbers all over the place.
 * @author Ben Keen <ben.keen@gmail.com>
 * @package Core
 */
class ErrorCodes {
	const NOT_LOGGED_IN          = 1;
	const NON_ADMIN              = 2;
	const FAILED_SQL_STATEMENT   = 3;
	const INVALID_PARAMS         = 4;
	const INVALID_REQUEST        = 5;
	const ACCOUNT_ALREADY_EXISTS = 6;
}