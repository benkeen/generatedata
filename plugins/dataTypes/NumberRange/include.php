<script>
var NumberRange_ns = {
  loadRow: function(rowNum, data)
  {
    return [
      function() {
        $("#numRangeMin_" + rowNum).val(data.numRangeMin);
        $("#numRangeMax_" + rowNum).val(data.numRangeMax);
      },
      function() { return $("#numRangeMax_" + rowNum).length > 0; }
    ];
  },

  saveRow: function(rowNum)
  {
    return {
      "numRangeMin": $("#numRangeMin_" + rowNum).val(),
      "numRangeMax": $("#numRangeMax_" + rowNum).val()
    };
  }
}
</script>