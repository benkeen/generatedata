/**
 * The mediator handles all the pub/sub functionality for the Core. All modules interact
 * with one another indirectly through this module by publishing and subscribing to messages.
 */
define([
	'constants',
	'utils'
], function(C, utils) {

	// stores all modules, regardless of type (Core, Data Types, Export Types, Countries).
	// It's a hash of Module ID -> module info
	var _modules = {};


	/**
	 * Our registration function. Any plugins - Data Types, Export Types or Countries - that
	 * want to include any client-side code need to register themselves with the mediator in
	 * order to access PUB/SUB.
	 *
	 * @param {object} module
	 */
	var _register = function(moduleID, moduleType, module) {
		if (_modules.hasOwnProperty(moduleID) && C.DEBUGGING.CONSOLE_LOG) {
			console.warn("Sorry, a module with ID has already been registered.");
			return;
		}
		if ($.inArray(moduleType, [C.COMPONENT.DATA_TYPE, C.COMPONENT.EXPORT_TYPE, C.COMPONENT.CORE]) == -1 &&
			C.DEBUGGING.CONSOLE_LOG) {
			console.warn("Unknown module type: " + moduleType);
			return;
		}
		if (module.hasOwnProperty("init") && typeof module.init != "function") {
			console.warn("Module has an invalid init function. Should be a function!");
			return;
		}
		if (module.hasOwnProperty("run") && typeof module.run != "function") {
			console.warn("Module has an invalid init function. Should be a function!");
			return;
		}

		var settings = $.extend({
			type: null,
			init: null,
			run: null,
			skipDomReady: false,
			subscriptions: {}
		}, module);

		// store the module
		_modules[moduleID] = settings;

		_publish({
			sender: moduleID,
			type: C.EVENT.MODULE.REGISTER
		});
	}

	var _unregister = function(moduleID) {
		if (_modules.hasOwnProperty(moduleID)) {
			delete _modules[moduleID];
			if (C.DEBUGGING.CONSOLE_LOG) {
				console.warn("module unregistered: " + moduleID);
			}
		}
	}

	var _publish = function(messages) {
		if (!$.isArray(messages)) {
			messages = [messages];
		}

		for (var i=0; i<messages.length; i++) {
			if (C.DEBUGGING.LIST_PUBLISH_EVENTS) {
				console.log("mediator.publish(): ", messages[i]);
			}

			for (var moduleID in _modules) {
				if (!_modules.hasOwnProperty(moduleID)) {
					continue;
				}

				// TODO... this isn't quite right
                var currModule = _modules[moduleID];
                if (currModule.subscriptions.hasOwnProperty(messages[i])) {
                	currModule.subscriptions[messages[i]]()
                }
			}
		}

	}

	var _subscribe = function(moduleID, subscriptions) {
		if (arguments.length != 2) {
			if (C.DEBUGGING.CONSOLE_LOG) {
				console.warn("Invalid params for mediator.subscribe()");
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

        // TODO. add check for empty object
//        if (!cleanSubscriptions.length) {
//        	return;
//        }

        if (_modules.hasOwnProperty(moduleID)) {
            var existingSubscriptions = _modules[moduleID].subscriptions;

            // blithely overwrite any existing subscriptions for this particular event
            for (var event in cleanSubscriptions) {
                existingSubscriptions[event] = cleanSubscriptions[event];
            }
            _modules[moduleID].subscriptions = cleanSubscriptions;

			if (C.DEBUGGING.LIST_SUBSCRIBE_EVENTS) {
				console.log("mediator.subscribe(): ", moduleID, cleanSubscriptions);
			}
        }
	}

	var _unsubscribe = function(moduleID, subscriptions) {

	}

	/**
	 * Runs the initialization method of a single module.
	 */
	var _init = function(moduleID) {
		if (_modules[moduleID].init != null) {
			try {
				_modules[moduleID].init();
			} catch(e) {
				if (C.DEBUGGING.CONSOLE_LOG) {
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


	// TODO... so weird that this is here... maybe it
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

		// this one's weird...
		start:    	  _start
	};
});
