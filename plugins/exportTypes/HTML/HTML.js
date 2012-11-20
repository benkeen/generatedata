"use strict";

 define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	var MODULE_ID = "export-type-HTML";
	var LANG = L.exportTypePlugins.HTML;
	var _dialog = null;
	var _codeMirror = null;

	var _updateDialogDimensions = function() {
		var dimensions = _getDialogDimensions();
		$("#etHTMLCustomFormatDialog").dialog({
			width: dimensions.width,
			height: dimensions.height
		});
	}

	var _openEditCustomFormatDialog = function() {
		var dimensions = _getDialogDimensions();
		$("#etHTMLCustomSmarty").css({
			width: "400px",
			height: "400px"
		});

		// calculate size of main content area
		$("#etHTMLCustomFormatDialog").dialog({
			title: "Custom HTML Format",
			width: dimensions.width,
			height: dimensions.height,
			open: function() {
				if (_codeMirror == null) {
					_codeMirror = CodeMirror.fromTextArea($("#etHTMLCustomSmarty")[0], {
						mode: "xml",
						lineNumbers: true
					});
					$("#etHTMLCustomSmarty").addClass("CodeMirror_medium");
				}
			},
			buttons: [
			    {
			    	text: "Close",
			    	click: function() {
			    		$(this).dialog("close");
			    	}
			    }
			]
		});

		return false;
	}

	var _getDialogDimensions = function() {
		return {
			height: ($(window).height() / 100) * 90,
			width: ($(window).width() / 100) * 90
		}
	}

	$(function() {
		$(window).resize(_updateDialogDimensions);
		$("#etHTML_editCustomFormat").bind("click", function() { _openEditCustomFormatDialog(); return false; });
	});
});