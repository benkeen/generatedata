<?php


/**
 * Nothing  much here yet - but it's here so we can expand on it cleanly later on.
 * @package Emails
 * @author Ben Keen <ben.keen@gmail.com>
 */
class Emails {

	public static function sendEmail($info) {
		return mail($info["recipient"], $info["subject"], $info["content"]);
	}

}