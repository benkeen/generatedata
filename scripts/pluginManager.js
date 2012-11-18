"use strict";

/**
 * Used in the installation and Setting tab. This contains the code to install all plugins and
 * display the success / error response.
 *
 * It requires the page to contain the following markup, where it will be inserting the result of the
 * installation.
 *
 *  	<div id="pluginInstallationResults" class="hidden">
 *  		<div>
 *  			<h4>1. Data Types</h4>
 *  			<div id="gdDataTypeResponse" class="gdResponse"></div>
 *  		</div>
 *  		<div>
 *  			<h4>2. Export Types</h4>
 *  			<div id="gdExportTypeResponse" class="gdResponse"></div>
 *  		</div>
 *  		<div>
 *  			<h4>3. Countries</h4>
 *  			<div id="gdCountriesResponse" class="gdResponse"></div>
 *  		</div>
 *  	</div>
 *  	<div class="gdClear"></div>
 */
define([
	"manager",
	"lang",
	"utils",
	"jquery-ui",
	"jquery-json",
], function(manager, L, utils) {

	// used as an iterator to install the plugins one by one
	var _currIndex = 0;
	var _errorHandler = null;
	var _onCompleteHandler = null;

	var _successfullyInstalledDataTypes = [];
	var _successfullyInstalledExportTypes = [];
	var _successfullyInstalledCountries = [];

	// TODO: ensure params should be required
	var _installPlugins = function(params) {
		_errorHandler      = params.errorHandler;
		_onCompleteHandler = params.onCompleteHandler;
		$("#gdPluginInstallationResults").removeClass("hidden");
		$("#gdPluginInstallationResults .gdResponse").html("");
		_installDataTypes();
	}

	var _installDataTypes = function() {
		$.ajax({
			url: "ajax.php",
			type: "POST",
			dataType: "json",
			data: {
				action: "installationDataTypes",
				index: _currIndex
			},
			success: _installDataTypeResponse,
			error: _errorHandler
		});
	}

	var _installDataTypeResponse = function(json) {
		// once all data types are installed, send the list of successful installations to the server
		if (json.isComplete) {
			$.ajax({
				url: "ajax.php",
				type: "POST",
				dataType: "json",
				data: {
					action: "installationSaveDataTypes",
					folders: _successfullyInstalledDataTypes.toString()
				},
				success: function(json) {
					// now proceed to the Export Types
					_currIndex = 0;
					_installExportTypes();
				},
				error: _errorHandler
			});
		} else {
			var str = "";
			if (json.success) {
				str = json.dataTypeName + " <span class=\"gdSuccess\">success</span>";
				_successfullyInstalledDataTypes.push(json.dataTypeFolder);
			} else {
				str = json.dataTypeName + " <span class=\"gdError\" data-error=\"" + json.content + "\">error</span>";
			}
			$("#gdDataTypeResponse").append("<div>" + str + "</div>");

			_currIndex++;
			_installDataTypes();
		}
	}

	var _installExportTypes = function() {
		$.ajax({
			url: "ajax.php",
			type: "POST",
			dataType: "json",
			data: {
				action: "installationExportTypes",
				index: _currIndex
			},
			success: _installExportTypesResponse,
			error: _errorHandler
		});
	}


	var _installExportTypesResponse = function(json) {
		if (json.isComplete) {
			$.ajax({
				url: "ajax.php",
				type: "POST",
				dataType: "json",
				data: {
					action: "installationSaveExportTypes",
					folders: _successfullyInstalledExportTypes.toString()
				},
				success: function(json) {
					_currIndex = 0;
					_installCountries();
				},
				error: _errorHandler
			});
		} else {
			var str = "";
			if (json.success) {
				str = json.exportTypeName + " <span class=\"gdSuccess\">success</span>";
				_successfullyInstalledExportTypes.push(json.exportTypeFolder);
			} else {
				str = json.exportTypeName + " <span class=\"gdError\" data-error=\"" + json.content + "\">error</span>";
			}
			$("#gdExportTypeResponse").append("<div>" + str + "</div>");

			_currIndex++;
			_installExportTypes();
		}
	}


	var _installCountries = function(index) {
		$.ajax({
			url: "ajax.php",
			type: "POST",
			dataType: "json",
			data: {
				action: "installationCountries",
				index: _currIndex
			},
			success: _installCountriesResponse,
			error: _errorHandler
		});
	}

	var _installCountriesResponse = function(json) {
		if (json.isComplete) {
			$.ajax({
				url: "ajax.php",
				type: "POST",
				dataType: "json",
				data: {
					action: "installationSaveCountries",
					folders: _successfullyInstalledCountries.toString()
				},
				success: function(json) {
					_currIndex = 0;
					if ($.isFunction(_onCompleteHandler)) {
						_onCompleteHandler();
					}
				},
				error: _errorHandler
			});
		} else {
			var str = "";
			if (json.success) {
				str = json.countryName + " <span class=\"gdSuccess\">success</span>";
				_successfullyInstalledCountries.push(json.countryFolder);
			} else {
				str = json.countryName + " <span class=\"gdError\" data-error=\"" + json.content + "\">error</span>";
			}
			$("#gdCountriesResponse").append("<div>" + str + "</div>");

			_currIndex++;
			_installCountries();
		}
	}


	/**
	 * Our public API.
	 */
	return {
		installPlugins: _installPlugins
	}

});