/**
 * The mediator handles all the pub/sub functionality for the Core. All modules interact
 * with one another indirectly through this module by publishing and subscribing to messages.
 *
 * TODO. Core registration, module initialization, Core pub/sub should be handled in a separate
 * layer.
 */
define([
	'utils'
], function(utils) {

	var Mediator = (function() {

		// stores all plugins
		var _plugins = {
			dataTypes: [],
			exportTypes: [],
			countries: []
		};

		var _subscribe = function(channel, fn) {
			if (!mediator.channels[channel]) {
				mediator.channels[channel] = [];
			}
			mediator.channels[channel].push({ context: this, callback: fn });
			return this;
		};

		var _publish = function(channel) {
			if (!mediator.channels[channel]) {
				return false;
			}
			var args = Array.prototype.slice.call(arguments, 1);
			for (var i = 0, l = mediator.channels[channel].length; i < l; i++) {
				var subscription = mediator.channels[channel][i];
				subscription.callback.apply(subscription.context, args);
			}
			return this;
		};

		/**
		 * Our registration function. Any plugins - Data Types, Export Types or Countries - that
		 * want to include any client-side code need to register themselves with the mediator.
		 */
		var register = function(module, constructor) {
			if (!typeof constructor == "function") {
				return;
			}
            if (!module.hasOwnProperty("type")) {
            	return;
            }

            // store the module for initialization
            switch (module.type) {
            	case "dataType":
            		break;
            	case "exportType":
            		break;
            	case "countries":
            		break;
            }
		}

		var _start = function() {

		}

		return {
//			channels:  {},
			start:     _start,
			register:  _register,
			publish:   _publish,
			subscribe: _subscribe,
		};

	})();

	return Mediator;
});
