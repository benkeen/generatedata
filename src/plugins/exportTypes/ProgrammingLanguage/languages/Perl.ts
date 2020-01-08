/*
	private function generatePerl($data)
	{
		$content = "";
		if ($data["isFirstBatch"]) {
			$content .= "@data = (\n";
		}

		$numCols = count($data["colData"]);
		$numRows = count($data["rowData"]);

		for ($i = 0; $i < $numRows; $i++) {
			$content .= "\t{";

			$pairs = array();
			for ($j = 0; $j < $numCols; $j++) {
				$varName = preg_replace('/"/', '\"', $data["colData"][$j]);
				$currValue = $data["rowData"][$i][$j];
				if ($this->isNumeric($j, $currValue) || $this->isBoolean($j, $currValue)) {
					$pairs[] = "\"$varName\" => {$currValue}";
				} else {
					$pairs[] = "\"$varName\" => \"{$currValue}\"";
				}
			}
			$content .= implode(",", $pairs);

			if ($data["isLastBatch"] && $i == $numRows - 1) {
				$content .= "}\n";
			} else {
				$content .= "},\n";
			}
		}

		if ($data["isLastBatch"]) {
			$content .= ");";
		}
		return $content;
	}
 */
