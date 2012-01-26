<?php

/**
 * Connects to a database. After connecting, you should always call disconnect_db() to close it when
 * done.
 */
function gd_db_connect()
{
	global $g_table_prefix, $g_db_hostname, $g_db_username, $g_db_password, $g_db_name;

	$link = mysql_connect($g_db_hostname, $g_db_username, $g_db_password)
		or die("Couldn't connect to database.");
	@mysql_select_db($g_db_name)
		or die ("couldn't find database '$g_db_name'.");

	return $link;
}

/**
 * Disconnects from a database
 */
function gd_db_disconnect($link)
{
	@mysql_close($link);
}
