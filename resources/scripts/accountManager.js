/*jslint browser:true*/
/*global $:false,console:false,define:false*/
define([
	"manager",
	"utils",
	"constants",
	"lang",
	"moment"
], function(manager, utils, C, L, moment) {

	"use strict";

	/**
	 * @name AccountManager
	 * @see Core
	 * @description This contains all functionality for the administrator when in multiple accounts mode:
	 *   adding, deleting and editing user accounts.
	 * @author Ben Keen
	 * @return {Object}
	 * @namespace
	 */

	var MODULE_ID = "core-accountManager";

	var _run = function() {
		$("#gdCreateAccount").on("click", _openCreateAccountDialog);
		$("#gdRefreshPassword").on("click", _regeneratePassword);
		_getAccountsList();
	};

	var _onClickCreateAccount = function() {
		// check all fields have been entered
		var firstNameField    = $("#gdManageAccount_firstName");
		var firstNameFieldVal = $.trim(firstNameField.val());
		var lastNameField    = $("#gdManageAccount_lastName");
		var lastNameFieldVal = $.trim(lastNameField.val());
		var emailField    = $("#gdManageAccount_email");
		var emailFieldVal = $.trim(emailField.val());
		var passwordField    = $("#gdManageAccount_password");
		var passwordFieldVal = $.trim(passwordField.val());

		var hasErrors = false;
		if (firstNameFieldVal === "") {
			firstNameField.addClass("gdProblemField");
			hasErrors = true;
		} else {
			firstNameField.removeClass("gdProblemField");
		}

		if (lastNameFieldVal === "") {
			lastNameField.addClass("gdProblemField");
			hasErrors = true;
		} else {
			lastNameField.removeClass("gdProblemField");
		}

		if (emailFieldVal === "") {
			emailField.addClass("gdProblemField");
			hasErrors = true;
		} else {
			emailField.removeClass("gdProblemField");
		}

		if (passwordFieldVal === "") {
			passwordField.addClass("gdProblemField");
			hasErrors = true;
		} else {
			passwordField.removeClass("gdProblemField");
		}

		if (!hasErrors) {
			var data = {
				action: "createAccount",
				firstName: firstNameFieldVal,
				lastName:  lastNameFieldVal,
				email: emailFieldVal,
				password: passwordFieldVal,
				autoEmail: $("#gdAutoEmailAccountDetails").attr("checked") ? "yes" : "no"
			};

			$.ajax({
				url: "ajax.php",
				type: "POST",
				data: data,
				dataType: "json",
				success: function(response) {
					if (response.success) {
						_getAccountsList();
					}
				},
				error: function(response) {
					console.log("error response: ", response);
				}
			});
		}
	};

	var _getAccountsList = function() {
		$.ajax({
			url: "ajax.php",
			type: "POST",
			data: { action: "getUsers" },
			dataType: "json",
			success: function(response) {
				if (response.success) {
					_updateAccountsTable(response.content);
				}
			},
			error: function(response) {
				console.log("error response: ", response);
			}
		});
	};

	var _updateAccountsTable = function(data) {
		var html = '';
		for (var i=0; i<data.length; i++) {
			var lastLoggedIn = data[i].last_logged_in;
			var dateCreated = data[i].date_created;

			html += '<tr>' +
					'<td>' + data[i].first_name + '</td>' +
					'<td>' + data[i].last_name + '</td>' +
					'<td>' + data[i].email + '</td>' +
					'<td></td>' +
					'<td>' + lastLoggedIn + '</td>' +
					'<td>' + dateCreated + '</td>' +
					'<td align="center"><a href="">EDIT</a></td>' +
				'</tr>';
		}

		$("#gdAccountList tbody").html(html);
		$("#gdAccountList").removeClass("hidden");
	};

	var _openCreateAccountDialog = function() {
		$("#gdManageAccount_pwdCreate").removeClass("hidden");
		$("#gdManageAccount_pwdEdit").addClass("hidden");
		_regeneratePassword();

		$("#gdManageAccountDialog").dialog({
			title: "Create Account",
			modal: true,
			width: 600,
			buttons: [
				{
					text: "Create Account",
					click: _onClickCreateAccount
				},
				{
					text: L.close,
					click: function() { $(this).dialog("close"); }
				}
			]
		});
	};

	var _regeneratePassword = function() {
		$("#gdManageAccount_password").val(utils.generateRandomAlphaNumericStr(8));
	};

	// register our module
	manager.registerCoreModule(MODULE_ID, {
		run: _run
	});
});