/*global $:false,define:false*/
define([
  "manager",
	"lang",
  "constants",
  "utils"
], function(manager, L, C, utils) {

	"use strict";

	// used as an iterator to install the plugins one by one
  var MODULE_ID = 'core-pluginManager';
	var _errorHandler = null;
	var _onCompleteHandler = null;
	var _dataTypes = [];
	var _exportTypes = [];
	var _countries = [];

  var _run = function () {
    $(document).on('change', '.toggleDataTypeSection', function (e) {
      $(e.target).closest('ul').find("input").not('.toggleDataTypeSection').prop('checked', e.target.checked);
    });
    $(document).on('change', '#gdExportTypePluginList', function (e) {
      $("#gdExportTypeList").find("input").prop('checked', e.target.checked);
    });
    $(document).on('change', '#gdCountryPluginList', function (e) {
      $("#gdCountryList").find("input").prop('checked', e.target.checked);
    });
  };

	var _installPlugins = function(params) {
    _errorHandler      = params.errorHandler;
		_onCompleteHandler = params.onCompleteHandler;
    var $pluginsSection = $("#gdPlugins");
		$pluginsSection.removeClass("hidden").css("display", "none").show("fade");
    $("#gdInstallPluginsBtn").hide();
    $("#gdInstallPluginsBtn").on("click", _submit);

    // show the loading spinner for the three plugin types: data, export, country
    utils.insertSpinner('dtLoading', $("#gdDataTypePluginListIndicator")[0], C.SPINNERS.SMALL);
    utils.insertSpinner('etLoading', $("#gdExportTypePluginListIndicator")[0], C.SPINNERS.SMALL);
    utils.insertSpinner('cLoading', $("#gdCountryPluginListIndicator")[0], C.SPINNERS.SMALL);

    //$("#gdPluginInstallationResults .gdResponse").html("");

    _installDataTypes();
	};

  function _displayError(message) {
    $("#page4 .gdInstallTabMessage .gdResponse").html(message);
    $("#page4 .gdInstallTabMessage").addClass("gdInstallError").show();
  }

  var _submit = function (e) {
    e.preventDefault();

    // check at least one of the different plugin types have been selected
    var selectedDataTypes = [];
    $(".selectedDataType").each(function (i, el) {
      if (el.checked) {
        selectedDataTypes.push(el.value);
      }
    });
    if (selectedDataTypes.length === 0) {
      window.scrollTo(0, 0);
      _displayError(L.validation_no_data_types);
      return;
    }

    var selectedExportTypes = [];
    $(".selectedExportType").each(function (i, el) {
      if (el.checked) {
        selectedExportTypes.push(el.value);
      }
    });
    if (selectedExportTypes.length === 0) {
      window.scrollTo(0, 0);
      _displayError(L.validation_no_export_types);
      return;
    }

    var selectedCountries = [];
    $(".selectedCountry").each(function (i, el) {
      if (el.checked) {
        selectedCountries.push(el.value);
      }
    });
    if (selectedCountries.length === 0) {
      window.scrollTo(0, 0);
      _displayError(L.validation_no_countries);
      return;
    }

    $.ajax({
      url: "ajax.php",
      type: "POST",
      dataType: "json",
      data: {
        action: "selectPlugins", // updatedPluginsPostProcess
        dataTypes: selectedDataTypes,
        exportTypes: selectedExportTypes,
        countries: selectedCountries
      },
      success: function() {
        if ($.isFunction(_onCompleteHandler)) {
          _onCompleteHandler();
        }
      },
      error: _errorHandler
    });

  };

	var _installDataTypes = function() {
    utils.playSpinner('dtLoading');
		$.ajax({
			url: "ajax.php",
			type: "POST",
			dataType: "json",
			data: {
				action: "installDataTypes"
			},
			success: _installDataTypeResponse,
			error: _errorHandler
		});
	};

	var _installDataTypeResponse = function(json) {
    _dataTypes = json.content;
    $("#gdDataTypePluginListIndicator").html("<span class=\"gdPluginCount\">" + json.content.total + "</span>");
    _addDataTypeList();
    _installExportTypes();
	};

	var _installExportTypes = function() {
    utils.playSpinner('etLoading');
    $.ajax({
			url: "ajax.php",
			type: "POST",
			dataType: "json",
			data: {
				action: "installExportTypes"
			},
			success: _installExportTypesResponse,
			error: _errorHandler
		});
	};

	var _installExportTypesResponse = function(json) {
    _exportTypes = json.content;
    $("#gdExportTypePluginListIndicator").html("<span class=\"gdPluginCount\">" + json.content.total + "</span>");
    $("#gdExportTypePluginList").removeProp("disabled").prop("checked", true);
    _addExportTypeList();
    _installCountries();
  };

	var _installCountries = function() {
		$.ajax({
			url: "ajax.php",
			type: "POST",
			dataType: "json",
			data: {
				action: "installCountries"
			},
			success: _installCountriesResponse,
			error: _errorHandler
		});
	};

	var _installCountriesResponse = function(json) {
    _countries = json.content;
    $("#gdCountryPluginListIndicator").html("<span class=\"gdPluginCount\">" + json.content.total + "</span>");
    $("#gdCountryPluginList").removeProp("disabled").prop("checked", true);
    _addCountryList();
    _showContinueButton();
	};

  var _addDataTypeList = function () {
    var html = '';
    for (var i=0; i<_dataTypes.results.length; i++) {
      var currGroup = _dataTypes.results[i];
      html += '<ul>' +
              '<li class="gdGroupName"><input type="checkbox" class="toggleDataTypeSection" id="dtGroup-' + i + '" checked="checked" />' +
              '<label for="dtGroup-' + i + '">' + utils.decodeUTF8(currGroup.group_name) + '</label></li>';

      for (var j=0; j<currGroup.data_types.length; j++) {
        var currDataType = currGroup.data_types[j];
        html += '<li>' +
            '<input type="checkbox" id="plugin-dt-' + currDataType.folder + '" name="selectedDataTypes" class="selectedDataType" ' +
              'value="' + currDataType.folder + '" checked="checked" />' +
            '<label for="plugin-dt-' + currDataType.folder + '">' + utils.decodeUTF8(currDataType.name) + '</label>' +
            '<span class="gdTooltip';

        if (currDataType.desc) {
          html += ' gdHasTooltip tooltip-right" data-tooltip="' + utils.decodeUTF8(currDataType.desc) + '">';
        } else {
          html += '">';
        }
        html += '</span></li>';
      }
      html += '</ul>';
    }
    $("#gdDataTypeList").html(html).removeClass("hidden").css("display", "none").show("fade");
  };


  var _addExportTypeList = function () {
    var html = '';
    for (var i=0; i<_exportTypes.results.length; i++) {
      var currExportType = _exportTypes.results[i];
      html += '<li>' +
        '<input type="checkbox" id="plugin-et-' + currExportType.folder + '" name="selectedExportTypes" class="selectedExportType" value="' + currExportType.folder + '" checked="checked" />' +
        '<label for="plugin-et-' + currExportType.folder + '">' + currExportType.name + '</label>' +
      '</li>';
    }
    $("#gdExportTypeList").html('<ul>' + html + '</ul>').removeClass("hidden").css("display", "none").show("fade");
  };


  var _addCountryList = function () {
    var html = '';
    for (var i=0; i<_countries.results.length; i++) {
      var currCountry = _countries.results[i];
      html += '<li>' +
      '<input type="checkbox" id="plugin-c-' + currCountry.folder + '" name="selectedCountry" class="selectedCountry" value="' + currCountry.folder + '" checked="checked" />' +
      '<label for="plugin-c-' + currCountry.folder + '">' + currCountry.name + '</label>' +
      '</li>';
    }
    $("#gdCountryList").html('<ul>' + html + '</ul>').removeClass("hidden").css("display", "none").show("fade");
  };

  var _showContinueButton = function () {
    $("#gdInstallPluginsBtn").html(L.continue_rightarrow).show();
  };

  manager.registerCoreModule(MODULE_ID, {
    run: _run
  });


  /**
	 * Our public API.
	 */
	return {
		installPlugins: _installPlugins
	};

});
