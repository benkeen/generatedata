<?php

$LatLng_process_order = 1;
$LatLng_cached_math = array();

function LatLng_get_template_options($postdata, $col, $num_cols)
{
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


/**
 * Valid ranges:
 *   Lat: -90 -> + 90
 *   Lng: -180 -> +180
 */
function LatLng_generate_item($row, $options, $existing_row_data)
{
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


function LatLng_get_export_type_info($export_type, $options)
{
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
