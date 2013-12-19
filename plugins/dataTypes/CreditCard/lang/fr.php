<?php

$L = array();
$L["DATA_TYPE_NAME"] = "Des Numéros de Cartes de Crédit";
$L["allCreditCardText"] = "Tous les types de cartes de crédit";
$L["cardType"] = "Le Type de Carte";
$L["example"] = "Exemple";
$L["help"] = <<<EOT
Ce type de données génère au hasard des numéros de cartes de crédit réalistes. Plusieurs types de cartes de crédit sont disponibles au choix (voir ci-dessous). Chaque numéro de carte de crédit généré inclut un préfixe valide et la longueur du numéro de son type de carte de crédit. Les chiffres dans chaque numéro de carte de crédit après le préfixe sont générés aléatoirement à part le dernier chiffre (chiffre de contrôle) qui est calculé pour assurer le numéro de carte de crédit passe la validation de <a target="_blank" href="http://en.wikipedia.org/wiki/Luhn_algorithm">l'algorithme Luhn</a>. Toute ressemblance avec des numéros de carte de crédit générées aux numéros de cartes de crédit réels est involontaire.
EOT;
//meh. the page crashes on newlines in my help? odd.
$L["help"]  = str_replace(array("\r","\n","\t"), " ", $L["help"]);