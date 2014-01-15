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

		$("#etHTMLCustomContent .CodeMirror").addClass("CodeMirror_medium");
		_codeMirror = CodeMirror.fromTextArea($("#etHTMLCustomSmarty")[0], {
			mode: "smartymixed",
			lineNumbers: true
		});
		_codeMirror.setValue($("#etHTMLCustomSmarty_Template").html());
		$("#etHTML_ResetCustomHTML").on("click", _resetCustomHTML);
	};

	var _updateDialogDimensions = function() {
		var dimensions = _getDialogDimensions();
		$("#etHTMLCustomFormatDialog").dialog("option", "width", dimensions.dialogWidth);
		$("#etHTMLCustomFormatDialog").dialog("option", "height", dimensions.dialogHeight);
	};

	var _openEditCustomFormatDialog = function() {
		var dimensions = _getDialogDimensions();

		// calculate size of main content area
		$("#etHTMLCustomFormatDialog").dialog({
			title: LANG.custom_html_format,
			modal: true,
			width: dimensions.dialogWidth,
			height: dimensions.dialogHeight,
			resizable: false,
			open: function() {
				$("#etHTMLCustomContent .CodeMirror, #etHTMLCustomContent .CodeMirror-scroll").css({
					width: dimensions.contentWidth,
					height: dimensions.contentHeight
				});
				_codeMirror.refresh();
			},
			buttons: [
				{
					text: L.close,
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
		$("#etHTMLCustomHTMLSource").val(_codeMirror.getValue());
		if (msg.exportTarget != "inPage" || msg.exportType != "HTML") {
			return;
		}
		msg.editor.setOption("mode", "xml");
	};

	var _loadSettings = function(settings) {
		$("input[name=etHTMLExportFormat][value=" + settings.dataFormat + "]").attr("checked", "checked");
		if (settings.useCustomExportFormat == "1") {
			$("#etHTMLUseCustomExportFormat").attr("checked", "checked");
		} else {
			$("#etHTMLUseCustomExportFormat").removeAttr("checked");
		}
		$("#etHTMLCustomSmarty").val(settings.customExportSmartyContent);
	};

	var _saveSettings = function() {
		return {
			dataFormat: $("input[name=etHTMLExportFormat]:checked").val(),
			useCustomExportFormat: $("#etHTMLUseCustomExportFormat")[0].checked ? 1 : 0,
			customExportSmartyContent: _codeMirror.getValue()
		};
	};

	var _resetSettings = function() {
		$("input[name=etHTMLExportFormat][value=table]").attr("checked", "checked");
		$("#etHTMLUseCustomExportFormat").removeAttr("disabled").trigger("click");
		_codeMirror.setValue($("#etHTMLCustomSmarty_Template").html());
	};

	var _resetCustomHTML = function() {
		_codeMirror.setValue($("#etHTMLCustomSmarty_Template").html());
	};


	manager.registerExportType(MODULE_ID, {
		init: _init,
		loadSettings: _loadSettings,
		saveSettings: _saveSettings,
		resetSettings: _resetSettings
	});
});
