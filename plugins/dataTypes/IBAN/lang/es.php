<?php

$L = array();
$L["DATA_TYPE_NAME"] = "Nums de cuenta bancaria (IBAN)";
$L["help"] = <<<EOT
	Genera IBAN (International Bank Account Number).<br />
	El IBAN generado tiene una suma de comprobación válida, código del país, la longitud, el BIC se encuentra en el lugar correcto.<br/>
	El número es muy poco probable que sea verdad aunque "válida", ya que por lo general hay un montón de cheques que hacer, que son específicos de cada país.
EOT;
//meh. the page crashes on newlines in my help? odd.
$L["help"]  = str_replace(array("\r","\n","\t"), " ", $L["help"]);