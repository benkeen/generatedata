/*jslint browser:true*/
/*global $:false,console:false,define:false*/
define([
	"constants",
	"queue"
], function(C, Queue) {

	"use strict";

	/**
	 * @name Manager
	 * @see Core
	 * @description The manager handles all the pub/sub functionality for the Core. Most modules interact
	 * with one another indirectly through this module by publishing and subscribing to messages.
	 * @return {Object}
	 * @namespace
	 */

    var MODULE_ID = "core-manager";
    var _isStarted = false;

	// stores all modules: Core, Data Types and Export Types. It's a hash of Module ID -> module info
	var _modules = {};
	var _filterDataTypeMessages = (C.DEBUGGING.LIMIT_DATA_TYPE_EVENTS === "") ? false : true;
	var _filterExportTypeMessages = (C.DEBUGGING.LIMIT_EXPORT_TYPE_EVENTS === "") ? false : true;
	var _permittedDataTypes = C.DEBUGGING.LIMIT_DATA_TYPE_EVENTS.split(",");
	var _permittedExportTypes = C.DEBUGGING.LIMIT_EXPORT_TYPE_EVENTS.split(",");


	var _registerDataType = function(moduleID, module) {
		if (_modules.hasOwnProperty(moduleID)) {
			if (C.DEBUGGING.CONSOLE_WARN) {
				console.warn("Sorry, a module with that ID has already been registered.");
			}
			return;
		}

		// do a little safety-checking on the module functions
		var optionalFuncs = ["init", "run", "validate", "saveRow", "loadRow"];
		for (var j=0; j<optionalFuncs.length; j++) {
			if (module.hasOwnProperty(optionalFuncs[j]) && typeof module[optionalFuncs[j]] != "function") {
				if (C.DEBUGGING.CONSOLE_WARN) {
					console.warn(moduleID + " module has an invalid " + optionalFuncs[j] + "() function. Should be a function!");
				}
				return;
			}
		}

		var settings = $.extend({
			init: function() { },
			run: function() { },
			validate: function() { return []; },
			saveRow: function() { return {}; },
			loadRow: null,
			skipDomReady: false,
			subscriptions: {}
		}, module);

		// include the type
		settings.type = C.COMPONENT.DATA_TYPE;

		// store the module
		_modules[moduleID] = settings;

		// announce it's been registered
		_publish({
			sender: moduleID,
			type: C.EVENT.MODULE.REGISTER
		});
	};


	var _registerExportType = function(moduleID, module) {
		if (_modules.hasOwnProperty(moduleID)) {
			if (C.DEBUGGING.CONSOLE_WARN) {
				console.warn("Sorry, a module with that ID has already been registered.");
			}
			return;
		}

		var optionalFuncs = ["init", "run", "validate", "saveSettings", "loadSettings", "resetSettings"];
		for (var i=0; i<optionalFuncs.length; i++) {
			if (module.hasOwnProperty(optionalFuncs[i]) && typeof module[optionalFuncs[i]] != "function") {
				if (C.DEBUGGING.CONSOLE_WARN) {
					console.warn(moduleID + " module has an invalid " + optionalFuncs[i] + "() function. Should be a function!");
				}
				return;
			}
		}

		var settings = $.extend({
			init: function() { },
			run: function() { },
			validate: function() { return []; },
			saveSettings: function() { return {}; },
			loadSettings: null,
			resetSettings: function() { },
			subscriptions: {}
		}, module);

		// include the type
		settings.type = C.COMPONENT.EXPORT_TYPE;

		// store the module
		_modules[moduleID] = settings;

		// announce it's been registered
		_publish({
			sender: moduleID,
			type: C.EVENT.MODULE.REGISTER
		});
	};


	var _registerCoreModule = function(moduleID, module) {
		if (_modules.hasOwnProperty(moduleID)) {
			if (C.DEBUGGING.CONSOLE_WARN) {
				console.warn("Sorry, a module with that ID has already been registered.");
			}
			return;
		}

		var settings = $.extend({
			init: function() { },
			run: function() { },
			skipDomReady: false,
			subscriptions: {}
		}, module);

		// include the type
		settings.type = C.COMPONENT.CORE;

		// store the module
		_modules[moduleID] = settings;

		// announce it's been registered
		_publish({
			sender: moduleID,
			type: C.EVENT.MODULE.REGISTER
		});
	};


	var _unregister = function(moduleID) {
		if (_modules.hasOwnProperty(moduleID)) {
			delete _modules[moduleID];
			if (C.DEBUGGING.CONSOLE_LOG_CORE) {
				console.warn("module unregistered: " + moduleID);
			}
		}
	};


	var _publish = function(messages) {
		if (!$.isArray(messages)) {
			messages = [messages];
		}

		for (var i=0; i<messages.length; i++) {
			var pluginType = _getPluginType(messages[i].sender);

			if (C.DEBUGGING.LIST_PUBLISH_EVENTS) {
				var log = false;
				if (pluginType == "data-type") {
					if (_filterDataTypeMessages) {
						if ($.inArray(messages[i].sender, _permittedDataTypes) != -1) {
							log = true;
						}
					} else {
						log = true;
					}
				} else if (pluginType == "export-type") {
					if (_filterExportTypeMessages) {
						if ($.inArray(messages[i].sender, _permittedExportTypes) != -1) {
							log = true;
						}
					} else {
						log = true;
					}
				} else {
					log = true;
				}

				if (log) {
					console.log("manager.publish(): ", messages[i]);
				}
			}

			var currMessage = messages[i].type;
			for (var moduleID in _modules) {
                if (_modules[moduleID].subscriptions.hasOwnProperty(currMessage)) {
					_modules[moduleID].subscriptions[currMessage](messages[i]);
                }
			}
		}
	};

	var _subscribe = function(moduleID, subscriptions) {
		if (arguments.length != 2) {
			if (C.DEBUGGING.CONSOLE_WARN) {
				console.warn("Invalid params for manager.subscribe()");
			}
			return;
		}

        var cleanSubscriptions = {};
        for (var event in subscriptions) {
            var eventHandler = subscriptions[event];
            if (typeof eventHandler == 'function') {
                cleanSubscriptions[event] = eventHandler;
            }
        }

        if (_modules.hasOwnProperty(moduleID)) {
            var existingSubscriptions = _modules[moduleID].subscriptions;
            var pluginType = _getPluginType(moduleID);

            // blithely add and overwrite any existing subscriptions for the events defined
            for (var event in cleanSubscriptions) {
                existingSubscriptions[event] = cleanSubscriptions[event];
            }
            _modules[moduleID].subscriptions = existingSubscriptions;

			if (C.DEBUGGING.LIST_SUBSCRIBE_EVENTS) {
				var log = false;
				if (pluginType == "data-type") {
					if (_filterDataTypeMessages) {
						if ($.inArray(moduleID, _permittedDataTypes) != -1) {
							log = true;
						}
					} else {
						log = true;
					}
				} else if (pluginType == "export-type") {
					if (_filterExportTypeMessages) {
						if ($.inArray(moduleID, _permittedExportTypes) != -1) {
							log = true;
						}
					} else {
						log = true;
					}
				} else {
					log = true;
				}

				if (log) {
					console.log("manager.subscribe(): ", moduleID, cleanSubscriptions);
				}
			}
        }
	};

	var _unsubscribe = function(moduleID, subscriptions) {

	};

	var _validateDataTypes = function(rowValidationNeededGroupedByDataType) {
		var errors = [];
		for (var moduleID in _modules) {
			if (_modules[moduleID].type !== C.COMPONENT.DATA_TYPE) {
				continue;
			}

			// check to see if there are any rows in the form of this data type that need validating
			if (!rowValidationNeededGroupedByDataType.hasOwnProperty(moduleID)) {
				continue;
			}

			var currErrors = _modules[moduleID].validate(rowValidationNeededGroupedByDataType[moduleID]);
			if (!$.isArray(currErrors)) {
				continue;
			} else if (currErrors.length) {
				errors = errors.concat(currErrors);
			}
		}
		return errors;
	};

	/**
	 * Passes off work to the current Export Type to do whatever validation it requires. If any of the
	 * Export Type validation function throw an error or don't return an array, the process is halted and
	 * we return null. The generator does the job of informing the user.
	 */
	var _validateExportType = function(info) {
		var exportTypeModuleID = "export-type-" + info.exportType;
		var rows = info.rows;
		var errors = [];

		try {
			errors = _modules[exportTypeModuleID].validate(rows);
		} catch (e) {
			if (C.DEBUGGING.CONSOLE_WARN) {
				console.error("Error in validate() function for " + info.exportType + " Export Type. Error: ", e);
			}
			return null;
		}

		if (!$.isArray(errors)) {
			if (C.DEBUGGING.CONSOLE_WARN) {
				console.error("Error! The validate() function for " + info.exportType + " didn't return an array.");
			}
			return null;
		}

		return errors;
	};

	/**
	 * Runs the initialization method of a single module.
	 */
	var _init = function(moduleID) {
		if (_modules[moduleID].init !== null) {
			try {
				_modules[moduleID].init();
			} catch(e) {
				if (C.DEBUGGING.CONSOLE_WARN) {
					console.warn("init() method failed for " + moduleID + ":", e);
					_unregister(moduleID);
				}
			}
		}
	};

	/**
	 * Calls the initialization methods of all registered modules.
	 */
	var _initAll = function() {
		for (var moduleID in _modules) {
			if (_modules.hasOwnProperty(moduleID)) {
				_init(moduleID);
			}
		}
	};

	var _run = function(moduleID) {
		try {
			_modules[moduleID].run();
		} catch(e) {
			console.warn(e);
		}
	};

	var _runAll = function() {
		for (var moduleID in _modules) {
			_run(moduleID);
		}
	};

	var _getModules = function() {
		return _modules;
	};

	var _start = function() {
		if (_isStarted) {
			return;
		}
        _initAll();
        _runAll();
        _isStarted = true;

        _publish({
            sender: MODULE_ID,
            type: C.EVENT.APP_START
        });
    };

	var _getPluginType = function(moduleID) {
		var isDataType   = new RegExp("^data-type-");
		var isExportType = new RegExp("^export-type-");
		var isCore       = new RegExp("^core-");

		var type = null;
		if (isDataType.test(moduleID)) {
			type = "data-type";
		} else if (isExportType.test(moduleID)) {
			type = "export-type";
		} else if (isCore.test(moduleID)) {
			type = "core";
		}

		return type;
	};

	var _serializeDataTypeRow = function(rowDataType, rowNum) {
		if (!_modules.hasOwnProperty(rowDataType)) {
			if (C.DEBUGGING.CONSOLE_WARN) {
				console.warn("Unknown data type for manager.serializeDataTypeRow(): " + rowDataType);
			}
			return;
		}
		return _modules[rowDataType].saveRow(rowNum);
	};

	var _serializeExportTypes = function() {
		var isExportType = new RegExp("^export-type-");
		var exportTypeData = {};
		for (var moduleID in _modules) {
			if (isExportType.test(moduleID)) {
				try {
					exportTypeData[moduleID] = _modules[moduleID].saveSettings();
				} catch (e) {
					if (C.DEBUGGING.CONSOLE_WARN) {
						console.warn("Error in Export Type's saveSettings(): ", moduleID, e);
					}
				}
			}
		}
		return exportTypeData;
	};

	var _resetExportTypes = function() {
		var exportTypes = _getModulesByPluginType("export-type");
		for (var i=0; i<exportTypes.length; i++) {
			try {
				exportTypes[i].resetSettings();
			} catch (e) {
				if (C.DEBUGGING.CONSOLE_WARN) {
					console.warn("Error resetting export type: ", exportTypes[i], e);
				}
			}
		}
	};

	var _loadExportType = function(exportType, allSavedExportTypeData) {
		var exportTypeModuleID = "export-type-" + exportType;
		if (!_modules.hasOwnProperty(exportTypeModuleID) || !allSavedExportTypeData.hasOwnProperty(exportTypeModuleID)) {
			return;
		}

		try {
			_modules[exportTypeModuleID].loadSettings(allSavedExportTypeData[exportTypeModuleID]);
		} catch (e) {
			if (C.DEBUGGING.CONSOLE_WARN) {
				console.warn("Error in Export Type's loadSettings(): ", exportTypeModuleID, e);
			}
		}
	};

	var _loadDataTypeRows = function(rowData) {
		for (var i=0; i<rowData.length; i++) {
			var currDataType = rowData[i].dataType;
			if (!_modules.hasOwnProperty(currDataType)) {
				continue;
			}
			var loadRowFunc = _modules[currDataType].loadRow(rowData[i].rowID, rowData[i].data);
			if (loadRowFunc !== null) {
				Queue.add(loadRowFunc);
			}
		}
		Queue.process({ onSuccess: _onDataTypesLoaded });
	};


	var _onDataTypesLoaded = function() {
		// for debugging
	};

	/**
	 * Helper function to return an array of plugins, by plugin type.
	 * @function
	 * @private
	 * @param {String} the type of plugin: "data-type", "core", "export-type"
	 */
	var _getModulesByPluginType = function(pluginType) {
		var plugins = [];
		for (var module in _modules) {
			if (_modules[module].type == pluginType) {
				plugins.push(_modules[module]);
			}
		}
		return plugins;
	};


	// our public API
	return {

		/**
		 * Our registration function for Data Types plugins.
		 *
		 * @function
		 * @param {String} moduleID the unique module ID. Module IDs should be of the following format:
		 *   data-type-[Data Type folder name]
		 * @param {Object} module an object with the following required properties:<br />
		 * - saveRow() - <br />
		 * - loadRow() - <br />
		 * Optional properties:
		 * - run()<br />
		 * - init() - where subscriptions are generally set up. All init()'s are run prior to anything being run().<br />
		 * - skipDomReady (boolean)<br />
		 * @name Manager#registerDataType
		 */
		registerDataType: _registerDataType,

		/**
		 * Our registration function for Export Types plugins.
		 *
		 * @function
		 * @param {String} moduleID the unique module ID. Module IDs should be of the following format:
		 *   data-type-[Data Type folder name]
		 * @param {Object} module an object with the following required properties:<br />
		 * - run() - a function<br />
		 * - init() - where subscriptions are generally set up. All init()'s are run prior to anything being run().
		 * - saveRow() - <br />
		 * - loadRow() - <br />
		 * - skipDomReady (boolean)<br />
		 * @name Manager#registerExportType
		 */
		registerExportType: _registerExportType,

		/**
		 * Our registration function for Core plugins.
		 *
		 * @function
		 * @param {String} moduleID the unique module ID. Module IDs should be of the following format:
		 *   data-type-[Data Type folder name]
		 * @param {Object} module an object with the following required properties:<br />
		 * - run() - a function<br />
		 * - init() - where subscriptions are generally set up. All init()'s are run prior to anything being run().
		 * - saveRow() - <br />
		 * - loadRow() - <br />
		 * - skipDomReady (boolean)<br />
		 * @name Manager#registerCoreModule
		 */
		registerCoreModule: _registerCoreModule,

		/**
		 * Publishes a message, which any other module that's been registered can subscribe to.
		 * @function
		 * @param {Object|Array} messages either a single object (single message) or an array of messages.
		 * Each message is an object of the following form:
		 *   { sender: MODULE_ID, type: "event-name-here" }<br />
		 * The sender is the unique module ID of the module sending the message (i.e. the same module ID you
		 * passed into the manager.register() function). The type is the string name of the message that's taking
		 * place. It can be anything, but make it make sense. The Core events are found in scripts/constants.php.
		 * You can add as many other object properties as you want - they will all be passed along to anyone
		 * subscribing to the event.
		 * @name Manager#publish
		 */
		publish: _publish,

		/**
		 * Our main subscribe() function. This is called by any module, regardless of type,
		 * to allow it to subscribe to one or more specific notifications.
		 * @function
		 * @param string moduleID
		 * @param array
		 * @name Manager#subscribe
		 */
		subscribe: _subscribe,

		/**
		 * @function
		 * @name Manager#unsubscribe
		 */
		unsubscribe: _unsubscribe,

		/**
		 * Return an object containing all registered modules.
		 * @function
		 * @name Manager#getModules
		 */
		getModules: _getModules,

		/**
		 * Called by the generator when a saved data set is loaded. This passes the saved data sets to the individual
		 * Data Types so they load their own data as they see fit.
		 * @function
		 * @name Manager#loadDataTypeRows
		 */
		loadDataTypeRows: _loadDataTypeRows,

		/**
		 * This performs the necessary validation on whatever data types are in the table. It farms out
		 * the work to the appropriate module and returns an array of objects containing the (localized) error
		 * strings and offending form fields. The generator does the job of the styling and error display.
		 * @function
		 * @param {Object} rowValidationNeededGroupedByDataType
		 * @name Manager#validateDataTypes
		 */
		validateDataTypes: _validateDataTypes,

		/**
		 * @function
		 * @name Manager#validateExportType
		 */
		validateExportType: _validateExportType,

		/**
		 * @function
		 * @name Manager#serializeDataTypeRow
		 */
		serializeDataTypeRow: _serializeDataTypeRow,

		/**
		 * @function
		 * @name Manager#serializeExportTypes
		 */
		serializeExportTypes: _serializeExportTypes,

		/**
		 * @function
		 * @name Manager#loadExportType
		 */
		loadExportType: _loadExportType,

		/**
		 * This is used whenever a user loads a new Data Set or clears the current form. It calls all
		 * Export Type's resetSettings() function, to ensure the Export Types section returns to its
		 * factory defaults.
		 * @function
		 * @name Manager#resetExportTypes
		 */
		resetExportTypes: _resetExportTypes,

		/**
		 * Activates the entire client-side code. This may only be executed once, and is done by the
		 * Core code.
		 * @function
		 * @name Manager#start
		 */
		start: _start
	};
});
