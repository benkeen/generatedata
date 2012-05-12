<?php

class DataType_LatLng extends DataTypePlugin {
  protected $dataTypeName = "Latitude / Longitude";
  protected $dataTypeFieldGroup = "geo";
  protected $dataTypeFieldGroupOrder = 100;
  protected $includedFiles = array("LatLng.js");

  // $LatLng_cached_math = array();
  private $helpDialogWidth = 360;


	/**
	 * Valid ranges:
	 *   Lat: -90 -> + 90
	 *   Lng: -180 -> +180
	 */
  public function generateItem($row, $options, $existingRowData) {
	  global $LatLng_cached_math;

	  $info = array();
	  if ($options["lat"] && $options["lng"])
	  {
	  	$info[] = (mt_rand($LatLng_cached_math["min_lat_calc"], $LatLng_cached_math["max_lat_calc"]) / $LatLng_cached_math["divisor"]);
	    $info[] = (mt_rand($LatLng_cached_math["min_lng_calc"], $LatLng_cached_math["max_lng_calc"]) / $LatLng_cached_math["divisor"]);
	  }
	  else if ($options["lat"])
	  	$info[] = (mt_rand($LatLng_cached_math["min_lat_calc"], $LatLng_cached_math["max_lat_calc"]) / $LatLng_cached_math["divisor"]);
	  else if ($options["lng"])
	    $info[] = (mt_rand($LatLng_cached_math["min_lng_calc"], $LatLng_cached_math["max_lng_calc"]) / $LatLng_cached_math["divisor"]);

	  return join(", ", $info);
  }

  public function getExportTypeInfo($exportType, $options) {
	  $info = "";
	  switch ($export_type)
	  {
	  	case "sql":
	  		if ($options == "MySQL" || $options == "SQLite")
	        $info = "varchar(30) default NULL";
	      else
	        $info = "varchar2(30) default NULL";
	  	  break;
	  }

	  return $info;
  }

	public function getTemplateOptions($postdata, $column, $numCols) {
	  global $LatLng_cached_math;
	  if (!isset($postdata["includeLat_$col"]) && empty($postdata["includeLng_$col"]))
	    return false;

	  $options = array(
	    "lat" => isset($postdata["includeLat_$col"]) ? true : false,
	    "lng" => isset($postdata["includeLng_$col"]) ? true : false
	  );


	  // to 5 D.P. Arbitrary - should be configurable, but it should be good enough for most cases
	  $decimal_places = 5;
	  $LatLng_cached_math = array(
	    "min_lat_calc"   => -90 * (pow(10, $decimal_places)),
	    "max_lat_calc"   => 90 * (pow(10, $decimal_places)),
	    "min_lng_calc"   => -180 * (pow(10, $decimal_places)),
	    "max_lng_calc"   => 180 * (pow(10, $decimal_places)),
	    "divisor"        => pow(10, $decimal_places)
	  );

	  return $options;
	}

	public function getOptionsColumnHTML($row) {
    $html =<<<END
<input type="checkbox" name="includeLat_\$ROW\$" id="includeLat_\$ROW\$" checked /><label for="includeLat_\$ROW\$">{$L["LatLng_latitude"]}</label>&nbsp;
<input type="checkbox" name="includeLng_\$ROW\$" id="includeLng_\$ROW\$" checked /><label for="includeLng_\$ROW\$">{$L["LatLng_longitude"]}</label>
END;
    return $html;
	}


	public function getHelpDialogInfo() {
    return array(
      "dialogWidth" => $this->helpDialogWidth,
      "content"     => "<p>{$L["LatLng_help"]}</p>"
    );
	}
}