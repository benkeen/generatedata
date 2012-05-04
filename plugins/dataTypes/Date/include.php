<script>
var Date_ns = {
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
      gd.errors.push({ els: problemFields, error: L.Date_incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
  },

  loadRow: function(rowNum, data)
  {
    return [
      function() {
        $("#fromDate_" + rowNum).val(data.fromDate);
        $("#toDate_" + rowNum).val(data.toDate);
        $("#dt_" + rowNum).val(data.example);
        $("#option_" + rowNum).val(data.option);
      },
      function() { return $("#option_" + rowNum).length > 0; }
    ];
  },

  saveRow: function(rowNum)
  {
    return {
      "fromDate": $("#fromDate_" + rowNum).val(),
      "toDate":   $("#toDate_" + rowNum).val(),
      "example":  $("#dt_" + rowNum).val(),
      "option":   $("#option_" + rowNum).val()
    };
  }
}
</script>