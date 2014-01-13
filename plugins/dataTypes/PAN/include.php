<script>

var pan_ns = {

  /**
   * Called when the user submits the form to generate some data. If the selected data set contains
   * one or more rows of this data type, this function is called with the list of row numbers. Note that
   * the row numbers passed are the original row numbers of the rows on creation. It's possible that the
   * user has re-sorted or deleted some rows. So to get the visible row number for a row, called
   * gd._getVisibleRowOrderByRowNum(row).
   */
  validate: function(rows)
  {
 
    var visibleProblemRows = [];
    var problemFields      = [];
	var err_flag = [];
    for (var i=0; i<rows.length; i++)
    {
	//Check if Examples(card type) is blank.
      if ($("#dt_" + rows[i]).val() == "")
      {
        var visibleRowNum = gd._getVisibleRowOrderByRowNum(rows[i]);
        visibleProblemRows.push(visibleRowNum);
        problemFields.push($("#dt_" + rows[i]));
		err_flag = "dt";
      }
	//Check if Seperator is of proper format.
	  var propersep = $("#sep_" + rows[i]).val();
	  if ($("#sep_" + rows[i]).val().match(/[a-z0-9\s\~\`\!\@\#\$\%\^\&\*\(\)\_\-\+\+\{\}\[\]\\\;\:\'\"\,\.\/\<\>\?]+|[^CPAHDS\|]\|/))
      {
        var visibleRowNum = gd._getVisibleRowOrderByRowNum(rows[i]);
        visibleProblemRows.push(visibleRowNum);
        problemFields.push($("#sep_" + rows[i]));
		err_flag = "sep";
      }
	 //Check if card format is proper.
	 var properformat = $("#option_" + rows[i]).val();
	  if (properformat.match(/[a-z0-9\~\`\!\@\#\$\%\^\&\*\(\)\_\-\+\+\{\}\[\]\\\;\:\'\"\,\.\/\<\>\?]+|[^X\s]/g))
      {
        var visibleRowNum = gd._getVisibleRowOrderByRowNum(rows[i]);
        visibleProblemRows.push(visibleRowNum);
        problemFields.push($("#option_" + rows[i]));
		err_flag = "format";
      }
	  
    }

	if(err_flag == "dt")
		if (visibleProblemRows.length)
		gd.errors.push({ els: problemFields, error: L.Pan_incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
	if(err_flag == "sep")
		if (visibleProblemRows.length)
		gd.errors.push({ els: problemFields, error: L.sep_incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
	if(err_flag == "format")
		if (visibleProblemRows.length)
		gd.errors.push({ els: problemFields, error: L.format_incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
  },

  /**
   * Called when a form is loaded that contains this data type. This is passed the row number and
   * the custom data type data to populate the fields. loadRow functions all must return an array
   * with two indexes - both functions:
   *  [0] code to execute (generally inserting data into fields)
   *  [1] a boolean test to determine WHEN to execute the code.
   */
  loadRow: function(rowNum, data)
  {
    return [
      function() {
        $("#dt_" + rowNum).val(data.example);
        $("#digit_" + rowNum).val(data.digit);
		$('#sep_' + rowNum).val(data.seperator);
		$('#option_' + rowNum).val(data.format);
		
		if ($('#dt_' + rowNum).val() == "rand_card")  {
			$("#Card_digit_" + rowNum).hide();
			$("#Card_format_" + rowNum).hide();
			$("#Card_rand_select_" + rowNum).show();
			$('#option_mselect_' + rowNum).val(data.rand_brand);	
		}	
	
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
      "digit":   $("#digit_" + rowNum).val(),
	  "seperator": $('#sep_' + rowNum).val(),
	  "format":	$('#option_' + rowNum).val(),
	  "rand_brand": $('#option_mselect_' + rowNum).val()
    };
  }
}
</script>