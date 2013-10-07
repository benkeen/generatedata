<?php

$L = array();
$L["DATA_TYPE_NAME"] = "Bank Account Nums (IBAN)";
$L["help"] = <<<EOT
	Generates IBAN (International Bank Account Number).<br />
	The generated IBAN has a valid checksum, countrycode and length and the BIC is in the right place.<br/>
	The number is highly unlikely to be really "valid" tho, since there are usually a bunch of checks to do which are country specific.
EOT;
//meh. the page crashes on newlines in my help? odd.
$L["help"]  = str_replace(array("\r","\n","\t"), " ", $L["help"]);