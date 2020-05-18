import { DTMetadata, DTGenerateResult, DTGenerationData } from '../../../../types/dataTypes';
import { loadCountryBundle } from '../../../utils/countryUtils';
import { GetCountryData, Region } from '../../../../types/countries';
import { getRandomArrayValue } from '../../../utils/randomUtils';
import { countryList, CountryType } from '../../../_plugins';

export const generate = (data: DTGenerationData): Promise<DTGenerateResult> => {
	const { rowState, countryI18n } = data;
	const { source, selectedCountries } = rowState;

	return new Promise((resolve) => {
		let country: CountryType;
		let regionRow: any;
		if (source === 'row') {
			regionRow = data.existingRowData.find(({ id }) => id === rowState.targetRowId);
			country = regionRow!.data.countryDataType;
		} else if (source === 'any') {
			country = getRandomArrayValue(countryList as CountryType[]);
		} else {
			const list = rowState.selectedCountries.length ? selectedCountries : countryList;
			country = getRandomArrayValue(list);
		}

		loadCountryBundle(country)
			.then((getCountryData: GetCountryData) => {
				const countryData = getCountryData(countryI18n[country]);

				let selectedRegion;
				if (regionRow) {
					selectedRegion = countryData.regions.find((i: Region) => i.regionName === regionRow!.data.display);
				} else {
					selectedRegion = getRandomArrayValue(countryData.regions);
				}
				resolve({
					display: getRandomArrayValue(selectedRegion!.cities)
				});
			});
	});
};


// Called when the plugin is initialized during data generation. Initializes the
// $citiesByCountryRegion private var.
// const initCityList = () => {

// $cities = array();
// $citiesByCountryRegion = array();
// while ($cityInfo = mysqli_fetch_assoc($response["results"])) {
//     $currCountrySlug = $cityInfo["country_slug"];
//     $currRegionSlug  = $cityInfo["region_slug"];
//     if (!array_key_exists($currCountrySlug, $citiesByCountryRegion)) {
//         $citiesByCountryRegion[$currCountrySlug] = array(
//             "numRegions" => 0,
//             "regions" => array()
//     );
//     }
//     if (!array_key_exists($currRegionSlug, $citiesByCountryRegion[$currCountrySlug]["regions"])) {
//         $citiesByCountryRegion[$currCountrySlug]["regions"][$currRegionSlug] = array(
//             "numCities" => 0,
//             "cities" => array()
//     );
//         $citiesByCountryRegion[$currCountrySlug]["numRegions"]++;
//     }
//     $citiesByCountryRegion[$currCountrySlug]["regions"][$currRegionSlug]["cities"][] = array(
//         "city"    => $cityInfo["city"],
//         "city_id" => $cityInfo["city_id"]
// );
//     $citiesByCountryRegion[$currCountrySlug]["regions"][$currRegionSlug]["numCities"]++;
//     $cities[] = $cityInfo["city"];
// }
//
// // now we've put together all the info, add in "numRegions" and "numCities" hash keys
// // at the appropriate spots in the data structure. This'll help speed up the data generation
// $this->citiesByCountryRegion = $citiesByCountryRegion;
// $this->cities = $cities;
// $this->numCities = count($cities);
// };


export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'varchar(255)',
		field_Oracle: 'varchar2(255)',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});

/*
public function generate($generator, $generationContextData) {
    // see if this row has a region [N.B. This is something that could be calculated ONCE on the first row]
    $rowRegionInfo = array();
    while (list($key, $info) = each($generationContextData["existingRowData"])) {
        if ($info["dataTypeFolder"] == "Region") {
            $rowRegionInfo = $info;
            break;
        }
    }
    reset($generationContextData["existingRowData"]);

    // if there was no region specified, see if this row has a country [N.B. This is also
    // something that could be calculated ONCE on the first row]
    $rowCountryInfo = array();
    if (empty($rowRegionInfo)) {
        while (list($key, $info) = each($generationContextData["existingRowData"])) {
            if ($info["dataTypeFolder"] == "Country") {
                $rowCountryInfo = $info;
                break;
            }
        }
    }

    $randomCity = "";
    if (!empty($rowRegionInfo)) {
        $countrySlug = $rowRegionInfo["randomData"]["country_slug"];
        $regionSlug  = $rowRegionInfo["randomData"]["region_slug"];

        // now pick the random city in the country-region specified
        // TODO bug here (when user unselected particular row regions)
        $numCitiesInRegion = $this->citiesByCountryRegion[$countrySlug]["regions"][$regionSlug]["numCities"];
        $citiesInRegion    = $this->citiesByCountryRegion[$countrySlug]["regions"][$regionSlug]["cities"];
        $randomCity = $citiesInRegion[mt_rand(0, $numCitiesInRegion-1)]["city"];

    } else if (!empty($rowCountryInfo)) {

        // pick a random region in this country. If the existing row data had a slug, it means there's
        // a country-plugin for that country, so we can intelligently load a City
        if (isset($rowCountryInfo["randomData"]["slug"])) {
            $countrySlug = $rowCountryInfo["randomData"]["slug"];
            $countryRegions    = $this->citiesByCountryRegion[$countrySlug]["regions"];
            $key = array_rand($countryRegions);
            $cities = $countryRegions[$key]["cities"];
            $numCities = $countryRegions[$key]["numCities"];
            $randomCity = $cities[mt_rand(0, $numCities-1)]["city"];
        } else {
            $randomCity = $this->cities[mt_rand(0, $this->numCities-1)];
        }
    } else {
        $randomCity = $this->cities[mt_rand(0, $this->numCities-1)];
    }

    return array(
        "display" => $randomCity
);
}
*/
