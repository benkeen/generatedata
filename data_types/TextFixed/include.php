<script>
var TextFixed_ns = {
  loadRow: function(rowNum, data)
  {
    return [
      function() {
        $("#numWords_" + rowNum).val(data.numWords);
      },
      function() { return $("#numWords_" + rowNum).length > 0; }
    ];
  },

  saveRow: function(rowNum)
  {
    return {
      "numWords": $("#numWords_" + rowNum).val()
    };
  }
}
</script>