<?php

$L = array();
$L["DATA_TYPE_NAME"] = "SIRET";
$L["help"] = <<<EOT
	Génère SIRET (Système d’Identification du Répertoire des Etablissements).<br />
	Cet identifiant numérique de 14 chiffres est articulé en deux parties :<br />
		la première est le numéro SIREN (Système d’Identification du Répertoire des ENtreprises) de l'entreprise (ou unité légale ou personne juridique) à laquelle appartient l'unité SIRET ;<br />
		la seconde, appelée NIC (Numéro Interne de Classement), se compose d'un numéro d'ordre séquentiel à quatre chiffres attribué à l'établissement et d'un chiffre de contrôle (clé de contrôle), qui permet de vérifier la validité de l'ensemble du numéro SIRET.
EOT;
//meh. the page crashes on newlines in my help? odd.
$L["help"]  = str_replace(array("\r","\n","\t"), " ", $L["help"]);