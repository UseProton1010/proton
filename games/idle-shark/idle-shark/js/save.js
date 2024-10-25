SharkGame.Save = {
  saveFileName: "sharkGameSave",
  saveGame: function (e, a) {
    var t = "",
      r = {};
    (r.version = SharkGame.VERSION),
      (r.resources = {}),
      (r.tabs = {}),
      (r.settings = {}),
      (r.upgrades = {}),
      (r.gateCostsMet = []),
      (r.world = {
        type: SharkGame.World.worldType,
        level: SharkGame.World.planetLevel,
      }),
      (r.artifacts = {}),
      (r.gateway = {
        betweenRuns: SharkGame.gameOver,
        wonGame: SharkGame.wonGame,
      }),
      $.each(SharkGame.PlayerResources, function (e, a) {
        r.resources[e] = { amount: a.amount, totalAmount: a.totalAmount };
      }),
      $.each(SharkGame.Upgrades, function (e, a) {
        r.upgrades[e] = a.purchased;
      }),
      $.each(SharkGame.Tabs, function (e, a) {
        "current" !== e ? (r.tabs[e] = a.discovered) : (r.tabs.current = a);
      });
    var o = [];
    if (
      ($.each(SharkGame.Gate.costsMet, function (e, a) {
        o.push(e);
      }),
      o.sort(),
      $.each(o, function (e, a) {
        r.gateCostsMet[e] = SharkGame.Gate.costsMet[a];
      }),
      $.each(SharkGame.Settings, function (e, a) {
        "current" !== e && (r.settings[e] = SharkGame.Settings.current[e]);
      }),
      $.each(SharkGame.Artifacts, function (e, a) {
        r.artifacts[e] = a.level;
      }),
      (r.timestampLastSave = new Date().getTime()),
      (r.timestampGameStart = SharkGame.timestampGameStart),
      (r.timestampRunStart = SharkGame.timestampRunStart),
      (r.timestampRunEnd = SharkGame.timestampRunEnd),
      a)
    )
      (r.saveVersion = SharkGame.Save.saveUpdaters.length - 1),
        (t = JSON.stringify(r));
    else {
      for (
        var s = SharkGame.Save.saveUpdaters.length - 1, n = {}, i = 0;
        i <= s;
        i++
      ) {
        n = (0, SharkGame.Save.saveUpdaters[i])(n);
      }
      var l = SharkGame.Save.flattenData(n, r);
      l.unshift(s), (t = pako.deflate(JSON.stringify(l), { to: "string" }));
    }
    if (!e)
      try {
        var m = ascii85.encode(t);
        localStorage.setItem(SharkGame.Save.saveFileName, m);
      } catch (e) {
        throw new Error("Couldn't save to local storage. Reason: " + e.message);
      }
    return t;
  },
  loadGame: function (e) {
    var a,
      t = e || localStorage.getItem(SharkGame.Save.saveFileName);
    if (!t) throw new Error("Tried to load game, but no game to load.");
    if ("<~" === t.substring(0, 2))
      try {
        t = ascii85.decode(t);
      } catch (e) {
        throw new Error(
          "Saved data looked like it was encoded in ascii85, but it couldn't be decoded. Can't load. Your save: " +
            t,
        );
      }
    if ("x" === t.charAt(0))
      try {
        t = pako.inflate(t, { to: "string" });
      } catch (e) {
        throw new Error(
          "Saved data is compressed, but it can't be decompressed. Can't load. Your save: " +
            t,
        );
      }
    if ("{" === t.charAt(0) || "[" === t.charAt(0))
      try {
        a = JSON.parse(t);
      } catch (a) {
        var r =
          "Couldn't load save data. It didn't parse correctly. Your save: " + t;
        throw (e && (r += " Did you paste the entire string?"), new Error(r));
      }
    if ("[" === t.charAt(0))
      try {
        var o = SharkGame.Save.saveUpdaters.length - 1,
          s = a.shift();
        if ("number" != typeof s || s % 1 != 0 || s < 0 || s > o)
          throw new Error("Invalid save version!");
        for (var n = {}, i = 0; i <= s; i++) {
          n = (c = SharkGame.Save.saveUpdaters[i])(n);
        }
        var l = a;
        function m(e) {
          return (
            e.timestampLastSave > 1e12 &&
            e.timestampLastSave < 2e12 &&
            e.timestampGameStart > 1e12 &&
            e.timestampGameStart < 2e12 &&
            e.timestampRunStart > 1e12 &&
            e.timestampRunStart < 2e12
          );
        }
        if (
          (((a = SharkGame.Save.expandData(n, l.slice())).saveVersion = s),
          s <= 5 &&
            !m(a) &&
            ((a = SharkGame.Save.expandData(n, l.slice(), !0)).saveVersion = s),
          !m(a))
        )
          throw new Error("Order appears to be corrupt.");
      } catch (e) {
        throw new Error(
          "Couldn't unpack packed save data. Reason: " +
            e.message +
            ". Your save: " +
            t,
        );
      }
    if (!a)
      throw new Error(
        "Couldn't load saved game. I don't know how to break this to you, but I think your save is corrupted. Your save: " +
          t,
      );
    o = SharkGame.Save.saveUpdaters.length - 1;
    if (((a.saveVersion = a.saveVersion || 0), a.saveVersion < o)) {
      for (i = a.saveVersion + 1; i <= o; i++) {
        var c = SharkGame.Save.saveUpdaters[i];
        (a = c(a)).saveVersion = i;
      }
      SharkGame.Log.addMessage(
        "Updated save data from v " +
          a.version +
          " to " +
          SharkGame.VERSION +
          ".",
      );
    }
    a.resources &&
      $.each(a.resources, function (e, a) {
        SharkGame.PlayerResources[e] &&
          ((SharkGame.PlayerResources[e].amount = isNaN(a.amount)
            ? 0
            : a.amount),
          (SharkGame.PlayerResources[e].totalAmount = isNaN(a.totalAmount)
            ? 0
            : a.totalAmount));
      }),
      SharkGame.Resources.reconstructResourcesTable(),
      a.upgrades &&
        $.each(a.upgrades, function (e, t) {
          a.upgrades[e] && SharkGame.Lab.addUpgrade(e);
        }),
      a.artifacts &&
        (SharkGame.Gateway.init(),
        $.each(a.artifacts, function (e, a) {
          SharkGame.Artifacts[e].level = a;
        })),
      a.world &&
        (SharkGame.World.init(),
        (SharkGame.World.worldType = a.world.type),
        (SharkGame.World.planetLevel = a.world.level),
        SharkGame.World.apply(),
        SharkGame.Home.init()),
      a.artifacts && SharkGame.Gateway.applyArtifacts(!0),
      a.tabs &&
        ($.each(a.tabs, function (e, a) {
          SharkGame.Tabs[e] && (SharkGame.Tabs[e].discovered = a);
        }),
        a.tabs.current && (SharkGame.Tabs.current = a.tabs.current));
    var u = [];
    $.each(SharkGame.Gate.costsMet, function (e, a) {
      u.push(e);
    }),
      u.sort(),
      u &&
        $.each(u, function (e, t) {
          SharkGame.Gate.costsMet[t] = a.gateCostsMet[e];
        }),
      a.settings &&
        $.each(a.settings, function (e, a) {
          void 0 !== SharkGame.Settings.current[e] &&
            ((SharkGame.Settings.current[e] = a),
            (SharkGame.Settings[e].onChange || $.noop)());
        });
    var h = new Date().getTime();
    "number" != typeof a.timestampLastSave && (a.timestampLastSave = h),
      "number" != typeof a.timestampGameStart && (a.timestampGameStart = h),
      "number" != typeof a.timestampRunStart && (a.timestampRunStart = h),
      "number" != typeof a.timestampRunEnd && (a.timestampRunEnd = h),
      (SharkGame.timestampLastSave = a.timestampLastSave),
      (SharkGame.timestampGameStart = a.timestampGameStart),
      (SharkGame.timestampRunStart = a.timestampRunStart),
      (SharkGame.timestampRunEnd = a.timestampRunEnd);
    var p = SharkGame.Settings.current.offlineModeActive;
    if (
      (a.gateway &&
        a.gateway.betweenRuns &&
        ((p = !1),
        (SharkGame.wonGame = a.gateway.wonGame),
        SharkGame.Main.endGame(!0)),
      p)
    ) {
      var d = (new Date().getTime() - a.timestampLastSave) / 1e3;
      if (
        (d < 0 && (d = 0),
        SharkGame.Resources.recalculateIncomeTable(),
        SharkGame.Main.processSimTime(d),
        d > 3600)
      ) {
        var S = "Welcome back! It's been ",
          g = Math.floor(d / 3600);
        if (g > 24) {
          var v = Math.floor(g / 24);
          if (v > 7) {
            var f = Math.floor(v / 7);
            if (f > 4) {
              var k = Math.floor(f / 4);
              if (k > 12) {
                var G = Math.floor(k / 12);
                S +=
                  "almost " +
                  (1 === G ? "a" : G) +
                  " year" +
                  SharkGame.plural(G) +
                  ", thanks for remembering this exists!";
              } else
                S +=
                  "like " +
                  (1 === k ? "a" : k) +
                  " month" +
                  SharkGame.plural(k) +
                  ", it's getting kinda crowded.";
            } else
              S +=
                "about " +
                (1 === f ? "a" : f) +
                " week" +
                SharkGame.plural(f) +
                ", you were gone a while!";
          } else
            S +=
              (1 === v ? "a" : v) +
              " day" +
              SharkGame.plural(v) +
              ", and look at all the stuff you have now!";
        } else
          S +=
            (1 === g ? "an" : g) +
            " hour" +
            SharkGame.plural(g) +
            " since you were seen around here!";
        SharkGame.Log.addMessage(S);
      }
    }
  },
  importData: function (e) {
    var a;
    try {
      a = ascii85.decode(e);
    } catch (e) {
      SharkGame.Log.addError(
        "That's not encoded properly. Are you sure that's the full save export string?",
      );
    }
    try {
      SharkGame.Save.loadGame(a);
    } catch (e) {
      SharkGame.Log.addError(e.message), console.log(e.trace);
    }
    SharkGame.Main.setUpTab();
  },
  exportData: function () {
    var e = localStorage.getItem(SharkGame.Save.saveFileName);
    if (null === e)
      try {
        e = SharkGame.Save.saveGame(!0);
      } catch (e) {
        SharkGame.Log.addError(e.message), console.log(e.trace);
      }
    return "<~" !== e.substring(0, 2) && (e = ascii85.encode(e)), e;
  },
  savedGameExists: function () {
    return null !== localStorage.getItem(SharkGame.Save.saveFileName);
  },
  deleteSave: function () {
    localStorage.removeItem(SharkGame.Save.saveFileName);
  },
  createBlueprint: function (e, a) {
    return (function e(t) {
      var r = [];
      return (
        $.each(t, function (a, t) {
          "object" == typeof t && null !== t ? r.push([a, e(t)]) : r.push(a);
        }),
        r.sort(function (e, t) {
          return (
            (e = "object" == typeof e ? e[0] : e),
            (t = "object" == typeof t ? t[0] : t),
            a ? e > t : e > t ? 1 : -1
          );
        }),
        r
      );
    })(e);
  },
  flattenData: function (e, a) {
    var t = [];
    return (
      (function e(a, r) {
        $.each(a, function (a, o) {
          if ("object" == typeof o) e(o[1], r[o[0]]);
          else {
            var s = r[o];
            "number" == typeof s &&
              -1 === o.indexOf("timestamp") &&
              (s = Number(s.toPrecision(5))),
              t.push(s);
          }
        });
      })(SharkGame.Save.createBlueprint(e), a),
      t
    );
  },
  expandData: function (e, a, t) {
    var r = (function e(t) {
      var r = {};
      return (
        $.each(t, function (t, o) {
          if ("object" == typeof o) r[o[0]] = e(o[1]);
          else {
            if (0 === a.length) throw new Error("Incorrect save length.");
            r[o] = a.shift();
          }
        }),
        r
      );
    })(SharkGame.Save.createBlueprint(e, t));
    if (0 !== a.length) throw new Error("Incorrect save length.");
    return r;
  },
  saveUpdaters: [
    function (e) {
      return (
        (e.version = null),
        (e.timestamp = null),
        (e.resources = {}),
        $.each(
          [
            "essence",
            "shark",
            "ray",
            "crab",
            "scientist",
            "nurse",
            "laser",
            "maker",
            "planter",
            "brood",
            "crystalMiner",
            "autoTransmuter",
            "fishMachine",
            "science",
            "fish",
            "sand",
            "crystal",
            "kelp",
            "seaApple",
            "sharkonium",
          ],
          function (a, t) {
            e.resources[t] = { amount: null, totalAmount: null };
          },
        ),
        (e.upgrades = {}),
        $.each(
          [
            "crystalBite",
            "crystalSpade",
            "crystalContainer",
            "underwaterChemistry",
            "seabedGeology",
            "thermalVents",
            "laserRays",
            "automation",
            "engineering",
            "kelpHorticulture",
            "xenobiology",
            "biology",
            "rayBiology",
            "crabBiology",
            "sunObservation",
            "transmutation",
            "exploration",
            "farExploration",
            "gateDiscovery",
          ],
          function (a, t) {
            e.upgrades[t] = null;
          },
        ),
        (e.tabs = {
          current: null,
          home: { discovered: null },
          lab: { discovered: null },
          gate: { discovered: null },
        }),
        (e.settings = {
          buyAmount: null,
          offlineModeActive: null,
          autosaveFrequency: null,
          logMessageMax: null,
          sidebarWidth: null,
          showAnimations: null,
          colorCosts: null,
        }),
        (e.gateCostsMet = {
          fish: null,
          sand: null,
          crystal: null,
          kelp: null,
          seaApple: null,
          sharkonium: null,
        }),
        e
      );
    },
    function (e) {
      return (
        ((e = $.extend(!0, e, {
          resources: {
            sandDigger: { amount: 0, totalAmount: 0 },
            junk: { amount: 0, totalAmount: 0 },
          },
          upgrades: { statsDiscovery: null, recyclerDiscovery: null },
          settings: { showTabHelp: !1, groupResources: !1 },
          timestampLastSave: e.timestamp,
          timestampGameStart: null,
          timestampRunStart: null,
        })).tabs = {
          current: e.tabs.current,
          home: e.tabs.home.discovered,
          lab: e.tabs.lab.discovered,
          gate: e.tabs.gate.discovered,
          stats: !1,
          recycler: !1,
        }),
        delete e.timestamp,
        e
      );
    },
    function (e) {
      return (e = $.extend(!0, e, { settings: { iconPositions: "top" } }));
    },
    function (e) {
      return (
        (e = $.extend(!0, e, {
          settings: { showTabImages: !0 },
          tabs: { reflection: !1 },
          timestampRunEnd: null,
        })),
        _.each(
          [
            "shrimp",
            "lobster",
            "dolphin",
            "whale",
            "chimaera",
            "octopus",
            "eel",
            "queen",
            "berrier",
            "biologist",
            "pit",
            "worker",
            "harvester",
            "philosopher",
            "treasurer",
            "chorus",
            "transmuter",
            "explorer",
            "collector",
            "scavenger",
            "technician",
            "sifter",
            "skimmer",
            "purifier",
            "heater",
            "spongeFarmer",
            "berrySprayer",
            "glassMaker",
            "silentArchivist",
            "tirelessCrafter",
            "clamCollector",
            "sprongeSmelter",
            "seaScourer",
            "prostheticPolyp",
            "sponge",
            "jellyfish",
            "clam",
            "coral",
            "algae",
            "coralglass",
            "delphinium",
            "spronge",
            "tar",
            "ice",
          ],
          function (a) {
            e.resources[a] = { amount: 0, totalAmount: 0 };
          },
        ),
        _.each(
          [
            "environmentalism",
            "thermalConditioning",
            "coralglassSmelting",
            "industrialGradeSponge",
            "aquamarineFusion",
            "coralCircuitry",
            "sprongeBiomimicry",
            "dolphinTechnology",
            "spongeCollection",
            "jellyfishHunting",
            "clamScooping",
            "pearlConversion",
            "crustaceanBiology",
            "eusociality",
            "wormWarriors",
            "cetaceanAwareness",
            "dolphinBiology",
            "delphinePhilosophy",
            "coralHalls",
            "eternalSong",
            "eelHabitats",
            "creviceCreches",
            "bioelectricity",
            "chimaeraMysticism",
            "abyssalEnigmas",
            "octopusMethodology",
            "octalEfficiency",
          ],
          function (a) {
            e.upgrades[a] = !1;
          },
        ),
        (e.world = { type: "start", level: 1 }),
        (e.artifacts = {}),
        _.each(
          [
            "permanentMultiplier",
            "planetTerraformer",
            "gateCostReducer",
            "planetScanner",
            "sharkMigrator",
            "rayMigrator",
            "crabMigrator",
            "shrimpMigrator",
            "lobsterMigrator",
            "dolphinMigrator",
            "whaleMigrator",
            "eelMigrator",
            "chimaeraMigrator",
            "octopusMigrator",
            "sharkTotem",
            "rayTotem",
            "crabTotem",
            "shrimpTotem",
            "lobsterTotem",
            "dolphinTotem",
            "whaleTotem",
            "eelTotem",
            "chimaeraTotem",
            "octopusTotem",
            "progressTotem",
            "carapaceTotem",
            "inspirationTotem",
            "industryTotem",
            "wardingTotem",
          ],
          function (a) {
            e.artifacts[a] = 0;
          },
        ),
        (e.gateway = { betweenRuns: !1 }),
        e
      );
    },
    function (e) {
      return (e = $.extend(!0, e, { settings: { buttonDisplayType: "list" } }));
    },
    function (e) {
      return (e = $.extend(!0, e, { gateway: { wonGame: !1 } }));
    },
    function (e) {
      return (
        (e.resources.numen = { amount: 0, totalAmount: 0 }),
        (e.gateCostsMet = [!1, !1, !1, !1, !1, !1]),
        e
      );
    },
    function (e) {
      return (
        _.each(["eggBrooder", "diver"], function (a) {
          e.resources[a] = { amount: 0, totalAmount: 0 };
        }),
        _.each(
          [
            "agriculture",
            "ancestralRecall",
            "utilityCarapace",
            "primordialSong",
            "leviathanHeart",
            "eightfoldOptimisation",
            "mechanisedAlchemy",
            "mobiusShells",
            "imperialDesigns",
          ],
          function (a) {
            e.upgrades[a] = !1;
          },
        ),
        e
      );
    },
  ],
};
