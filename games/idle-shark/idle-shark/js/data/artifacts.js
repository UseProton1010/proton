(SharkGame.ArtifactUtil = {
  migratorCost: function (e) {
    return Math.floor(Math.pow(2, e + 1));
  },
  migratorEffect: function (e, t) {
    if (!(e < 1)) {
      var r = Math.pow(5, e);
      SharkGame.World.forceExistence(t),
        SharkGame.Resources.getTotalResource(t) < r &&
          SharkGame.Resources.changeResource(t, r);
    }
  },
  totemCost: function (e) {
    return Math.floor(Math.pow(2.5, e + 1));
  },
  totemEffect: function (e, t) {
    if (!(e < 1)) {
      var r = SharkGame.World.worldResources,
        a = e + 1;
      _.each(t, function (e) {
        r[e].artifactMultiplier
          ? (r[e].artifactMultiplier *= a)
          : (r[e].artifactMultiplier = a);
      });
    }
  },
}),
  (SharkGame.Artifacts = {
    permanentMultiplier: {
      name: "Time Anemone",
      desc: "Applies a multiplier to all income.",
      flavour:
        "As creatures dwell within the sea, so too do creature dwell within causality.",
      max: 5,
      cost: function (e) {
        return Math.floor(Math.pow(10, e + 1));
      },
      effect: function (e) {
        SharkGame.Resources.specialMultiplier = Math.max(2 * e, 1);
      },
    },
    planetTerraformer: {
      name: "World Shaper",
      desc: "Reduce the severity of planet climates.",
      flavour:
        "Intelligence is not changing to fit an environment, but changing the environment to fit you.",
      max: 10,
      cost: function (e) {
        return Math.floor(Math.pow(4, e + 1));
      },
    },
    gateCostReducer: {
      name: "Gate Controller",
      desc: "Reduces the cost requirements of gates.",
      flavour: "Power over the unknown can only reach so far.",
      max: 10,
      cost: function (e) {
        return Math.floor(Math.pow(3, e + 1));
      },
    },
    planetScanner: {
      name: "Distant Foresight",
      desc: "Reveals properties of worlds before travelling to them.",
      flavour: "Knowledge may not change destiny, but it may divert it.",
      max: 15,
      cost: function (e) {
        return Math.floor(Math.pow(1.5, e + 1));
      },
    },
    sharkMigrator: {
      name: "Shark Migrator",
      desc: "Bring some sharks with you to the next world.",
      flavour: "Essence forges a barrier. Sharks are fragile between worlds.",
      max: 10,
      required: ["shark"],
      cost: SharkGame.ArtifactUtil.migratorCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.migratorEffect(e, "shark");
      },
    },
    rayMigrator: {
      name: "Ray Migrator",
      desc: "Bring some rays with you to the next world.",
      flavour: "The gateway has no sand to hide in.",
      max: 10,
      required: ["ray"],
      cost: SharkGame.ArtifactUtil.migratorCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.migratorEffect(e, "ray");
      },
    },
    crabMigrator: {
      name: "Crab Migrator",
      desc: "Bring some crabs with you to the next world.",
      flavour: "Essence-refined shells to keep the crabs alive.",
      max: 10,
      required: ["crab"],
      cost: SharkGame.ArtifactUtil.migratorCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.migratorEffect(e, "crab");
      },
    },
    shrimpMigrator: {
      name: "Shrimp Migrator",
      desc: "Bring some shrimp with you to the next world.",
      flavour: "The hive produces a new hive.",
      max: 10,
      required: ["shrimp"],
      cost: SharkGame.ArtifactUtil.migratorCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.migratorEffect(e, "shrimp");
      },
    },
    lobsterMigrator: {
      name: "Lobster Migrator",
      desc: "Bring some lobsters with you to the next world.",
      flavour: "Relaxing in the astral seas.",
      max: 10,
      required: ["lobster"],
      cost: SharkGame.ArtifactUtil.migratorCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.migratorEffect(e, "lobster");
      },
    },
    dolphinMigrator: {
      name: "Dolphin Migrator",
      desc: "Bring some dolphins with you to the next world.",
      flavour: "They will find this transportation strangely familiar.",
      max: 10,
      required: ["dolphin"],
      cost: SharkGame.ArtifactUtil.migratorCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.migratorEffect(e, "dolphin");
      },
    },
    whaleMigrator: {
      name: "Whale Migrator",
      desc: "Bring some whales with you to the next world.",
      flavour: "They need no protection, only persuasion.",
      max: 10,
      required: ["whale"],
      cost: SharkGame.ArtifactUtil.migratorCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.migratorEffect(e, "whale");
      },
    },
    eelMigrator: {
      name: "Eel Migrator",
      desc: "Bring some eels with you to the next world.",
      flavour: "Essence tunnels for them to slide into a new domain.",
      max: 10,
      required: ["eel"],
      cost: SharkGame.ArtifactUtil.migratorCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.migratorEffect(e, "eel");
      },
    },
    chimaeraMigrator: {
      name: "Chimaera Migrator",
      desc: "Bring some chimaeras with you to the next world.",
      flavour: "The light is unbearable. Essence dulls the brightness.",
      max: 10,
      required: ["chimaera"],
      cost: SharkGame.ArtifactUtil.migratorCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.migratorEffect(e, "chimaera");
      },
    },
    octopusMigrator: {
      name: "Octopus Migrator",
      desc: "Bring some octopuses with you to the next world.",
      flavour:
        "The gateway defies reason. It is uncomfortable to the rational mind.",
      max: 10,
      required: ["octopus"],
      cost: SharkGame.ArtifactUtil.migratorCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.migratorEffect(e, "octopus");
      },
    },
    sharkTotem: {
      name: "Totem of Shark",
      desc: "Increase the effectiveness of sharks and their roles.",
      flavour: "To hunt. To catch. To win.",
      max: 10,
      required: ["shark"],
      cost: SharkGame.ArtifactUtil.totemCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.totemEffect(e, [
          "shark",
          "scientist",
          "nurse",
          "diver",
        ]);
      },
    },
    rayTotem: {
      name: "Totem of Ray",
      desc: "Increase the effectiveness of rays and their roles.",
      flavour: "Flying across the ocean in grace and serenity.",
      max: 10,
      required: ["ray"],
      cost: SharkGame.ArtifactUtil.totemCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.totemEffect(e, ["ray", "laser", "maker"]);
      },
    },
    crabTotem: {
      name: "Totem of Crab",
      desc: "Increase the effectiveness of crabs and their roles.",
      flavour: "No stone left unturned.",
      max: 10,
      required: ["crab"],
      cost: SharkGame.ArtifactUtil.totemCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.totemEffect(e, ["crab", "planter", "brood"]);
      },
    },
    shrimpTotem: {
      name: "Totem of Shrimp",
      desc: "Increase the effectiveness of shrimp and their roles.",
      flavour: "The hive mind awakens.",
      max: 10,
      required: ["shrimp"],
      cost: SharkGame.ArtifactUtil.totemCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.totemEffect(e, ["shrimp", "worker", "queen"]);
      },
    },
    lobsterTotem: {
      name: "Totem of Lobster",
      desc: "Increase the effectiveness of lobster and their roles.",
      flavour: "The seabed is a priceless treasure.",
      max: 10,
      required: ["lobster"],
      cost: SharkGame.ArtifactUtil.totemCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.totemEffect(e, [
          "lobster",
          "berrier",
          "harvester",
        ]);
      },
    },
    dolphinTotem: {
      name: "Totem of Dolphin",
      desc: "Increase the effectiveness of dolphins and their roles.",
      flavour: "Exiles of a greater threat.",
      max: 10,
      required: ["dolphin"],
      cost: SharkGame.ArtifactUtil.totemCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.totemEffect(e, [
          "dolphin",
          "philosopher",
          "biologist",
          "treasurer",
        ]);
      },
    },
    whaleTotem: {
      name: "Totem of Whale",
      desc: "Increase the effectiveness of whales.",
      flavour: "Keepers of song and mystery.",
      max: 10,
      required: ["whale"],
      cost: SharkGame.ArtifactUtil.totemCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.totemEffect(e, ["whale"]);
      },
    },
    eelTotem: {
      name: "Totem of Eel",
      desc: "Increase the effectiveness of eels and their roles.",
      flavour: "Snaking elegance, talented attendants.",
      max: 10,
      required: ["eel"],
      cost: SharkGame.ArtifactUtil.totemCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.totemEffect(e, [
          "eel",
          "sifter",
          "pit",
          "technician",
        ]);
      },
    },
    chimaeraTotem: {
      name: "Totem of Chimaera",
      desc: "Increase the effectiveness of chimaeras and their roles.",
      flavour: "The prodigal descendants return.",
      max: 10,
      required: ["chimaera"],
      cost: SharkGame.ArtifactUtil.totemCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.totemEffect(e, [
          "chimaera",
          "transmuter",
          "explorer",
        ]);
      },
    },
    octopusTotem: {
      name: "Totem of Octopus",
      desc: "Increase the effectiveness of octopuses and their roles.",
      flavour: "The cold, rational response is to maximise rewards.",
      max: 10,
      required: ["octopus"],
      cost: SharkGame.ArtifactUtil.totemCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.totemEffect(e, [
          "octopus",
          "collector",
          "scavenger",
        ]);
      },
    },
    progressTotem: {
      name: "Totem of Progress",
      desc: "Increase the effectiveness of shark machines.",
      flavour: "Progress can be slowed, but it can never be stopped.",
      max: 10,
      cost: SharkGame.ArtifactUtil.totemCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.totemEffect(e, [
          "fishMachine",
          "sandDigger",
          "autoTransmuter",
          "crystalMiner",
          "skimmer",
          "purifier",
          "heater",
        ]);
      },
    },
    carapaceTotem: {
      name: "Totem of Carapace",
      desc: "Increase the effectiveness of crustacean machines.",
      flavour: "The shelled machines are slow, but clean.",
      max: 10,
      required: ["shrimp", "lobster"],
      cost: SharkGame.ArtifactUtil.totemCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.totemEffect(e, [
          "spongeFarmer",
          "berrySprayer",
          "glassMaker",
        ]);
      },
    },
    inspirationTotem: {
      name: "Totem of Inspiration",
      desc: "Increase the effectiveness of cetacean machines.",
      flavour: "Dreams of a former glory.",
      max: 10,
      required: ["dolphin"],
      cost: SharkGame.ArtifactUtil.totemCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.totemEffect(e, [
          "silentArchivist",
          "tirelessCrafter",
        ]);
      },
    },
    industryTotem: {
      name: "Totem of Industry",
      desc: "Increase the effectiveness of cephalopod machines.",
      flavour: "Find unity in efficiency. Seek octal rationalities.",
      max: 10,
      required: ["octopus"],
      cost: SharkGame.ArtifactUtil.totemCost,
      effect: function (e) {
        SharkGame.ArtifactUtil.totemEffect(e, [
          "clamCollector",
          "sprongeSmelter",
          "seaScourer",
          "prostheticPolyp",
        ]);
      },
    },
    wardingTotem: {
      name: "Totem of Warding",
      desc: "Reduce the adverse effects of harmful materials.",
      flavour: "The end is inevitable, but the wait can be lengthened.",
      max: 10,
      required: ["tar", "ice"],
      cost: SharkGame.ArtifactUtil.totemCost,
      effect: function (e) {
        if (!(e < 1)) {
          var t = SharkGame.World.worldResources,
            r = 1 / (e + 1);
          _.each(["tar", "ice"], function (e) {
            t[e].artifactMultiplier
              ? (t[e].artifactMultiplier *= r)
              : (t[e].artifactMultiplier = r);
          });
        }
      },
    },
  });
