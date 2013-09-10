/*global console:false,setTimeout:false,setInterval:false,clearInterval:false,define:false*/
define([], function() {

	"use strict";

	/**
	 * @name Queue
	 * @description A requireJS module for simplifying intensive DOM-insertion code. It lets you add a list of actions
	 *     to perform on the DOM, each with a test to confirm when the DOM insertion is complete. The code then sequentially
	 *     executes each action one by one, only performing the next action when the previous is compete. This ensures that
	 *     the DOM will reliably contain the content you expect and you're not trying to read something the browser's HTML
	 *     rendering engine has yet to finish inserting. For more info on the problem, see:  http://www.benjaminkeen.com/?p=136
	 * @author Ben Keen <ben.keen@gmail.com>
	 * @see Core
	 * @example To use this in your own requireJS modules, there are two steps:
	 *	(1) Add things to the queue.
	 *     Queue.add({
	 *			"execute": function() {
	 *				// some sort of DOM insertion code here
	 *			},
	 *			"isComplete": function() {
	 *				// return a boolean here, e.g. do a document.getElementID() on an element that you just inserted
	 *				// in the function before. That's enough to confirm the HTML rendering engine has inserted it & is accessible
	 *			}
	 *     });
	 *	(2) Process the queue.
	 *		Queue.process({ onSuccess: function() { // our onSuccess callback function here }});
	 *
	 * @return {Object}
	 * @namespace
	 */

	// if this is enabled, the module will output errors and information to the console
	var _debugMode = false;


	var _queue = {
		isProcessing: false,
		domChanges: [],
		onSuccess: [],
		onError: [],

		// the milliseconds between trying to see if the last performed DOM insertion is now deemed to be complete
		reTestItemSpeed: null,

		// the number of milliseconds (defaults to 10 seconds)
		incompleteActionDuration: null,


		add: function(obj) {
			if (!obj.hasOwnProperty("execute")) {
				if (_debugMode) {
					console.log("Queue.add(): object passed is missing execute property (function)", obj);
				}
				return;
			}
			if (!obj.hasOwnProperty("isComplete")) {
				if (_debugMode) {
					console.log("Queue.add(): object passed is missing isComplete property (function)", obj);
				}
				return;
			}
			_queue.domChanges.push(obj);
		},

		process: function(settings) {
			var onSuccess = null;
			var onError = null;
			var reTestItemSpeed = 25;
			var incompleteActionDuration = 5000;
			if (typeof settings === 'object') {
				if (settings.hasOwnProperty("onSuccess")) { onSuccess = settings.onSuccess; }
				if (settings.hasOwnProperty("onError")) { onError = settings.onError; }
				if (settings.hasOwnProperty("reTestItemSpeed")) { reTestItemSpeed = settings.reTestItemSpeed; }
				if (settings.hasOwnProperty("incompleteActionDuration")) { incompleteActionDuration = settings.incompleteActionDuration; }
			}

			if (onSuccess) { _queue.onSuccess.push(onSuccess); }
			if (onError) { _queue.onError.push(onError); }

			// if the queue processing is already started, we ignore any new settings for the processing
			// other than the onSuccess and onError handlers
			if (!_queue.isProcessing) {
				if (_debugMode) {
					console.log("---------- Queue processing started ----------");
				}

				_queue.reTestItemSpeed = reTestItemSpeed;
				_queue.incompleteActionDuration = incompleteActionDuration;
				_queue.isProcessing = true;
				_queue.next();
			} else {
				if (_debugMode) {
					console.log("Received request to start processing, but processing already started. ", settings);
				}
			}
		},

		next: function() {
			if (!_queue.domChanges.length) {
				_queue.isProcessing = false;
				_queue.callOnCompleteHandlers();
				return;
			}

			// if this code hasn't begun being executed, start 'er up
			if (!_queue.domChanges[0].interval) {
				var currObj = this;
				setTimeout(function() { currObj.domChanges[0].execute(); }, 10);
				_queue.domChanges[0].interval = setInterval(function() { _queue.examineQueue(); }, _queue.reTestItemSpeed);
				_queue.domChanges[0].timeStarted = Date.now();
			}
		},

		examineQueue: function() {
			if (_queue.domChanges[0].isComplete()) {
				clearInterval(_queue.domChanges[0].interval);
				_queue.domChanges.shift();
				_queue.next();
			} else {
				if (_debugMode) {
					console.log("Not complete: ", _queue.domChanges[0]);
				}

				// if too much time has elapsed, end the queue and call the onError callbacks
				var now = Date.now();
				if (_queue.domChanges[0].timeStarted + _queue.incompleteActionDuration < now) {
					if (_debugMode) {
						console.log("Error! Queue item took longer than " + _queue.incompleteActionDuration + "ms to perform.");
						console.log("Item with problem: ", _queue.domChanges[0]);
						console.log("Firing onError handlers:", _queue.onError);
						console.log("---------- Queue processing ended ----------");
					}
					for (var i=0; i<_queue.onError.length; i++) {
						try {
							_queue.onError[i]();
						} catch (e) { }
					}

					clearInterval(_queue.domChanges[0].interval);
					_queue.isProcessing = false;
					_queue.domChanges = [];
					_queue.onSuccess = [];
					_queue.onError = [];
				}
			}
		},

		callOnCompleteHandlers: function() {
			if (_debugMode) {
				console.log("Done! Queue is now empty: firing onSuccess handlers:", _queue.onSuccess);
				console.log("---------- Queue processing ended ----------");
			}
			for (var i=0; i<_queue.onSuccess.length; i++) {
				try {
					_queue.onSuccess[i]();
				} catch (e) { }
			}
			_queue.onSuccess = [];
			_queue.onError = [];
		}
	};

	return _queue;
});
