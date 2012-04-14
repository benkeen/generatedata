/**
 * Some general functions, used on all Data Generator pages (i.e. the installation page + main generator page).
 */

$(function() {
  $("#tabs ul li").each(function() {
    var tabNum = parseInt($(this).attr("id").replace(/^tab/, ""), 10);
    $(this).bind("click", function() {
      g.selectTab(tabNum);
    });
  });

  if ($("body.install_page").length) {
    $("#g_db_hostname").select();
  }
});


var g = {
  currentTab:       1,
  errors:           [],
  messageVisible:   false,

  selectTab: function(tab) {
    if (tab == g.currentTab) {
      return false;
    }

    $("#tab" + g.currentTab).removeClass("selected");
    $("#tab" + tab).addClass("selected");
    $("#tab" + g.currentTab + "Content").hide();
    $("#tab" + tab + "Content").show();

    g.currentTab = tab;
    return false;
  },

  // TODO: should temporarily save form settings in memory when switching between languages
  changeLanguage: function() {
    var lang_file = $("#selectLanguage").val();
    if (lang_file != "") {
      window.location = "?lang=" + lang_file;
    }
  },

  clearErrors: function() {
    gd.errors = [];
    $("*").removeClass("problemField");
  },

  hideErrors: function(unhighlightProblemFields) {
    if (!gd.messageVisible) {
      return;
    }

    if (unhighlightProblemFields) {
      $("*").removeClass("problemField");
    }

    $("#messages").hide("blind", null, 500);
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
          $(gd.errors[i].els[j]).addClass("problemField");
        }
      }

      html += "<li>" + gd.errors[i].error + "</li>";
    }
    $("#messages").removeClass("notify").addClass("errors margin_top");
    $("#messages div").html(html);

    // if this is the first time the errors are displayed (i.e. it's not already visible), blind it in
    if (!gd.messageVisible) {
      $("#messages").show("blind", null, 500);
    }

    gd.messageVisible = true;
  },

  displayMessage: function(message) {
    $("#messages").removeClass("errors");
    $("#messages").addClass("notify");
    $("#messages").addClass("margin_top");
    $("#messages div").html(message);

    // if this is the first time the errors are displayed (i.e. it's not already visible), blind it in
    if (!gd.messageVisible) {
      $("#messages").show("blind", null, 500);
    }

    gd.messageVisible = true;
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
