$(function() {
  $("#g_db_hostname").select();
  $("#create_database").bind("click", install_ns.submit);
});


var install_ns = {};

install_ns.submit = function() {

  // validation
  var validChars = /[^a-zA-Z0-9_]/;
  var errors = [];
  if ($.trim($("#g_db_hostname").val()) == "") {
    errors.push({ fieldId: "g_db_hostname", error: "Please enter your database hostname." });
  }
  var g_db_name = $.trim($("#g_db_name").val());
  if (g_db_name == "") {
    errors.push({ fieldId: "g_db_name", error: "Please enter your database name." });
  } else if (validChars.test(g_db_name)) {
    errors.push({ fieldId: "g_db_name", error: "Your database name can only be comprised of alphanumeric or _ characters." });
  }

  var g_db_username = $.trim($("#g_db_username").val());
  if (g_db_username == "") {
    errors.push({ fieldId: "g_db_username", error: "Please enter your MySQL username." });
  } else if (validChars.test(g_db_username)) {
    errors.push({ fieldId: "g_db_username", error: "Your MySQL username can only be comprised of alphanumeric or _ characters." });
  }

  var g_db_password = $.trim($("#g_db_password").val());
  if (g_db_name == "") {
    errors.push({ fieldId: "g_db_password", error: "Please enter your MySQL password." });
  }

  var g_table_prefix = $.trim($("#g_table_prefix").val());
  if (validChars.test(g_table_prefix)) {
    errors.push({ fieldId: "g_table_prefix", error: "Your database prefix can only be comprised of alphanumeric or _ characters." });
  }

  // ajax -> create settings.php file [or return error] -> populate DB -> return. Here, overwrite content in page and just say "click here
  // to
}