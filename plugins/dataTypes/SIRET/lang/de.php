<?php

$L = array();
$L["DATA_TYPE_NAME"] = "SIRET";
$L["help"] = <<<EOT
	Erzeuge SIRET (Identifizierungssystem des Registers(Repertoires) der Ausstellungen(Einrichtungen)).<br>
		Dieser, Digitaltechnik von 14 Zahlen identifizierend, ist in den zwei Teilen(Seiten) ausgesprochen:<br>
			Die Premiere ist die Nummer SIREN (Identifizierungssystem des Registers(Repertoires) der UNTERNEHMEN) des Unternehmens (entweder gesetzliche Einheit oder Rechtsperson) zu dem die Einheit SIRET gehört;<br>
			Die Sekunde, die NIC genannt ist (Nummer Interniert Einordnens), stellt sich aus einer vierstelligen sequentiellen in der Ausstellung(Einrichtung) gewährten laufenden Nummer und aus einer Kontrollanzahl (ein Kontrollschlüssel) zusammen, der erlaubt, die Gültigkeit der Gesamtheit der Nummer SIRET zu überprüfen.
EOT;
//meh. the page crashes on newlines in my help? odd.
$L["help"]  = str_replace(array("\r","\n","\t"), " ", $L["help"]);