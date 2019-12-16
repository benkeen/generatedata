import React from 'react';

export const state = {
	lat: true,
	lng: true
};

export const Options = ({ i18n, data, id }) => (
	<>
		<input type="checkbox" id={`${id}-lat`} checked={data.lat}/>
		<label htmlFor={`${id}-lat`}>{i18n.latitude}</label>&nbsp;
		<input type="checkbox" id={`${id}-lng`} checked={data.lng}/>
		<label htmlFor={`${id}-lng`}>{i18n.longitude}</label>
	</>
);


export const Help = ({ i18n }) => (
	<p>{i18n.DATA_TYPE.DESC}</p>
);

// var _loadRow = function (rowNum, data) {
// 	return {
// 		execute: function () {
// 		},
// 		isComplete: function () {
// 			if ($("#dtLatLng_Lng" + rowNum).length) {
// 				if (data.lat) {
// 					$("#dtLatLng_Lat" + rowNum).attr("checked", "checked");
// 				} else {
// 					$("#dtLatLng_Lat" + rowNum).removeAttr("checked");
// 				}
// 				if (data.lng) {
// 					$("#dtLatLng_Lng" + rowNum).attr("checked", "checked");
// 				} else {
// 					$("#dtLatLng_Lng" + rowNum).removeAttr("checked");
// 				}
// 				return true;
// 			} else {
// 				return false;
// 			}
// 		}
// 	};
// };
