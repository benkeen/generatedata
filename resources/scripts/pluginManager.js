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
  var _context = null;
	var _dataTypes = [];
	var _exportTypes = [];
	var _countries = [];

  var _run = function () {
    var $plugins = $("#gdPlugins");
    $plugins.on('change', 'input', _checkboxClicked);
    $plugins.find('ul').each(function () { _updateSectionCbs(this); });
  };


  /**
   * @param context "install" or "update"
   * @param params
   * @private
   */
	var _installPlugins = function(context, params) {
    _context           = context;
    _errorHandler      = params.errorHandler;
		_onCompleteHandler = params.onCompleteHandler;

    var $pluginsSection = $("#gdPlugins");
		$pluginsSection.removeClass("hidden").css("display", "none").show("fade");
    $("#gdInstallPluginsBtn").hide();
    $("#gdInstallPluginsBtn").on("click", _submit);

    // show the loading spinner for the three plugin types: data, export, country
    $("#gdDataTypePluginListIndicator,#gdExportTypePluginListIndicator,#gdCountryPluginListIndicator").html("");
    utils.insertSpinner('dtLoading', $("#gdDataTypePluginListIndicator")[0], C.SPINNERS.SMALL);
    utils.insertSpinner('etLoading', $("#gdExportTypePluginListIndicator")[0], C.SPINNERS.SMALL);
    utils.insertSpinner('cLoading', $("#gdCountryPluginListIndicator")[0], C.SPINNERS.SMALL);

    _installDataTypes();
	};


  // handles the un/check action for any checkbox in the plugins section
  var _checkboxClicked = function (e) {
    var el = e.target;
    if ($(el).hasClass('toggleDataTypeSection')) {
      $(el).closest('ul').find("input").not('.toggleDataTypeSection').prop('checked', el.checked);
      return;
    }
    if (el.id === 'gdExportTypePluginList') {
      $("#gdExportTypeList").find("input").prop('checked', el.checked);
      return;
    }
    if (el.id === 'gdCountryPluginList') {
      $("#gdCountryList").find("input").prop('checked', el.checked);
      return;
    }

    // find out if the parent
    _updateSectionCbs($(e.target).closest("ul"));
  };

  // ensures the "check all" checkbox is checked/unchecked appropriately based on the checked state of all sub-checkboxes
  var _updateSectionCbs = function (listEl) {
    var allChecked = true;
    $(listEl).find("input[type='checkbox']:not(.toggleGroup)").each(function () {
      if (!this.checked) {
        allChecked = false;
        return;
      }
    });

    // this accounts for the different markup structures, but it's klutzy
    if ($(listEl).find(".toggleGroup").length) {
      $(listEl).find(".toggleGroup").prop("checked", allChecked);
    } else {
      $(listEl).closest(".gdPluginSection").find(".toggleGroup").prop("checked", allChecked);
    }
  };


  // TODO  ... this should be moved to the install js code
  function _displayError(message) {
    $("#page4 .gdInstallTabMessage .gdResponse").html(message);
    $("#page4 .gdInstallTabMessage").addClass("gdInstallError").show();
  }

  var _submit = function (e) {
    e.preventDefault();
    _savePlugins(_onCompleteHandler, _errorHandler);
  };


  var _savePlugins = function (params) {
    var opts = $.extend({
      success: null,
      error: null,
      onValidationError: _displayError
    }, params);

    // check at least one of the different plugin types have been selected
    var selectedDataTypes = _getSelectedDataTypes();
    if (!_validateDataTypes(selectedDataTypes, opts.onValidationError)) {
      return false;
    }
    var selectedExportTypes = _getSelectedExportTypes();
    if (!_validateExportTypes(selectedExportTypes, opts.onValidationError)) {
      return false;
    }
    var selectedCountries = _getSelectedCountries();
    if (!_validateCountries(selectedCountries, opts.onValidationError)) {
      return false;
    }

    var action = _context === "install" ? "savePluginList" : "resetPluginList";
    $.ajax({
      url: "ajax.php",
      type: "POST",
      dataType: "json",
      data: {
        action: action,
        dataTypes: selectedDataTypes,
        exportTypes: selectedExportTypes,
        countries: selectedCountries
      },
      success: function() {
        if ($.isFunction(opts.success)) {
          opts.success();
        }
      },
      error: function() {
        if ($.isFunction(opts.error)) {
          opts.error();
        }
      }
    });
  };

  var _getSelectedDataTypes = function () {
    var selectedDataTypes = [];
    $(".selectedDataType").each(function (i, el) {
      if (el.checked) {
        selectedDataTypes.push(el.value);
      }
    });
    return selectedDataTypes;
  };

  var _validateDataTypes = function (selectedDataTypes, errorHandler) {
    if (selectedDataTypes.length === 0) {
      window.scrollTo(0, 0);
      errorHandler(L.validation_no_data_types);
      return false;
    }
    return true;
  };

  var _getSelectedExportTypes = function () {
    var selectedExportTypes = [];
    $(".selectedExportType").each(function (i, el) {
      if (el.checked) {
        selectedExportTypes.push(el.value);
      }
    });
    return selectedExportTypes;
  };

  var _validateExportTypes = function (selectedExportTypes, errorHandler) {
    if (selectedExportTypes.length === 0) {
      window.scrollTo(0, 0);
      errorHandler(L.validation_no_export_types);
      return false;
    }
    return true;
  };

  var _getSelectedCountries = function () {
    var selectedCountries = [];
    $(".selectedCountry").each(function (i, el) {
      if (el.checked) {
        selectedCountries.push(el.value);
      }
    });
    return selectedCountries;
  };

  var _validateCountries = function (selectedCountries, errorHandler) {
    if (selectedCountries.length === 0) {
      window.scrollTo(0, 0);
      errorHandler(L.validation_no_countries);
      return false;
    }
    return true;
  };

  var _installDataTypes = function() {
    utils.playSpinner('dtLoading');
    var action = (_context === "install") ? "installDataTypes" : "resetDataTypes";
		$.ajax({
			url: "ajax.php",
			type: "POST",
			dataType: "json",
			data: {
				action: action
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
    var action = (_context === "install") ? "installExportTypes" : "resetExportTypes";
    $.ajax({
			url: "ajax.php",
			type: "POST",
			dataType: "json",
			data: {
				action: action
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
    var action = (_context === "install") ? "installCountries" : "resetCountries";
		$.ajax({
			url: "ajax.php",
			type: "POST",
			dataType: "json",
			data: {
				action: action
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
    var existingSelectedDataTypes = [];
    if ($("div.selectedDataTypes").length) {
      existingSelectedDataTypes
    }

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
		installPlugins: _installPlugins,
    savePlugins: _savePlugins,
    getSelectedDataTypes: _getSelectedDataTypes,
    validateDataTypes: _validateDataTypes,
    getSelectedExportTypes: _getSelectedExportTypes,
    validateExportTypes: _validateExportTypes,
    getSelectedCountries: _getSelectedCountries,
    validateCountries: _validateCountries
	};

});
