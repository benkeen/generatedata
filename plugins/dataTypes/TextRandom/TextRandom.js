define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	var MODULE_ID = "data-type-TextRandom";
	var LANG = L.dataTypePlugins.TextRandom;

	var _init = function() {

	};

	var _validate = function() {

	};


	/*
{
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
	*/


	manager.register(MODULE_ID, C.COMPONENT.DATA_TYPE, {
		init: _init,
		validate: _validate
	});

});