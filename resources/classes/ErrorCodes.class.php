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
	const ACCOUNT_DOES_NOT_EXIST = 7;

	// settings for the API. These are used in the generated error responses when a user POSTs invalid JSON / JSON
	// content to the API - hence the human-readable values.
	const API_INVALID_JSON             = "API_INVALID_JSON";
	const API_INVALID_JSON_CONTENT     = "API_INVALID_JSON_CONTENT";
	const API_UNKNOWN_DATA_TYPE        = "API_UNKNOWN_DATA_TYPE";
	const API_INVALID_DATA_TYPE_JSON   = "API_INVALID_DATA_TYPE_JSON";
	const API_MISSING_DATA_TYPE_TITLE  = "API_MISSING_DATA_TYPE_TITLE";
	const API_UNKNOWN_EXPORT_TYPE      = "API_UNKNOWN_EXPORT_TYPE";
	const API_INVALID_EXPORT_TYPE_JSON = "API_INVALID_EXPORT_TYPE_JSON";
}
