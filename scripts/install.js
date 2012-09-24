require([
	"manager",
	"lang",
	"utils",
	"pageinit",
	"jquery-ui",
	"jquery-json",
], function(manager, L, utils) {

	$(function() {
		$("#dbHostname").select();
		$("form").bind("submit", submit);
		$("input[name=employUserAccounts]").bind("click", _toggleUserAccountSection);
		_toggleUserAccountSection();
	});

	function _toggleUserAccountSection() {
		var value = $("input[name=employUserAccounts]:checked").val();
		var rowSelector = ".gdEmailRow,.gdPasswordRow,.gdFirstNameRow,.gdLastNameRow";
		if (value == "yes") {
			$(rowSelector).removeClass("gdDisabledRow").find("input").removeAttr("disabled");
		} else {
			$(rowSelector).addClass("gdDisabledRow").find("input").attr("disabled", "disabled");
		}
	}

	function submit() {
		$(".gdError").hide();
		var validChars = /[^a-zA-Z0-9_]/;
		var errors = [];
		var dbHostname = $("#dbHostname").val();
		if ($.trim(dbHostname) == "") {
			errors.push({ fieldId: "dbHostname", error: L.validation_no_db_hostname });
		}
		var dbName = $.trim($("#dbName").val());
		if (dbName == "") {
			errors.push({ fieldId: "dbName", error: L.validation_no_db_name });
		} else if (validChars.test(dbName)) {
			errors.push({ fieldId: "dbName", error: L.validation_invalid_chars });
		}

		var dbUsername = $.trim($("#dbUsername").val());
		if (dbUsername == "") {
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

		var employUserAccounts = $("input[name=employUserAccounts]:checked").val();
		var firstName = "";
		var lastName = "";
		var email = "";
		var password = "";

		if (employUserAccounts == "yes") {
			firstName = $.trim($("#firstName").val());
			if (firstName == "") {
				errors.push({ fieldId: "firstName", error: L.validation_no_first_name });
			}
			lastName = $.trim($("#lastName").val());
			if (lastName == "") {
				errors.push({ fieldId: "lastName", error: L.validation_no_last_name });
			}
			email = $.trim($("#email").val());
			if (email == "") {
				errors.push({ fieldId: "email", error: L.validation_no_email });
			}
			password = $.trim($("#password").val());
			if (password == "") {
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

		utils.startProcessing();
		$.ajax({
			url: "ajax.php",
			type: "POST",
			dataType: "json",
			data: {
				action: "install",
				dbHostname: dbHostname,
				dbName: dbName,
				dbUsername: dbUsername,
				dbPassword: dbPassword,
				dbTablePrefix: dbTablePrefix,
				employUserAccounts: employUserAccounts,
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password
			},
			success: installResponse,
			error: installError
		});

		return false;
	}

	/**
	 * Display the installation response. This contains details about all Data Types, Export Types and Country-specific
	 * data installed.
	 */
	function installResponse(json) {
		utils.stopProcessing();

		if (json.success == 0) {
			_displayError(json.message);
		} else {
//			utils.displayMessage("gdInstallMessage", json.message);
		}
		return;
	}


	function _displayError(message) {
		$("#gdInstallMessage .gdResponse").html(message);
		$("#gdInstallMessage").show();
	}

	/**
	 *
	 */
	function installError(json) {
		_displayError(json.message);
	}

});
