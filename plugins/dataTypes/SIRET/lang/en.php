<?php

$L = array();
$L["DATA_TYPE_NAME"] = "SIRET";
$L["help"] = <<<EOT
	Generate SIRET (System of Identification of the Directory of Establishments).<br>
	This digital identifier of 14 figures is articulated in two parts(parties):<br>
		The first one(night) is the number SIREN (System of Identification of the Directory of COMPANIES) of the company (either legal unity(unit) or legal person) to which belongs the unity(unit) SIRET;<br>
		The second, called NIC (Number Interns of Classification(Ranking)), consists of a four-digit sequential order number attributed(awarded) to the establishment and of a figure of control (key of control), which allows to verify the validity of the whole number SIRET.
EOT;
//meh. the page crashes on newlines in my help? odd.
$L["help"]  = str_replace(array("\r","\n","\t"), " ", $L["help"]);