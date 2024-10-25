SharkGame.Stats = {
  tabId: "stats",
  tabDiscovered: !1,
  tabName: "Grotto",
  tabBg: "img/bg/bg-grotto.png",
  sceneImage: "img/events/misc/scene-grotto.png",
  recreateIncomeTable: null,
  discoverReq: { upgrade: ["statsDiscovery"] },
  bannedDisposeCategories: ["special", "harmful"],
  message:
    "The grotto is a place to keep a better track of resources.</br></br>You can also dispose of those you don't need anymore.</br>Disposing specialists returns them to their normal, previous lives.",
  init: function () {
    var e = SharkGame.Stats;
    (SharkGame.Tabs[e.tabId] = {
      id: e.tabId,
      name: e.tabName,
      discovered: e.tabDiscovered,
      discoverReq: e.discoverReq,
      code: e,
    }),
      (e.recreateIncomeTable = !0);
  },
  switchTo: function () {
    var e = SharkGame.Stats,
      a = $("#content");
    a.append($("<div>").attr("id", "tabMessage"));
    var t = $("<div>").attr("id", "statsContainer");
    a.append(t),
      t.append(
        $("<div>")
          .attr("id", "statsLeftContainer")
          .append($("<div>").attr("id", "incomeData"))
          .append($("<div>").attr("id", "disposeResource")),
      ),
      t.append(
        $("<div>")
          .attr("id", "statsRightContainer")
          .append($("<div>").attr("id", "generalStats")),
      ),
      t.append($("<div>").addClass("clear-fix"));
    var s = e.message,
      r = $("#tabMessage");
    SharkGame.Settings.current.showTabImages &&
      ((s =
        "<img width=400 height=200 src='" +
        e.sceneImage +
        "' id='tabSceneImage'>" +
        s),
      r.css("background-image", "url('" + e.tabBg + "')")),
      r.html(s),
      $("#disposeResource").append($("<h3>").html("Dispose of Stuff")),
      e.createDisposeButtons();
    var o = e.createIncomeTable(),
      n = $("#incomeData");
    n.append($("<h3>").html("Income Details")),
      n.append(
        $("<p>")
          .html(
            "(Listed below are resources, the income each resource gives you, and the total income you're getting from each thing.)",
          )
          .addClass("medDesc"),
      ),
      n.append(o);
    var i = $("#generalStats");
    i.append($("<h3>").html("General Stats"));
    var c = SharkGame.Main.isFirstTime();
    c ||
      i.append(
        $("<p>").html(
          "<span class='medDesc'>Climate Level</span><br>" +
            SharkGame.Main.beautify(SharkGame.World.planetLevel),
        ),
      ),
      i.append(
        $("<p>")
          .html(
            "Time since you began:<br/><span id='gameTime' class='timeDisplay'></span>",
          )
          .addClass("medDesc"),
      ),
      c ||
        i.append(
          $("<p>")
            .html(
              "Time since you came through the gate:<br/><span id='runTime' class='timeDisplay'></span>",
            )
            .addClass("medDesc"),
        ),
      i.append($("<h3>").html("Total Ocean Resources Acquired")),
      c ||
        i.append(
          $("<p>")
            .html(
              "Essence given is the total acquired for the entire game and not just for this world.",
            )
            .addClass("medDesc"),
        ),
      i.append(e.createTotalAmountTable()),
      SharkGame.Main.createBuyButtons("rid");
  },
  update: function () {
    var e = SharkGame.Main,
      a = SharkGame.Stats;
    a.updateDisposeButtons(),
      a.updateIncomeTable(),
      a.updateTotalAmountTable(),
      a.recreateIncomeTable &&
        (a.createIncomeTable(),
        a.createTotalAmountTable(),
        (a.recreateIncomeTable = !1));
    var t = new Date().getTime();
    $("#gameTime").html(e.formatTime(t - SharkGame.timestampGameStart)),
      $("#runTime").html(e.formatTime(t - SharkGame.timestampRunStart));
  },
  createDisposeButtons: function () {
    var e = SharkGame.Resources,
      a = SharkGame.Stats,
      t = (SharkGame.Main, $("#disposeResource"));
    $.each(SharkGame.ResourceTable, function (s, r) {
      e.getTotalResource(s) > 0 &&
        -1 === a.bannedDisposeCategories.indexOf(e.getCategoryOfResource(s)) &&
        SharkGame.Button.makeButton(
          "dispose-" + s,
          "Dispose of " + e.getResourceName(s),
          t,
          SharkGame.Stats.onDispose,
        );
    });
  },
  updateDisposeButtons: function () {
    var e = SharkGame.Resources,
      a = SharkGame.Main;
    $.each(SharkGame.ResourceTable, function (t, s) {
      if (e.getTotalResource(t) > 0) {
        var r = $("#dispose-" + t),
          o = e.getResource(t),
          n = SharkGame.Settings.current.buyAmount;
        if (n < 0) {
          var i = o,
            c = -1 * Math.floor(n);
          n = Math.floor(i / c);
        }
        var d = 1 === n,
          m = o < n || n <= 0,
          l = "Dispose of " + a.beautify(n) + " " + e.getResourceName(t, m, d);
        n <= 0 && (l = "Can't dispose any more " + e.getResourceName(t, m, d)),
          r.html(l).prop("disabled", m);
      }
    });
  },
  onDispose: function () {
    var e = SharkGame.Resources,
      a = SharkGame.Log,
      t = $(this).attr("id").split("-")[1],
      s = e.getResource(t),
      r = SharkGame.Settings.current.buyAmount;
    r < 0 && (r = s / (-1 * Math.floor(r)));
    if (s >= r) {
      e.changeResource(t, -r);
      var o = SharkGame.ResourceCategories[e.getCategoryOfResource(t)],
        n = e.getBaseOfResource(t);
      n && e.changeResource(n, r),
        a.addMessage(SharkGame.choose(o.disposeMessage));
    } else
      a.addMessage("Can't dispose that much! You don't have enough of it.");
  },
  updateIncomeTable: function () {
    var e = SharkGame.Resources,
      a = SharkGame.Main;
    $.each(SharkGame.ResourceTable, function (t, s) {
      if (e.getTotalResource(t) > 0 && SharkGame.ResourceTable[t].income) {
        var r = SharkGame.ResourceTable[t].income;
        $.each(r, function (s, r) {
          var o = r > 0 ? "+" : "";
          $("#income-" + t + "-" + s).html(
            "<span style='color: " +
              e.TOTAL_INCOME_COLOR +
              "'>" +
              o +
              a.beautify(e.getProductAmountFromGeneratorResource(t, s)) +
              "/s</span>",
          );
        });
      }
    });
  },
  updateTotalAmountTable: function () {
    var e = SharkGame.Resources,
      a = SharkGame.Main;
    $.each(SharkGame.ResourceTable, function (t, s) {
      var r = e.getTotalResource(t);
      r > 0 && $("#totalAmount-" + t).html(a.beautify(r));
    });
  },
  createIncomeTable: function () {
    var e = SharkGame.Resources,
      a = SharkGame.Main,
      t = SharkGame.World,
      s = $("#incomeTable");
    0 === s.length ? (s = $("<table>").attr("id", "incomeTable")) : s.empty();
    var r = null,
      o = !1;
    e.getSpecialMultiplier() > 1 && (o = !0);
    var n = 0;
    if (
      ($.each(SharkGame.ResourceTable, function (i, c) {
        if (e.getTotalResource(i) > 0 && c.income) {
          var d = !0,
            m = c.income,
            l = $("<tr>"),
            p = 0;
          if (
            ($.each(m, function (a, s) {
              t.doesResourceExist(a) && e.getTotalResource(a) > 0
                ? p++
                : s < 0 && !c.forceIncome && (d = !1);
            }),
            d)
          ) {
            var u = 0,
              h = n % 2 == 0 ? "evenRow" : "oddRow";
            l.append(
              $("<td>")
                .html(e.getResourceName(i))
                .attr("rowspan", p)
                .addClass(h),
            ),
              $.each(m, function (n, c) {
                if (t.doesResourceExist(n) && e.getTotalResource(n) > 0) {
                  var d = c > 0 ? "+" : "";
                  l.append($("<td>").html(e.getResourceName(n)).addClass(h)),
                    l.append(
                      $("<td>")
                        .html(
                          "<span style='color: " +
                            e.INCOME_COLOR +
                            "'>" +
                            d +
                            a.beautify(c) +
                            "/s</span>",
                        )
                        .addClass(h),
                    );
                  var m = t.worldResources[n].boostMultiplier;
                  if (
                    (1 !== m
                      ? l.append(
                          $("<td>")
                            .html(
                              "<span style='color: " +
                                e.BOOST_MULTIPLIER_COLOR +
                                "'>x" +
                                a.beautify(m) +
                                "</span>",
                            )
                            .addClass(h),
                        )
                      : l.append($("<td>").addClass(h)),
                    0 === u)
                  ) {
                    l.append(
                      $("<td>")
                        .attr("rowspan", p)
                        .html(
                          "<span style='color: " +
                            e.UPGRADE_MULTIPLIER_COLOR +
                            "'>x" +
                            e.getMultiplier(i) +
                            "</span>",
                        )
                        .addClass(h),
                    );
                    var g = t.getWorldIncomeMultiplier(i);
                    1 !== g
                      ? l.append(
                          $("<td>")
                            .attr("rowspan", p)
                            .html(
                              "<span style='color: " +
                                e.WORLD_MULTIPLIER_COLOR +
                                "'>x" +
                                a.beautify(g) +
                                "</span>",
                            )
                            .addClass(h),
                        )
                      : l.append($("<td>").attr("rowspan", p).addClass(h));
                    var b = t.getArtifactMultiplier(i);
                    1 !== b
                      ? l.append(
                          $("<td>")
                            .attr("rowspan", p)
                            .html(
                              "<span style='color: " +
                                e.ARTIFACT_MULTIPLIER_COLOR +
                                "'>x" +
                                a.beautify(b) +
                                "</span>",
                            )
                            .addClass(h),
                        )
                      : l.append($("<td>").attr("rowspan", p).addClass(h));
                  }
                  o &&
                    ((r = $("<td>")
                      .html(
                        "<span class='essenceGlow'>x" +
                          a.beautify(e.getSpecialMultiplier()) +
                          "</span>",
                      )
                      .addClass("essenceGlow")),
                    l.append(r),
                    (o = !1)),
                    l.append(
                      $("<td>")
                        .attr("id", "income-" + i + "-" + n)
                        .html(
                          "<span style='color: " +
                            e.TOTAL_INCOME_COLOR +
                            "'>" +
                            d +
                            a.beautify(
                              e.getProductAmountFromGeneratorResource(i, n),
                            ) +
                            "/s</span>",
                        )
                        .addClass(h),
                    ),
                    u++,
                    s.append(l),
                    (l = $("<tr>"));
                }
              }),
              (l = null),
              n++;
          }
        }
      }),
      r)
    ) {
      var i = s.find("tr").length;
      r.attr("rowspan", i);
    }
    return s;
  },
  createTotalAmountTable: function () {
    var e = SharkGame.Resources,
      a = SharkGame.Main,
      t = $("#totalAmountTable");
    return (
      0 === t.length
        ? (t = $("<table>").attr("id", "totalAmountTable"))
        : t.empty(),
      $.each(SharkGame.ResourceTable, function (s, r) {
        if (e.getTotalResource(s) > 0) {
          var o = $("<tr>");
          o.append($("<td>").html(e.getResourceName(s))),
            o.append(
              $("<td>")
                .html(a.beautify(e.getTotalResource(s)))
                .attr("id", "totalAmount-" + s),
            ),
            t.append(o);
        }
      }),
      t
    );
  },
};
