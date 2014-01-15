<?php

$L = array();
$L["DATA_TYPE_NAME"] = "Kreditkartennummern";
$L["allCreditCardText"] = "Alle Kreditkarten-Typen";
$L["cardType"] = "Speicherkarten-Typ";
$L["example"] = "Beispiel";
$L["help"] = <<<EOT
Dieser Datentyp generiert zufällige, realistisch Kreditkartennummern. Mehrere Kreditkarten-Typen stehen zur Auswahl (siehe unten). Jeder generierte Kreditkartennummer enthält eine gültige Vorwahl und Nummer Länge für seine Art der Kreditkarte. Die Ziffern in jedem Kreditkartennummer nach dem Präfix zufällig abgesehen von der letzten Ziffer (Prüfziffer), die berechnet, um sicherzustellen, dass die Kreditkartennummer geht <a target="_blank" href="http://en.wikipedia.org/wiki/Luhn_algorithm">Luhn-Algorithmus</a> Validierung generiert. Jede Ähnlichkeit in den generierten Kreditkartennummern zu echten Kreditkarten-Nummern ist nicht beabsichtigt.
EOT;
//meh. the page crashes on newlines in my help? odd.
$L["help"]  = str_replace(array("\r","\n","\t"), " ", $L["help"]);