<?php

$L = array();

$L["DATA_TYPE"] = array(
    "NAME" => "Calculé",
    "DESC" => "Permet d'accéder par programmation les valeurs et les métadonnées générées à partir d'autres champs de la ligne et des sorties tout ce que vous voulez."
);

$L["see_help_dialog"] = "&nbsp;Voir boîte de dialogue d'aide.";
$L["help_para1"] = "<b>Informatisé</b> type de données donne accès aux métadonnées sur les champs de la ligne pour vous permettre de générer ce que la sortie vous pour obtenir des informations sur cette base. Si vous avez juste besoin d'accéder à la <i>produit</i> valeur de chaîne d'un autre champ (à savoir, ce que vous voyez dans la sortie), voir <b>Composite</b> Type de données. Ce type de champ vous donne accès beaucoup plus à chaque champ.";
$L["help_para2"] = "<b>{\$ROW1}</b>, <b>{\$ROW2}</b> etc. contiennent tout disponible sur cette ligne particulière. Les changements de contenu basé sur le type de données de la ligne et que la jambe a généré, mais de haut niveau, il contient les propriétés suivantes:";
$L["help_prop1"] = "<b>{\$ROW1.OPTIONS}</b> - les options que ENTRÉES dans l'appel d'interface / API pour la ligne";
$L["help_prop2"] = "<b>{\$ROW1.COL_METADATA}</b> - les métadonnées supplémentaires renvoyées pour le type de données";
$L["help_prop3"] = "<b>{\$ROW1.DATA}</b> - le contenu généré de façon aléatoire réelle pour ce champ (toujours dans une propriété « d'affichage ») ainsi que toute autre information sur le contenu généré par";
$L["help_prop4"] = "<b>{\$ROW1.DEBUG}</b> - un sérialisation JSON à portée de main de tout dans la ligne, afin que vous puissiez voir ce qui est disponible. Il suffit de l'exécuter à travers un formatter JSON.";
$L["example"] = "Exemple";
$L["example1"] = "<b>{\$ROW1.RANDOM_DATA.gender}</b> - affichera le genre («male», «female» ou «unknown») ou le contenu généré d'un <b>Names</b> Type de données (assurez-vous de remplacer «1» avec le bon numéro de ligne!). Si vous avez utilisé <b>FemaleName</b>comme la chaîne de l'espace réservé cette variable retourne à chaque fois « femme ». Si vous saisissez « Nom », la valeur retournée dépendra de la chaîne générée. Si vous avez entré une chaîne d'espace réservé avec plusieurs formats, il retournera « inconnu » si elle contenait les deux sexes, ou aucun sexe (par exemple, un nom de famille sans prénom).";
