SharkGame.Log = {
  initialised: !1,
  messages: [],
  init: function () {
    var e = SharkGame.Log;
    $("#log").append(
      "<button id='clearLog' class='min'></button><h3>Log<h3/><ul id='messageList'></ul>",
    ),
      SharkGame.Button.replaceButton(
        "clearLog",
        "&nbsp x &nbsp",
        e.clearMessages,
      ),
      (e.initialised = !0);
  },
  addMessage: function (e) {
    var s = SharkGame.Log,
      a = SharkGame.Settings.current.showAnimations;
    s.initialised || s.init();
    $("#messageList");
    var r = $("<li>").html(e);
    return (
      a
        ? r
            .hide()
            .css("opacity", 0)
            .prependTo("#messageList")
            .slideDown(50)
            .animate({ opacity: 1 }, 100)
        : r.prependTo("#messageList"),
      s.messages.push(r),
      SharkGame.Log.correctLogLength(),
      r
    );
  },
  addError: function (e) {
    var s = SharkGame.Log.addMessage("Error: " + e);
    return s.addClass("error"), s;
  },
  addDiscovery: function (e) {
    var s = SharkGame.Log.addMessage(e);
    return s.addClass("discovery"), s;
  },
  correctLogLength: function () {
    var e = SharkGame.Log,
      s = SharkGame.Settings.current.showAnimations,
      a = SharkGame.Settings.current.logMessageMax;
    if (e.messages.length >= a)
      for (; e.messages.length > a; )
        s
          ? e.messages[0].animate({ opacity: 0 }, 100, "swing", function () {
              $(this).remove();
            })
          : e.messages[0].remove(),
          e.messages.shift();
  },
  clearMessages: function () {
    var e = SharkGame.Log;
    $.each(e.messages, function (e, s) {
      s.remove();
    }),
      (e.messages = []);
  },
  haveAnyMessages: function () {
    return SharkGame.Log.messages.length > 0;
  },
};
