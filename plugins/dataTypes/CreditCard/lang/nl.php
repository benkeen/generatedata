<?php

$L = array();
$L["DATA_TYPE_NAME"] = "Creditcardnummers";
$L["allCreditCardText"] = "Alle Soorten Creditcards";
$L["cardType"] = "Kaarttype";
$L["example"] = "Voorbeeld";
$L["help"] = <<<EOT
Dit gegevenstype genereert willekeurig, realistische creditcardnummers. Verschillende credit card types zijn beschikbaar om uit te kiezen (zie hieronder). Elke gegenereerde credit card nummer bevat een geldig voorvoegsel en nummer lengte voor zijn type creditcard. De cijfers in elke credit card nummer achter de prefix worden willekeurig gegenereerd afgezien van het laatste cijfer (checksum cijfers) die wordt berekend om ervoor te zorgen het creditcardnummer passeert <a target="_blank" href="http://en.wikipedia.org/wiki/Luhn_algorithm">Luhn algoritme</a> valideren. Enige gelijkenis in de gegenereerde credit card nummers om echte creditcardnummers is onbedoeld.
EOT;
//meh. the page crashes on newlines in my help? odd.
$L["help"]  = str_replace(array("\r","\n","\t"), " ", $L["help"]);