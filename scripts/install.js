require([
	"mediator",
	"libs/jquery",
	"libs/jquery-ui-1.8.19.custom.min",
	"libs/jquery.json-2.2.min",
	"scripts/lang.php?",
	"pageinit"
], function(mediator) {

	// TODO move...

	$(function() {
		$("#dbHostname").select();
		$("form").bind("submit", submit);
		$("input[name=employUserAccounts]").bind("click", function() {
			var rowSelector = ".gdEmailRow,.gdPasswordRow,.gdFirstNameRow,.gdLastNameRow";
			if (this.value == "yes") {
				$(rowSelector).removeClass("gdDisabledRow").find("input").removeAttr("disabled");
			} else {
				$(rowSelector).addClass("gdDisabledRow").find("input").attr("disabled", "disabled");
			}
		});
	});


	function submit() {
		$(".error").hide();

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

		var dbPassword = $.trim($("#dbPassword").val());
		var tablePrefix = $.trim($("#tablePrefix").val());
		if (validChars.test(tablePrefix)) {
			errors.push({ fieldId: "tablePrefix", error: L.validation_invalid_chars });
		}

		var employUserAccounts = $("input[name=employUserAccounts]:checked").val();
		var email = "";
		var password = "";
		if (employUserAccounts == "yes") {
			var email = $.trim($("#email").val());
			if (email == "") {
				errors.push({ fieldId: "email", error: L.validation_no_email });
			}
			var password = $.trim($("#password").val());
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

		g.startProcessing();
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
				tablePrefix: tablePrefix,
				employUserAccounts: employUserAccounts
			},
			success: installResponse,
			error: installError
		});

		return false;
	}

	function installResponse(json) {
		g.stopProcessing();
		if (json.success == 0) {
			$("#installError .response").html(json.message);
			$("#installError").effect("highlight", { color: "#ff5b5b" }, 1500);
			return;
		}
	}

	function installError(json) {

	}
});
