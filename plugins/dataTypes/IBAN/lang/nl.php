<?php

$L = array();
$L["DATA_TYPE_NAME"] = "Bankrekening Nums";
$L["help"] = <<<EOT
	Genereert IBAN (International Bank Account Number).<br />
	De gegenereerde IBAN heeft een geldige checksum, landcode en de lengte en de BIC is op de juiste plaats.<br/>
	Het nummer is zeer onwaarschijnlijk om echt "geldig" tho zijn, aangezien er meestal een heleboel controles te doen, tegen specifieke landen.
EOT;
//meh. the page crashes on newlines in my help? odd.
$L["help"]  = str_replace(array("\r","\n","\t"), " ", $L["help"]);