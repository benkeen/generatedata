<?php

class DataType_PostalZip extends DataTypePlugin {
  protected $dataTypeName = "Postal / Zip";
  protected $dataTypeFieldGroup = "geo";
  protected $dataTypeFieldGroupOrder = 30;
  protected $processOrder = 2;

  private $helpDialogWidth = 320;

  // $PostalZip_formats       = PostalZip_get_country_zip_formats();
  //$g_countries = gd_get_configurable_countries();

  public function generateItem($row, $options, $existingRowData) {
	  global $PostalZip_formats;

	  // track the country info (this finds the FIRST country field listed)
	  $PostalZip_row_country_info = array();
	  while (list($key, $info) = each($existing_row_data))
	  {
	    if ($info["data_type_folder"] == "Country")
	    {
	      $PostalZip_row_country_info = $info;
	      break;
	    }
	  }

	  $random_zip = "";
	  if (empty($PostalZip_row_country_info))
	  {
	    $rand_country = $options[rand(0, count($options)-1)];
	    $random_zip = PostalZip_convert($PostalZip_formats[$rand_country]);
	  }
	  else
	  {
	    // if this country is one of the formats that was selected, generate it in that format -
	    // otherwise just generate a zip in any selected format
	    $country_slug = $PostalZip_row_country_info["random_data"]["slug"];

	    if (in_array($country_slug, $options))
	      $random_zip = PostalZip_convert($PostalZip_formats[$country_slug]);
	    else
	    {
	      $rand_country = $options[rand(0, count($options)-1)];
	      $random_zip = PostalZip_convert($PostalZip_formats[$rand_country]);
	    }
	  }

	  return $random_zip;
  }

  public function getExportTypeInfo($exportType, $options) {
	  $info = "";
	  switch ($export_type)
	  {
	  	case "sql":
	  		if ($options == "MySQL" || $options == "SQLite")
	        $info = "varchar(10) default NULL";
	      else if ($options == "Oracle")
	        $info = "varchar2(10) default NULL";
	  	  break;
	  }

	  return $info;
  }

	public function getTemplateOptions($postdata, $column, $numCols) {
	  //global $PostalZip_formats;

	  $country_choice = $postdata["countryChoice"];
	  $options = array();
	  foreach ($country_choice as $slug)
	  {
	    if (isset($postdata["includeZip_{$slug}_$col"]))
	      $options[] = $slug;
	  }

	  return $options;
	}

	public function getOptionsColumnHTML($row) {
    $html = "";
		foreach ($g_countries as $country_info) {
			$slug        = $country_info["country_slug"];
			$region_name = $country_info["region_name"];

			$html .= <<<EOF
		<div class="country_$slug">
			<input type="checkbox" name="includeZip_{$slug}_\$ROW\$" id="includeZip_{$slug}_\$ROW\$" checked />
			<label for="includeZip_{$slug}_\$ROW\$">$region_name</label>
		</div>
EOF;
		}
    return $html;
	}

	public function getHelpDialogInfo() {
    return array(
      "dialogWidth" => $this->helpDialogWidth,
      "content"     => "<p>{$L["PostalZip_help_text"]}</p>"
    );
	}


	// HELPERS

	private function PostalZip_get_country_zip_formats()
	{
	  global $g_table_prefix;

	  $query = mysql_query("
	    SELECT *
	    FROM   {$g_table_prefix}countries
	    WHERE  has_full_data_set = 'yes'
	      ");

	  $formats = array();
	  while ($row = mysql_fetch_assoc($query))
	  {
	    $formats[$row["country_slug"]] = $row["zip_format"];
	  }

	  return $formats;
	}


	private function PostalZip_convert($str)
	{
	  $formats = explode("|", $str);

	  if (count($formats) == 1)
	    $format = $formats[0];
	  else
	    $format = $formats[rand(0, count($formats)-1)];

	  return gd_generate_random_alphanumeric_str($format);
	}

}