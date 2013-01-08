/*global $:false,browser:true*/
require([
	"manager",
	"lang",
	"utils",
	"pageinit"
], function(manager, L, utils) {

	"use strict";

	$(function() {
		manager.start();
		$("#email").focus();
		$("#gdMainTab1Content button").on("click", _login);

		$(document).on("click", ".gdMessageClose", function(e) {
			$(e.target).closest(".gdMessage").hide("blind", null, 500);
			return false;
		});
	});


	function _login() {
		var errors = [];
		var email = $.trim($("#email").val());
		$(".gdError").hide();

		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (email === "") {
			errors.push({ fieldId: "email", error: L.validation_no_email });
		} else if (!re.test(email)) {
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

	/**
	 * Helper function to actually show / highlight a message block consistently. This assumes the message / error
	 * is already in the element. It either blinds it quickly in, or does a highlight effect to draw attention to it.
	 */
	function updateMessageBlock(el) {
		if ($(el).css("display") != "block") {
			$(el).show("blind", null, 500);
		} else {
			$(el).effect("highlight", { color: "#ffc9c9" }, 1500);
		}
	}

});