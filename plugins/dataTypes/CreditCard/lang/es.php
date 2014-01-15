<?php

$L = array();
$L["DATA_TYPE_NAME"] = "Números de Tarjetas de Crédito";
$L["allCreditCardText"] = "Todos los tipos de tarjetas de crédito";
$L["cardType"] = "Tipo de Tarjeta";
$L["example"] = "Ejemplos";
$L["help"] = <<<EOT
Este tipo de datos genera números de tarjetas de crédito aleatorios y realistas. Existen varios tipos de tarjetas de crédito están disponibles para elegir (ver abajo). Cada número de la tarjeta de crédito generado incluye un prefijo válido y longitud del número de este tipo de tarjeta de crédito. Los dígitos de cada número de tarjeta de crédito después de que el prefijo se generan aleatoriamente aparte del último dígito (dígito de suma de comprobación) que se calcula para asegurar el número de tarjeta de crédito pasa la validación <a target="_blank" href="http://en.wikipedia.org/wiki/Luhn_algorithm">algoritmo Luhn</a>. Cualquier similitud en los números de tarjetas de crédito generados a números de tarjetas de crédito reales no es intencional.
EOT;
//meh. the page crashes on newlines in my help? odd.
$L["help"]  = str_replace(array("\r","\n","\t"), " ", $L["help"]);