$(function() {
  $("#dbHostname").select();
  $("form").bind("submit", installNs.submit);
  $("input[name=employUserAccounts]").bind("click", function() {
    if (this.value == "yes") {
      $(".emailRow,.passwordRow").removeClass("disabledRow").find("input").removeAttr("disabled");
    } else {
      $(".emailRow,.passwordRow").addClass("disabledRow").find("input").attr("disabled", "disabled");
    }
  });
});


var installNs = {};

installNs.submit = function() {
  $(".error").hide();

  // validation
  var validChars = /[^a-zA-Z0-9_]/;
  var errors = [];
  if ($.trim($("#dbHostname").val()) == "") {
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
  if (dbPassword == "") {
    errors.push({ fieldId: "dbPassword", error: L.validation_no_mysql_password });
  }

  var tablePrefix = $.trim($("#tablePrefix").val());
  if (validChars.test(tablePrefix)) {
    errors.push({ fieldId: "tablePrefix", error: L.validation_invalid_chars });
  }

  if (errors.length) {
	$("#" + errors[0].fieldId).select();
	for (var i=0; i<errors.length; i++) {
      $("#" + errors[i].fieldId + "_error").html(errors[i].error).fadeIn(300);
	}
    return false;
  }

}