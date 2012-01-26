<script>
var TextRandom_ns = {
  loadRow: function(rowNum, data)
  {
    return [
      function() {
        $("#startsWithLipsum_" + rowNum).attr("checked", data.startsWithLipsum);
        $("#numWordsMin_" + rowNum).val(data.numWordsMin);
        $("#numWordsMax_" + rowNum).val(data.numWordsMax);
      },
      function() { return $("#numWords_" + rowNum).length > 0; }
    ];
  },

  saveRow: function(rowNum)
  {
    return {
      "startsWithLipsum": $("#startsWithLipsum_" + rowNum).attr("checked"),
      "numWordsMin":      $("#numWordsMin_" + rowNum).val(),
      "numWordsMax":      $("#numWordsMax_" + rowNum).val()
    };
  }
}
</script>