/*jslint browser:true*/
/*global $:false,Spinners:false,console:false,define:false*/
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
	var _modalSpinners = {}; // a hash of modal ID => Spinner element
	var _accountList;
	var _manageAccountModalID = "gdManageAccountDialog";
	var _deleteAccountModalID = "gdDeleteAccountDialog";


	var _run = function() {
		$("#gdCreateAccount").on("click", _openCreateAccountDialog);
		$("#gdRefreshPassword").on("click", _regeneratePassword);

		// event delegate the Edit and Delete clicks
		$("#gdAccountList").on("click", ".gdEditAccount", _openEditAccountDialog);
		$("#gdAccountList").on("click", ".gdDeleteAccount", _openDeleteAccountDialog);

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
			_modalSpinners[_manageAccountModalID].play();
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
					_modalSpinners[_manageAccountModalID].pause();
					if (response.success) {

						// get a fresh list of accounts from the server, and add a callback so that
						// we close the modal when it's complete`
						_getAccountsList({
							onComplete: function() {
								$("#" + _manageAccountModalID).dialog("close");
								_modalSpinners[_manageAccountModalID].pause();
							}
						});
					}
				},
				error: function(response) {
					_modalSpinners[_manageAccountModalID].pause();
					console.log("error response: ", response);
				}
			});
		}
	};

	var _onConfirmDeleteAccount = function(accountID) {
		_modalSpinners[_deleteAccountModalID].play();
		$.ajax({
			url: "ajax.php",
			type: "POST",
			data: {
				action: "deleteAccount",
				accountID: accountID
			},
			dataType: "json",
			success: function(response) {
				if (response.success) {

					// get a fresh list of accounts from the server, and add a callback so that
					// we close the modal when it's complete`
					_getAccountsList({
						onComplete: function() {
							$("#" + _deleteAccountModalID).dialog("close");
							_modalSpinners[_deleteAccountModalID].pause();
						}
					});
				} else {
					// TODO
				}
			},
			error: function(response) {
				_modalSpinners[_deleteAccountModalID].pause();
				console.log("error response: ", response);
			}
		});
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
			title: "Update Account",
			modal: true,
			width: 600,
			open: function() { _insertModalSpinner({ modalID: _manageAccountModalID }); },
			buttons: [
				{
					text: "Update",
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
			open: function() { _insertModalSpinner({ modalID: _deleteAccountModalID }); },
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

		var ajaxObj = {
			url: "ajax.php",
			type: "POST",
			data: { action: "getUsers" },
			dataType: "json",
			success: function(response) {
				if (response.success) {
					_accountList = response.content;
					_updateAccountsTable(_accountList);
				}
				if (opts.onComplete !== null) {
					opts.onComplete();
				}
			},
			error: function(response) {
				console.log("error response: ", response);
				if (opts.onComplete !== null) {
					opts.onComplete();
				}
			}
		};

		$.ajax(ajaxObj);
	};


	var _updateAccountsTable = function(data) {
		var html = '';
		for (var i=0; i<data.length; i++) {
			var lastLoggedIn = (data[i].last_logged_in !== '') ? moment.unix(data[i].last_logged_in).format("h:mm A, MMM Do YYYY") : '&#8212;';
			var dateCreated  = moment.unix(data[i].date_created).format("h:mm A, MMM Do YYYY");
			html += '<tr data-account-id="' + data[i].account_id + '">' +
					'<td>' + data[i].first_name + '</td>' +
					'<td>' + data[i].last_name + '</td>' +
					'<td><a href="mailto:' + data[i].email + '">' + data[i].email + '</a></td>' +
					'<td align="center">' + data[i].num_rows_generated + '</td>' +
					'<td>' + lastLoggedIn  + '</td>' +
					'<td>' + dateCreated + '</td>' +
					'<td align="center"><a href="#" class="gdEditAccount">' + L.edit.toUpperCase() + '</a></td>' +
					'<td align="center"><a href="#" class="gdDeleteAccount">' + L["delete"].toUpperCase() + '</a></td>' +
				'</tr>';
		}

		$("#gdAccountList tbody").html(html);
		$("#gdAccountList").removeClass("hidden");

		if (data.length === 0) {
			$("#gdAccountListEmpty").removeClass("hidden");
			$("#gdAccountListNonEmpty").addClass("hidden");
		} else {
			$("#gdAccountListEmpty").addClass("hidden");
			$("#gdAccountListNonEmpty").removeClass("hidden");
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
			open: function() { _insertModalSpinner({ modalID: _manageAccountModalID }); },
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

	var _insertModalSpinner = function(paramSettings) {
		var settings = $.extend({
			modalID: null
		}, paramSettings);

		if (settings.modalID === null) {
			console.log("_insertModalSpinner needs to be passed the modal ID.");
			return;
		}

		// if this modal's spinner has already been created, do nothing - we don't need to recreate it
		if (_modalSpinners.hasOwnProperty(settings.modalID)) {
			return;
		}

		var dialogBottomRow = $('#' + settings.modalID).closest(".ui-dialog").find(".ui-dialog-buttonpane");
		dialogBottomRow.prepend('<span class="modalSpinner"></span>');
		var spinnerSpan = dialogBottomRow.children("span")[0];
		_modalSpinners[settings.modalID] = Spinners.create(spinnerSpan, {
			radius: 7,
			height: 9,
			width: 2,
			dashes: 20,
			opacity: 1,
			padding: 0,
			rotation: 1400,
			fadeOutSpeed: 0,
			color: '#333333',
			pauseColor: '#000000',
			pauseOpacity: 0.14
		}).pause();
	};

	// register our module
	manager.registerCoreModule(MODULE_ID, {
		run: _run
	});
});