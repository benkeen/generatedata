<script>
var AutoIncrement_ns = {
  loadRow: function(rowNum, data)
  {
    return [
      function() {
        $("#dt_" + rowNum).val(data.example);
        $("#autoIncrementStart_" + rowNum).val(data.start);
        $("#autoIncrementValue_" + rowNum).val(data.value);
        $("#autoIncrementPlaceholder_" + rowNum).val(data.placeholder);
      },
      function() { return $("#autoIncrementPlaceholder_" + rowNum).length > 0; }
    ];
  },

  saveRow: function(rowNum)
  {
    return {
      "example":     $("#dt_" + rowNum).val(),
      "start":       $("#autoIncrementStart_" + rowNum).val(),
      "value":       $("#autoIncrementValue_" + rowNum).val(),
      "placeholder": $("#autoIncrementPlaceholder_" + rowNum).val()
    };
  },

  selectExample: function(val, rowNum)
  {
    var parts = val.split(',');
    $("#autoIncrementStart_" + rowNum).val(parts[0]);
    $("#autoIncrementValue_" + rowNum).val(parts[1]);
    $("#autoIncrementPlaceholder_" + rowNum).val(parts[2]);
    return false;
  }
}
</script>