/*global $:false,CodeMirror:false*/
 define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	"use strict";

	/**
	 * @name HTML
	 * @see ExportType
	 * @description Client-side code for the HTML Export Type.
	 * @namespace
	 */

	var MODULE_ID = "export-type-HTML";
	var LANG = L.exportTypePlugins.HTML;
	var _dialog = null;
	var _codeMirror = null;

	var _updateDialogDimensions = function() {
		var dimensions = _getDialogDimensions();
		$("#etHTMLCustomFormatDialog").dialog("option", "width", dimensions.dialogWidth);
		$("#etHTMLCustomFormatDialog").dialog("option", "height", dimensions.dialogHeight);
	};

	var _openEditCustomFormatDialog = function() {
		var dimensions = _getDialogDimensions();

		// calculate size of main content area
		$("#etHTMLCustomFormatDialog").dialog({
			title: "Custom HTML Format",
			modal: true,
			width: dimensions.dialogWidth,
			height: dimensions.dialogHeight,
			open: function() {
				if (_codeMirror === null) {
					_codeMirror = CodeMirror.fromTextArea($("#etHTMLCustomSmarty")[0], {
						mode: "xml",
						lineNumbers: true
					});
					$("#etHTMLCustomContent .CodeMirror").addClass("CodeMirror_medium");
					$("#etHTMLCustomContent .CodeMirror-scroll").css({
						width: dimensions.contentWidth,
						height: dimensions.contentHeight
					});
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
	};

	var _getDialogDimensions = function() {
		var dialogHeight  = ($(window).height() / 100) * 90;
		var dialogWidth   = ($(window).width() / 100) * 90;
		var contentHeight = dialogHeight - 110;
		var contentWidth  = dialogWidth - 370;

		return {
			dialogHeight: dialogHeight,
			dialogWidth: dialogWidth,
			contentHeight: contentHeight,
			contentWidth: contentWidth
		};
	};

	/**
	 * If the user is generating in-page data with this Export Type, enable the XML
	 * mode for the in-page editor.
	 */
	var _onGenerate = function(msg) {
		if (msg.exportTarget != "inPage" || msg.exportType != "HTML") {
			return;
		}
		msg.editor.setOption("mode", "xml");
	};

	var _init = function() {
		$(window).resize(_updateDialogDimensions);
		$("#etHTMLEditCustomFormat").bind("click", function() { _openEditCustomFormatDialog(); return false; });
		$("#etHTMLUseCustomExportFormat").bind("click", function() {
			if (this.checked) {
				$("#etHTMLEditCustomFormat").removeAttr("disabled");
				$(".etHTMLDefaultFormats").attr("disabled", "disabled");
				$(".etHTMLDefaultFormatLabels").addClass("gdDisabledText");
			} else {
				$("#etHTMLEditCustomFormat").attr("disabled", "disabled");
				$(".etHTMLDefaultFormats").removeAttr("disabled");
				$(".etHTMLDefaultFormatLabels").removeClass("gdDisabledText");
			}
		});

		var subscriptions = {};
		subscriptions[C.EVENT.GENERATE] = _onGenerate;
		manager.subscribe(MODULE_ID, subscriptions);
	};

	var _loadSettings = function(settings) {
		$("input[name=etHTMLExportFormat]").val(settings.dataFormat); // TODO (check...)
		$("#etHTMLUseCustomExportFormat").val(settings.useCustomExportFormat);
		$("#etHTMLCustomSmarty").val(settings.customExportSmartyContent);
	};

	var _saveSettings = function() {
		return {
			"dataFormat": $("input[name=etHTMLExportFormat]:checked").val(),
			"useCustomExportFormat": $("#etHTMLUseCustomExportFormat")[0].checked,
			"customExportSmartyContent": $("#etHTMLCustomSmarty").val()
		};
	};

	var _resetSettings = function() {

	};
	

	manager.registerExportType(MODULE_ID, {
		init: _init,
		loadSettings: _loadSettings,
		saveSettings: _saveSettings,
		resetSettings: _resetSettings
	});
});
