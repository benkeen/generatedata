/*
private $sharpDateFormats = array(
    "m/d/Y" => "MM/dd/yyyy",
    "d/m/Y" => "dd/MM/yyyy",
    "m.d.y" => "MM.dd.yy",
    "d.m.y" => "dd.MM.yy",
    "d-m-y" => "dd-MM-yy",
    "m-d-y" => "MM-dd-yy",
    "d.m.Y" => "dd.MM.yyyy"
);


private function generateCSharp($data)
{
    $content = "";
    if ($data["isFirstBatch"]) {
        $content .= "var data = new [] {\n";
    }

    $numCols = count($data["colData"]);
    $numRows = count($data["rowData"]);

    for ($i = 0; $i < $numRows; $i++) {
        $content .= "\tnew { ";

        $pairs = array();
        for ($j = 0; $j < $numCols; $j++) {
            $propName = str_replace(' ', '', $data["colData"][$j]);
            $currValue = $data["rowData"][$i][$j];
            if ($this->isNumeric($j, $currValue) || $this->isBoolean($j, $currValue)) {
                $pairs[] = "{$propName} = {$data["rowData"][$i][$j]}";
            } else if (isset($this->sharpDateFormats[$this->dateFormats[$j]])) {
                $pairs[] = "{$propName} = DateTime.ParseExact(\"{$data["rowData"][$i][$j]}\", \"{$this->sharpDateFormats[$this->dateFormats[$j]]}\", CultureInfo.InvariantCulture)";
            } else {
                $pairs[] = "{$propName} = \"{$data["rowData"][$i][$j]}\"";
            }
        }
        $content .= implode(", ", $pairs);

        if ($data["isLastBatch"] && $i == $numRows - 1) {
            $content .= " }\n";
        } else {
            $content .= " },\n";
        }
    }

    if ($data["isLastBatch"]) {
        $content .= "};\n";
    }
    return $content;
}
*/
