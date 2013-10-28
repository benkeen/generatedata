<?php

$L = array();
$L["DATA_TYPE_NAME"] = "Nums de compte bancaire (IBAN)";
$L["help"] = <<<EOT
	Génère IBAN (International Bank Account Number).<br />
	L'IBAN a généré une somme de contrôle valide, countrycode la longueur et le BIC est au bon endroit.<br/>
	Le nombre est hautement improbable qu'il soit vraiment tho "valide", car il ya généralement un tas de vérifications à faire qui sont spécifiques des pays.
EOT;
//meh. the page crashes on newlines in my help? odd.
$L["help"]  = str_replace(array("\r","\n","\t"), " ", $L["help"]);