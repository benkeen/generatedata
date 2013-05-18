/*global $:false,browser:true,require:false*/
require([
	"manager",
	"lang",
	"utils",
	"pageInit"
], function(manager, L, utils) {

	"use strict";

	$(function() {
		manager.start();

		if (window.location.href.match(/#/)) {
			var tab = window.location.href.split("#")[1].replace(/^t/, "");
			if (tab !== "1" && tab !== "2") {
				utils.selectTab({ tabGroup: "gdMainTabs", tabIDPrefix: "gdMainTab", newTab: 1 });
			}
		}

		$("#email").focus();
		$("#gdMainTab1Content button").on("click", _onSubmitLoginForm);
		$("#gdMainTab2Content button").on("click", _onSubmitPasswordReminderForm);

		$(document).on("click", ".gdMessageClose", function(e) {
			$(e.target).closest(".gdMessage").hide("blind", null, 500);
			return false;
		});
	});


	function _onSubmitLoginForm(e) {
		e.preventDefault();

		var errors = [];
		var email = $.trim($("#email").val());
		$(".gdError").hide();

		if (email === "") {
			errors.push({ fieldId: "email", error: L.validation_no_email });
		} else if (!utils.isValidEmail(email)) {
			errors.push({ fieldId: "email", error: L.validation_invalid_email });
		}

		// the password is optional (e.g. for local environments)
		var password = $.trim($("#password").val());
		if (password === "") {
			errors.push({ fieldId: "password", error: L.validation_no_password });
		}

		if (errors.length) {
			$("#" + errors[0].fieldId).select();
			for (var i=0; i<errors.length; i++) {
				$("#" + errors[i].fieldId + "_error").html(errors[i].error).fadeIn(300);
			}
			return false;
		}

		// all looks good. Try logging in the user.
		utils.startProcessing();
		$.ajax({
			url: "ajax.php",
			type: "POST",
			dataType: "json",
			data: {
				action: "login",
				email: email,
				password: password
			},
			success: function(json) {
				if (json.success) {
					window.location = "./";
				} else {
					$("#gdMessages").addClass("gdErrors").find("div").html("<ul><li>" + json.content + "</li></ul>");
					updateMessageBlock("#gdMessages");
				}
				utils.stopProcessing();
			},
			error: function(json) {
				utils.stopProcessing();
			}
		});
	}

	function _onSubmitPasswordReminderForm(e) {
		e.preventDefault();

		var errors = [];
		var email = $.trim($("#emailReminder").val());
		$(".gdError").hide();

		if (email === "") {
			errors.push({ fieldId: "emailReminder", error: L.validation_no_email });
		} else if (!utils.isValidEmail(email)) {
			errors.push({ fieldId: "emailReminder", error: L.validation_invalid_email });
		}

		if (errors.length) {
			$("#" + errors[0].fieldId).select();
			for (var i=0; i<errors.length; i++) {
				$("#" + errors[i].fieldId + "_error").html(errors[i].error).fadeIn(300);
			}
			return false;
		}

		// all looks good. Try logging in the user.
		utils.startProcessing();
		$.ajax({
			url: "ajax.php",
			type: "POST",
			dataType: "json",
			data: {
				action: "resetPassword",
				email: email
			},
			success: function(json) {
				if (json.success) {
					$("#gdMessagesReminder").removeClass("gdErrors").addClass("gdNotify").find("div").html("<p>" + json.content + "</p>");
				} else {
					$("#gdMessagesReminder").removeClass("gdNotify").addClass("gdErrors").find("div").html("<ul><li>" + json.content + "</li></ul>");
				}
				updateMessageBlock("#gdMessagesReminder");
				utils.stopProcessing();
			},
			error: function(json) {
				utils.stopProcessing();
			}
		});
	}

	/**
	 * Helper function to actually show / highlight a message block consistently. This assumes the message / error
	 * is already in the element. It either blinds it quickly in, or does a highlight effect to draw attention to it.
	 */
	function updateMessageBlock(el) {
		if ($(el).css("display") !== "block") {
			$(el).show("blind", null, 500);
		} else {
			$(el).effect("highlight", { color: "#ffc9c9" }, 1500);
		}
	}
});