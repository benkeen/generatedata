/*jslint browser:true*/
/*global $:false,console:false,define:false*/
define([
	"manager",
	"utils",
	"constants",
	"lang",
	"moment",
	"tablesorter"
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
	var _accountList;
	var _manageAccountModalID = "gdManageAccountDialog";
	var _deleteAccountModalID = "gdDeleteAccountDialog";
	var _userTableCreated = false;


	var _run = function() {
		var isLoggedIn = $("body").data("loggedIn");
		var userAccountSetup = $("body").data("userAccountSetup");
		if (!isLoggedIn || userAccountSetup !== "multiple") {
			return;
		}

		$("#gdCreateAccount").on("click", _openCreateAccountDialog);
		$("#gdRefreshPassword").on("click", _regeneratePassword);

		// event delegate the Edit and Delete clicks
		var accountList = $("#gdAccountList");
		accountList.on("click", ".gdEditAccount", _openEditAccountDialog);
		accountList.on("click", ".gdDeleteAccount", _openDeleteAccountDialog);

		_getAccountsList();

		var subscriptions = {};
		subscriptions[C.EVENT.TAB.CHANGE] = _onChangeTab;
		manager.subscribe(MODULE_ID, subscriptions);
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
			utils.playModalSpinner(_manageAccountModalID);
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
				dataType: "json"
			}).then(
				function(response) {
					if (response.success) {
						// get a fresh list of accounts from the server, and add a callback so that
						// we close the modal when it's complete
						_getAccountsList({
							onComplete: function() {
								utils.clearValidationErrors($("#gdManageAccountDialogMessage"));
								$("#" + _manageAccountModalID).dialog("close");
								utils.pauseModalSpinner(_manageAccountModalID);
								_updateAccountsTable();
							}
						});
					} else {
						var errorCode = response.errorCode;
						switch (errorCode) {
							case C.ERROR_CODES.ACCOUNT_ALREADY_EXISTS:
								utils.addValidationErrors({ els: [$("#gdManageAccount_email")], error: L.validation_account_already_exists });
								break;
							case C.ERROR_CODES.NOT_LOGGED_IN:
								utils.addValidationErrors({ els: [], error: L.validation_not_logged_in });
								break;
							case C.ERROR_CODES.NON_ADMIN:
								utils.addValidationErrors({ els: [], error: L.validation_invalid_permissions });
								break;
						}
						utils.displayValidationErrors("#gdManageAccountDialogMessage");
						utils.pauseModalSpinner(_manageAccountModalID);
					}
				},

				function(response) {
					utils.pauseModalSpinner(_manageAccountModalID);
					console.log("error response: ", response);
				}
			);

		}
	};

	var _onConfirmDeleteAccount = function(accountID) {
		utils.playModalSpinner(_deleteAccountModalID);
		$.ajax({
			url: "ajax.php",
			type: "POST",
			data: {
				action: "deleteAccount",
				accountID: accountID
			},
			dataType: "json"
		}).then(
			function(response) {
				if (response.success) {
					// get a fresh list of accounts from the server, and add a callback so that
					// we close the modal when it's complete`
					_getAccountsList({
						onComplete: function() {
							$("#" + _deleteAccountModalID).dialog("close");
							utils.pauseModalSpinner(_deleteAccountModalID);
							_updateAccountsTable();
						}
					});
				} else {
					// TODO
				}
			},
			function(response) {
				utils.pauseModalSpinner(_deleteAccountModalID);
				console.log("error response: ", response);
			}
		);
	};

	var _openEditAccountDialog = function(e) {
		e.preventDefault();
		var accountID = $(e.target).closest("tr").data("account-id");
		$("#gdManageAccount_pwdCreate,#gdManageAccountDialogEmailRow").addClass("hidden");
		$("#gdManageAccount_pwdEdit").removeClass("hidden");

		// now pre-fill the fields in the dialog
		var accountInfo = _getAccountByID(accountID);
		if (accountInfo === null) {
			console.log("This shouldn't have happened. Couldn't find an account ID.");
			return;
		} else {
			$("#gdManageAccount_firstName").val(accountInfo.first_name);
			$("#gdManageAccount_lastName").val(accountInfo.last_name);
			$("#gdManageAccount_email").val(accountInfo.email);
		}

		$("#" + _manageAccountModalID).dialog({
			title: L.update_account,
			modal: true,
			width: 600,
			open: function() { utils.insertModalSpinner({ modalID: _manageAccountModalID }); },
			buttons: [
				{
					text: L.update,
					click: _onClickCreateAccount
				},
				{
					text: L.close,
					click: function() { $(this).dialog("close"); }
				}
			]
		});
	};

	var _openDeleteAccountDialog = function(e) {
		e.preventDefault();
		var accountID = $(e.target).closest("tr").data("account-id");

		// now pre-fill the text in the dialog to make it totally transparent what the admin
		// is about to delete
		var accountInfo = _getAccountByID(accountID);
		if (accountInfo === null) {
			console.log("This shouldn't have happened. Couldn't find an account ID.");
			return;
		} else {
			$("#gdDeleteAccount_firstName").html(accountInfo.first_name);
			$("#gdDeleteAccount_lastName").html(accountInfo.last_name);
			$("#gdDeleteAccount_email").html(accountInfo.email);
		}

		$("#" + _deleteAccountModalID).dialog({
			title: L.delete_account,
			modal: true,
			width: 480,
			open: function() { utils.insertModalSpinner({ modalID: _deleteAccountModalID }); },
			buttons: [
				{
					text: L.yes,
					click: function() { _onConfirmDeleteAccount(accountID); }
				},
				{
					text: L.no,
					click: function() { $(this).dialog("close"); }
				}
			]
		});
	};

	var _getAccountByID = function(accountID) {
		var accountInfo = null;
		for (var i=0; i<_accountList.length; i++) {
			if (_accountList[i].account_id == accountID) {
				accountInfo = _accountList[i];
				break;
			}
		}
		return accountInfo;
	};

	var _getAccountsList = function(options) {
		var opts = $.extend({
			onComplete: null
		}, options);

		$.ajax({
			url: "ajax.php",
			type: "POST",
			data: { action: "getUsers" },
			dataType: "json"
		}).then(
			function(response) {
				if (response.success) {
					_accountList = response.content;
					_updateAccountsTable();
				}
				if (opts.onComplete !== null) {
					opts.onComplete();
				}
			},
			function(response) {
				console.log("error response: ", response);
				if (opts.onComplete !== null) {
					opts.onComplete();
				}
			}
		);
	};


	var _updateAccountsTable = function() {
		var html = '';
		for (var i=0; i<_accountList.length; i++) {
			var lastLoggedIn = (_accountList[i].last_logged_in !== '') ? moment.unix(_accountList[i].last_logged_in).format("MMM D, YYYY h:mm A") : '&#8212;';
			var dateCreated  = moment.unix(_accountList[i].date_created).format("MMM D, YYYY");
			html += '<tr data-account-id="' + _accountList[i].account_id + '">' +
					'<td>' + _accountList[i].account_id + '</td>' +
					'<td>' + _accountList[i].first_name + '</td>' +
					'<td>' + _accountList[i].last_name + '</td>' +
					'<td><a href="mailto:' + _accountList[i].email + '">' + _accountList[i].email + '</a></td>' +
					'<td align="center">' + _accountList[i].num_rows_generated + '</td>' +
					'<td>' + lastLoggedIn  + '</td>' +
					'<td>' + dateCreated + '</td>' +
					'<td class="gdEditAccount"><a href="#"></a></td>' +
					'<td class="gdDeleteAccount"><a href="#"></a></td>' +
				'</tr>';
		}

		$("#gdAccountList tbody").html(html);
		$("#gdAccountList").removeClass("hidden");

		if (_accountList.length === 0) {
			$("#gdAccountListEmpty").removeClass("hidden");
			$("#gdAccountListNonEmpty").addClass("hidden");
		} else {
			$("#gdAccountListEmpty").addClass("hidden");
			$("#gdAccountListNonEmpty").removeClass("hidden");
		}

		$("#gdNumUserAccounts").html("<b>(" + _accountList.length + ")</b>");

		if (!_userTableCreated) {
			$(".tablesorter").tablesorter({
				widgets: ["zebra", "columns"],
				theme:   "default"
			});
			_userTableCreated = true;
		} else {
			$(".tablesorter").trigger("update");
		}
	};

	var _openCreateAccountDialog = function() {
		$("#gdManageAccount_pwdCreate,#gdManageAccountDialogEmailRow").removeClass("hidden");
		$("#gdManageAccount_pwdEdit").addClass("hidden");
		_regeneratePassword();

		$("#gdManageAccount_firstName,#gdManageAccount_lastName,#gdManageAccount_email").val("");
		$("#" + _manageAccountModalID).dialog({
			title: L.create_account,
			modal: true,
			width: 600,
			open: function() { utils.insertModalSpinner({ modalID: _manageAccountModalID }); },
			buttons: [
				{
					text: L.create_account,
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

	var _onChangeTab = function(message) {
		if (message.newTab == 2) {
			$(".tablesorter").trigger("update");
		}
	};

	// register our module
	manager.registerCoreModule(MODULE_ID, {
		run: _run
	});

	return {
		run: _run
	};
});
