/*jslint browser:true*/
/*global $:false,Spinners:false,define:false,console:false*/
define([
	"manager",
	"constants",
	"lang"
], function(manager, C, L) {

	"use strict";

	/**
	 * @name Utils
	 * @see Core
	 * @description This file contains various helper functions for anyone that wants it.
	 * @return {Object}
	 * @namespace
	 */

	var MODULE_ID = "core-utils";
	var _errors   = [];

  // a hash of identifier => Spinner element. Basically this is used to keep track of all the various spinners that
  // get inserted in the page (main spinner, dialog spinners, installation/plugins spinners) so they can be started/
  // stopped via code
  var _spinners = {
    main: null
  };


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


	var _getParamByName = function(name) {
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regexS = "[\\?&]" + name + "=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(window.location.search);
		if (results === null) {
			return "";
		} else {
			return decodeURIComponent(results[1].replace(/\+/g, " "));
		}
	};

	var _generateRandomAlphaNumericStr = function(len) {
		var chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
		var result = '';
		for (var i=len; i>0; --i) {
			result += chars[Math.round(Math.random() * (chars.length - 1))];
		}
		return result;
	};

  // not thrilled about this, but it's fully functional despite the deprecated function
  var _decodeUTF8 = function (str) {
    return decodeURIComponent(escape(str));
  };

  /**
   * @description This is a general tab-changer helper function for use by any tabbed group. It
   * needs to be passed the old tab number, new tab number, the CSS prefix used for to ID the tabs
   * and the name of the tab group (to be used in the publish message). For an example, see the
   * pageInit.js file, which initializes the main tabs.
   * @function
   * @public
   * @param {Object}
   * @name Utils#selectTab
   */
  var _selectTab = function(settings) {
    var opts = $.extend({
      tabGroup: "",
      oldTab: null,
      newTab: null,
      tabIDPrefix: ""
    }, settings);

    if (opts.oldTab === opts.newTab) {
      return false;
    }

    if (opts.oldTab !== null) {
      $("#" + opts.tabIDPrefix + opts.oldTab).removeClass("gdSelected");
      $("#" + opts.tabIDPrefix + opts.oldTab + "Content").hide();
    }
    if (opts.newTab !== null) {
      var newTabEl = $("#" + opts.tabIDPrefix + opts.newTab);
      if (newTabEl.length === 0) {
        $("#" + opts.tabIDPrefix + "1").addClass("gdSelected");
        $("#" + opts.tabIDPrefix + "1Content").show();
      } else {
        newTabEl.addClass("gdSelected");
        $("#" + opts.tabIDPrefix + opts.newTab + "Content").show();
      }
    }

    manager.publish({
      sender: MODULE_ID,
      type: C.EVENT.TAB.CHANGE,
      tabGroup: opts.tabGroup,
      oldTab: opts.oldTab,
      newTab: opts.newTab
    });

    return false;
  };


  /**
   * Called on page load, this initializes the main spinner canvas icon that appears at the top right of the tabset.
   */
  var _initMainSpinner = function() {
    if (_spinners.main !== null) {
      return;
    }
    var spinnerStyles = C.SPINNERS.SMALL;
    spinnerStyles.color = '#006600';
    _spinners.main = Spinners.create('#gdProcessingIcon', spinnerStyles).pause();
  };

  var _startProcessing = function() {
    _spinners.main.play();
  };

  var _stopProcessing = function() {
    _spinners.main.pause();
  };

  // contains a little extra logic to add the spinner to the right spot in a jQuery UI modal just by passing the modal ID
  var _insertModalSpinner = function(paramSettings) {
    var settings = $.extend({
      modalID: null
    }, paramSettings);

    if (settings.modalID === null) {
      console.log("_insertModalSpinner needs to be passed the modal ID.");
      return;
    }

    // if this spinner has already been created, do nothing - we don't need to recreate it
    if (_spinners.hasOwnProperty(settings.modalID)) {
      return;
    }

    var dialogBottomRow = $('#' + settings.modalID).closest(".ui-dialog").find(".ui-dialog-buttonpane");
    dialogBottomRow.prepend('<span class="modalSpinner"></span>');
    var spinnerSpan = dialogBottomRow.children("span")[0];
    var spinnerParams = $.extend(C.SPINNERS.LARGE, settings);
    _spinners[settings.modalID] = Spinners.create(spinnerSpan, spinnerParams).pause();
  };

  var _insertSpinner = function(key, el, params) {
    var spinnerParams = $.extend(C.SPINNERS.LARGE, params);
    _spinners[key] = Spinners.create(el, spinnerParams).pause();
  };

  var _playSpinner = function(modalID) {
    _spinners[modalID].play();
  };

  var _pauseSpinner = function(modalID) {
    _spinners[modalID].pause();
  };

  /**
   * This adds an array of error objects, or just a single one.
   */
  var _addValidationErrors = function(newErrors) {
    if ($.isArray(newErrors)) {
      if (newErrors.length) {
        _errors = _errors.concat(newErrors);
      }
    } else {
      _errors.push(newErrors);
    }
  };

  var _clearValidationErrors = function(topLevelEl) {
    _errors = [];
    $(topLevelEl).find(".gdProblemField").removeClass("gdProblemField");
  };


  var _hideValidationErrors = function(el, unhighlightProblemFields) {
    if (el.css("display") != "block") {
      return;
    }
    if (unhighlightProblemFields) {
      $(el).find(".gdProblemField").removeClass("gdProblemField");
    }
    $(el).closest(".gdMessage").hide("blind", null, 500);
    _errors = [];
    return false;
  };


  /**
   * Helper function to return the errors currently that have been logged.
   */
  var _getValidationErrors = function() {
    return _errors;
  };

  /**
   * Displays the errors
   */
  var _displayValidationErrors = function(el) {
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
  };

  var _displayMessage = function(el, message) {
    $(el).removeClass("gdErrors").addClass("gdNotify gdMarginTop");
    $(el).find("div").html(message);
    this.updateMessageBlock(el, "notify");
  };

  /**
   * Helper function to actually show / highlight a message block consistently. This assumes the message / error
   * is already in the element. It either blinds it quickly in, or does a highlight effect to draw attention to it.
   */
  var _updateMessageBlock = function(el, messageType) {
    var color = (messageType == "error") ? "#ffc9c9" : "#a4c2ff";
    if ($(el).css("display") != "block") {
      $(el).show("blind", null, 500);
    } else {
      $(el).effect("highlight", { color: color }, 1500);
    }
  };

  var _isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  var _isValidEmail = function(str) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(str);
  };

  var _formatNumWithCommas = function(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };


  return {
    selectTab: _selectTab,

    // spinners
    initMainSpinner: _initMainSpinner,
    startProcessing: _startProcessing,
    stopProcessing: _stopProcessing,
    insertModalSpinner: _insertModalSpinner,
    insertSpinner: _insertSpinner,
    playSpinner: _playSpinner,
    pauseSpinner: _pauseSpinner,

    // validation
    addValidationErrors: _addValidationErrors,
    clearValidationErrors: _clearValidationErrors,
		hideValidationErrors: _hideValidationErrors,
		getValidationErrors: _getValidationErrors,
    displayValidationErrors: _displayValidationErrors,
		displayMessage: _displayMessage,
		updateMessageBlock: _updateMessageBlock,

    // misc helpers
		isNumber: _isNumber,
		isValidEmail: _isValidEmail,
		formatNumWithCommas: _formatNumWithCommas,
		getParamByName: _getParamByName,
		generateRandomAlphaNumericStr: _generateRandomAlphaNumericStr,
    decodeUTF8: _decodeUTF8
	};
});
