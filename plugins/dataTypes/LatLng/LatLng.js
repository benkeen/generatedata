/*global $:false*/
define([
	"manager",
	"constants",
	"lang"
], function(manager, C, L) {

	"use strict";

	/**
	* @name LatLng
	* @description JS code for the LatLng Data Type.
	* @see DataType
	* @namespace
	*/

	var MODULE_ID = "data-type-LatLng";

	var _loadRow = function(rowNum, data) {
		return {
			execute: function() {},
			isComplete: function() {
				if ($("#dtLatLng_Lng" + rowNum).length) {
					if (data.lat) {
						$("#dtLatLng_Lat" + rowNum).attr("checked", "checked");
					} else {
						$("#dtLatLng_Lat" + rowNum).removeAttr("checked");
					}
					if (data.lng) {
						$("#dtLatLng_Lng" + rowNum).attr("checked", "checked");
					} else {
						$("#dtLatLng_Lng" + rowNum).removeAttr("checked");
					}
					return true;
				} else {
					return false;
				}
			}
		};
	};

	var _saveRow = function(rowNum) {
		return {
			"lat": ($("#dtLatLng_Lat" + rowNum).attr("checked")) ? "checked" : "",
			"lng": ($("#dtLatLng_Lng" + rowNum).attr("checked")) ? "checked" : ""
		};
	};

	// register our module
	manager.registerDataType(MODULE_ID, {
		loadRow: _loadRow,
		saveRow: _saveRow
	});

});