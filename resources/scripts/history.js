define([
  "utils"
], function (utils) {

  var _spinner = null;

  var _init = function () {
    $("#gdConfigurationHistoryTable a").on("click", _returnToDataSet);
  };

  var _returnToDataSet = function (e) {
    e.preventDefault();
    _hideDataSetHistorySection();
  };

  var _getHistory = function (configurationID) {
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
    for (var i=0; i<content.length; i++) {
      currDataSet = content[i];
      var lastUpdated = moment.unix(currDataSet.last_updated_unix).format("MMM Do, YYYY h:mm:ss A");

      row = '<tr data-id="' + currDataSet.configuration_id + '">' +
      '<td class="dataSetName leftAligned">' + utils.decodeUTF8(currDataSet.configuration_name) + '</td>' +
      '<td class="leftAligned">' + lastUpdated + '</td>' +
      '<td align="center"><a href="#" class="loadDataSet">load</a></td>' +
      '</tr>';
      html += row;
    }
    $("#gdConfigurationHistoryTable tbody").html(html);
    $("#gdConfigurationHistoryTable").removeClass("hidden");
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
