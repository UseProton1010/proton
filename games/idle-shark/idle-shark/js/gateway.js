(SharkGame.Gateway = {
  NUM_ARTIFACTS_TO_SHOW: 3,
  NUM_PLANETS_TO_SHOW: 3,
  transitioning: !1,
  selectedWorld: "",
  allowedWorlds: [
    "marine",
    "chaotic",
    "haven",
    "tempestuous",
    "violent",
    "abandoned",
    "shrouded",
    "frigid",
  ],
  artifactPool: [],
  planetPool: [],
  init: function () {
    _.each(SharkGame.Artifacts, function (e) {
      e.level || (e.level = 0), (e.alreadyApplied = !1);
    });
  },
  update: function () {
    SharkGame.Gateway.updateArtifactButtons();
    var e = $("#overlay"),
      a = $(window).height();
    e.height(a);
  },
  enterGate: function (e) {
    SharkGame.Main;
    var a = SharkGame.Gateway,
      t = 0;
    e ||
      ((t = SharkGame.wonGame
        ? 1 + Math.floor(SharkGame.World.planetLevel / 5)
        : 0),
      SharkGame.Resources.changeResource("essence", t)),
      a.prepareArtifactSelection(a.NUM_ARTIFACTS_TO_SHOW),
      a.preparePlanetSelection(a.NUM_PLANETS_TO_SHOW),
      SharkGame.Save.saveGame(),
      (SharkGame.paneGenerated
        ? $("#pane")
        : SharkGame.Main.buildPane()
      ).addClass("gateway");
    var o = $("#overlay");
    o.addClass("gateway");
    var r = $(document).height();
    o.height(r),
      SharkGame.Settings.current.showAnimations
        ? o
            .show()
            .css("opacity", 0)
            .animate({ opacity: 1 }, 1e3, "swing", function () {
              a.cleanUp(), a.showGateway(t);
            })
        : (o.show().css("opacity", 1), a.cleanUp(), a.showGateway(t));
  },
  cleanUp: function () {
    SharkGame.Main.purgeGame();
    var e = $(window).height();
    $("#overlay").height(e);
  },
  showGateway: function (e) {
    var a = SharkGame.Main,
      t = SharkGame.Resources,
      o = SharkGame.Gateway,
      r = t.getResource("essence"),
      s = t.getResource("numen"),
      n = $("<div>");
    if (
      (n.append($("<p>").html("You are a shark in the space between worlds.")),
      SharkGame.wonGame ||
        n.append(
          $("<p>")
            .html(
              "It is not clear how you have ended up here, but you remember a bitter defeat.",
            )
            .addClass("medDesc"),
        ),
      n.append($("<p>").html("Something unseen says,").addClass("medDesc")),
      n.append(
        $("<em>").attr("id", "gatewayVoiceMessage").html(o.getVoiceMessage()),
      ),
      e > 0 &&
        n.append(
          $("<p>").html(
            "Entering this place has changed you, granting you <span class='essenceCount'>" +
              a.beautify(e) +
              "</span> essence.",
          ),
        ),
      n.append(
        $("<p>").html(
          "You have <span id='essenceHeldDisplay' class='essenceCount'>" +
            a.beautify(r) +
            "</span> essence.",
        ),
      ),
      s > 0)
    ) {
      var i = s > 1 ? "numina" : "numen";
      n.append(
        $("<p>").html(
          "You also have <span class='numenCount'>" +
            a.beautify(s) +
            "</span> " +
            i +
            ", and you radiate divinity.",
        ),
      );
    }
    n.append($("<p>").attr("id", "gatewayStatusMessage").addClass("medDesc"));
    var h = $("<div>");
    o.showRunEndInfo(h), n.append(h);
    var l = $("<div>").addClass("gatewayButtonList");
    SharkGame.Button.makeButton("backToGateway", "artifacts", l, function () {
      o.switchViews(o.showArtifacts);
    }),
      SharkGame.Button.makeButton("backToGateway", "worlds", l, function () {
        o.switchViews(o.showPlanets);
      }),
      n.append(l),
      a.showPane("GATEWAY", n, !0, 500, !0),
      (o.transitioning = !1);
  },
  showRunEndInfo: function (e) {
    var a = SharkGame.Main;
    e.append(
      $("<p>")
        .html("<em>Time spent within last ocean:</em><br/>")
        .append(
          a.formatTime(SharkGame.timestampRunEnd - SharkGame.timestampRunStart),
        ),
    );
  },
  showArtifacts: function () {
    var e = SharkGame.Main,
      a = SharkGame.Resources,
      t = SharkGame.Gateway,
      o = a.getResource("essence"),
      r = $("<div>");
    if (
      (r.append(
        $("<p>").html(
          "Your will flows into solid shapes beyond your control.<br>Focus.",
        ),
      ),
      r.append(
        $("<p>").html(
          "You have <span id='essenceHeldDisplay' class='essenceCount'>" +
            e.beautify(o) +
            "</span> essence.",
        ),
      ),
      r.append($("<p>").attr("id", "gatewayStatusMessage").addClass("medDesc")),
      0 === _.size(t.artifactPool))
    )
      r.append(
        $("<p>").append(
          $("<em>").html(
            '"You may not have achieved perfection, but it would take a deity to improve your capabilities further."',
          ),
        ),
      );
    else {
      var s = $("<div>").addClass("gatewayButtonList");
      _.each(t.artifactPool, function (e) {
        SharkGame.Button.makeButton("artifact-" + e, e, s, t.onArtifactButton);
      }),
        r.append(s),
        t.updateArtifactButtons();
    }
    var n = $("<div>");
    SharkGame.Button.makeButton(
      "backToGateway",
      "return to gateway",
      n,
      function () {
        t.switchViews(t.showGateway);
      },
    ),
      r.append(n),
      e.showPane("ARTIFACTS", r, !0, 500, !0),
      (t.transitioning = !1);
  },
  showPlanets: function () {
    var e = SharkGame.Main,
      a = (SharkGame.Resources, SharkGame.Gateway),
      t = $("<div>");
    t.append($("<p>").html("Other worlds await."));
    var o = $("<div>").addClass("gatewayButtonList");
    _.each(a.planetPool, function (e) {
      SharkGame.Button.makeButton(
        "planet-" + e.type,
        e.type + " " + e.level,
        o,
        function () {
          (a.selectedWorld = $(this).attr("id").split("-")[1]),
            a.switchViews(a.confirmWorld);
        },
      ).addClass("planetButton");
    }),
      t.append(o);
    var r = $("<div>");
    SharkGame.Button.makeButton(
      "backToGateway",
      "return to gateway",
      r,
      function () {
        a.switchViews(a.showGateway);
      },
    ),
      t.append(r),
      e.showPane("WORLDS", t, !0, 500, !0),
      (a.transitioning = !1),
      a.updatePlanetButtons();
  },
  confirmWorld: function () {
    var e = SharkGame.Main,
      a = (SharkGame.Resources, SharkGame.Gateway),
      t = SharkGame.WorldTypes[a.selectedWorld],
      o = 1;
    _.each(a.planetPool, function (e) {
      e.type === a.selectedWorld && (o = e.level);
    });
    var r = $("<div>");
    r.append($("<p>").html("Travel to the " + t.name + " World?"));
    var s = "planets/" + a.selectedWorld,
      n = SharkGame.changeSprite(
        SharkGame.spriteIconPath,
        s,
        null,
        "planets/missing",
      );
    if (n) {
      n.addClass("planetDisplay");
      var i = $("<div>").attr("id", "planetContainer");
      i.append(n), r.append(i);
    }
    var h = $("<div>");
    a.showPlanetAttributes(t, o, h), r.append(h);
    var l = $("<div>");
    SharkGame.Button.makeButton("progress", "proceed", l, function () {
      (SharkGame.World.worldType = a.selectedWorld),
        (SharkGame.World.planetLevel = o),
        SharkGame.Main.loopGame();
    }),
      r.append(l);
    var u = $("<div>");
    SharkGame.Button.makeButton("backToGateway", "reconsider", u, function () {
      a.switchViews(a.showPlanets);
    }),
      r.append(u),
      e.showPane("CONFIRM", r, !0, 500, !0),
      (a.transitioning = !1);
  },
  switchViews: function (e) {
    var a = SharkGame.Gateway;
    a.transitioning ||
      ((a.transitioning = !0),
      SharkGame.Settings.current.showAnimations
        ? $("#pane").animate({ opacity: 0 }, 500, "swing", function () {
            e();
          })
        : e());
  },
  prepareArtifactSelection: function (e) {
    var a = SharkGame.Gateway;
    a.artifactPool = [];
    var t = [];
    $.each(SharkGame.Artifacts, function (e, a) {
      var o = !1;
      a.required
        ? _.each(a.required, function (e) {
            o = o || SharkGame.World.doesResourceExist(e);
          })
        : (o = !0),
        a.max && a.level >= a.max && (o = !1),
        o && t.push(e);
    }),
      (e = Math.min(e, t.length));
    for (var o = 0; o < e; o++) {
      var r = SharkGame.choose(t),
        s = t.indexOf(r);
      t.splice(s, 1), a.artifactPool.push(r);
    }
  },
  onArtifactButton: function () {
    var e = $(this),
      a = e.attr("id").split("-")[1],
      t = SharkGame.Artifacts[a],
      o = t.cost(t.level);
    if (SharkGame.Resources.getResource("essence") >= o) {
      SharkGame.Resources.changeResource("essence", -o), t.level++;
      var r = $("#gatewayStatusMessage");
      t.level >= t.max
        ? r.html(
            "You reach the limit of the " +
              t.name +
              ". You cannot improve it further.",
          )
        : r.html(
            "Your will crystallises into the " +
              t.name +
              ", at power " +
              t.level +
              ".",
          ),
        $("#essenceHeldDisplay").html(
          SharkGame.Main.beautify(SharkGame.Resources.getResource("essence")),
        );
    }
    e.prop("disabled", !0);
  },
  updateArtifactButtons: function () {
    var e = SharkGame.Gateway,
      a = SharkGame.Resources,
      t = SharkGame.Main,
      o = a.getResource("essence");
    _.each(e.artifactPool, function (e) {
      var a = $("#artifact-" + e);
      if (a.length > 0) {
        var r = SharkGame.Artifacts[e],
          s = r.cost(r.level),
          n = r.level >= r.max,
          i = !0;
        (o < s || n) && (i = !1);
        var h = n ? "Max" : r.level + 1,
          l =
            r.name +
            "<br><span class='medDesc'>( Pwr <span class='essenceCountBrighter'>" +
            h +
            "</span> )</span><br>" +
            r.desc +
            "<br><br><span class='medDesc'>" +
            r.flavour +
            "</span><br>";
        n ||
          (l +=
            "</span><br>Cost: <span class='essenceCountBrighter'>" +
            t.beautify(s) +
            "</span> essence"),
          a.prop("disabled", !i).html(l);
        var u = "artifacts/" + e;
        if ("off" !== SharkGame.Settings.current.iconPositions) {
          var d = SharkGame.changeSprite(
            SharkGame.spriteIconPath,
            u,
            null,
            "general/missing-artifact",
          );
          d &&
            (d.addClass(
              "button-icon-" + SharkGame.Settings.current.iconPositions,
            ),
            i
              ? a.prepend(d)
              : a.prepend($("<div>").append(d).addClass("tint")));
        }
      }
    });
  },
  preparePlanetSelection: function (e) {
    var a = SharkGame.Gateway;
    a.planetPool = [];
    for (var t = a.allowedWorlds.slice(0), o = 0; o < e; o++) {
      var r = SharkGame.choose(t),
        s = t.indexOf(r);
      t.splice(s, 1);
      var n = Math.floor(
        Math.max(SharkGame.World.planetLevel + (10 * Math.random() - 5), 1),
      );
      a.planetPool.push({ type: r, level: n });
    }
  },
  updatePlanetButtons: function () {
    var e = SharkGame.Gateway,
      a = (SharkGame.Resources, SharkGame.Main);
    _.each(e.planetPool, function (t) {
      var o = $("#planet-" + t.type);
      if (o.length > 0) {
        var r = 1;
        _.each(e.planetPool, function (e) {
          e.type === t.type && (r = e.level);
        });
        var s = SharkGame.WorldTypes[t.type],
          n =
            s.name +
            "<br><span class='medDesc'>( Climate Level " +
            a.beautify(r) +
            " )</span><br>" +
            s.desc;
        o.html(n);
        var i = "planets/" + t.type;
        if ("off" !== SharkGame.Settings.current.iconPositions) {
          var h = SharkGame.changeSprite(
            SharkGame.spriteIconPath,
            i,
            null,
            "planets/missing",
          );
          h &&
            (h.addClass(
              "button-icon-" + SharkGame.Settings.current.iconPositions,
            ),
            o.prepend(h));
        }
      }
    });
  },
  applyArtifacts: function (e) {
    $.each(SharkGame.Artifacts, function (a, t) {
      !t.effect ||
        (t.alreadyApplied && !e) ||
        (t.effect(t.level), (t.alreadyApplied = !0));
    });
  },
  getVoiceMessage: function () {
    var e = [],
      a = SharkGame.Gateway.Messages,
      t = SharkGame.Resources.getTotalResource("essence"),
      o = SharkGame.World.worldType;
    if (SharkGame.wonGame) {
      _.each(a.essenceBased, function (a) {
        var o = 0;
        a.min && (o = a.min);
        var r = Number.MAX_VALUE;
        a.max && (r = a.max),
          t >= o &&
            t <= r &&
            _.each(a.messages, function (a) {
              e.push(a);
            });
      });
      var r = a.lastPlanetBased[o];
      r &&
        _.each(r, function (a) {
          e.push(a);
        }),
        _.each(a.generic, function (a) {
          e.push(a);
        });
    } else
      _.each(a.loss, function (a) {
        e.push(a);
      });
    return '"' + SharkGame.choose(e) + '"';
  },
  showPlanetAttributes: function (e, a, t) {
    var o = SharkGame.Gateway.getMaxWorldQualitiesToShow();
    if (o > 0) {
      var r = _.size(e.modifiers),
        s = 0 === r ? 1 : Math.min(1, o / r);
      t.append(
        $("<p>").html("Known modifiers (" + Math.floor(100 * s) + "%):"),
      );
      for (
        var n = $("<ul>").addClass("gatewayPropertyList"),
          i = Math.min(o, r),
          h = 0;
        h < i;
        h++
      ) {
        var l = e.modifiers[h],
          u = SharkGame.WorldModifiers[l.modifier].name,
          d = l.resource,
          c = "";
        (c = SharkGame.Resources.isCategory(d)
          ? SharkGame.ResourceCategories[d].name
          : SharkGame.Main.toTitleCase(SharkGame.ResourceTable[d].name)),
          n.append(
            $("<li>")
              .html(u + " - " + c + " (" + l.amount + ")")
              .addClass("medDesc"),
          );
      }
      t.append(n);
      var m = o - r;
      if (m > 0) {
        var p = _.size(e.gateCosts),
          f = Math.min(1, m / p);
        t.append(
          $("<p>").html(
            "Known gate requirements (" + Math.floor(100 * f) + "%):",
          ),
        );
        var y = Math.min(m, p),
          w = $("<ul>").addClass("gatewayPropertyList"),
          v = _.keys(e.gateCosts);
        for (h = 0; h < y; h++) {
          var g = v[h],
            k = Math.floor(
              e.gateCosts[g] * a * SharkGame.World.getGateCostMultiplier(),
            );
          c = SharkGame.Main.toTitleCase(SharkGame.ResourceTable[g].singleName);
          w.append(
            $("<li>")
              .html(c + ": " + SharkGame.Main.beautify(k))
              .addClass("medDesc"),
          );
        }
        t.append(w);
        var G = _.size(e.absentResources),
          S = Math.min(1, m / G);
        t.append(
          $("<p>").html("Known absences (" + Math.floor(100 * S) + "%):"),
        );
        var b = Math.min(m, G),
          M = $("<ul>").addClass("gatewayPropertyList");
        for (h = 0; h < b; h++) {
          var W = e.absentResources[h];
          c = SharkGame.ResourceTable[W].singleName;
          M.append($("<li>").html(c).addClass("smallDesc"));
        }
        t.append(M);
      }
    }
  },
  getMaxWorldQualitiesToShow: function () {
    var e = SharkGame.Artifacts.planetScanner.level;
    return e > 0 ? e + 1 : 0;
  },
  deleteArtifacts: function () {
    _.each(SharkGame.Artifacts, function (e) {
      e.level = 0;
    });
  },
}),
  (SharkGame.Gateway.Messages = {
    essenceBased: [
      {
        max: 1,
        messages: [
          "Hello, newcomer.",
          "Ah. Welcome, new one.",
          "Your journey has only just begun.",
          "Welcome to the end of the beginning.",
        ],
      },
      {
        min: 2,
        max: 10,
        messages: [
          "Your aptitude grows, I see.",
          "Your presence is weak, but it grows stronger.",
          "What new sights have you seen in these journeys?",
          "How are you finding your voyage?",
          "Have you noticed how few can follow you through the gates?",
        ],
      },
      {
        min: 11,
        max: 30,
        messages: [
          "How quickly do you travel through worlds?",
          "You are becoming familiar with this.",
          "Back so soon?",
          "Welcome back, to the space between spaces.",
        ],
      },
      {
        min: 31,
        max: 50,
        messages: [
          "You are a traveller like any other.",
          "I see you here more than ever. Can you see me?",
          "Well met, shark friend.",
          "You remind me of myself, from a long, long time ago.",
          "Welcome back to irregular irreality.",
        ],
      },
      {
        min: 51,
        max: 200,
        messages: [
          "What do you seek?",
          "Have you found your home yet?",
          "Surely your home lies but a jump or two away?",
          "Have you ever returned to one of the worlds you've been before?",
          "Can you find anyone else that journeys so frequently as you?",
          "You have become so strong. So powerful.",
          "I remember when you first arrived here, with confusion and terror in your mind.",
        ],
      },
      {
        min: 201,
        messages: [
          "Your devotion to the journey is alarming.",
          "You exceed anything I've ever known.",
          "You are a force of will within the shell of a shark.",
          "It surprises me how much focus and dedication you show. Perhaps you may settle in your next world?",
          "Does your home exist?",
          "Is there an end to your quest?",
          "Why are you still searching? Many others would have surrendered to the odds by this point.",
        ],
      },
    ],
    lastPlanetBased: {
      start: [
        "No other world you find will be as forgiving, newcomer.",
        "You have left the best of all possible worlds.",
        "It's all more difficult from here.",
      ],
      marine: [
        "Did your last ocean feel all too familiar?",
        "Like your origins, but too different still.",
        "Was that world not your home?",
        "A blue world. A dream of a former life, perhaps.",
      ],
      chaotic: [
        "You have survived the stranger world.",
        "A world on the brink of existence. Halfway between here and oblivion.",
        "You were given allies, yes, but at what cost?",
        "What a strange demand for the gate to possess.",
        "You are relieved the chaos is over, correct?",
      ],
      haven: [
        "A beautiful paradise. It may be a while before you find a world so peaceful.",
        "Did you ruin the world that fed you? There is no judgement here, only curiosity.",
        "A rare gem of a world. You will miss it, before long.",
        "What shining atoll do you leave behind? Those who could not follow you will surely live happily.",
      ],
      tempestuous: [
        "You braved the maelstrom and came from it unscathed.",
        "A surprising victory from a veteran of the seas.",
        "Charge through the whirlpool. Give no quarter to the storm.",
        "The turbulent seas were no match for your prowess.",
      ],
      violent: [
        "The boiling ocean only stirred you on.",
        "So hard to survive, yet so lucrative. A deadly balance.",
        "This is not the harshest world you will endure, surely.",
        "You are forged from the geothermal vents.",
      ],
      abandoned: [
        "Do your previous worlds resemble this?",
        "Was that your first or second visit to that world?",
        "Do you wonder who abandoned the machines?",
        "What thoughts lie within your mind?",
        "Did you ever know this world before its death?",
      ],
      shrouded: [
        "The veil of mystery has yet to be pierced.",
        "Did the chimaeras recognise who you were?",
        "What did you learn from the dark world?",
        "Would you know your home if you found it?",
      ],
      frigid: [
        "Congratulations. Nature cannot touch you.",
        "Did you prefer arctic waters?",
        "Few worlds are so harsh. Fewer survive.",
        "You are a worthy traveller.",
      ],
    },
    loss: [
      "No matter. You will succeed in future, no doubt.",
      "Never give in. Never surrender. Empty platitudes, perhaps, but sound advice nonetheless.",
      "Mistakes are filled with lessons. Learn never to repeat them.",
      "How does it feel to know that everyone who trusted you has perished?",
      "Another world dies. Was this one significant to you?",
      "A sad event. There is plenty of time to redeem yourself.",
      "What a pity. What a shame. I hear the mournful cries of a dying ocean.",
      "You can do better. You will do better. Believe.",
      "You wish to get back here so quickly?",
      "You and everything you knew has died. Perhaps not you. Perhaps not.",
      "One more try, perhaps?",
    ],
    generic: [
      "There is no warmth or cold here. Only numbness.",
      "What do you seek?",
      "We are on the edge of infinity, peering into a boundless sea of potential.",
      "You may not see me. Do not worry. I can see you.",
      "What am I? Oh, it is not so important. Not so soon.",
      "Is this the dream of a shark between worlds, or are the worlds a dream and this place your reality?",
      "A crossroads. Decisions. Decisions that cannot be shaken so lightly.",
      "There are such sights to behold for the ones who can see here.",
      "You are to the ocean what we are to the pathways.",
      "You swim through liquid eternity. You are now, always, and forever.",
      "The prodigal shark returns.",
      "Your constant drive to continue fuels your capacity to overcome.",
      "There is no space in this universe you cannot make your own.",
    ],
  });
