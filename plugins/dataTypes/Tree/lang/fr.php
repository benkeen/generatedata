<?php

$L = array();
$L["DATA_TYPE_NAME"] = "Arborescence";

$L["auto_increment_row_num"] = "Numéro de la ligne d'auto-incrémentation:";
$L["help_1"] = "Ce type de données permet de générer des arbres dans laquelle chaque ligne est un enfant d'une autre ligne - sauf la toute première ligne, qui est la racine de l'arbre. Ce type de données doit être utilisé en coordination avec le type de données Auto-incrémentation qui assure que chaque ligne a une valeur numérique unique. C'est cet identifiant qui est utilisé pour référencer les lignes parentes.";
$L["help_2"] = "Les options vous permettent de spécifier lequel de vos lignes est celle d'auto-incrémentation et le nombre maximum d'enfants qu'un noeud peut avoir.";
$L["invalid_fields"] = "Les options du type de données Arborescence doivent être des nombres. Corrigez les lignes:";
$L["invalid_parent"] = "[Parent non valide]";
$L["max_num_sibling_nodes"] = "Nombre maximum de noeuds frères:";
$L["name"] = "Arbre (ID de ligne mère)";
