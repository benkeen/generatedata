/**
 * The mediator handles all the pub/sub functionality for the Core. All modules interact
 * with one another indirectly through this module by publishing and subscribing to messages.
 */
define([
	'constants',
	'utils',
	'controller'
], function(C, utils, controller) {

	var _controller = controller;

	/**
	 * Our registration function. Any plugins - Data Types, Export Types or Countries - that
	 * want to include any client-side code need to register themselves with the mediator in
	 * order to access PUB/SUB.
	 *
	 * @param {object} module
	 */
	var _register = function(moduleID, moduleType, module) {
		_controller.register(moduleID, moduleType, module);
	}

	var _publish = function(messages) {
		// convert to array
		if (messages.length == 0) {
			return;
		}

		var modules = _controller.getModules();

		for (var i=0; i<messages.length; i++) {
			if (C.DEBUGGING.LIST_PUBLISH_EVENTS) {
				console.log("mediator.publish(): ", events[i]);
			}

			for (var moduleID in modules) {
				if (!modules.hasOwnProperty(mod)) {
					continue;
				}

				// TODO... this isn't quite right
                var currModule = modules[mod];
                if (currModule.subscriptions.hasOwnProperty(events[i])) {
                	currModule.subscriptions[events[i]]()
                }
			}
		}
	}

	var _subscribe = function(moduleID, subscriptions) {

	}

	var _unsubscribe = function(moduleID, subscriptions) {

	}

	var _start = function() {
        _controller.initAll();
        _controller.runAll();
	}

	var _getModuleIDs = function() {
		return _controller.getModuleIDs()
	}

	// our public API
	return {
		register:     _register,
		publish:      _publish,
		subscribe:    _subscribe,
		unsubscribe:  _unsubscribe,
		start:    	  _start,
		getModuleIDs: _getModuleIDs
	};
});
