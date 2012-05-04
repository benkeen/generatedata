<script>
var Tree_ns = {
  loadRow: function(rowNum, data)
  {
    return [
      function() {
        $("#tree_ai_row_num_" + rowNum).val(data.tree_ai_row_num);
        $("#tree_max_siblings_" + rowNum).val(data.tree_max_siblings);
      },
      function() { return $("#tree_max_siblings_" + rowNum).length > 0; }
    ];
  },

  saveRow: function(rowNum)
  {
    return {
      "tree_ai_row_num":   $("#tree_ai_row_num_" + rowNum).val(),
      "tree_max_siblings": $("#tree_max_siblings_" + rowNum).val()
    };
  }
}
</script>