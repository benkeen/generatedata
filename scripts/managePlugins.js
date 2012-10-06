/**
 * Used in the installation and Setting tab. This contains the code to re-install all plugins and
 * interact with the
 */
define([
	"manager",
	"lang",
	"utils",
	"jquery-ui",
	"jquery-json",
], function(manager, L, utils) {


	function installDataTypes() {
		$.ajax({
			url: "ajax.php",
			type: "POST",
			dataType: "json",
			data: {
				action: "installation_data_types",
				index: _currIndex
			},
			success: installDataTypeResponse,
			error: installError
		});
	}

	function installDataTypeResponse(json) {
		// once all data types are installed, send the list of successful installations to the server
		if (json.isComplete) {
			$.ajax({
				url: "ajax.php",
				type: "POST",
				dataType: "json",
				data: {
					action: "installation_save_data_types",
					folders: _successfullyInstalledDataTypes.toString()
				},
				success: function(json) {
					// now proceed to the Export Types
					_currIndex = 0;
					installExportTypes();
				},
				error: installError
			});
		} else {
			var str = "";
			if (json.success) {
				str = json.dataTypeName + " <span class=\"gdSuccess\">success</span>";
				_successfullyInstalledDataTypes.push(json.dataTypeFolder);
			} else {
				str = json.dataTypeName + " <span class=\"gdError\" data-error=\"" + json.message + "\">error</span>";
			}
			$("#gdDataTypeResponse").append("<div>" + str + "</div>");

			_currIndex++;
			installDataTypes();
		}
	}

	function installExportTypes() {
		$.ajax({
			url: "ajax.php",
			type: "POST",
			dataType: "json",
			data: {
				action: "installation_export_types",
				index: _currIndex
			},
			success: installExportTypesResponse,
			error: installError
		});
	}


	function installExportTypesResponse(json) {
		if (json.isComplete) {
			$.ajax({
				url: "ajax.php",
				type: "POST",
				dataType: "json",
				data: {
					action: "installation_save_export_types",
					folders: _successfullyInstalledExportTypes.toString()
				},
				success: function(json) {
					_currIndex = 0;
					installCountries();
				},
				error: installError
			});
		} else {
			var str = "";
			if (json.success) {
				str = json.exportTypeName + " <span class=\"gdSuccess\">success</span>";
				_successfullyInstalledExportTypes.push(json.exportTypeFolder);
			} else {
				str = json.exportTypeName + " <span class=\"gdError\" data-error=\"" + json.message + "\">error</span>";
			}
			$("#gdExportTypeResponse").append("<div>" + str + "</div>");

			_currIndex++;
			installExportTypes();
		}
	}


	function installCountries(index) {
		$.ajax({
			url: "ajax.php",
			type: "POST",
			dataType: "json",
			data: {
				action: "installation_countries",
				index: _currIndex
			},
			success: installCountriesResponse,
			error: installError
		});

		utils.stopProcessing();
	}

	function installCountriesResponse(json) {
		if (json.isComplete) {
			$.ajax({
				url: "ajax.php",
				type: "POST",
				dataType: "json",
				data: {
					action: "installation_save_countries",
					folders: _successfullyInstalledCountries.toString()
				},
				success: function(json) {
					_currIndex = 0;
					$("#gdInstallPluginsBtn").html("Continue &raquo;").show();
					_currStep++;
					_pluginsInstalled = true;
				},
				error: installError
			});
		} else {
			var str = "";
			if (json.success) {
				str = json.countryName + " <span class=\"gdSuccess\">success</span>";
				_successfullyInstalledCountries.push(json.countryFolder);
			} else {
				str = json.countryName + " <span class=\"gdError\" data-error=\"" + json.message + "\">error</span>";
			}
			$("#gdCountriesResponse").append("<div>" + str + "</div>");

			_currIndex++;
			installCountries();
		}
	}


	function gotoNextStep(step) {
		$("#nav" + step).removeClass("selected").addClass("complete");
		$("#page" + step).addClass("hidden");

		var nextStep = step + 1;
		$("#nav" + nextStep).addClass("selected");
		$("#page" +  nextStep).removeClass("hidden");
	}


	/**
	 * Display the installation response. This contains details about all Data Types, Export Types and Country-specific
	 * data installed.
	 */
	function continueInstallationProcess(json) {
		utils.stopProcessing();
		if (json.success) {
			_displayError(json.message);
		} else {
			utils.displayMessage("gdInstallMessage", json.message);
		}
		return;
	}


});