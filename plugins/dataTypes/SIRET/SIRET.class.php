<?php

/**
 * @package DataTypes
 * @author Fabrice Marquès <fabrice.marques@gmail.com>
 * @version v0.0.4 - add descript in help
 *				   - del extract NIC
 *				   - add split in SIRET
 * Edited by Ben Keen for a few style & core compatibility fixes and to make the Options column contain radio buttons.
 */

class DataType_SIRET extends DataTypePlugin {

	protected $isEnabled = true;
	protected $dataTypeName = "SIRET";
	protected $hasHelpDialog = true;
	protected $dataTypeFieldGroup = "human_data";
	protected $dataTypeFieldGroupOrder = 100;
	protected $jsModules = array("SIRET.js");

	// custom member vars for this Data Type
	private $rSIREN = '';
	private $rNIC = '';

	public function generate($generator, $generationContextData) {
		$myOption = $generationContextData["generationOptions"];

		self::generateSiret();
		if ($myOption == "SIRET") {
			$myResult = self::getSIREN() . '-' . self::getNIC();
		} else {
			$myResult = self::getSIREN();
		}

		return array(
			"display" => $myResult
		);
	}

	private function generateSiret() {	    	 	
		$sumSiren = 0;
		$sumSiret = 0;
		$cleSiren= 1;
		$cleSiret= 2;
		$minRan = 0;
		$maxRan = 9;
		$siren = '';
		
		// generation d'un siren valide
		for ($i=0; $i<8; $i++) {

			// on génére un nombre entre 0 et 9 
			$rand = mt_rand($minRan, $maxRan);

			// on concatène se nombre au siret
			$siren .= $rand; 

			/* Le numéro SIRET est composé de 14 chiffres,
			 *  dont un chiffre de contrôle (le dernier) qui permet de vérifier la validité du numéro de SIRET (SIREN + NIC).
			 *   Celui-ci est calculé suivant la formule de Luhn.
			 *   Le principe est le suivant : on multiplie les chiffres de rang impair à partir de la droite par 1, ceux de rang pair par 2 ;
			 *    la somme des chiffres obtenus doit être multiple de 10.
			 */
			$ctrlSiren = $rand * $cleSiren;
			$ctrlSiret = $rand * $cleSiret;

			// Si la valeur obtenu et supérieur ou egale à 10 il faut décomposer en 1+0 
			// ce qui équivaux à lui retirer 9
			// contôle pour le siren
			if ($ctrlSiren > 9) {
				$sumSiren += ($ctrlSiren-9);
			} else {
				$sumSiren += $ctrlSiren;
			}
			
			// contôle pour le siret
			if ($ctrlSiret > 9) {
				$sumSiret += ($ctrlSiret - 9);
			} else {
				$sumSiret += $ctrlSiret;
			}
			
			// mise à jour des clés
			if ($cleSiren == 1) {
				$cleSiren = 2;
				$cleSiret = 1;
			} else {
				$cleSiren = 1;
				$cleSiret = 2;
			}
		}  

		// la somme doit être congrue à zéro modulo 10
		$moduloSiren = ($sumSiren % 10);
		if ($moduloSiren == 0) {
			$diffSiren = 0;
		} else {
			$diffSiren = 10 - $moduloSiren;
		}

		$siren .= $diffSiren;

		// la cle du siren est ajouté au calcul du siret
		$ctrlSiret = $diffSiren * $cleSiret;

		// contôle pour le siret
		if ($ctrlSiret > 9) {
			$sumSiret += ($ctrlSiret - 9);
		} else {
			$sumSiret += $ctrlSiret;
		}
		
		// aon ajoute un début de NIC au siren
		$siret = $siren . "0000";

		// la somme doit être congrue à zéro modulo 10
		$moduloSiret = ($sumSiret % 10);
		if ($moduloSiret == 0) {
			$diffSiret = 0;
		} else {
			$diffSiret = 10 - $moduloSiret;
		}

		$siret .= $diffSiret;
		
		$this->rSIREN = substr($siret, 0, 9);
		$this->rNIC = substr($siret, 9, 14);
	}

	public function getRowGenerationOptionsUI($generator, $post, $colNum, $numCols) {
		if (!isset($post["dtOption_$colNum"]) || empty($post["dtOption_$colNum"])) {
			return false;
		}
		return $post["dtOption_$colNum"];
	}

	public function getRowGenerationOptionsAPI($generator, $post, $colNum, $numCols) {
		if (!isset($post["dtOption_$colNum"]) || empty($post["dtOption_$colNum"])) {
			return false;
		}
		return $post["dtOption_$colNum"];
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(14)",
			"SQLField_Oracle" => "varchar2(14)",
			"SQLField_MSSQL" => "VARCHAR(14) NULL"
		);
	}

	public function getSIREN() {
		return $this->rSIREN;
	}

	public function getNIC() {
		return $this->rNIC;
	}

	public function getHelpHTML() {
		$content =<<<EOF
	<p>
		{$this->L["DATA_TYPE"]["DESC"]}
	</p>
	<table cellpadding="0" cellspacing="1">
	<tr>
		<td><h4>{$this->L["SIRET"]}</h4></td>
		<td>{$this->L["type_SIRET"]}</td>
	</tr>
	<tr>
		<td><h4>{$this->L["SIREN"]}</h4></td>
		<td>{$this->L["type_SIREN"]}</td>
	</tr>
	<tr>
		<td colspan="2">&nbsp;</td>
	</tr>
	<tr>
		<td><h4>{$this->L["more_info"]}</h4></td>
		<td><a href="{$this->L["help_link"]}" target="_blank">WIKI SIRET</a></td>
	</tr>
	</table>
EOF;

		return $content;
	}
	
	public function getExampleColumnHTML() {
		$L = Core::$language->getCurrentLanguageStrings();

		$html =<<< END
	<select name="dtExample_%ROW%" id="dtExample_%ROW%" style="width:100%">
		<option value="">{$L["please_select"]}</option>
		<option value="SIRET">{$this->L["example_SIRET"]}</option>
		<option value="SIREN">{$this->L["example_SIREN"]}</option>
	</select>
END;
		return $html;
	}

	public function getOptionsColumnHTML() {
		return <<<END
<input type="radio" name="dtOption_%ROW%" id="dtOption_%ROW%_1" value="SIRET" checked="checked" style="margin-left: 4px" />
	<label for="dtOption_%ROW%_1">SIRET</label>
<input type="radio" name="dtOption_%ROW%" id="dtOption_%ROW%_2" value="SIREN" />
	<label for="dtOption_%ROW%_2">SIREN</label>
END;
	}
	
}
