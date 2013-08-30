<?php

/**
 * Added in 3.0.7 for security purposes. All code (modules included) should now use this class.
 * It returns an instantiated Smarty object with a security policy applied: PHP is stripped out
 */
class SecureSmarty extends Smarty {

	public function __construct() {
		parent::__construct();

		if (Core::isSmartySecurityEnabled()) {
			$securityPolicy = new Smarty_Security($this);
			$securityPolicy->php_functions = null;
			$securityPolicy->php_handling = Smarty::PHP_REMOVE;
			$securityPolicy->disabled_tags = array("eval", "exec", "system");

			$this->enableSecurity($securityPolicy);
		}
	}
}
