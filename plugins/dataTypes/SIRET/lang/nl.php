<?php

$L = array();
$L["DATA_TYPE_NAME"] = "SIRET";
$L["help"] = <<<EOT
	SIRET Genereren (Systeem voor de identificatie van de directory van de inrichtingen).<br>
	Deze digitale identificatie van 14 cijfers is verwoord in twee delen(partijen):<br>
		De eerste(nacht) is het nummer "SIRENE" (Systeem voor de identificatie van de directory van bedrijven) van de onderneming (ofwel juridische eenheid (eenheid) of rechtspersoon) die behoort de eenheid (eenheid) SIRET;<br>
		de tweede, met de naam NIC (Aantal werkstudenten van indeling (classificatie)), bestaat uit een vier-cijferige sequentieel nummer toegeschreven(geplaatst) aan de vestiging en een afbeelding van de controle (sleutel van control), die het mogelijk maakt om te controleren of de geldigheid van het hele nummer SIRET.
EOT;
//meh. the page crashes on newlines in my help? odd.
$L["help"]  = str_replace(array("\r","\n","\t"), " ", $L["help"]);