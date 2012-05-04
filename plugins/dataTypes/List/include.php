<script>
var List_ns = {
  loadRow: function(rowNum, data)
  {
    return [
      function() {
        $("#dt_" + rowNum).val(data.example);
        $("#list_type1_" + rowNum).attr("checked", data.list_type1);
        $("#list_type2_" + rowNum).attr("checked", data.list_type2);
        $("#exactly_" + rowNum).val(data.exactly);
        $("#at_most_" + rowNum).val(data.at_most);
        $("#option_" + rowNum).val(data.option);
      },
      function() { return $("#option_" + rowNum).length > 0; }
    ];
  },

  saveRow: function(rowNum)
  {
    return {
      "example":    $("#dt_" + rowNum).val(),
      "list_type1": $("#list_type1_" + rowNum).attr("checked"),
      "list_type2": $("#list_type2_" + rowNum).attr("checked"),
      "exactly":    $("#exactly_" + rowNum).val(),
      "at_most":    $("#at_most_" + rowNum).val(),
      "option":     $("#option_" + rowNum).val()
    };
  }
}
</script>