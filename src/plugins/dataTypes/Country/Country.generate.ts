import { DTGenerateResult, DTGenerationData, DTMetadata } from '../../../../types/dataTypes';
import fullCountryList from './fullCountryList';
import { countryList, CountryType } from '../../../_plugins';
import { CountryState } from './Country.ui';
import { getRandomArrayValue } from '../../../utils/randomUtils';
import { loadCountryBundle } from '../../../utils/countryUtils';
import { GetCountryData } from '../../../../types/countries';


export const generate = (data: DTGenerationData): Promise<DTGenerateResult> => {
	return new Promise((resolve) => { // TODO error clause
		const { rowState, countryI18n } = data;
		const { source, selectedCountries } = rowState as CountryState;

		const hasFilteredCountryList = selectedCountries.length > 0;

		if (source === 'all') {
			resolve({ display: getRandomArrayValue(hasFilteredCountryList ? selectedCountries : fullCountryList) });
		} else {
			const randomCountry = getRandomArrayValue(hasFilteredCountryList ? selectedCountries : countryList) as CountryType;
			
			loadCountryBundle(randomCountry)
				.then((getData: GetCountryData) => {
					const data = getData(countryI18n[randomCountry]);
					resolve({
						display: data.countryName,
						slug: data.countrySlug
						// id: ''
					});
				});
		}
	});
};

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'string'
	},
	sql: {
		field: 'varchar(100) default NULL',
		field_Oracle: 'varchar2(100) default NULL',
		field_MSSQL: 'VARCHAR(100) NULL'
	}
});


/*
	protected $dataTypeFieldGroup = "geo";
	protected $dataTypeFieldGroupOrder = 50;
	protected $jsModules = array("Country.js");
	private $countries = array(...country list here....);
	private $numCountries;
	private $selectedCountrySlugs;
	private $numSelectedCountrySlugs;
	private $countryRegionData;
	private $numCountryRegionData;

	 For convenience, the constructor gets ALL country-plugin installed and stores all their data locally.
	 The individual generate() calls for each row filter out the country data it's not interested in.
	 @param string $runtimeContext
	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
		if ($runtimeContext == "generation") {
			$this->numCountries = count($this->countries);
			$this->countryRegionData = Core::$geoData->getCountryRegionHash();
			$this->numCountryRegionData = count($this->countryRegionData);
		}
	}

	public function generate($generator, $generationContextData) {
		$data = array();

		if ($generationContextData["generationOptions"] == "all") {
			$data["display"] = $this->countries[mt_rand(0, $this->numCountries-1)];
		} else {
			// pick a random country from whatever countries were selected
			$randomCountrySlug = $this->selectedCountrySlugs[mt_rand(0, $this->numSelectedCountrySlugs-1)];
			$randomCountry     = $this->countryRegionData[$randomCountrySlug];

			$data = array(
				"display" => $randomCountry["country"],
				"slug"    => $randomCountry["country_slug"],
				"id"      => $randomCountry["id"]
			);
		}
		return $data;
	}

	 * @see DataTypePlugin::getRowGenerationOptionsUI()
	public function getRowGenerationOptionsUI($generator, $postdata, $colNum, $numCols) {
		$selectedCountrySlugs = $generator->getCountries();

		$option = "all";
		if (isset($postdata["dtOption_$colNum"])) {
			$option = "countryPluginsOnly";
		}

		// if the user didn't select any countries and they checked the "limit to those countries selected above
		// option, there's nothing for us to generate. Just return false so the row is ignored. TODO: update the
		// JS code to throw an error
		if (empty($selectedCountrySlugs) && $option == "countryPluginsOnly") {
			return false;
		}

		$this->selectedCountrySlugs    = $selectedCountrySlugs;
		$this->numSelectedCountrySlugs = count($selectedCountrySlugs);

		return $option;
	}

	 * @see DataTypePlugin::getRowGenerationOptionsAPI()
	public function getRowGenerationOptionsAPI($generator, $json, $numCols) {
		$selectedCountrySlugs = $generator->getCountries();

		// if the user didn't select any countries and they checked the "limit to those countries selected above
		// option, there's nothing for us to generate. Just return false so the row is ignored
		if (empty($selectedCountrySlugs) && $json->settings->limitCountriesToSelectedPlugins) {
			return false;
		}

		$this->selectedCountrySlugs    = $selectedCountrySlugs;
		$this->numSelectedCountrySlugs = count($selectedCountrySlugs);

		return ($json->settings->limitCountriesToSelectedPlugins) ? "countryPluginsOnly" : "all";
	}

	public function getCountries($countrySlugs) {
		$whereClause = "";
		if (!empty($countrySlugs)) {
			$whereClause = "WHERE has_full_data_set = 'yes'";
			$slugClauses = array();
			foreach ($countrySlugs as $slug) {
				$slugClauses[] = "country_slug = '$slug'";
			}

			$slugClause = "(" . implode(" OR ", $slugClauses) . ")";
			$whereClause .= "AND $slugClause";
		}

		$prefix = Core::getDbTablePrefix();
		$response = Core::$db->query("
			SELECT *
			FROM   {$prefix}countries
			$whereClause
		");

		$countries = array();
		while ($countryInfo = mysqli_fetch_assoc($query)) {
			$countries[] = array(
				"country" => $countryInfo['country'],
				"id"      => $countryInfo['id'],
				"slug"    => $countryInfo["country_slug"]
			);
		}
		return $countries;
	}

	function getRegions($countryID) {
		$prefix = Core::getDbTablePrefix();
		$response = Core::$db->query("
			SELECT *
			FROM  {$prefix}regions
			WHERE country_id = $countryID
		");

		if ($response["success"]) {
			$regionInfo = array();
			while ($row = mysqli_fetch_assoc($response["results"])) {
				$regionInfo[] = $row;
			}
		}

		return $regionInfo;
	}
}
*/
