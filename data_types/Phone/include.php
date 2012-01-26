<script>
var Phone_ns = {
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
      gd.errors.push({ els: problemFields, error: L.Phone_incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
  },

  loadRow: function(rowNum, data)
  {
    return [
      function() {
        $("#dt_" + rowNum).val(data.example);
        $("#option_" + rowNum).val(data.option);
      },
      function() { return $("#option_" + rowNum).length > 0; }
    ];
  },

  /**
   * Called when the user saves a form. This function is passed the row number of the row to
   * save. It should return a well-formatted JSON object (of whatever structure is relevant.
   */
  saveRow: function(rowNum)
  {
    return {
      "example":  $("#dt_" + rowNum).val(),
      "option":   $("#option_" + rowNum).val()
    };
  }
}
</script>