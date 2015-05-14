define([
  "utils"
], function (utils) {

  var _spinner = null;

  var _init = function () {
    _initHistorySpinner();
    $("#gdConfigurationHistoryTable a").on("click", _returnToDataSet);
  };

  var _returnToDataSet = function (e) {
    e.preventDefault();
    _hideDataSetHistorySection();
  };

  var _getHistory = function (configurationID) {
    $("#gdAccountDataSets,#gdConfigurationHistoryTable").addClass("hidden");
    $("#gdConfigurationHistory,#gdConfigurationHistoryLoading").removeClass("hidden");

    _startProcessing();

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
        _stopProcessing();

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

  var _initHistorySpinner = function() {
    if (_spinner !== null) {
      return;
    }
    _spinner = Spinners.create('#gdConfigurationHistoryLoader', {
      radius: 4,
      height: 5,
      width: 1.5,
      dashes: 14,
      opacity: 1,
      padding: 0,
      rotation: 1400,
      fadeOutSpeed: 0,
      color: '#006600',
      pauseColor: '#aaaaaa',
      pauseOpacity: 1
    }).pause();
  };

  var _startProcessing = function() {
    _spinner.play();
  };

  var _stopProcessing = function() {
    _spinner.pause();
  };


  return {
    init: _init,
    getHistory: _getHistory,
    initHistorySpinner: _initHistorySpinner,
    hideDataSetHistorySection: _hideDataSetHistorySection
  }
});
