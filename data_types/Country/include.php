<script>
var LatLng_ns = {
  loadRow: function(rowNum, data)
  {
    return [
      function() {
	      $("#includeLat_" + rowNum).attr("checked", data.includeLat);
	      $("#includeLng_" + rowNum).attr("checked", data.includeLng);
      },
      function() { return $("#includeLng_" + rowNum).length > 0; }
    ];
  },

  saveRow: function(rowNum)
  {
    return {
      "includeLat": $("#includeLat_" + rowNum).attr("checked"),
      "includeLng": $("#includeLng_" + rowNum).attr("checked")
    };
  }
}
</script>