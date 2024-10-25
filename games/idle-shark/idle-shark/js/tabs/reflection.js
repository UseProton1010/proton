SharkGame.Reflection = {
  tabId: "reflection",
  tabDiscovered: !1,
  tabName: "Reflection",
  tabBg: "img/bg/bg-gate.png",
  sceneImage: "img/events/misc/scene-reflection.png",
  discoverReq: { resource: { essence: 1 } },
  message:
    "You may not remember everything, but you are something more than a shark now.</br><span='medDesc'>Reflect upon the changes in yourself and reality you have made here.</span>",
  init: function () {
    var e = SharkGame.Reflection;
    SharkGame.Tabs[e.tabId] = {
      id: e.tabId,
      name: e.tabName,
      discovered: e.tabDiscovered,
      discoverReq: e.discoverReq,
      code: e,
    };
  },
  switchTo: function () {
    var e = SharkGame.Reflection,
      a = $("#content");
    a.append($("<div>").attr("id", "tabMessage")),
      a.append($("<div>").attr("id", "artifactList"));
    var t = e.message,
      i = $("#tabMessage");
    SharkGame.Settings.current.showTabImages &&
      ((t =
        "<img width=400 height=200 src='" +
        e.sceneImage +
        "' id='tabSceneImageEssence'>" +
        t),
      i.css("background-image", "url('" + e.tabBg + "')")),
      i.html(t),
      e.updateArtifactList();
  },
  update: function () {},
  updateArtifactList: function () {
    var e = SharkGame.Main,
      a = $("#artifactList");
    $.each(SharkGame.Artifacts, function (t, i) {
      if (i.level > 0) {
        var n = i.level >= i.max,
          r = $("<div>").addClass("artifactDiv"),
          s = i.name + "<br><span class='medDesc'>";
        (s += n ? "(Maximum Power)" : "(Power: " + e.beautify(i.level) + ")"),
          (s += "</span><br><em>" + i.flavour + "</em>"),
          r.append(s),
          a.append(r);
        var c = "artifacts/" + t;
        if ("off" !== SharkGame.Settings.current.iconPositions) {
          var o = SharkGame.changeSprite(
            SharkGame.spriteIconPath,
            c,
            null,
            "general/missing-artifact",
          );
          o &&
            (o.addClass(
              "button-icon-" + SharkGame.Settings.current.iconPositions,
            ),
            o.addClass("gatewayButton"),
            r.prepend(o));
        }
      }
    }),
      0 === $("#artifactList > div").length &&
        a.append("<p><em>You have no artifacts to show.</em></p>");
  },
};
