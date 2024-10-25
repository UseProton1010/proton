SharkGame.Settings = {
  current: {},
  buyAmount: { defaultSetting: 1, show: !1, options: [1, 10, 100, -3, -2, -1] },
  showTabHelp: { defaultSetting: !1, show: !1, options: [!0, !1] },
  groupResources: {
    defaultSetting: !1,
    name: "Group Resources",
    desc: "Group resources in the table into categories for legibility.",
    show: !0,
    options: [!0, !1],
    onChange: function () {
      SharkGame.Resources.rebuildTable = !0;
    },
  },
  buttonDisplayType: {
    defaultSetting: "list",
    name: "Home Sea Button Display",
    desc: "Do you want a vertical list of buttons, or a more space-saving configuration?",
    show: !0,
    options: ["list", "pile"],
    onChange: function () {
      SharkGame.Main.changeTab(SharkGame.Tabs.current);
    },
  },
  offlineModeActive: {
    defaultSetting: !0,
    name: "Offline Mode",
    desc: "Let your numbers increase even with the game closed!",
    show: !0,
    options: [!0, !1],
  },
  autosaveFrequency: {
    defaultSetting: 5,
    name: "Autosave Frequency",
    desc: "Number of minutes between autosaves.",
    show: !0,
    options: [1, 2, 5, 10, 30],
    onChange: function () {
      clearInterval(SharkGame.Main.autosaveHandler),
        (SharkGame.Main.autosaveHandler = setInterval(
          SharkGame.Main.autosave,
          6e4 * SharkGame.Settings.current.autosaveFrequency,
        )),
        SharkGame.Log.addMessage(
          "Now autosaving every " +
            SharkGame.Settings.current.autosaveFrequency +
            " minute" +
            SharkGame.plural(SharkGame.Settings.current.autosaveFrequency) +
            ".",
        );
    },
  },
  logMessageMax: {
    defaultSetting: 20,
    name: "Max Log Messages",
    desc: "How many messages to show before removing old ones.",
    show: !0,
    options: [5, 10, 15, 20, 25, 30, 50],
    onChange: function () {
      SharkGame.Log.correctLogLength();
    },
  },
  sidebarWidth: {
    defaultSetting: "25%",
    name: "Sidebar Width",
    desc: "How much screen estate the sidebar should take.",
    show: !0,
    options: ["20%", "25%", "30%", "35%", "40%", "45%", "50%"],
    onChange: function () {
      var e = $("#sidebar");
      SharkGame.Settings.current.showAnimations
        ? e.animate({ width: SharkGame.Settings.current.sidebarWidth }, "100")
        : e.width(SharkGame.Settings.current.sidebarWidth);
    },
  },
  showAnimations: {
    defaultSetting: !0,
    name: "Show Animations",
    desc: "Show animations or don't. YOU DECIDE.",
    show: !0,
    options: [!0, !1],
  },
  colorCosts: {
    defaultSetting: !0,
    name: "Color Resource Names",
    desc: "When displaying costs, color names of stuff.",
    show: !0,
    options: [!0, !1],
    onChange: function () {
      (SharkGame.Resources.rebuildTable = !0),
        (SharkGame.Stats.recreateIncomeTable = !0);
    },
  },
  iconPositions: {
    defaultSetting: "top",
    name: "Icon Positions",
    desc: "Where should icons go on the buttons?",
    show: !0,
    options: ["top", "side", "off"],
  },
  showTabImages: {
    defaultSetting: !0,
    name: "Show Tab Header Images",
    desc: "Do you want the new header images or are they taking up precious screen real-estate?",
    show: !0,
    options: [!0, !1],
    onChange: function () {
      SharkGame.Main.changeTab(SharkGame.Tabs.current);
    },
  },
};
