/*global $:false*/
define([
	"manager",
	"constants",
	"lang",
	"jquery-ui",
	"jquery-json"
], function(manager, C, L) {

	"use strict";

	/**
	 * @name Utils
	 * @see Core
	 * @description This file contains various helper functions for anyone that wants it.
	 * @return {Object}
	 * @namespace
	 */

	var MODULE_ID       = "core-utils";
	var _errors         = [];
	

	var _queue = {
		domChanges: [],

		add: function(arr) {
			_queue.domChanges.push(arr);
		},

		process: function() {
			if (!_queue.domChanges.length) {
				return;
			}

			// if this code hasn't begun being executed, start 'er up
			if (!_queue.domChanges[0][2]) {
				var currObj = this;
				setTimeout(function() { currObj.domChanges[0][0](); }, 10);
				_queue.domChanges[0][2] = setInterval(function() { _queue.examineQueue(); }, 25);
			}
		},

		examineQueue: function() {
			if (_queue.domChanges[0][1]()) {
				clearInterval(_queue.domChanges[0][2]);
				_queue.domChanges.shift();
				_queue.process();
			}
		}
	};


	return {

		/**
		 * @description This is a general tab-changer helper function for use by any tabbed group. It
		 * needs to be passed the old tab number, new tab number, the CSS prefix used for to ID the tabs
		 * and the name of the tab group (to be used in the publish message). For an example, see the
		 * pageinit.js file, which initializes the main tabs.
		 * @function
		 * @public
		 * @param {Object}
		 * @name Utils#selectTab
		 */
		selectTab: function(settings) {
			var opts = $.extend({
				tabGroup: "",
				oldTab: null,
				newTab: null,
				tabIDPrefix: ""
			}, settings);

			if (opts.oldTab == opts.newTab) {
				return false;
			}

			$("#" + opts.tabIDPrefix + opts.oldTab).removeClass("gdSelected");
			$("#" + opts.tabIDPrefix + opts.newTab).addClass("gdSelected");
			$("#" + opts.tabIDPrefix + opts.oldTab + "Content").hide();
			$("#" + opts.tabIDPrefix + opts.newTab + "Content").show();

			manager.publish({
				sender: MODULE_ID,
				type: C.EVENT.TAB.CHANGE,
				tabGroup: opts.tabGroup,
				oldTab: opts.oldTab,
				newTab: opts.newTab
			});

			return false;
		},

		startProcessing: function() {
			$("#gdProcessingIcon").show();
		},

		stopProcessing: function() {
			$("#gdProcessingIcon").hide();
		},

		/**
		 * This adds an array of error objects, or just a single one.
		 */
		addValidationErrors: function(newErrors) {
			if ($.isArray(newErrors)) {
				if (newErrors.length) {
					_errors = _errors.concat(newErrors);
				}
			} else {
				_errors.push(newErrors);
			}
		},

		clearValidationErrors: function(topLevelEl) {
			_errors = [];
			$(topLevelEl).find(".gdProblemField").removeClass("gdProblemField");
		},

		hideValidationErrors: function(el, unhighlightProblemFields) {
			if (el.css("display") != "block") {
				return;
			}
			if (unhighlightProblemFields) {
				$(el).find(".gdProblemField").removeClass("gdProblemField");
			}
			$(el).closest(".gdMessage").hide("blind", null, 500);
			_errors = [];
			return false;
		},

		/**
		 * Helper function to return the errors currently that have been logged.
		 */
		getValidationErrors: function() {
			return _errors;
		},

		/**
		 * Displays the errors
		 */
		displayValidationErrors: function(el) {
			var html = "<ul>";
			var hasFocus = false;

			for (var i=0; i<_errors.length; i++) {
				if (typeof _errors[i] != "object" || !_errors[i].hasOwnProperty("error")) {
					continue;
				}

				// style all offending fields and focus on the first one with a problem
				if (_errors[i].els !== null) {
					for (var j=0; j<_errors[i].els.length; j++) {
						if (!hasFocus) {
							$(_errors[i].els[j]).focus();
							hasFocus = true;
						}
						$(_errors[i].els[j]).addClass("gdProblemField");
					}
				}

				html += "<li>" + _errors[i].error + "</li>";
			}
			$(el).removeClass("gdNotify").addClass("gdErrors gdMarginTop");
			$(el).find("div").html(html);

			// display the message
			this.updateMessageBlock(el, "error");
		},

		displayMessage: function(el, message) {
			$(el).removeClass("gdErrors").addClass("gdNotify gdMarginTop");
			$(el).find("div").html(message);
			this.updateMessageBlock(el, "notify");
		},

		/**
		 * Helper function to actually show / highlight a message block consistently. This assumes the message / error
		 * is already in the element. It either blinds it quickly in, or does a highlight effect to draw attention to it.
		 */
		updateMessageBlock: function(el, messageType) {
			var color = (messageType == "error") ? "#ffc9c9" : "#a4c2ff";
			if ($(el).css("display") != "block") {
				$(el).show("blind", null, 500);
			} else {
				$(el).effect("highlight", { color: color }, 1500);
			}
		},

		isNumber: function(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		},

		formatNumWithCommas: function(num) {
			return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	};
});