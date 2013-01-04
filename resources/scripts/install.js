/*global $:false,browser:true*/
require([
	"manager",
	"pluginManager",
	"lang",
	"utils",
	"pageinit",
	"jquery-ui",
	"jquery-json"
], function(manager, pluginManager, L, utils) {

	"use strict";

	// everything in this module is private, but we re-use the _ notation here just to signify scope
	var _dbSettings = {};
	var _pluginsInstalled = false;
	var _currStep = null;


	var _toggleAccountSection = function(e) {
		console.log("wtf?");

		// var value = $("input[name=userAccountSetup]:checked").val();
		// console.log("...", value);

		// if (value == "anonymous") {
		// 	$("#gdInstallAccountDetails").hide("fade");
		// } else {
		// 	$("#gdInstallAccountDetails").show("fade");
		// }
	};

	$(function() {
		manager.start();

		$("#dbHostname").select();
		$("form").bind("submit", submit);
		$("input[name=userAccountSetup]").on("click", _toggleAccountSection);
		$("#pluginInstallationResults").on("click", ".gdError", _displayPluginInstallationError);
		$("#gdRefreshPassword").on("click", _regeneratePassword);

		
		console.log($("input[name=userAccountSetup]"));


		// figure out what page we're on. In 99% of cases, it'll be page 1 - but in case the user didn't finish
		// installing the script last time 'round, it will return them to the appropriate step.
		var selectedNavPage = $("#gdInstallNav li.gdSelected");
		if (selectedNavPage.length) {
			_currStep = parseInt(selectedNavPage.attr("id").replace(/^nav/, ""), 10);
		}
	});


	var _displayPluginInstallationError = function(e) {
		$("<div>" + $(e.target).data("error") + "</div>").dialog({
			autoOpen:  true,
			modal:     true,
			resizable: false,
			title:     L.installation_error,
			width:     300
		});
	};

	var _regeneratePassword = function() {
		$("#password").val(utils.generateRandomAlphaNumericStr(8));
	};

	/**
	 * Called for every step in the installation script. This figures out what page the user's on
	 */
	function submit(e) {
		var currentStep = parseInt($(e.target).closest(".gdInstallSection").attr("id").replace(/page/, ""), 10);
		$(".gdError").hide();
		var errors = [];

		switch (currentStep) {

			// this validates the tab, and stores the database info in
			case 1:
				var validChars = /[^a-zA-Z0-9_]/;
				var dbHostname = $("#dbHostname").val();
				if ($.trim(dbHostname) === "") {
					errors.push({ fieldId: "dbHostname", error: L.validation_no_db_hostname });
				}

				var dbName = $.trim($("#dbName").val());
				if (dbName === "") {
					errors.push({ fieldId: "dbName", error: L.validation_no_db_name });
				} else if (validChars.test(dbName)) {
					errors.push({ fieldId: "dbName", error: L.validation_invalid_chars });
				}

				var dbUsername = $.trim($("#dbUsername").val());
				if (dbUsername === "") {
					errors.push({ fieldId: "dbUsername", error: L.validation_no_mysql_username });
				} else if (validChars.test(dbUsername)) {
					errors.push({ fieldId: "dbUsername", error: L.validation_invalid_chars });
				}

				// the password is optional (e.g. for local environments)
				var dbPassword = $.trim($("#dbPassword").val());

				var dbTablePrefix = $.trim($("#dbTablePrefix").val());
				if (validChars.test(dbTablePrefix)) {
					errors.push({ fieldId: "dbTablePrefix", error: L.validation_invalid_chars });
				}

				if (errors.length) {
					$("#" + errors[0].fieldId).select();
					for (var i=0; i<errors.length; i++) {
						$("#" + errors[i].fieldId + "_error").html(errors[i].error).fadeIn(300);
					}
					return false;
				}

				// all looks good! Keep track of the inputted vars for later use
				_dbSettings = {
					dbHostname: dbHostname,
					dbName: dbName,
					dbUsername: dbUsername,
					dbPassword: dbPassword,
					dbTablePrefix: dbTablePrefix
				};

				utils.startProcessing();
				$.ajax({
					url: "ajax.php",
					type: "POST",
					dataType: "json",
					data: {
						action: "installationTestDbSettings",
						dbHostname: dbHostname,
						dbName: dbName,
						dbUsername: dbUsername,
						dbPassword: dbPassword
					},
					success: function(json) {
						utils.stopProcessing();
						if (!json.success) {
							_displayError(json.content);
						} else {
							gotoNextStep(currentStep);
						}
					},
					error: installError
				});
				break;

			case 2:
				utils.startProcessing();
				$.ajax({
					url: "ajax.php",
					type: "POST",
					dataType: "json",
					data: {
						action: "installationCreateSettingsFile",
						dbHostname: _dbSettings.dbHostname,
						dbName: _dbSettings.dbName,
						dbUsername: _dbSettings.dbUsername,
						dbPassword: _dbSettings.dbPassword,
						dbTablePrefix: _dbSettings.dbTablePrefix
					},
					success: function(json) {
						utils.stopProcessing();
						if (json.success === 0) {
							_displayError(json.message);
						} else {
							gotoNextStep(currentStep);
						}
					},
					error: installError
				});
				break;

			case 3:
				var userAccountSetup = $("input[name=userAccountSetup]:checked").val();
				var firstName = "";
				var lastName = "";
				var email = "";
				var password = "";

				/*
				if (employUserAccounts == "yes") {
					firstName = $.trim($("#firstName").val());
					if (firstName === "") {
						errors.push({ fieldId: "firstName", error: L.validation_no_first_name });
					}
					lastName = $.trim($("#lastName").val());
					if (lastName === "") {
						errors.push({ fieldId: "lastName", error: L.validation_no_last_name });
					}
					email = $.trim($("#email").val());
					if (email === "") {
						errors.push({ fieldId: "email", error: L.validation_no_email });
					}
					password = $.trim($("#password").val());
					if (password === "") {
						errors.push({ fieldId: "password", error: L.validation_no_password });
					}
				}

				if (errors.length) {
					$("#" + errors[0].fieldId).select();
					for (var i=0; i<errors.length; i++) {
						$("#" + errors[i].fieldId + "_error").html(errors[i].error).fadeIn(300);
					}
					return false;
				}
				*/

				utils.startProcessing();
				$.ajax({
					url: "ajax.php",
					type: "POST",
					dataType: "json",
					data: {
						action: "installationCreateDatabase",
						userAccountSetup: userAccountSetup,
						firstName: firstName,
						lastName: lastName,
						email: email,
						password: password
					},
					success: function(json) {
						utils.stopProcessing();
						if (json.success === 0) {
							_displayError(json.message);
						} else {
							gotoNextStep(currentStep);
						}
					},
					error: installError
				});
				break;

			case 4:
				if (!_pluginsInstalled) {
					utils.startProcessing();
					$("#gdInstallPluginsBtn").hide();
					pluginManager.installPlugins({
						errorHandler: installError,
						onCompleteHandler: function() {
							$("#gdInstallPluginsBtn").html(L.continue_rightarrow).fadeIn();
							_currStep++;
							_pluginsInstalled = true;
							utils.stopProcessing();
						}
					});
				} else {
					gotoNextStep(currentStep);
				}
				break;

			case 5:
				window.location = "./";
				break;
		}

		return false;
	}

	function _displayError(message) {
		$("#page" + _currStep + " .gdInstallTabMessage .gdResponse").html(message);
		$("#page" + _currStep + " .gdInstallTabMessage").addClass("gdInstallError").show();
	}

	function gotoNextStep(step) {
		$("#nav" + step).removeClass("gdSelected").addClass("gdComplete");
		$("#page" + step).addClass("hidden");

		var nextStep = step + 1;
		$("#nav" + nextStep).addClass("gdSelected");
		$("#page" +  nextStep).removeClass("hidden");
	}

	/**
	 * In case of any Ajax error.
	 */
	function installError(json) {
		utils.stopProcessing();
		_displayError(json.message);
	}

});
