/*global $:false,console:false*/
define([
	"constants"
], function(C) {

	"use strict";

	/**
	 * @name Manager
	 * @see Core
	 * @description The manager handles all the pub/sub functionality for the Core. Most modules interact
	 * with one another indirectly through this module by publishing and subscribing to messages.
	 * @return {Object}
	 * @namespace
	 */

	// stores all modules, regardless of type (Core, Data Types, Export Types, Countries).
	// It's a hash of Module ID -> module info
	var _isStarted = false;
	var _modules = {};
	var _requiredModuleIDPrefixes = {};
	_requiredModuleIDPrefixes[C.COMPONENT.DATA_TYPE] = "data-type-";
	_requiredModuleIDPrefixes[C.COMPONENT.EXPORT_TYPE] = "export-type-";
	_requiredModuleIDPrefixes[C.COMPONENT.CORE] = "core-";

	var _filterDataTypeMessages = (C.DEBUGGING.LIMIT_DATA_TYPE_EVENTS === "") ? false : true;
	var _filterExportTypeMessages = (C.DEBUGGING.LIMIT_EXPORT_TYPE_EVENTS === "") ? false : true;
	var _permittedDataTypes = C.DEBUGGING.LIMIT_DATA_TYPE_EVENTS.split(",");
	var _permittedExportTypes = C.DEBUGGING.LIMIT_EXPORT_TYPE_EVENTS.split(",");


	/**
	 * Our JS module registration function. All module types: Data Types, Export Types and the Core register
	 * themselves with this function.
	 */
	var _register = function(moduleID, moduleType, module) {
		if (_modules.hasOwnProperty(moduleID)) {
			if (C.DEBUGGING.CONSOLE_WARN) {
				console.warn("Sorry, a module with that ID has already been registered.");
			}
			return;
		}
		if ($.inArray(moduleType, [C.COMPONENT.DATA_TYPE, C.COMPONENT.EXPORT_TYPE, C.COMPONENT.CORE]) == -1) {
			if (C.DEBUGGING.CONSOLE_WARN) {
				console.warn("Unknown module type: " + moduleType);
			}
			return;
		}

		// ensure the module ID has an appropriate prefix
		var regExp = new RegExp("^" + _requiredModuleIDPrefixes[moduleType]);
		if (!regExp.test(moduleID)) {
			if (C.DEBUGGING.CONSOLE_WARN) {
				console.warn("Invalid module ID for " + moduleID);
			}
			return;
		}

		// init() and run() are common to all modules
		if (module.hasOwnProperty("init") && typeof module.init != "function") {
			if (C.DEBUGGING.CONSOLE_WARN) {
				console.warn(moduleID + " module has an invalid init() function. Should be a function!");
			}
			return;
		}
		if (module.hasOwnProperty("run") && typeof module.run != "function") {
			if (C.DEBUGGING.CONSOLE_WARN) {
				console.warn(moduleID + " module has an invalid run() function. Should be a function!");
			}
			return;
		}

		var settings = $.extend({
			init: function() { },
			run: function() { },
			validate: function() { },
			serializeRow: function() { },
			skipDomReady: false,
			subscriptions: {}
		}, module);

		// include the type
		settings.type = moduleType;

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

	/**
	 * Our main subscribe() function. This is called by any module, regardless of type,
	 * to allow it to subscribe to one or more specific notifications.
	 *
	 * @param string moduleID
	 * @param array
	 */
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

	/**
	 * This performs the necessary validation on whatever data types are in the table. It farms out
	 * the work to the appropriate module and returns an array of objects containing the (localized) error
	 * strings and offending form fields. The generator does the job of the styling and error display.
	 */
	var _validateDataTypes = function(rowValidationNeededGroupedByDataType) {
		var errors = [];
		for (var moduleID in _modules) {
			if (_modules[moduleID].type != C.COMPONENT.DATA_TYPE) {
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

	var _validateExportTypes = function() {

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
	};

	var _getPluginType = function(moduleID) {
		var isDataType = new RegExp("^" + _requiredModuleIDPrefixes[C.COMPONENT.DATA_TYPE]);
		var isExportType = new RegExp("^" + _requiredModuleIDPrefixes[C.COMPONENT.EXPORT_TYPE]);
		var isCore = new RegExp("^" + _requiredModuleIDPrefixes[C.COMPONENT.CORE]);

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
				console.warn("Invalid params for manager.serializeDataTypeRow()");
			}
			return;
		}
		var currDataType = _modules[rowDataType];
		console.log(currDataType);
	};


	var _serializeExportTypes = function() {

	};


	// our public API
	return {

		/**
		 * Our registration function. Any plugins - Data Types, Export Types or the Core - that
		 * want to include any client-side code need to register themselves with the manager in
		 * order to access PUB/SUB.
		 *
		 * @function
		 * @param {String} moduleID the unique module ID. Module IDs should be of the following format:
		 *    [type]-[plugin folder name], where "type" is "core", "export-type" or "data-type".
		 * @param {String} moduleType a string identifying the module type: C.COMPONENT.CORE,
		 *     C.COMPONENT.DATA_TYPE or C.COMPONENT.EXPORT_TYPE
		 * @param {Object} module an object with the following required properties:<br />
		 * - run() - a function<br />
		 * - init() - where subscriptions are generally set up. All init()'s are run prior to anything being run().
		 * - load() - <br />
		 * Optional properties:<br />
		 * - skipDomReady (boolean)<br />
		 * @name Manager#register
		 */
		register: _register,

		/**
		 * Publishes a message, which any other module that's been registered can subscribe to.
		 *
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
		 * @function
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
		 * @function
		 * @name Manager#validateDataTypes
		 */
		validateDataTypes: _validateDataTypes,

		/**
		 * @function
		 * @name Manager#validateExportTypes
		 */
		validateExportTypes: _validateExportTypes,

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
		 * @name Manager#start
		 */
		start: _start
	};
});
