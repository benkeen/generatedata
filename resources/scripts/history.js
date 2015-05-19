define([
  "utils"
], function (utils) {

  var _spinner = null;
  var _loadDataSetCallback;
  var _currHistory = {}; // stores the history of the current data set with history ID "h[ID]" keys

  var _init = function (options) {
    $("#gdConfigurationHistoryHeader a").on("click", _returnToDataSet);
    $("#gdConfigurationHistoryTable").on("click", ".gdLoadHistoryItem", _loadHistoryItem);

    _loadDataSetCallback = options.loadDataSet;
  };

  var _returnToDataSet = function (e) {
    e.preventDefault();
    _hideDataSetHistorySection();
  };

  var _getHistory = function (configurationID) {
    _currHistory = {};

    $("#gdAccountDataSets,#gdConfigurationHistoryTable").addClass("hidden");
    $("#gdConfigurationHistory,#gdConfigurationHistoryLoading").removeClass("hidden");

    utils.playModalSpinner("gdMainDialog");

    $.ajax({
      url: "ajax.php",
      type: "POST",
      dataType: "json",
      data: {
        action: "getDataSetHistory",
        dataSetID: configurationID
      }
    }).then(
      function (response) {
        utils.pauseModalSpinner("gdMainDialog");

        if (response.success) {
          $("#gdConfigurationHistoryLoading").addClass("hidden");

          _displayHistory(response.content);
          $("#gdConfigurationHistoryTable").removeClass("hidden");
        }
      },

      function () {

      }
    );
  };


  var _displayHistory = function (content) {
    $("#gdNoAccountDataSets").addClass("hidden");

    var html = "";
    var row = "";
    var currDataSet;

    $("#gdConfigurationHistorySize").html(content.maxResults);

    for (var i=0; i<content.results.length; i++) {
      currDataSet = content.results[i];

      // store the results in a convenient hash
      _currHistory["h" + currDataSet.history_id] = currDataSet;

      var lastUpdated = moment.unix(currDataSet.last_updated_unix).format("MMM Do, YYYY h:mm:ss A");

      row = '<tr data-history-id="' + currDataSet.history_id + '">' +
        '<td>' + currDataSet.history_id + '</td>' +
        '<td class="dataSetName leftAligned">' + utils.decodeUTF8(currDataSet.configuration_name) + '</td>' +
        '<td class="leftAligned">' + lastUpdated + '</td>' +
        '<td align="center"><a href="#" class="gdLoadHistoryItem">load</a></td>' +
        '</tr>';
      html += row;
    }
    $("#gdConfigurationHistoryTable tbody").html(html);
    $("#gdConfigurationHistoryTable").removeClass("hidden");
  };

  // a little circuitous, but this is called by generator.js
  var _loadHistoryItem = function (e) {
    e.preventDefault();
    var historyID = $(e.target).closest("tr").data("historyId");
    var dataSet = _currHistory["h" + historyID];
    _loadDataSetCallback(dataSet);
  };


  var _hideDataSetHistorySection = function () {
    $("#gdConfigurationHistory").addClass("hidden");
    $("#gdAccountDataSets").removeClass("hidden");
  };

  return {
    init: _init,
    getHistory: _getHistory,
    hideDataSetHistorySection: _hideDataSetHistorySection
  }
});
