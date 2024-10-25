(SharkGame.PlayerResources = {}),
  (SharkGame.PlayerIncomeTable = {}),
  (SharkGame.Resources = {
    INCOME_COLOR: "#808080",
    TOTAL_INCOME_COLOR: "#A0A0A0",
    UPGRADE_MULTIPLIER_COLOR: "#606060",
    BOOST_MULTIPLIER_COLOR: "#60A060",
    WORLD_MULTIPLIER_COLOR: "#6060A0",
    ARTIFACT_MULTIPLIER_COLOR: "#6F968A",
    specialMultiplier: null,
    rebuildTable: !1,
    init: function () {
      $.each(SharkGame.ResourceTable, function (e, a) {
        (SharkGame.PlayerResources[e] = {}),
          (SharkGame.PlayerResources[e].amount = 0),
          (SharkGame.PlayerResources[e].totalAmount = 0),
          (SharkGame.PlayerResources[e].incomeMultiplier = 1);
      }),
        $.each(SharkGame.ResourceTable, function (e, a) {
          SharkGame.PlayerIncomeTable[e] = 0;
        }),
        (SharkGame.Resources.specialMultiplier = 1);
    },
    processIncomes: function (e) {
      $.each(SharkGame.PlayerIncomeTable, function (a, r) {
        SharkGame.Resources.changeResource(a, r * e);
      });
    },
    recalculateIncomeTable: function (e) {
      var a = SharkGame.Resources,
        r = SharkGame.World;
      $.each(SharkGame.ResourceTable, function (e, a) {
        SharkGame.PlayerIncomeTable[e] = 0;
      });
      var o = r.worldResources;
      $.each(SharkGame.ResourceTable, function (e, r) {
        var c = o[e];
        if (c.exists) {
          SharkGame.PlayerResources[e];
          if (r.income) {
            c && c.incomeMultiplier;
            var t = 1;
            r.forceIncome ||
              $.each(r.income, function (r, o) {
                var c = a.getProductAmountFromGeneratorResource(e, r);
                if (c < 0) {
                  var u = a.getResource(r);
                  if (u + c <= 0) {
                    var n = u / -c;
                    t = n >= 0 && n < 1 ? Math.min(t, n) : 0;
                  }
                }
              }),
              $.each(r.income, function (r, o) {
                var c = a.getProductAmountFromGeneratorResource(e, r, t);
                SharkGame.World.doesResourceExist(r) &&
                  (SharkGame.PlayerIncomeTable[r] += c);
              });
          }
          if (c) {
            var u = c.income,
              n = o[e].boostMultiplier;
            SharkGame.PlayerIncomeTable[e] += u * n * a.getSpecialMultiplier();
          }
        }
      });
    },
    getProductAmountFromGeneratorResource: function (e, a, r) {
      var o = SharkGame.Resources,
        c = SharkGame.World,
        t = SharkGame.PlayerResources[e];
      return (
        "number" != typeof r && (r = 1),
        SharkGame.ResourceTable[e].income[a] *
          o.getResource(e) *
          r *
          t.incomeMultiplier *
          c.getWorldIncomeMultiplier(e) *
          c.getWorldBoostMultiplier(a) *
          c.getArtifactMultiplier(e) *
          o.getSpecialMultiplier()
      );
    },
    getSpecialMultiplier: function () {
      return (
        Math.max(10 * SharkGame.Resources.getResource("numen"), 1) *
        SharkGame.Resources.specialMultiplier
      );
    },
    getIncome: function (e) {
      return SharkGame.PlayerIncomeTable[e];
    },
    getMultiplier: function (e) {
      return SharkGame.PlayerResources[e].incomeMultiplier;
    },
    setMultiplier: function (e, a) {
      (SharkGame.PlayerResources[e].incomeMultiplier = a),
        SharkGame.Resources.recalculateIncomeTable();
    },
    changeResource: function (e, a) {
      if (!(Math.abs(a) < SharkGame.EPSILON)) {
        var r = SharkGame.PlayerResources[e],
          o = r.totalAmount;
        SharkGame.World.doesResourceExist(e) &&
          ((r.amount += a),
          r.amount < 0 && (r.amount = 0),
          a > 0 && (r.totalAmount += a),
          o < SharkGame.EPSILON && (SharkGame.Resources.rebuildTable = !0),
          SharkGame.Resources.recalculateIncomeTable());
      }
    },
    setResource: function (e, a) {
      var r = SharkGame.PlayerResources[e];
      (r.amount = a),
        r.amount < 0 && (r.amount = 0),
        SharkGame.Resources.recalculateIncomeTable();
    },
    setTotalResource: function (e, a) {
      SharkGame.PlayerResources[e].totalAmount = a;
    },
    getResource: function (e) {
      return SharkGame.PlayerResources[e].amount;
    },
    getTotalResource: function (e) {
      return SharkGame.PlayerResources[e].totalAmount;
    },
    isCategoryVisible: function (e) {
      var a = !1;
      return (
        $.each(e.resources, function (e, r) {
          a =
            a ||
            (SharkGame.PlayerResources[r].totalAmount > 0 &&
              SharkGame.World.doesResourceExist(r));
        }),
        a
      );
    },
    getCategoryOfResource: function (e) {
      var a = "";
      return (
        $.each(SharkGame.ResourceCategories, function (r, o) {
          "" === a &&
            $.each(o.resources, function (o, c) {
              "" === a && e == c && (a = r);
            });
        }),
        a
      );
    },
    getResourcesInCategory: function (e) {
      var a = [];
      return (
        $.each(SharkGame.ResourceCategories[e].resources, function (e, r) {
          a.push(r);
        }),
        a
      );
    },
    isCategory: function (e) {
      return !(void 0 === SharkGame.ResourceCategories[e]);
    },
    isInCategory: function (e, a) {
      return -1 !== SharkGame.ResourceCategories[a].resources.indexOf(e);
    },
    getBaseOfResource: function (e) {
      var a = null;
      return (
        $.each(SharkGame.ResourceTable, function (r, o) {
          a ||
            (o.jobs &&
              $.each(o.jobs, function (o, c) {
                a || (c === e && (a = r));
              }));
        }),
        a
      );
    },
    haveAnyResources: function () {
      var e = !1;
      return (
        $.each(SharkGame.PlayerResources, function (a, r) {
          e || (e = r.totalAmount > 0);
        }),
        e
      );
    },
    checkResources: function (e, a) {
      var r = !0;
      return (
        $.each(SharkGame.ResourceTable, function (o, c) {
          var t;
          t = a
            ? SharkGame.Resources.getTotalResource(o)
            : SharkGame.Resources.getResource(o);
          var u = e[o];
          void 0 === u && (u = 0), t < u && (r = !1);
        }),
        r
      );
    },
    changeManyResources: function (e, a) {
      void 0 === a && (a = !1),
        $.each(e, function (e, r) {
          var o = r;
          a && (o *= -1), SharkGame.Resources.changeResource(e, o);
        });
    },
    scaleResourceList: function (e, a) {
      var r = {};
      return (
        $.each(e, function (e, o) {
          r[e] = o * a;
        }),
        r
      );
    },
    updateResourcesTable: function () {
      $("#resourceTable");
      var e = SharkGame.Main,
        a = SharkGame.Resources;
      a.rebuildTable
        ? a.reconstructResourcesTable()
        : $.each(SharkGame.PlayerResources, function (r, o) {
            $("#amount-" + r).html(e.beautify(o.amount, !0));
            var c = a.getIncome(r);
            if (Math.abs(c) > SharkGame.EPSILON) {
              var t = c > 0 ? "+" : "";
              $("#income-" + r).html(
                "<span style='color:" +
                  a.INCOME_COLOR +
                  "'>" +
                  t +
                  e.beautify(c) +
                  "/s</span>",
              );
            } else $("#income-" + r).html("");
          });
    },
    reconstructResourcesTable: function () {
      var e = $("#resourceTable"),
        a = (SharkGame.Main, SharkGame.Resources),
        r = SharkGame.World,
        o = $("#status");
      if (e.length <= 0) {
        o.prepend("<h3>Stuff</h3>");
        var c = $("<div>").attr("id", "resourceTableContainer");
        c.append($("<table>").attr("id", "resourceTable")),
          o.append(c),
          (e = $("#resourceTable"));
      }
      e.empty();
      var t = !1;
      SharkGame.Settings.current.groupResources
        ? $.each(SharkGame.ResourceCategories, function (r, o) {
            if (a.isCategoryVisible(o)) {
              var c = $("<tr>").append(
                $("<td>").attr("colSpan", 3).append($("<h3>").html(o.name)),
              );
              e.append(c),
                $.each(o.resources, function (r, o) {
                  if (a.getTotalResource(o) > 0) {
                    var c = a.constructResourceTableRow(o);
                    e.append(c), (t = !0);
                  }
                });
            }
          })
        : $.each(SharkGame.ResourceTable, function (o, c) {
            if (a.getTotalResource(o) > 0 && r.doesResourceExist(o)) {
              var u = a.constructResourceTableRow(o);
              e.append(u), (t = !0);
            }
          }),
        t ? o.show() : o.hide(),
        (a.rebuildTable = !1);
    },
    constructResourceTableRow: function (e) {
      var a = SharkGame.Main,
        r = SharkGame.Resources,
        o = e,
        c = (SharkGame.ResourceTable[o], SharkGame.PlayerResources[o]),
        t = r.getIncome(o),
        u = $("<tr>");
      if (c.totalAmount > 0) {
        u.append(
          $("<td>")
            .attr("id", "resource-" + o)
            .html(SharkGame.Resources.getResourceName(o)),
        ),
          u.append(
            $("<td>")
              .attr("id", "amount-" + o)
              .html(a.beautify(c.amount)),
          );
        var n = $("<td>").attr("id", "income-" + o);
        if ((u.append(n), Math.abs(t) > SharkGame.EPSILON)) {
          var s = t > 0 ? "+" : "";
          n.html(
            "<span style='color:" +
              r.INCOME_COLOR +
              "'>" +
              s +
              a.beautify(t) +
              "/s</span>",
          );
        }
      }
      return u;
    },
    getResourceName: function (e, a, r) {
      var o = SharkGame.ResourceTable[e],
        c =
          Math.floor(SharkGame.PlayerResources[e].amount) - 1 <
            SharkGame.EPSILON || r
            ? o.singleName
            : o.name;
      if (SharkGame.Settings.current.colorCosts) {
        var t = o.color;
        a && (t = SharkGame.colorLum(o.color, -0.5)),
          (c =
            "<span class='click-passthrough' style='color:" +
            t +
            "'>" +
            c +
            "</span>");
      }
      return c;
    },
    resourceListToString: function (e, a) {
      if ($.isEmptyObject(e)) return "";
      var r = "";
      return (
        $.each(SharkGame.ResourceTable, function (o, c) {
          var t = e[o];
          if (t > 0 && SharkGame.World.doesResourceExist(o)) {
            var u = Math.floor(t) - 1 < SharkGame.EPSILON;
            (r += SharkGame.Main.beautify(t)),
              (r += " " + SharkGame.Resources.getResourceName(o, a, u) + ", ");
          }
        }),
        (r = r.slice(0, -2))
      );
    },
    getResourceSources: function (e) {
      var a = { income: [], actions: [] };
      return (
        $.each(SharkGame.ResourceTable, function (r, o) {
          o.income && o.income[e] > 0 && a.income.push(r);
        }),
        $.each(SharkGame.HomeActions, function (r, o) {
          var c = o.effect.resource;
          c && c[e] > 0 && a.actions.push(r);
        }),
        a
      );
    },
    giveMeSomeOfEverything: function (e) {
      $.each(SharkGame.ResourceTable, function (a, r) {
        SharkGame.Resources.changeResource(a, e);
      });
    },
    getResourceDependencyChains: function (e, a) {
      var r = SharkGame.Resources,
        o = SharkGame.World,
        c = [];
      a || (a = []);
      var t = r.getResourceSources(e);
      return (
        $.each(t.actions, function (e, r) {
          var t = SharkGame.HomeActions[r].cost;
          $.each(t, function (e, r) {
            var t = r.resource;
            o.doesResourceExist(t) && (c.push(t), a.push(t));
          });
        }),
        $.each(t.income, function (e, t) {
          o.doesResourceExist(t) &&
            -1 === a.indexOf(t) &&
            c.push(r.getResourceDependencyChains(t, a));
        }),
        c
      );
    },
  });
