/*global $:false,browser:true,require:false*/
require([
	"manager",
	"pluginManager",
	"utils",
	"pageInit"
], function(manager, pluginManager, utils) {

	"use strict";

	// everything in this module is private, but we use the _ notation here just to signify scope
	var _dbSettings = {};
	var _pluginsInstalled = false;
	var _currStep = null;
	var _L = null;
	var _defaultLanguage = "en";
	var _settingsFileCreationFailed = false;


	// a nuisance, but since the DB isn't set up for the installation script, we need to explicitly pass
	// the language to the lang.php file to return the appropriate language JS strings
	var currLang = $("body").data("lang");
	require([
		'resources/scripts/lang.php?lang=' + currLang
	], function(L) {
		_L = L;

		$(function() {
			manager.start();

			$("#dbHostname").select();
			$("form").bind("submit", submit);
			$("input[name=userAccountSetup]").on("click", _toggleAccountSection);
			$("#allowAnonymousAccess").on("click", _toggleAnonymousAccess);
			$("#pluginInstallationResults").on("click", ".gdError", _displayPluginInstallationError);
			$("#gdRefreshPassword").on("click", _regeneratePassword);

			// figure out what page we're on. In 99% of cases, it'll be page 1 - but in case the user didn't finish
			// installing the script last time 'round, it will return them to the appropriate step.
			var selectedNavPage = $("#gdInstallNav li.gdSelected");
			if (selectedNavPage.length) {
				_currStep = parseInt(selectedNavPage.attr("id").replace(/^nav/, ""), 10);
			}

			// this prevents the browser from accidentally remembering a previously select radio, if the user 
			// aborted the login process and started again
			$("#acs1").attr("checked", "checked");
		});
	});

	function _toggleAccountSection(e) {
		var value = $("input[name=userAccountSetup]:checked").val();
		switch (value) {
			case "anonymousAdmin":
				$("#gdInstallAccountDetails").hide("fade");
				$("#gdInstallAnonymousUserSettings").hide("fade");
				break;
			case "single":
				$("#gdInstallAccountDetails").show("fade");
				$("#gdInstallAnonymousUserSettings").hide("fade");
				$("#gdInstallAccountDetailsMessage").html(_L.enter_user_account_details);
				break;
			case "multiple":
				$("#gdInstallAccountDetails").show("fade");
				$("#gdInstallAnonymousUserSettings").show("fade");
				$("#gdInstallAccountDetailsMessage").html(_L.admin_account);
				break;
		}
	}

	function _toggleAnonymousAccess(e) {
		if (e.target.checked) {
			$("#anonymousUserPermissionDeniedMsg").removeClass("gdDisabled").removeAttr("disabled");
		} else {
			$("#anonymousUserPermissionDeniedMsg").addClass("gdDisabled").attr("disabled", "disabled");
		}
	}

	function _displayPluginInstallationError(e) {
		$("<div>" + $(e.target).data("error") + "</div>").dialog({
			autoOpen:  true,
			modal:     true,
			resizable: false,
			title:     _L.installation_error,
			width:     300
		});
	}

	function _regeneratePassword() {
		$("#password").val(utils.generateRandomAlphaNumericStr(8));
	}

	/**
	 * Called for every step in the installation script. This figures out what page the user's on and calls the
	 * appropriate code.
	 */
	function submit(e) {
		var currentStep = parseInt($(e.target).closest(".gdInstallSection").attr("id").replace(/page/, ""), 10);
		$(".gdError").hide();
		var errors = [];

		if (currentStep === 1) {
			_checkDatabaseInfo();
		} else if (currentStep === 2) {
			if (_settingsFileCreationFailed) {
				_testSettingsFileExists();
			} else {
				_createSettingsFile();
			}
		} else if (currentStep === 3) {
			_setupUserAccounts();
		} else if (currentStep === 4) {
			_installPlugins();
		} else if (currentStep === 5) {
			window.location = "./";
		}

		return false;
	}


	function _checkDatabaseInfo() {
		var errors = [];
		var validChars = /[^a-zA-Z0-9_]/;
		var validCharsUserField = /[^a-zA-Z0-9_\.]/;
		var dbHostname = $("#dbHostname").val();
		if ($.trim(dbHostname) === "") {
			errors.push({ fieldId: "dbHostname", error: _L.validation_no_db_hostname });
		}

		var dbName = $.trim($("#dbName").val());
		if (dbName === "") {
			errors.push({ fieldId: "dbName", error: _L.validation_no_db_name });
		} else if (validChars.test(dbName)) {
			errors.push({ fieldId: "dbName", error: _L.validation_invalid_chars });
		}

		var dbUsername = $.trim($("#dbUsername").val());
		if (dbUsername === "") {
			errors.push({ fieldId: "dbUsername", error: _L.validation_no_mysql_username });
		} else if (validCharsUserField.test(dbUsername)) {
			errors.push({ fieldId: "dbUsername", error: _L.validation_invalid_chars });
		}

		// the password is optional (e.g. for local environments)
		var dbPassword = $.trim($("#dbPassword").val());

		var dbTablePrefix = $.trim($("#dbTablePrefix").val());
		if (validChars.test(dbTablePrefix)) {
			errors.push({ fieldId: "dbTablePrefix", error: _L.validation_invalid_chars });
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

		// make a note of the default language they selected. We'll store this later
		_defaultLanguage = $("#gdDefaultLanguage").val();

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
					gotoNextStep();
				}
			},
			error: installError
		});
	}

	function _createSettingsFile() {
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
					$("#gdInstallCreateSettingsFile").addClass("hidden");
					$("#gdInstallCreateSettingsFileErrorScenario").removeClass("hidden");
					_displayError(_L.installation_failed_create_settings_file);
					$("#gdSettingsFileContents").html(json.content);
					_settingsFileCreationFailed = true;
				} else {
					gotoNextStep();
				}
			},
			error: installError
		});
	}

	function _testSettingsFileExists() {
		utils.startProcessing();
		$.ajax({
			url: "ajax.php",
			type: "POST",
			dataType: "json",
			data: {
				action: "confirmSettingsFileExists"
			},
			success: function(json) {
				utils.stopProcessing();
				if (json.success === 0) {
					_displayError("Sorry, the <b>settings.php</b> file still doesn't exist in the Data Generator root folder.");
				} else {
					gotoNextStep();
				}
			},
			error: installError
		});

	}

	function _setupUserAccounts() {
		var errors = [];
		var userAccountSetup = $("input[name=userAccountSetup]:checked").val();
		var firstName = "";
		var lastName = "";
		var email = "";
		var password = "";
		var allowAnonymousAccess = "";
		var anonymousUserPermissionDeniedMsg = "";

		if (userAccountSetup === "single" || userAccountSetup === "multiple") {
			firstName = $.trim($("#firstName").val());
			if (firstName === "") {
				errors.push({ fieldId: "firstName", error: _L.validation_no_first_name });
			}
			lastName = $.trim($("#lastName").val());
			if (lastName === "") {
				errors.push({ fieldId: "lastName", error: _L.validation_no_last_name });
			}
			email = $.trim($("#email").val());
			if (email === "") {
				errors.push({ fieldId: "email", error: _L.validation_no_email });
			}
			password = $.trim($("#password").val());
			if (password === "") {
				errors.push({ fieldId: "password", error: _L.validation_no_password });
			}

			if (userAccountSetup === "multiple") {
				allowAnonymousAccess = $("#allowAnonymousAccess").attr("checked") ? "yes" : "no";
				anonymousUserPermissionDeniedMsg = $("#anonymousUserPermissionDeniedMsg").val();
			}
		}

		if (errors.length) {
			$("#" + errors[0].fieldId).select();
			for (var j=0; j<errors.length; j++) {
				$("#" + errors[j].fieldId + "_error").html(errors[j].error).fadeIn(300);
			}
			return false;
		}

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
				password: password,
				allowAnonymousAccess: allowAnonymousAccess,
				anonymousUserPermissionDeniedMsg: anonymousUserPermissionDeniedMsg,

				// weird, because the field was on the first page
				defaultLanguage: _defaultLanguage
			},
			success: function(json) {
				utils.stopProcessing();
				if (json.success === 0) {
					_displayError(json.content);
				} else {
					gotoNextStep();
				}
			},
			error: installError
		});
	}

	function _installPlugins() {
		if (!_pluginsInstalled) {
			utils.startProcessing();
			$("#gdInstallPluginsBtn").hide();
			pluginManager.installPlugins({
				errorHandler: installError,
				onCompleteHandler: function() {
					$("#gdInstallPluginsBtn").html(_L.continue_rightarrow).fadeIn();
					_pluginsInstalled = true;
					utils.stopProcessing();
				}
			});
		} else {
			gotoNextStep();
		}
	}

	function _displayError(message) {
		$("#page" + _currStep + " .gdInstallTabMessage .gdResponse").html(message);
		$("#page" + _currStep + " .gdInstallTabMessage").addClass("gdInstallError").show();
	}

	function gotoNextStep() {
		$("#nav" + _currStep).removeClass("gdSelected").addClass("gdComplete");
		$("#page" + _currStep).addClass("hidden");

		var nextStep = _currStep + 1;
		$("#nav" + nextStep).addClass("gdSelected");
		$("#page" +  nextStep).removeClass("hidden");

		_currStep = nextStep;
	}

	/**
	 * In case of any Ajax error.
	 */
	function installError(json) {
		utils.stopProcessing();
		_displayError(json.content);
	}

});
