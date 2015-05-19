define([
  "utils"
], function (utils) {

  var _spinner = null;
  var _loadDataSetCallback;

  // stores the current
  var _currHistoryID = null;
  var _currHistoryIndex;
  var _currHistory = []; // order is significant

  var _init = function (options) {
    $("#gdConfigurationHistoryHeader a").on("click", _returnToDataSet);
    $("#gdConfigurationHistoryTable").on("click", ".gdLoadHistoryItem", _loadHistoryItem);
    $("#gdDataSetHistoryNav a").on("click", _onClickHistoryNav);
    $("#gdDataHistoryList").on("change", _onSelectHistoryItem);

    _loadDataSetCallback = options.loadDataSet;
  };

  var _returnToDataSet = function (e) {
    e.preventDefault();
    _hideDataSetHistorySection();
  };

  var _getHistory = function (configurationID) {
    _currHistory = [];

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

    _currHistory = content.results;
    for (var i=0; i<content.results.length; i++) {
      currDataSet = content.results[i];
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

  var _loadHistoryItem = function (e) {
    e.preventDefault();
    var historyID = $(e.target).closest("tr").data("historyId");
    var dataSet = _getHistoryItem(historyID);

    // make a note of this history ID
    _currHistoryID = historyID;

    _createHistoryDropdown();
    _updateHistoryNav();
    _loadDataSetCallback(dataSet);
  };


  var _updateHistoryNav = function () {
    $("#gdDataSetStatusLine").addClass("hidden");
    $("#gdDataSetHistoryNav").removeClass("hidden");

    if (_isFirstItem(_currHistoryID)) {
      $("#gdDataSetHistoryNavPrev").addClass("disabled");
    } else {
      $("#gdDataSetHistoryNavPrev").removeClass("disabled");
    }

    if (_isLastItem(_currHistoryID)) {
      $("#gdDataSetHistoryNavNext").addClass("disabled");
    } else {
      $("#gdDataSetHistoryNavNext").removeClass("disabled");
    }

    $("#gdDataHistoryList").val(_currHistoryID);
  };

  var _createHistoryDropdown = function () {
    var options = ['<optgroup label="Save History">'];
    for (var i=0; i<_currHistory.length; i++) {
      var lastUpdated = moment.unix(_currHistory[i].last_updated_unix).format("MMM Do, YYYY h:mm:ss A");
      options.push('<option value="' + _currHistory[i].history_id + '">' + lastUpdated + '</option>');
    }
    options.push('</optgroup>');
    $("#gdDataHistoryList").html(options.join("\n"));
  };

  var _hideDataSetHistorySection = function () {
    $("#gdConfigurationHistory").addClass("hidden");
    $("#gdAccountDataSets").removeClass("hidden");
  };

  var _getHistoryItem = function (historyID) {
    var found = {};
    for (var i=0; i<_currHistory.length; i++) {
      if (_currHistory[i].history_id == historyID) {
        _currHistoryIndex = i;
        found = _currHistory[i];
        break;
      }
    }
    return found;
  };

  var _isFirstItem = function (historyID) {
    return (_currHistory.length <= 1) || _currHistory[0].history_id == historyID;
  };

  var _isLastItem = function (historyID) {
    return (_currHistory.length <= 1) || _currHistory[_currHistory.length-1].history_id == historyID;
  };

  var _onClickHistoryNav = function (e) {
    e.preventDefault();
    if ($(e.target).hasClass("disabled")) {
      return;
    }

    if ($(e.target).data("dir") === "newer") {
      _currHistoryIndex--;
    } else {
      _currHistoryIndex++;
    }
    _currHistoryID = _currHistory[_currHistoryIndex].history_id;

    _updateHistoryNav();
    _loadDataSetCallback(_getHistoryItem(_currHistoryID));
  };

  var _onSelectHistoryItem = function (e) {
    e.preventDefault();

    _currHistoryID = $(e.target).val();
    var historyItem = null;
    for (var i=0; i<_currHistory.length; i++) {
      if (_currHistory[i].history_id == _currHistoryID) {
        historyItem = _currHistory[i];
        _currHistoryIndex = i;
        break;
      }
    }
    _updateHistoryNav();
    _loadDataSetCallback(historyItem);
  };

  return {
    init: _init,
    getHistory: _getHistory,
    hideDataSetHistorySection: _hideDataSetHistorySection
  }
});
