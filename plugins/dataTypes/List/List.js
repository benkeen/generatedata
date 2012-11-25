"use strict";

define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	/**
	 * @name List
	 * @description JS code for the List Data Type.
	 * @see DataType
	 * @namespace
	 */

	/** @member */
	var MODULE_ID = "data-type-List";

	var LANG = L.dataTypePlugins.List;

	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.DATA_TABLE.ROW.EXAMPLE_CHANGE + "__" + MODULE_ID] = _exampleChange;
		manager.subscribe(MODULE_ID, subscriptions);
	}

	var _exampleChange = function(msg) {
		$("#dtOption_" + msg.rowID).val(msg.value);
	}

	manager.register(MODULE_ID, C.COMPONENT.DATA_TYPE, {
		init: _init
	});

});


/*var List_ns = {
  loadRow: function(rowNum, data)
  {
    return [
      function() {
        $("#dt_" + rowNum).val(data.example);
        $("#list_type1_" + rowNum).attr("checked", data.list_type1);
        $("#list_type2_" + rowNum).attr("checked", data.list_type2);
        $("#exactly_" + rowNum).val(data.exactly);
        $("#at_most_" + rowNum).val(data.at_most);
        $("#option_" + rowNum).val(data.option);
      },
      function() { return $("#option_" + rowNum).length > 0; }
    ];
  },

  saveRow: function(rowNum)
  {
    return {
      "example":    $("#dt_" + rowNum).val(),
      "list_type1": $("#list_type1_" + rowNum).attr("checked"),
      "list_type2": $("#list_type2_" + rowNum).attr("checked"),
      "exactly":    $("#exactly_" + rowNum).val(),
      "at_most":    $("#at_most_" + rowNum).val(),
      "option":     $("#option_" + rowNum).val()
    };
  }
}
*/