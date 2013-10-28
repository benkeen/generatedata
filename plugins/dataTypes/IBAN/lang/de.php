<?php

$L = array();
$L["DATA_TYPE_NAME"] = "Kontonummern (IBAN)";
$L["help"] = <<<EOT
	Erzeugt IBAN (International Bank Account Number).<br />
	Die erzeugte IBAN hat eine gültige Prüfsumme, Landes-und Länge und die BIC ist an der richtigen Stelle.<br/>
	Die Zahl ist höchst unwahrscheinlich, dass wirklich "gültig" tho sein, da in der Regel eine Reihe von Kontrollen zu tun, die länderspezifisch sind.
EOT;
//meh. the page crashes on newlines in my help? odd.
$L["help"]  = str_replace(array("\r","\n","\t"), " ", $L["help"]);