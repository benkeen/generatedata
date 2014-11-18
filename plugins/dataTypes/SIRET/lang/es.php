<?php

$L = array();
$L["DATA_TYPE_NAME"] = "SIRET";
$L["help"] = <<<EOT
	Genera a SIRET (Sistema de Identificación del Repertorio de los Establecimientos).<br>
	Este identificador numérico de 14 cifras es articulado en dos partes(partidas):<br>
		La primera es el número SIREN (Sistema de Identificación del Repertorio de las EMPRESAS) de la empresa (o unidad legal o persona jurídica) a la cual pertenece la unidad SIRET;<br>
		El segundo, llamado NIC (Número Interna de Clasificación), consta de un número de orden secuencial a cuatro cifras atribuido(otorgado) al establecimiento y de una cifra de control (llave de control), que permite verificar la validez del conjunto del número SIRET.
EOT;
//meh. the page crashes on newlines in my help? odd.
$L["help"]  = str_replace(array("\r","\n","\t"), " ", $L["help"]);