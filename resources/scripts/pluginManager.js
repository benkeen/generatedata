/*global $:false,define:false*/
define([
	"lang",
  "constants",
  "utils"
], function(L, C, utils) {

	"use strict";

	// used as an iterator to install the plugins one by one
	var _context = "reset"; // reset / installation
	var _errorHandler = null;
	var _onCompleteHandler = null;
	var _successfullyInstalledDataTypes = [];
	var _successfullyInstalledExportTypes = [];
	var _successfullyInstalledCountries = [];


	var _installPlugins = function(params) {

    // installing the plugins takes place in two places: initial installation + for an existing installation when
    // the user wants to reset them
		_context = ($("body").hasClass("gdInstallPage")) ? "installation" : "reset";
    _errorHandler      = params.errorHandler;
		_onCompleteHandler = params.onCompleteHandler;
    var $pluginsSection = $("#gdPlugins");
		$pluginsSection.removeClass("hidden").css("display", "none").show("fade");

    // show the loading spinner for the three plugin types: data, export, country
    utils.insertSpinner('dtLoading', $("#gdDataTypePluginListIndicator")[0], C.SPINNERS.SMALL);
    utils.insertSpinner('etLoading', $("#gdExportTypePluginListIndicator")[0], C.SPINNERS.SMALL);
    utils.insertSpinner('cLoading', $("#gdCountryPluginListIndicator")[0], C.SPINNERS.SMALL);

    //$("#gdPluginInstallationResults .gdResponse").html("");
    _installDataTypes();
	};

	var _installDataTypes = function() {
    utils.playSpinner('dtLoading');

		$.ajax({
			url: "ajax.php",
			type: "POST",
			dataType: "json",
			data: {
				action: _context + "DataTypes"
			},
			success: _installDataTypeResponse,
			error: _errorHandler
		});
	};

	var _installDataTypeResponse = function(json) {
    _successfullyInstalledDataTypes = json.content;

    $("#gdDataTypePluginListIndicator").html("<span class=\"gdPluginCount\">" + json.content.total + "</span>");
    _addDataTypeList();

//    _installExportTypes();
	};

	var _installExportTypes = function() {
		$.ajax({
			url: "ajax.php",
			type: "POST",
			dataType: "json",
			data: {
				action: _context + "ExportTypes"
			},
			success: _installExportTypesResponse,
			error: _errorHandler
		});
	};

	var _installExportTypesResponse = function(json) {
  //  _installCountries();
  };

	var _installCountries = function() {
		$.ajax({
			url: "ajax.php",
			type: "POST",
			dataType: "json",
			data: {
				action: _context + "Countries"
			},
			success: _installCountriesResponse,
			error: _errorHandler
		});
	};

	var _installCountriesResponse = function(json) {
    //_runPostProcesses();
	};

	/**
	 * After all plugin information has been sent to the server, run whatever post-processes are needed.
	 * @private
	 */
	var _runPostProcesses = function() {
		$.ajax({
			url: "ajax.php",
			type: "POST",
			dataType: "json",
			data: {
				action: "updatedPluginsPostProcess"
			},
			success: function() {
				if ($.isFunction(_onCompleteHandler)) {
					_onCompleteHandler();
				}
			},
			error: _errorHandler
		});
	};

  var _addDataTypeList = function () {
    var html = '';
    for (var i=0; i<_successfullyInstalledDataTypes.results.length; i++) {
      var currGroup = _successfullyInstalledDataTypes.results[i];
      html += '<li class="gdGroupName">' + currGroup.group_name + '</li>';

      for (var j=0; j<currGroup.data_types.length; j++) {
        var currDataType = currGroup.data_types[j];
        html += '<li>' +
            '<input type="checkbox" id="plugin-dt-' + currDataType.folder + '" name="selectedDataTypes[]" value="' + currDataType.folder + '" checked="checked" />' +
            '<label for="plugin-dt-' + currDataType.folder + '">' + currDataType.name + '</label>' +
          '</li>';
      }
    }
    $("#gdDataTypeList").html('<ul>' + html + '</ul>').removeClass("hidden").css("display", "none").show("fade");
  };


	/**
	 * Our public API.
	 */
	return {
		installPlugins: _installPlugins
	};

});
