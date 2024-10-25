SharkGame.Home = {
  tabId: "home",
  tabDiscovered: !0,
  tabName: "Home Sea",
  tabBg: "img/bg/bg-homesea.png",
  currentButtonTab: null,
  currentExtraMessageIndex: null,
  extraMessages: [
    { message: "&nbsp<br>&nbsp" },
    {
      unlock: { resource: { fish: 5 } },
      message:
        "You attract the attention of a shark. Maybe they can help you catch fish!<br>&nbsp",
    },
    {
      unlock: { resource: { shark: 1 } },
      message: "More sharks swim over, curious and watchful.<br>&nbsp",
    },
    {
      unlock: { resource: { fish: 15 } },
      message: "Some rays drift over.<br>&nbsp",
    },
    {
      unlock: { resource: { shark: 1, ray: 1 } },
      message: "You have quite the group going now.<br>&nbsp",
    },
    {
      unlock: { resource: { shark: 4, ray: 4 } },
      message: "Some curious crabs come over.<br>&nbsp",
    },
    {
      unlock: { resource: { shark: 1, ray: 1, crab: 1 } },
      message: "Your new tribe is at your command!<br>&nbsp",
    },
    {
      unlock: { resource: { shark: 1, crystal: 10 } },
      message:
        "The crystals are shiny. Some sharks stare at them curiously.<br>&nbsp",
    },
    {
      unlock: { resource: { scientist: 1 } },
      message: "The science sharks swim in their own school.<br>&nbsp",
    },
    {
      unlock: { upgrade: ["crystalContainer"] },
      message: "More discoveries are needed.<br>&nbsp",
    },
    {
      unlock: { resource: { nurse: 1 } },
      message: "The shark community grows with time.<br>&nbsp",
    },
    {
      unlock: { upgrade: ["exploration"] },
      message: "You hear faint songs and cries in the distance.<br>&nbsp",
    },
    {
      unlock: { upgrade: ["automation"] },
      message:
        "Machines to do things for you.<br>Machines to do things faster than you or any shark.",
    },
    {
      unlock: { upgrade: ["farExploration"] },
      message:
        "This place is not your home. You remember a crystal blue ocean.<br>The chasms beckon.",
    },
    {
      unlock: { upgrade: ["gateDiscovery"] },
      message: "The gate beckons. The secret must be unlocked.<br>&nbsp",
    },
    {
      unlock: { world: "chaotic" },
      message:
        "Overwhelming reinforcements. Overwhelming everything. So hard to focus.<br>&nbsp",
    },
    {
      unlock: { world: "haven" },
      message:
        "The oceans are rich with life. But it's still not home.<br>&nbsp",
    },
    {
      unlock: { world: "marine" },
      message:
        "The fish never run dry here. This place feels so familiar.<br>&nbsp",
    },
    {
      unlock: { world: "tempestuous" },
      message:
        "The storm never ends, and many are lost to its violent throes.<br>&nbsp",
    },
    {
      unlock: { world: "violent" },
      message:
        "Bursts of plenty from the scorching vents, but so hot.<br>No place for the young.",
    },
    {
      unlock: { world: "abandoned" },
      message:
        "The tar clogs the gills of everyone here.<br>This dying world drags everyone down with it.",
    },
    {
      unlock: { world: "shrouded" },
      message:
        "The crystals are easier to find, but the darkness makes it hard to find anything else.<br>&nbsp",
    },
    {
      unlock: { world: "frigid" },
      message:
        "So cold. The food supplies freeze quickly here. Too hard to chew.<br>&nbsp",
    },
    {
      unlock: { resource: { essence: 10 } },
      message:
        "The other sharks obey and respect you, but they seem to fear you.<br>It is not clear if you are truly a shark anymore, or something... else.",
    },
    {
      unlock: { resource: { shrimp: 50 } },
      message:
        "The shrimps are tiny, but hard-working.<br>They live for their sponge hives.",
    },
    {
      unlock: { resource: { lobster: 20 } },
      message:
        "The lobsters work, but seem carefree.<br>They worry about nothing.",
    },
    {
      unlock: { resource: { eel: 10 } },
      message:
        "The eels chatter among their hiding places.<br>They like the sharks.",
    },
    {
      unlock: { resource: { dolphin: 5 } },
      message:
        "The dolphin pods that work with us speak of an star-spanning empire of their kind.<br>They ask where our empire is. And they smile.",
    },
    {
      unlock: { resource: { octopus: 8 } },
      message:
        "The octopuses speak of production and correct action. They speak of unity through efficiency.<br>They regard us with cold, neutral eyes.",
    },
    {
      unlock: { resource: { whale: 1 } },
      message:
        "The whales speak rarely to us, working in silence as they sing to the ocean.<br>What do they sing for?",
    },
    {
      unlock: { resource: { chimaera: 5 } },
      message:
        "The chimaeras are ancient kin of the shark kind, reunited through wild coincidence.<br>What peerless wonders have they found in the dark?",
    },
    {
      unlock: { resource: { chorus: 1 } },
      message:
        "The whale song fills you with the same feeling as the gates. But so much smaller.<br>&nbsp",
    },
    {
      unlock: { world: "abandoned", resource: { tar: 20 } },
      message: "The tar is killing everything!<br>Maybe a machine can save us?",
    },
    {
      unlock: { world: "abandoned", resource: { tar: 200 } },
      message:
        "Only machines will remain. All is lost.<br><span class='smallDesc'>All is lost.</span>",
    },
    {
      unlock: { world: "frigid", resource: { ice: 50 } },
      message:
        "Something has to be done before the ice destroys us all!<br>Maybe a machine can save us?",
    },
    {
      unlock: { world: "frigid", resource: { ice: 200 } },
      message:
        "So cold. So hungry.<br><span class='smallDesc'>So hopeless.</span>",
    },
  ],
  init: function () {
    var e = SharkGame.Home,
      a = SharkGame.WorldTypes[SharkGame.World.worldType].name + " Ocean";
    (SharkGame.Home.tabName = a),
      (SharkGame.Tabs[e.tabId] = {
        id: e.tabId,
        name: e.tabName,
        discovered: e.tabDiscovered,
        code: e,
      }),
      $.each(SharkGame.HomeActions, function (e, a) {
        (a.discovered = !1), (a.newlyDiscovered = !1);
      }),
      (e.currentExtraMessageIndex = -1),
      (e.currentButtonTab = "all");
  },
  switchTo: function () {
    var e = SharkGame.Home,
      a = $("#content"),
      r = $("<div>").attr("id", "tabMessage");
    a.append(r), (e.currentExtraMessageIndex = -1), e.updateMessage(!0);
    var s = $("<div>").attr("id", "homeTabs");
    a.append(s), e.createButtonTabs();
    var o = $("<div>");
    o.css({ margin: "auto", clear: "both" }),
      SharkGame.Button.makeButton(
        "helpButton",
        "&nbsp Toggle descriptions &nbsp",
        o,
        e.toggleHelp,
      ).addClass("min-block"),
      a.append(o);
    var t = $("<div>").attr("id", "buttonList");
    a.append(t),
      "pile" === SharkGame.Settings.current.buttonDisplayType
        ? t.addClass("pileArrangement")
        : t.removeClass("pileArrangement"),
      SharkGame.Settings.current.showTabImages &&
        r.css("background-image", "url('" + e.tabBg + "')");
  },
  discoverActions: function () {
    var e = SharkGame.Home;
    $.each(SharkGame.HomeActions, function (a, r) {
      (r.discovered = e.areActionPrereqsMet(a)), (r.newlyDiscovered = !1);
    });
  },
  createButtonTabs: function () {
    var e = $("#homeTabs"),
      a = $("<ul>").attr("id", "homeTabsList");
    e.empty();
    var r = 0;
    $.each(SharkGame.HomeActionCategories, function (e, s) {
      var o = SharkGame.Home.currentButtonTab === e,
        t = !1;
      if (
        ("all" === e
          ? (t = !0)
          : $.each(s.actions, function (e, a) {
              t = t || SharkGame.HomeActions[a].discovered;
            }),
        t)
      ) {
        var n = $("<li>");
        o
          ? n.html(s.name)
          : (n.append(
              $("<a>")
                .attr("id", "buttonTab-" + e)
                .attr("href", "javascript:;")
                .html(s.name)
                .click(function () {
                  var e = $(this).attr("id").split("-")[1];
                  SharkGame.Home.changeButtonTab(e);
                }),
            ),
            s.hasNewItem && n.addClass("newItemAdded")),
          a.append(n),
          r++;
      }
    }),
      r > 2 && e.append(a);
  },
  updateTab: function (e) {
    if ("all" !== SharkGame.Home.currentButtonTab) {
      SharkGame.HomeActionCategories[e].hasNewItem = !0;
      var a = $("#buttonTab-" + e);
      a.length > 0
        ? a.parent().addClass("newItemAdded")
        : SharkGame.Home.createButtonTabs();
    }
  },
  changeButtonTab: function (e) {
    var a = SharkGame.Home;
    (SharkGame.HomeActionCategories[e].hasNewItem = !1),
      "all" === e &&
        $.each(SharkGame.HomeActionCategories, function (e, a) {
          a.hasNewItem = !1;
        }),
      (a.currentButtonTab = e),
      $("#buttonList").empty(),
      a.createButtonTabs();
  },
  updateMessage: function (e) {
    var a = SharkGame.Home,
      r = SharkGame.Resources,
      s = SharkGame.Upgrades,
      o = SharkGame.WorldTypes[SharkGame.World.worldType],
      t = a.currentExtraMessageIndex;
    if (
      ($.each(a.extraMessages, function (e, a) {
        var o = !0;
        a.unlock &&
          (a.unlock.resource &&
            $.each(a.unlock.resource, function (e, a) {
              o = o && r.getResource(e) >= a;
            }),
          a.unlock.upgrade &&
            $.each(a.unlock.upgrade, function (e, a) {
              o = o && s[a].purchased;
            }),
          a.unlock.world &&
            (o = o && SharkGame.World.worldType === a.unlock.world)),
          o && (t = e);
      }),
      a.currentExtraMessageIndex !== t)
    ) {
      a.currentExtraMessageIndex = t;
      var n = $("#tabMessage");
      if (SharkGame.Settings.current.showTabImages) {
        var c = $("#tabSceneImage");
        0 === c.size() && (c = $("<div>").attr("id", "tabSceneImage"));
      }
      var i = "You are a shark in a " + o.shortDesc + " sea.";
      (i +=
        "<br><span id='extraMessage' class='medDesc'>&nbsp<br>&nbsp</span>"),
        n.html(i).prepend(c);
      var h = $("#extraMessage");
      !e && SharkGame.Settings.current.showAnimations
        ? (h.animate({ opacity: 0 }, 200, function () {
            $(this)
              .animate({ opacity: 1 }, 200)
              .html(a.extraMessages[t].message);
          }),
          c.animate({ opacity: 0 }, 500, function () {
            var e = $(this);
            SharkGame.Settings.current.showTabImages &&
              SharkGame.changeSprite(
                SharkGame.spriteHomeEventPath,
                "homesea-" + (t + 1),
                c,
                "homesea-missing",
              ),
              e.animate({ opacity: 1 }, 500);
          }))
        : (h.html(a.extraMessages[t].message),
          SharkGame.Settings.current.showTabImages &&
            SharkGame.changeSprite(
              SharkGame.spriteHomeEventPath,
              "homesea-" + (t + 1),
              c,
              "homesea-missing",
            ));
    }
  },
  update: function () {
    var e = SharkGame.Home;
    SharkGame.Resources, SharkGame.World;
    $.each(SharkGame.HomeActions, function (a, r) {
      var s = e.getActionCategory(a);
      s === e.currentButtonTab || "all" === e.currentButtonTab
        ? 0 === $("#" + a).length
          ? (r.discovered || e.areActionPrereqsMet(a)) &&
            (r.discovered || ((r.discovered = !0), (r.newlyDiscovered = !0)),
            e.addButton(a))
          : e.updateButton(a)
        : r.discovered ||
          (e.areActionPrereqsMet(a) &&
            ((r.discovered = !0), (r.newlyDiscovered = !0), e.updateTab(s)));
    }),
      e.updateMessage();
  },
  updateButton: function (e) {
    var a,
      r,
      s = SharkGame.Home,
      o = SharkGame.Resources,
      t = SharkGame.Settings.current.buyAmount,
      n = $("#" + e),
      c = SharkGame.HomeActions[e],
      i = t;
    t < 0
      ? ((i = Math.floor(s.getMax(c)) * (1 / (-1 * Math.floor(t)))),
        (i = Math.floor(i)) < 1 && (i = 1),
        (a = s.getCost(c, i)))
      : (a = s.getCost(c, t));
    r = !!$.isEmptyObject(a) || o.checkResources(a);
    var h = c.name;
    !$.isEmptyObject(a) &&
      i > 1 &&
      (h += " (" + SharkGame.Main.beautify(i) + ")");
    var u = !1;
    if (
      (_.each(a, function (e) {
        e === Number.POSITIVE_INFINITY && (u = !0);
      }),
      u)
    )
      h += "<br>Maxed out";
    else {
      var m = o.resourceListToString(a, !r);
      "" != m && (h += "<br>Cost: " + m);
    }
    SharkGame.Settings.current.showTabHelp &&
      c.helpText &&
      (h += "<br><span class='medDesc'>" + c.helpText + "</span>"),
      n.prop("disabled", !r),
      n.html(h);
    var l = "actions/" + e;
    if ("off" !== SharkGame.Settings.current.iconPositions) {
      var d = SharkGame.changeSprite(
        SharkGame.spriteIconPath,
        l,
        null,
        "general/missing-action",
      );
      d &&
        (d.addClass("button-icon-" + SharkGame.Settings.current.iconPositions),
        r ? n.prepend(d) : n.prepend($("<div>").append(d).addClass("tint")));
    }
  },
  areActionPrereqsMet: function (e) {
    var a = SharkGame.Resources,
      r = SharkGame.World,
      s = !0,
      o = SharkGame.HomeActions[e];
    return (
      o.prereq.resource && (s = s && a.checkResources(o.prereq.resource, !0)),
      o.cost &&
        $.each(o.cost, function (e, a) {
          var o = a.resource;
          s = s && r.doesResourceExist(o);
        }),
      o.prereq.world && (s = s && r.worldType === o.prereq.world),
      o.prereq.upgrade &&
        $.each(o.prereq.upgrade, function (e, a) {
          s = s && SharkGame.Upgrades[a].purchased;
        }),
      o.effect.resource &&
        $.each(o.effect.resource, function (e, a) {
          s = s && r.doesResourceExist(e);
        }),
      s
    );
  },
  addButton: function (e) {
    var a = SharkGame.Home,
      r = $("#buttonList"),
      s = SharkGame.HomeActions[e],
      o = SharkGame.Button.makeButton(e, s.name, r, a.onHomeButton);
    a.updateButton(e),
      SharkGame.Settings.current.showAnimations &&
        o.hide().css("opacity", 0).slideDown(50).animate({ opacity: 1 }, 50),
      s.newlyDiscovered && o.addClass("newlyDiscovered");
  },
  getActionCategory: function (e) {
    var a = "";
    return (
      $.each(SharkGame.HomeActionCategories, function (r, s) {
        "" === a &&
          $.each(s.actions, function (s, o) {
            "" === a && e == o && (a = r);
          });
      }),
      a
    );
  },
  onHomeButton: function () {
    var e = SharkGame.Home,
      a = SharkGame.Resources,
      r = SharkGame.Settings.current.buyAmount,
      s = $(this),
      o = s.attr("id"),
      t = SharkGame.HomeActions[o],
      n = {},
      c = 0;
    if (r < 0) {
      var i = e.getMax(t);
      if ((i = Math.floor(i)) > 0)
        (c = i * (1 / (-1 * Math.floor(r)))),
          (c = Math.floor(c)) < 1 && (c = 1),
          (n = e.getCost(t, c));
    } else (n = e.getCost(t, r)), (c = r);
    if ($.isEmptyObject(n))
      t.effect.resource && a.changeManyResources(t.effect.resource),
        SharkGame.Log.addMessage(SharkGame.choose(t.outcomes));
    else if (c > 0)
      if (a.checkResources(n)) {
        var h;
        if ((a.changeManyResources(n, !0), t.effect.resource))
          (h =
            1 !== c
              ? a.scaleResourceList(t.effect.resource, c)
              : t.effect.resource),
            a.changeManyResources(h);
        t.multiOutcomes && 1 != c
          ? SharkGame.Log.addMessage(SharkGame.choose(t.multiOutcomes))
          : SharkGame.Log.addMessage(SharkGame.choose(t.outcomes));
      } else SharkGame.Log.addMessage("You can't afford that!");
    s.hasClass("newlyDiscovered") &&
      ((t.newlyDiscovered = !1), s.removeClass("newlyDiscovered")),
      s.prop("disabled", !0);
  },
  getCost: function (e, a) {
    var r = {},
      s = e.cost;
    return (
      $.each(s, function (s, o) {
        var t = SharkGame.PlayerResources[e.max],
          n = t.amount;
        t.jobs &&
          $.each(t.jobs, function (e, a) {
            n += SharkGame.Resources.getResource(a);
          });
        var c = o.costFunction,
          i = o.priceIncrease,
          h = 0;
        switch (c) {
          case "constant":
            h = SharkGame.MathUtil.constantCost(n, n + a, i);
            break;
          case "linear":
            h = SharkGame.MathUtil.linearCost(n, n + a, i);
            break;
          case "unique":
            h = SharkGame.MathUtil.uniqueCost(n, n + a, i);
        }
        r[o.resource] = h;
      }),
      r
    );
  },
  getMax: function (e) {
    var a = 1;
    if (e.max) {
      var r = SharkGame.PlayerResources[e.max],
        s = r.amount;
      r.jobs &&
        $.each(r.jobs, function (e, a) {
          s += SharkGame.Resources.getResource(a);
        }),
        (a = Number.MAX_VALUE);
      var o = e.cost;
      $.each(o, function (e, r) {
        var o = SharkGame.PlayerResources[r.resource],
          t = r.costFunction,
          n = r.priceIncrease,
          c = -1;
        switch (t) {
          case "constant":
            c = SharkGame.MathUtil.constantMax(s, o.amount, n) - s;
            break;
          case "linear":
            c = SharkGame.MathUtil.linearMax(s, o.amount, n) - s;
            break;
          case "unique":
            c = SharkGame.MathUtil.uniqueMax(s, o.amount, n) - s;
        }
        a = Math.min(a, c);
      });
    }
    return Math.floor(a);
  },
  toggleHelp: function () {
    SharkGame.Settings.current.showTabHelp =
      !SharkGame.Settings.current.showTabHelp;
  },
};
