<?php

$L = array();

$L["DATA_TYPE"] = array(
    "NAME" => "Cpmputarizada",
    "DESC" => "Le permite tener acceso mediante programación los valores y los metadatos generados a partir de otros campos de la fila y salidas lo que quieras."
);

$L["see_help_dialog"] = "&nbsp;Ver diálogo de ayuda.";
$L["help_para1"] = "La <b>Tipo de datos</b> informatizado le da acceso a los metadatos acerca de los campos en la fila para que pueda generar cualquier salida que para la información basado en eso. Si sólo tiene que acceder al <i>generada</i> valor de cadena de otro campo (es decir, lo que se ve en la salida), consulte la <b>Composite</b> Tipo de datos. Este tipo de campo que da mucho más el acceso a cada campo.";
$L["help_para2"] = "<b>{\$ROW1}</b>, <b>{\$ROW2}</b> etcétera, contienen todo lo disponible de esa fila en particular. Los cambios de contenido en función del tipo de datos de la fila y lo que ha generado la pierna, pero de alto nivel que contiene las siguientes propiedades:";
$L["help_prop1"] = "<b>{\$ROW1.OPTIONS}</b> - todas las opciones que se introdujeron en la llamada interfase / API para la fila";
$L["help_prop2"] = "<b>{\$ROW1.COL_METADATA}</b> - cualquier metadatos adicionales devuelto para el tipo de datos";
$L["help_prop3"] = "<b>{\$ROW1.DATA}</b> - el contenido real generado de forma aleatoria para este campo (siempre en una propiedad de \"display\"), además de cualquier otra información sobre el contenido generado";
$L["help_prop4"] = "<b>{\$ROW1.DEBUG}</b> - un práctico serialización JSON de todo en la fila, para que pueda ver lo que está disponible. Sólo tiene que ejecutar a través de un formateador JSON.";
$L["example"] = "Example";
$L["example1"] = "<b>{\$ROW1.RANDOM_DATA.gender}</b> - te mostrará el género ( \"male\", \"female\" o \"unknown\") o el contenido generado de un <b>Nombres</b> Tipo de datos (asegúrese de reemplazar \"1\" con el número de fila de la derecha!). Si ha utilizado <b>FemaleName</b> como la cadena de marcador de posición esta variable volverá cada vez \"female\". Si ha introducido \"Name\", el valor devuelto dependerá de la cadena generada. Si ha introducido una cadena marcador de posición con múltiples formatos, devolverá \"unknown\" si contenía ambos sexos, con o sin géneros (por ejemplo, un apellido sin nombre).";
