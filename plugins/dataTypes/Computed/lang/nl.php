<?php

$L = array();

$L["DATA_TYPE"] = array(
    "NAME" => "Berekende",
    "DESC" => "Hiermee kunt u programmatisch toegang tot de meerwaarden en metadata gegenereerd uit andere velden in de rij en uitgang wat je wilt."
);

$L["see_help_dialog"] = "&nbsp;Zie dialoog hulp.";
$L["help_para1"] = "De <b>Computed</b> Data Type Geeft u toegang tot de metadata velden in de rij over om u te laten genereren welke uitgang je wilt is gebaseerd Die informatie. Als je gewoon nodig hebt om toegang te krijgen tot de gegenereerd string waarde uit Reviews ander veld (dat wil zeggen wat je ziet in de output), kunt u de <b>Composite</b> Data Type. Dit veld-type Geeft u veel meer toegang tot elkaars vakgebied.";
$L["help_para2"] = "<b>{\$ROW1}</b>, <b>{\$ROW2}</b> etc. bevatten alles wat beschikbaar is over die bepaalde rij. De inhoud uitwisseling op basis van de de rij van Data Type en wat-is gegenereerd, high-level goal Het bevat de volgende eigenschappen:";
$L["help_prop1"] = "<b>{\$ROW1.OPTIONS}</b> - Werden ingevoerd, wat opties in de interface / API oproep voor de rij";
$L["help_prop2"] = "<b>{\$ROW1.COL_METADATA}</b> - Eventuele extra metadata terug voor het Data Type";
$L["help_prop3"] = "<b>{\$ROW1.DATA}</b> - de feitelijke gegenereerde willekeurige blij voor dit gebied (altijd in een \"scherm\" eigendom) plus alle andere informatie over de gegenereerde inhoud";
$L["help_prop4"] = "<b>{\$ROW1.DEBUG}</b> - een handige JSON-rangschikking van alles in de rij, zodat u kunt zien wat er beschikbaar is. Draaien gewoon door een JSON formatter.";
$L["example"] = "Voorbeeld";
$L["example1"] = "<b>{\$ROW1.RANDOM_DATA.gender}</b> - dit zal de uitgang van het geslacht (\"MaleName\", \"FemaleName\" of \"Unknown\") van de gegenereerde inhoud van de <b>Names</b> Data Type veld (zuur zijn om te vervangen \"1\" met de juiste rijnummer!) . Als je gewend <b>FemaleName</b> als tijdelijke aanduiding string deze variabele \"vrouwelijke\" iedere keer terug te keren. Als u \"Name\" ingevoerd, wordt de waarde die wordt geretourneerd zal afhangen van de gegenereerde string. Als u een placeholder string met meerdere formaten ingevoerd, zal het terug \"onbekend\" als het bevatte zowel mannen als vrouwen, geslachten of geen (bijvoorbeeld een familienaam zonder voornaam).";
