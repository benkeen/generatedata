<script>
var Country_ns = {
  loadRow: function(rowNum, data)
  {
    return [
      function() {
        $("#option_" + rowNum).attr("checked", data.option);
      },
      function() { return $("#option_" + rowNum).length > 0; }
    ];
  },

  saveRow: function(rowNum)
  {
    return {
      "option": $("#option_" + rowNum).attr("checked")
    };
  }
}
</script>