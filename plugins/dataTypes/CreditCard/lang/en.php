<?php

$L = array();
$L["DATA_TYPE_NAME"] = "Credit Card Nums";
$L["allCreditCardText"] = "All Credit Card Types";
$L["cardType"] = "Card Type";
$L["example"] = "Example";
$L["help"] = <<<EOT
This data type generates random, realistic credit card numbers. Several credit card types are available to choose from (see below). Each generated credit card number includes a valid prefix and number length for its credit card type. The digits in each credit card number after the prefix are randomly generated aside from the last digit (checksum digit) which is calculated to ensure the credit card number passes  <a target="_blank" href="http://en.wikipedia.org/wiki/Luhn_algorithm">Luhn algorithm</a> validation. Any similarity in the generated credit card numbers to real credit card numbers is unintentional.
EOT;
//meh. the page crashes on newlines in my help? odd.
$L["help"]  = str_replace(array("\r","\n","\t"), " ", $L["help"]);