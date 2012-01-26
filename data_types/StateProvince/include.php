<script>
var StateProvince_ns = {
	hideShowStateProvCounty: function(row, isChecked, country)
	{
	  if (isChecked)
	  {
	    $("#includeRegion_" + country + "_Full_" + row).attr("disabled", "");
	    $("#includeRegion_" + country + "_Short_" + row).attr("disabled", "");
	    $("#includeRegion_" + country + "_FullLabel_" + row).addClass("suboptionActive");
	    $("#includeRegion_" + country + "_FullLabel_" + row).removeClass("suboptionInactive");
	    $("#includeRegion_" + country + "_ShortLabel_" + row).addClass("suboptionActive");
	    $("#includeRegion_" + country + "_ShortLabel_" + row).removeClass("suboptionInactive");
	  }
	  else
	  {
	    $("#includeRegion_" + country + "_Full_" + row).attr("disabled", "disabled");
	    $("#includeRegion_" + country + "_Short_" + row).attr("disabled", "disabled");
	    $("#includeRegion_" + country + "_FullLabel_" + row).addClass("suboptionInactive");
	    $("#includeRegion_" + country + "_FullLabel_" + row).removeClass("suboptionActive");
	    $("#includeRegion_" + country + "_ShortLabel_" + row).addClass("suboptionInactive");
	    $("#includeRegion_" + country + "_ShortLabel_" + row).removeClass("suboptionActive");
	  }
	},

  loadRow: function(rowNum, data)
  {
    var cleanData = [];
    $(data.checked).each(function() {
      cleanData.push(this.replace(/\d/g, ""));
    });

    return [
      function() {
        $("#options_" + rowNum + " input:checkbox").each(function() {
          var nameWithoutNum = this.name.replace(/\d/g, "");
          var isChecked = $.inArray(nameWithoutNum, cleanData) != -1;
          $(this).attr("checked", isChecked);

          // very kludgy
          if (!isChecked && $(this).hasClass("main"))
          {
            var match = $(this).attr("id").match(/includeRegion_(.+)_\d+/);
            var currCountry = match[1];
            StateProvince_ns.hideShowStateProvCounty(rowNum, false, currCountry);
          }
        });
      },
			<?php
			// find out how many checkboxes are in the generated markup: three for each country. Then,
			// use that info to let the calling script know when the markup is fully generated.
			$num_countries = count(gd_get_configurable_countries());
			?>
      function() { return ($("#options_" + rowNum + " input:checkbox").size() == (3 * <?=$num_countries ?>)); }
    ];
  },

  saveRow: function(rowNum)
  {
    var checked = [];
    $("#options_" + rowNum + " input:checked").each(function() {
      // strip out any row numbers from the name attributes. We're not interested in them. When
      // it comes to reloading the content, they'll be in the way
      checked.push(this.name.replace(/\d/g, ""));
    });

    return { "checked": checked };
  }
}
</script>