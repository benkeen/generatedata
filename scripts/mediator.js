/**
 * The mediator handles all the pub/sub functionality for the Core. All modules interact
 * with one another indirectly by publishing and subscribing to messages.
 */
define([
	''
], function() {


	var Mediator = (function() {

		// stores all plugins
		var _plugins = [];

		/**
		 * Our registration function. Any plugins - Data Types, Export Types or Countries - that
		 * want to include any client-side code need to register themselves with the mediator.
		 *
		 * @param pluginType string "dataType", "exportType", "country" (Core?)
		 */
		var register = function(pluginType, name, constructor) {

		};

/*
		var subscribe = function(channel, fn) {
			if (!mediator.channels[channel]) {
				mediator.channels[channel] = [];
			}
			mediator.channels[channel].push({ context: this, callback: fn });
			return this;
		};

		publish = function(channel) {
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

*/

		return {
			channels:  {},
			publish:   publish,
			subscribe: subscribe,
		};

	})();

	return Mediator;
});
