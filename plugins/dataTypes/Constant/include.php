<script>
var Constant_ns = {
  validate: function(rows)
  {
    var visibleProblemRows = [];
    var problemFields      = [];
    for (var i=0; i<rows.length; i++)
    {
      if ($("#option_" + rows[i]).val() == "")
      {
        var visibleRowNum = gd._getVisibleRowOrderByRowNum(rows[i]);
        visibleProblemRows.push(visibleRowNum);
        problemFields.push($("#option_" + rows[i]));
      }
    }

    if (visibleProblemRows.length)
      gd.errors.push({ els: problemFields, error: L.Constant_incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
  },

  loadRow: function(rowNum, data)
  {
    return [
      function() {
        $("#loop_count_" + rowNum).val(data.loop_count);
        $("#option_" + rowNum).val(data.option);
      },
      function() { return $("#option_" + rowNum).length > 0; }
    ];
  },

  saveRow: function(rowNum)
  {
    return {
      "loop_count": $("#loop_count_" + rowNum).val(),
      "option":     $("#option_" + rowNum).val()
    };
  }
}
</script>