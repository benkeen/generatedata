/**
 * The manager handles all the pub/sub functionality for the Core. All modules interact
 * with one another indirectly through this module by publishing and subscribing to messages.
 */
define([
	'constants',
], function(C) {

	// stores all modules, regardless of type (Core, Data Types, Export Types, Countries).
	// It's a hash of Module ID -> module info
	var _modules = {};

	/**
	 * Our registration function. Any plugins - Data Types, Export Types or Countries - that
	 * want to include any client-side code need to register themselves with the manager in
	 * order to access PUB/SUB.
	 *
	 * @param {object} module
	 */
	var _register = function(moduleID, moduleType, module) {

		if (_modules.hasOwnProperty(moduleID)) {
			if (C.DEBUGGING.CONSOLE_WARN) {
				console.warn("Sorry, a module with ID has already been registered.");
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
		var requiredModuleIDPrefixes = {};
		requiredModuleIDPrefixes[C.COMPONENT.DATA_TYPE] = "data-type-";
		requiredModuleIDPrefixes[C.COMPONENT.EXPORT_TYPE] = "export-type-";
		requiredModuleIDPrefixes[C.COMPONENT.CORE] = "core-";
		var regExp = new RegExp("^" + requiredModuleIDPrefixes[moduleType]);
		if (!regExp.test(moduleID)) {
			if (C.DEBUGGING.CONSOLE_WARN) {
				console.warn("Invalid module ID for " + moduleID);
			}
			return;
		}

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
	}

	var _unregister = function(moduleID) {
		if (_modules.hasOwnProperty(moduleID)) {
			delete _modules[moduleID];
			if (C.DEBUGGING.CONSOLE_LOG_CORE) {
				console.warn("module unregistered: " + moduleID);
			}
		}
	}

	/**
	 * Used to publish a message that can be picked up by any other module.
	 */
	var _publish = function(messages) {
		if (!$.isArray(messages)) {
			messages = [messages];
		}

		for (var i=0; i<messages.length; i++) {
			if (C.DEBUGGING.LIST_PUBLISH_EVENTS) {
				console.log("manager.publish(): ", messages[i]);
			}
			var currMessage = messages[i].type;
			for (var moduleID in _modules) {
                if (_modules[moduleID].subscriptions.hasOwnProperty(currMessage)) {
                	_modules[moduleID].subscriptions[currMessage](messages[i]);
                }
			}
		}
	}

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

            // blithely add and overwrite any existing subscriptions for the events defined
            for (var event in cleanSubscriptions) {
                existingSubscriptions[event] = cleanSubscriptions[event];
            }
            _modules[moduleID].subscriptions = existingSubscriptions;

			if (C.DEBUGGING.LIST_SUBSCRIBE_EVENTS) {
				console.log("manager.subscribe(): ", moduleID, cleanSubscriptions);
			}
        }
	}

	var _unsubscribe = function(moduleID, subscriptions) {

	}

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
			if (!$.isArray(errors)) {
				continue;
			}
			errors = errors.concat(errors, currErrors);
		}
		return errors;
	}

	var _validateExportTypes = function() {

	}

	/**
	 * Runs the initialization method of a single module.
	 */
	var _init = function(moduleID) {
		if (_modules[moduleID].init != null) {
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
	}

	var _getModules = function() {
		return _modules;
	}

	var _start = function() {
        _initAll();
        _runAll();
	}

	// our public API
	return {
		register:     _register,
		publish:      _publish,
		subscribe:    _subscribe,
		unsubscribe:  _unsubscribe,
		getModules:   _getModules,
		validateDataTypes: _validateDataTypes,
		validateExportTypes: _validateExportTypes,

		// this one's weird...
		start:    	  _start
	};
});
