<?php

$L = array();
$L["DATA_TYPE"] = array(
    "NAME" => "Boom (met gerelateerde rij ID)",
    "DESC" => "Met dit gegevenstype kunt u boom-achtige structuur data genereren waarin elke rij is een kind is van een andere rij - met uitzondering van de eerste rij, dat is de stam van de boom."
);

$L["auto_increment_row_num"] = "Auto-increment rijnummer:";
$L["help_1"] = "Met dit gegevenstype kunt u boom-achtige structuur data genereren waarin elke rij is een kind is van een andere rij - met uitzondering van de eerste rij, dat is de stam van de boom. Dit gegevenstype moet worden gebruikt in combinatie met het Auto-Increment gegevenstype: die ervoor zorgt dat elke rij een unieke numerieke waarde heeft, welke dit gegevenstype gebruikt om te verwijzen naar de bovenliggende rijen.";
$L["help_2"] = "Bij de opties kunt u aangeven welk van uw formulier veld het juiste auto-increment veld is en het maximale aantal kinderen waarmee ze een relatie hebben.";
$L["invalid_fields"] = "Gelieve enkel cijfers invoeren voor een Boom veld. Pas de volgende ri(en) aan:";
$L["invalid_parent"] = "[Ongeldig gerelateerde rij]";
$L["max_num_sibling_nodes"] = "Max aantal broers en zussen rij relaties:";
