<?php

/**
 * @package DataTypes
 * @author Joeri Noort <joert@joert.net>
 */

class DataType_IBAN extends DataTypePlugin {

	protected $isEnabled = true;
	protected $dataTypeName = "Bank Account Numbers (IBAN)";
	protected $hasHelpDialog = true;
	protected $dataTypeFieldGroup = "human_data";
	protected $dataTypeFieldGroupOrder = 100;

	/**
	 * Template definition
	 * 	b :	NATIONAL_BANK_CODE
	 * 	i :	BIC_CODE
	 * 	d :	BRANCH_ID
	 * 	c :	ACCOUNT_NUMBER
	 * 	k :	IBAN_CHECKSUM
	 * 	x :	NATIONAL_CHECKSUM
	 * 	m :	MOD11_CHECKSUM
	 * 	t :	ACCOUNT_TYPE
	 * 	p :	PERSONAL_NUMBER
	 * 	n :	COUNTRY_CODE
	 *
	 * Based on http://en.wikipedia.org/wiki/International_Bank_Account_Number#IBAN_formats_by_country
	 * Corrected using various sources
	 * @var array
	 */
	private $allCountryCodes = array(
		array('code'=>'AL',	'sepa'=>false,	'template'=>'ALkkbbbddddxcccccccccccccccc',		'name'=>'Albania'),
		array('code'=>'AD',	'sepa'=>false,	'template'=>'ADkkbbbbddddcccccccccccc',			'name'=>'Andorra'),
		array('code'=>'AT',	'sepa'=>true,	'template'=>'ATkkbbbbbccccccccccc',				'name'=>'Austria'),
		array('code'=>'AZ',	'sepa'=>false,	'template'=>'AZkkbbbbcccccccccccccccccccc',		'name'=>'Azerbaijan'),
		array('code'=>'BE',	'sepa'=>true,	'template'=>'BEkkbbbcccccccxx',					'name'=>'Belgium'),
		array('code'=>'BH',	'sepa'=>false,	'template'=>'BHkkbbbbcccccccccccccc',			'name'=>'Bahrain'),
		array('code'=>'BA',	'sepa'=>false,	'template'=>'BAkkbbbdddccccccccxx',				'name'=>'Bosnia and Herzegovina'),
		array('code'=>'BG',	'sepa'=>true,	'template'=>'BGkkiiiiddddttcccccccc',			'name'=>'Bulgaria'),
		array('code'=>'CR',	'sepa'=>false,	'template'=>'CRkkbbbcccccccccccccc',			'name'=>'Costa Rica'),
		array('code'=>'HR',	'sepa'=>false,	'template'=>'HRkkbbbbbbbcccccccccc',			'name'=>'Croatia'),
		array('code'=>'CY',	'sepa'=>true,	'template'=>'CYkkbbbdddddcccccccccccccccc',		'name'=>'Cyprus'),
		array('code'=>'CZ',	'sepa'=>true,	'template'=>'CZkkbbbbddddddcccccccccc',			'name'=>'Czech Republic'),
		array('code'=>'DK',	'sepa'=>true,	'template'=>'DKkkbbbbcccccccccc',				'name'=>'Denmark'),
		array('code'=>'DO',	'sepa'=>false,	'template'=>'DOkkbbbbcccccccccccccccccccc',		'name'=>'Dominican Republic'),
		array('code'=>'EE',	'sepa'=>true,	'template'=>'EEkkbbddcccccccccccx',				'name'=>'Estonia'),
		array('code'=>'FO',	'sepa'=>false,	'template'=>'FOkkbbbbcccccccccx',				'name'=>'Faroe Islands'),
		array('code'=>'FI',	'sepa'=>true,	'template'=>'FIkkbbbbbbcccccccx',				'name'=>'Finland'),
		array('code'=>'FR',	'sepa'=>true,	'template'=>'FRkkbbbbbdddddcccccccccccxx',		'name'=>'France'),
		array('code'=>'GE',	'sepa'=>false,	'template'=>'GEkkbbcccccccccccccccc',			'name'=>'Georgia'),
		array('code'=>'DE',	'sepa'=>true,	'template'=>'DEkkbbbbbbbbcccccccccc',			'name'=>'Germany'),
		array('code'=>'GI',	'sepa'=>false,	'template'=>'GIkkiiiiccccccccccccccc',			'name'=>'Gibraltar'),
		array('code'=>'GR',	'sepa'=>true,	'template'=>'GRkkbbbddddcccccccccccccccc',		'name'=>'Greece'),
		array('code'=>'GL',	'sepa'=>false,	'template'=>'GLkkbbbbcccccccccc',				'name'=>'Greenland'),
		array('code'=>'GT',	'sepa'=>false,	'template'=>'GTkkbbbbcccccccccccccccccccc',		'name'=>'Guatemala'),
		array('code'=>'HU',	'sepa'=>true,	'template'=>'HUkkbbbddddxcccccccccccccccx',		'name'=>'Hungary'),
		array('code'=>'IS',	'sepa'=>true,	'template'=>'ISkkbbbbddccccccpppppppppp',		'name'=>'Iceland'),
		array('code'=>'IE',	'sepa'=>true,	'template'=>'IEkkiiiibbbbbbcccccccc',			'name'=>'Ireland'),
		array('code'=>'IL',	'sepa'=>false,	'template'=>'ILkkbbbnnnccccccccccccc',			'name'=>'Israel'),
		array('code'=>'IT',	'sepa'=>true,	'template'=>'ITkkxiiiiibbbbbcccccccccccc',		'name'=>'Italy'),
		array('code'=>'KZ',	'sepa'=>false,	'template'=>'KZkkbbbccccccccccccc',				'name'=>'Kazakhstan'),
		array('code'=>'KW',	'sepa'=>false,	'template'=>'KWkkbbbbcccccccccccccccccccccc',	'name'=>'Kuwait'),
		array('code'=>'LV',	'sepa'=>true,	'template'=>'LVkkiiiiccccccccccccc',			'name'=>'Latvia'),
		array('code'=>'LB',	'sepa'=>false,	'template'=>'LBkkbbbbcccccccccccccccccccc',		'name'=>'Lebanon'),
		array('code'=>'LI',	'sepa'=>true,	'template'=>'LIkkbbbbbcccccccccccc',			'name'=>'Liechtenstein'),
		array('code'=>'LT',	'sepa'=>true,	'template'=>'LTkkbbbbbccccccccccc',				'name'=>'Lithuania'),
		array('code'=>'LU',	'sepa'=>true,	'template'=>'LUkkbbbccccccccccccc',				'name'=>'Luxembourg'),
		array('code'=>'MK',	'sepa'=>false,	'template'=>'MKkkbbbccccccccccxx',				'name'=>'Macedonia'),
		array('code'=>'MT',	'sepa'=>true,	'template'=>'MTkkiiiidddddcccccccccccccccccc',	'name'=>'Malta'),
		array('code'=>'MR',	'sepa'=>false,	'template'=>'MRkkbbbbbdddddcccccccccccxx',		'name'=>'Mauritania'),
		array('code'=>'MU',	'sepa'=>false,	'template'=>'MUkkbbbbbbddcccccccccccccccccc',	'name'=>'Mauritius'),
		array('code'=>'MC',	'sepa'=>true,	'template'=>'MCkkbbbbbdddddcccccccccccxx',		'name'=>'Monaco'),
		array('code'=>'MD',	'sepa'=>false,	'template'=>'MDkkbbcccccccccccccccccc',			'name'=>'Moldova'),
		array('code'=>'ME',	'sepa'=>false,	'template'=>'MEkkbbbcccccccccccccxx',			'name'=>'Montenegro'),
		array('code'=>'NL',	'sepa'=>true,	'template'=>'NLkkiiiicccccccccc',				'name'=>'Netherlands'),
		array('code'=>'NO',	'sepa'=>true,	'template'=>'NOkkbbbbccccccx',					'name'=>'Norway'),
		array('code'=>'PK',	'sepa'=>false,	'template'=>'PKkkbbbbcccccccccccccccc',			'name'=>'Pakistan'),
		array('code'=>'PS',	'sepa'=>false,	'template'=>'PSkkbbbbxxxxxxxxxcccccccccccc',	'name'=>'Palestinian Territory, Occupied'),
		array('code'=>'PL',	'sepa'=>true,	'template'=>'PLkkbbbddddxcccccccccccccccc',		'name'=>'Poland'),
		array('code'=>'PT',	'sepa'=>true,	'template'=>'PTkkbbbbddddcccccccccccxx',		'name'=>'Portugal'),
		array('code'=>'RO',	'sepa'=>true,	'template'=>'ROkkiiiicccccccccccccccc',			'name'=>'Romania'),
		array('code'=>'SM',	'sepa'=>false,	'template'=>'SMkkxbbbbbdddddcccccccccccc',		'name'=>'San Marino'),
		array('code'=>'SA',	'sepa'=>false,	'template'=>'SAkkbbcccccccccccccccccc',			'name'=>'Saudi Arabia'),
		array('code'=>'RS',	'sepa'=>false,	'template'=>'RSkkbbbcccccccccccccxx',			'name'=>'Serbia'),
		array('code'=>'SK',	'sepa'=>true,	'template'=>'SKkkbbbbddddddcccccccccc',			'name'=>'Slovakia'),
		array('code'=>'SI',	'sepa'=>true,	'template'=>'SIkkbbdddccccccccxx',				'name'=>'Slovenia'),
		array('code'=>'ES',	'sepa'=>true,	'template'=>'ESkkbbbbddddxxcccccccccc',			'name'=>'Spain'),
		array('code'=>'SE',	'sepa'=>true,	'template'=>'SEkkbbbccccccccccccccccx',			'name'=>'Sweden'),
		array('code'=>'CH',	'sepa'=>true,	'template'=>'CHkkbbbbbcccccccccccc',			'name'=>'Switzerland'),
		array('code'=>'TN',	'sepa'=>false,	'template'=>'TNkkbbdddccccccccccccccc',			'name'=>'Tunisia'),
		array('code'=>'TR',	'sepa'=>false,	'template'=>'TRkkbbbbbxcccccccccccccccc',		'name'=>'Turkey'),
		array('code'=>'AE',	'sepa'=>false,	'template'=>'AEkkbbbcccccccccccccccc',			'name'=>'United Arab Emirates'),
		array('code'=>'GB',	'sepa'=>true,	'template'=>'GBkkiiiiddddddcccccccc',			'name'=>'United Kingdom'),
		array('code'=>'VG',	'sepa'=>false,	'template'=>'VGkkbbbbcccccccccccccccc',			'name'=>'Virgin Islands, British'),	
	);
	
	public $countryCodes;
	

	/**
	 * @todo make the $onlySepa option variable
	 * @param string $runtimeContext
	 */
	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
		$onlySepa = false;
		if ($runtimeContext == "generation") {
			foreach ($this->allCountryCodes as $details) {
				if (!$onlySepa || $details['sepa']) {
					$this->countryCodes[] = $details;
				}
			}
		}
	}
	
	public static function GenerateBic($countryCode) {
		$withBranchCode = mt_rand(0,1) == true;
		$branchCode = $withBranchCode ? 'xxX' : '';
		$format = 'LLLL'.$countryCode.'LL'.$branchCode;
		
		return Utils::generateRandomAlphanumericStr($format);
	}

	private static function FillTemplate($template, $countryCode) {
		$bic = self::GenerateBic($countryCode);
		$bicPos = 0;
		$len = strlen($template);
		$unsigned = '';
		for ($i=0; $i<$len; $i++) {
			$c = $template[$i];
			if (strtoupper($c) === $c) {
				$unsigned .= $c;
				continue;
			}
			if ($c === 'i') {
				$unsigned .= $bic{$bicPos++};
				continue;
			}
			if ($c === 'k') {
				$unsigned .= '_';
				continue;
			}
			$unsigned .= Utils::generateRandomAlphanumericStr('x');
		}
		return self::RecalculateChecksum($unsigned);
	}
	
	public function getRandomCountry() {
		return $this->countryCodes[mt_rand(0, count($this->countryCodes)-1)];
	}
	
	/**
	 * @todo Respect the selected country.
	 */
	public function generate($generator, $generationContextData) {
		$code = $this->getRandomCountry();
		$IBAN = self::FillTemplate($code['template'], $code['code']);
		return array(
			"display" => $IBAN
		);
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(34)",
			"SQLField_Oracle" => "varchar2(34)",
			"SQLField_MSSQL" => "VARCHAR(34) NULL"
		);
	}

	public function getHelpHTML() {
		return "<p>{$this->L["help"]}</p>";
	}
	
	private static function Chr2Int($chr) {
		if (strlen($chr) != 1) {
			throw new Exception("Requires a single character");
		}
		$ord = ord($chr);
	
		if ($ord <=57 && $ord >=48) { //48 = '0', 57 = '9'
			return $ord-48;
		}
		if ($ord <= 90 && $ord >= 65) { //90 = 'Z', 65 = 'A'
			return 10 + ($ord - 65);
		}
		throw new Exception("Input character {$chr}({$ord}) does not map to an integer");
	
	}
	
	private static function BigMod( $x, $y ) {
		// how many numbers to take at once? carefull not to exceed (int)
		$take = 5;
		$mod = '';
	
		do {
			$a = intval($mod.substr($x, 0, $take));
			$x = substr( $x, $take );
			$mod = $a % $y;
		} while (strlen($x));
	
		return intval($mod);
	}
	/**
	 * Removes the current checksum digits from an IBAN string, and replaces it with what it should have been.
	 */
	private static function RecalculateChecksum($ibanString) {
		if (strlen($ibanString) < 6) {
			return $ibanString;
		}
		
		$reordered =  substr($ibanString, 4).substr($ibanString, 0, 2);
		$numerical = '';
		for ($i=0; $i<strlen($reordered); $i++) {
			$numerical .= self::Chr2Int($reordered[$i]);
		}
		$numerical .= '00';
		
		$checksum = 98 - self::BigMod($numerical, 97);
		
		return substr($ibanString, 0, 2).str_pad($checksum,2, '0', STR_PAD_LEFT).substr($ibanString, 4);
	}
}
