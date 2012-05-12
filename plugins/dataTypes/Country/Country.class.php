<?php


class DataType_Country extends DataTypePlugin {
  protected $dataTypeName = "Country";
  protected $dataTypeFieldGroup = "geo";
  protected $dataTypeFieldGroupOrder = 50;
  protected $includedFiles = array("Country.js");

  private $countries;

  public function generateItem($row, $placeholderStr, $existingRowData) {
	  //global $g_countries;
	  $random_country = $g_countries[rand(0, count($g_countries)-1)];
	  return array(
	    "display" => $random_country["country"],
	    "slug"    => $random_country["slug"],
	    "id"      => $random_country["id"]
	  );
  }

  public function getExportTypeInfo($exportType, $options) {
	  $info = "";
	  switch ($export_type)
	  {
	  	case "sql":
	  		if ($options == "MySQL" || $options == "SQLite")
	        $info = "varchar(100) default NULL";
	      else if ($options == "Oracle")
	        $info = "varchar2(100) default NULL";
	  	  break;
	  }

	  return $info;
  }


  public function getTemplateOptions($postdata, $col, $num_cols) {
		if (isset($postdata["option_$col"])) {
		  $g_countries = Country_get_countries($postdata["countryChoice"]);
		} else {
		  $g_countries = Country_get_countries();
		}
	  return "";
  }


  public function getOptionsColumnHTML($row) {
  	$html =<<< END
<input type="checkbox" name="option_$row" value="" id="option_$row" checked="checked" />
  <label for="option_$row">{$L["Country_limit_results"]}</label>
END;
    return $html;
  }


	// TODO

  /**
   * Returns an array of countries
   */
	function Country_get_countries($country_slugs = array())
	{
	  global $g_table_prefix;

	  $where_clause = "";
	  if (!empty($country_slugs))
	  {
	    $where_clause = "WHERE has_full_data_set = 'yes'";
	    $slug_clauses = array();
	    foreach ($country_slugs as $slug)
	    	$slug_clauses[] = "country_slug = '$slug'";

	    $slug_clause = "(" . implode(" OR ", $slug_clauses) . ")";
	    $where_clause .= "AND $slug_clause";
	  }

	  $query = mysql_query("
	    SELECT *
	    FROM   {$g_table_prefix}countries
	    $where_clause
	      ");

	  $countries = array();
	  while ($country_info = mysql_fetch_assoc($query))
	  {
	    $countries[] = array(
	      "country" => $country_info['country'],
	      "id"      => $country_info['id'],
	      "slug"    => $country_info["country_slug"]
	    );
	  }

	  return $countries;
	}


	function Country_get_regions($country_id)
	{
		global $g_table_prefix;

		$query = mysql_query("SELECT * FROM {$g_table_prefix}regions WHERE country_id = $country_id");
		$region_info = array();
		while ($row = mysql_fetch_assoc($query))
		{
			$region_info[] = $row;
		}

		return $region_info;
	}
}
