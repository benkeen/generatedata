<?php

$L = array();

$L["DATA_TYPE"] = array(
    "NAME" => "Berechnet",
    "DESC" => "Hier können Sie programmatisch die Werte und Metadaten aus anderen Bereichen in der Reihe und gibt, was Sie wollen erzeugt zugreifen."
);

$L["see_help_dialog"] = "&nbsp;Siehe Hilfe-Dialog.";
$L["help_para1"] = "Die <b>computerisiert</b> Datentyp gibt Ihnen über Felder in der Zeile auf die Metadaten zugreifen Sie Informationen, was Ausgabe, die Sie lassen generieren auf dieser Grundlage. Wenn Sie nur zugreifen müssen der <i>erzeugt</i> String-Wert aus einem anderen Feld (das heißt, was Sie in der Ausgabe sehen) finden Sie in den <b>Verbund</b> Datentyp . Diese Art von Feld gibt Ihnen viel mehr Zugriff auf jedes Feld.";
$L["help_para2"] = "<b>{\$ROW1}</b>, <b>{\$ROW2}</b> usw. enthält alles, was verfügbar über diese spezielle Reihe. Die inhaltlichen Änderungen, basierend auf den Datentyp der Reihe und welche Bein erzeugt hat, aber auf hoher Ebene enthält die folgenden Eigenschaften:";
$L["help_prop1"] = "<b>{\$ROW1.OPTIONS}</b> - welche Optionen eingegeben wurden in die Schnittstelle / API-Aufruf für die Zeile";
$L["help_prop2"] = "<b>{\$ROW1.COL_METADATA}</b> - jede zusätzliche Metadaten für den Datentyp zurückgegeben";
$L["help_prop3"] = "<b>{\$ROW1.DATA}</b> - die tatsächlichen zufallsgenerierten Inhalte für diesen Bereich (immer in einer Eigenschaft „Anzeige“) sowie alle weiteren Informationen über den erzeugten Inhalt";
$L["help_prop4"] = "<b>{\$ROW1.DEBUG}</b> - Eine praktische JSON Serialisierung von allem in der Reihe, so können Sie sehen, was verfügbar ist. Führen Sie es einfach durch einen JSON Formatierer .";
$L["example"] = "Beispiel";
$L["example1"] = "<b>{\$ROW1.RANDOM_DATA.gender}</b> - wird das Geschlecht („männlich“, „weiblich“ oder „unbekannt“) oder der erzeugte Inhalt einer <b>Namen</b> Feld Datentyp (sicher sein, „1“ mit der rechten Zeilennummer ! ersetzen) ausgegeben. Wenn Sie verwenden <b>FemaleName</b> als Platzhalter Zeichenfolge wird diese Variable \"weiblich\" jedes Mal zurück. Wenn Sie „Name“ eintrat, kehrte der Wert wird auf der erzeugten Zeichenfolge ab. Wenn Sie einen Platzhalter Zeichenfolge mit mehreren Formaten eingegeben, wird er zurückkehren „unbekannt“, wenn es beiden Geschlechter enthalten ist, oder keine Geschlechter (zum Beispiel der Familienname ohne Vornamen).";
