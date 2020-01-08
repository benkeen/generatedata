/*
private function generateJS($data)
{
    $content = "";
    if ($data["isFirstBatch"]) {
        $content .= "var data = [\n";
    }

    $numCols = count($data["colData"]);
    $numRows = count($data["rowData"]);

    for ($i = 0; $i < $numRows; $i++) {
        $content .= "\t{";

        $pairs = array();
        for ($j = 0; $j < $numCols; $j++) {
            $currValue = $data["rowData"][$i][$j];
            if ($this->isNumeric($j, $currValue) || $this->isBoolean($j, $currValue)) {
                $pairs[] = "\"{$data["colData"][$j]}\": {$currValue}";
            } else {
                $pairs[] = "\"{$data["colData"][$j]}\": \"{$currValue}\"";
            }
        }
        $content .= implode(", ", $pairs);

        if ($data["isLastBatch"] && $i == $numRows - 1) {
            $content .= "}\n";
        } else {
            $content .= "},\n";
        }
    }

    if ($data["isLastBatch"]) {
        $content .= "];\n";
    }
    return $content;
}
*/
