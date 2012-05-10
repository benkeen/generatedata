/**
 * Some general functions, used on all Data Generator pages (i.e. the installation page + main generator page).
 */

$(function() {
  $("#gdTabs ul li").each(function() {
    var tabNum = parseInt($(this).attr("id").replace(/^gdTab/, ""), 10);
    $(this).bind("click", function(e, a) {
      g.selectTab(tabNum);
      window.location = window.location.href.split("#")[0] + "#t" + tabNum;
    });
  });

  // if the page was just reloaded, see if we need to display a particular tab
  if (window.location.href.match(/#/)) {
    var tabNum = window.location.href.split("#")[1].replace(/^t/, "");
    if (g.isNumber(tabNum) && tabNum >= 1 && tabNum <= $("#gdTabs ul li").length) {
      g.selectTab(tabNum);
      g.currentTab = tabNum;
    }
  }

  $("#gdSelectLanguage").bind("change", g.changeLanguage);
});


var g = {
  currentTab:       1,
  errors:           [],
  messageVisible:   false,

  selectTab: function(tab) {
    if (tab == g.currentTab) {
      return false;
    }

    $("#gdTab" + g.currentTab).removeClass("gdSelected");
    $("#gdTab" + tab).addClass("gdSelected");
    $("#gdTab" + g.currentTab + "Content").hide();
    $("#gdTab" + tab + "Content").show();

    g.currentTab = tab;
    return false;
  },

  // TODO: should temporarily save form settings in memory when switching between languages; or at least prompt the
  // user to let them know they're going to lose any changes unless they do it manually
  changeLanguage: function() {
    var lang_file = $("#gdSelectLanguage").val();
    if (lang_file != "") {
      window.location = "?lang=" + lang_file + "#t" + g.currentTab;
    }
  },

  startProcessing: function() {
    $("#loadingIcon").show();
  },

  stopProcessing: function() {
    $("#loadingIcon").hide();
  },

  clearErrors: function() {
    gd.errors = [];
    $("*").removeClass("gdProblemField");
  },

  hideErrors: function(unhighlightProblemFields) {
    if (!gd.messageVisible) {
      return;
    }

    if (unhighlightProblemFields) {
      $("*").removeClass("gdProblemField");
    }

    $("#gdMessages").hide("blind", null, 500);
    gd.errors = [];
    gd.messageVisible = false;

    return false;
  },

  displayErrors: function() {
    var html = L.please_fix_errors + "<ul>";
    var hasFocus = false;
    for (var i=0; i<gd.errors.length; i++) {
      // style all offending fields and focus on the first field
      if (gd.errors[i].els != null) {
        for (var j=0; j<gd.errors[i].els.length; j++) {
          if (!hasFocus) {
            $(gd.errors[i].els[j]).focus();
            hasFocus = true;
          }
          $(gd.errors[i].els[j]).addClass("gdProblemField");
        }
      }

      html += "<li>" + gd.errors[i].error + "</li>";
    }
    $("#gdMessages").removeClass("gdNotify").addClass("gdErrors gdMarginTop");
    $("#gdMessages div").html(html);

    // if this is the first time the errors are displayed (i.e. it's not already visible), blind it in
    if (!gd.messageVisible) {
      $("#gdMessages").show("blind", null, 500);
    }

    gd.messageVisible = true;
  },

  displayMessage: function(message) {
    $("#gdMessages").removeClass("gdErrors").addClass("gdNotify gdMarginTop");
    $("#gdMessages div").html(message);

    // if this is the first time the errors are displayed (i.e. it's not already visible), blind it in
    if (!gd.messageVisible) {
      $("#gdMessages").show("blind", null, 500);
    }

    gd.messageVisible = true;
  },


  isNumber: function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },


  /*
  This code handles problems caused by the time taken by browser HTML rendering engines to manipulate
  and redraw page content. It ensures a series of DOM-manipulation-intensive changes are completed
  sequentially. See my post here: http://www.benjaminkeen.com/?p=136

  This code relies on the gd.queue array being populated with arrays with the following indexes:
    [0] : code to execute - (function)
    [1] : boolean test to determine completion - (function)
    [2] : interval ID (managed internally by script) - (integer)
  */
  processQueue: function() {
    if (!gd.queue.length) {
      return;
    }

    // if this code hasn't begun being executed, start 'er up
    if (!gd.queue[0][2]) {
      setTimeout(function() { gd.queue[0][0]() }, 10);
      timeout_id = setInterval("gd.checkQueueItemComplete()", 25);
      gd.queue[0][2] = timeout_id;
    }
  },

  checkQueueItemComplete: function() {
    if (gd.queue[0][1]()) {
      clearInterval(gd.queue[0][2]);
      gd.queue.shift();
      gd.processQueue();
    }
  }
}
