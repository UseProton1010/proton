(function () {
  var n = this,
    t = n._,
    r = {},
    e = Array.prototype,
    u = Object.prototype,
    i = Function.prototype,
    o = e.push,
    a = e.slice,
    c = e.concat,
    l = u.toString,
    f = u.hasOwnProperty,
    s = e.forEach,
    p = e.map,
    h = e.reduce,
    v = e.reduceRight,
    y = e.filter,
    d = e.every,
    g = e.some,
    m = e.indexOf,
    b = e.lastIndexOf,
    x = Array.isArray,
    w = Object.keys,
    _ = i.bind,
    j = function (n) {
      return n instanceof j
        ? n
        : this instanceof j
          ? void (this._wrapped = n)
          : new j(n);
    };
  "undefined" != typeof exports
    ? ("undefined" != typeof module &&
        module.exports &&
        (exports = module.exports = j),
      (exports._ = j))
    : (n._ = j),
    (j.VERSION = "1.6.0");
  var A =
    (j.each =
    j.forEach =
      function (n, t, e) {
        if (null == n) return n;
        if (s && n.forEach === s) n.forEach(t, e);
        else if (n.length === +n.length) {
          for (var u = 0, i = n.length; u < i; u++)
            if (t.call(e, n[u], u, n) === r) return;
        } else {
          var o = j.keys(n);
          for (u = 0, i = o.length; u < i; u++)
            if (t.call(e, n[o[u]], o[u], n) === r) return;
        }
        return n;
      });
  j.map = j.collect = function (n, t, r) {
    var e = [];
    return null == n
      ? e
      : p && n.map === p
        ? n.map(t, r)
        : (A(n, function (n, u, i) {
            e.push(t.call(r, n, u, i));
          }),
          e);
  };
  var O = "Reduce of empty array with no initial value";
  (j.reduce =
    j.foldl =
    j.inject =
      function (n, t, r, e) {
        var u = arguments.length > 2;
        if ((null == n && (n = []), h && n.reduce === h))
          return e && (t = j.bind(t, e)), u ? n.reduce(t, r) : n.reduce(t);
        if (
          (A(n, function (n, i, o) {
            u ? (r = t.call(e, r, n, i, o)) : ((r = n), (u = !0));
          }),
          !u)
        )
          throw new TypeError(O);
        return r;
      }),
    (j.reduceRight = j.foldr =
      function (n, t, r, e) {
        var u = arguments.length > 2;
        if ((null == n && (n = []), v && n.reduceRight === v))
          return (
            e && (t = j.bind(t, e)), u ? n.reduceRight(t, r) : n.reduceRight(t)
          );
        var i = n.length;
        if (i !== +i) {
          var o = j.keys(n);
          i = o.length;
        }
        if (
          (A(n, function (a, c, l) {
            (c = o ? o[--i] : --i),
              u ? (r = t.call(e, r, n[c], c, l)) : ((r = n[c]), (u = !0));
          }),
          !u)
        )
          throw new TypeError(O);
        return r;
      }),
    (j.find = j.detect =
      function (n, t, r) {
        var e;
        return (
          k(n, function (n, u, i) {
            if (t.call(r, n, u, i)) return (e = n), !0;
          }),
          e
        );
      }),
    (j.filter = j.select =
      function (n, t, r) {
        var e = [];
        return null == n
          ? e
          : y && n.filter === y
            ? n.filter(t, r)
            : (A(n, function (n, u, i) {
                t.call(r, n, u, i) && e.push(n);
              }),
              e);
      }),
    (j.reject = function (n, t, r) {
      return j.filter(
        n,
        function (n, e, u) {
          return !t.call(r, n, e, u);
        },
        r,
      );
    }),
    (j.every = j.all =
      function (n, t, e) {
        t || (t = j.identity);
        var u = !0;
        return null == n
          ? u
          : d && n.every === d
            ? n.every(t, e)
            : (A(n, function (n, i, o) {
                if (!(u = u && t.call(e, n, i, o))) return r;
              }),
              !!u);
      });
  var k =
    (j.some =
    j.any =
      function (n, t, e) {
        t || (t = j.identity);
        var u = !1;
        return null == n
          ? u
          : g && n.some === g
            ? n.some(t, e)
            : (A(n, function (n, i, o) {
                if (u || (u = t.call(e, n, i, o))) return r;
              }),
              !!u);
      });
  (j.contains = j.include =
    function (n, t) {
      return (
        null != n &&
        (m && n.indexOf === m
          ? -1 != n.indexOf(t)
          : k(n, function (n) {
              return n === t;
            }))
      );
    }),
    (j.invoke = function (n, t) {
      var r = a.call(arguments, 2),
        e = j.isFunction(t);
      return j.map(n, function (n) {
        return (e ? t : n[t]).apply(n, r);
      });
    }),
    (j.pluck = function (n, t) {
      return j.map(n, j.property(t));
    }),
    (j.where = function (n, t) {
      return j.filter(n, j.matches(t));
    }),
    (j.findWhere = function (n, t) {
      return j.find(n, j.matches(t));
    }),
    (j.max = function (n, t, r) {
      if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535)
        return Math.max.apply(Math, n);
      var e = -1 / 0,
        u = -1 / 0;
      return (
        A(n, function (n, i, o) {
          var a = t ? t.call(r, n, i, o) : n;
          a > u && ((e = n), (u = a));
        }),
        e
      );
    }),
    (j.min = function (n, t, r) {
      if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535)
        return Math.min.apply(Math, n);
      var e = 1 / 0,
        u = 1 / 0;
      return (
        A(n, function (n, i, o) {
          var a = t ? t.call(r, n, i, o) : n;
          a < u && ((e = n), (u = a));
        }),
        e
      );
    }),
    (j.shuffle = function (n) {
      var t,
        r = 0,
        e = [];
      return (
        A(n, function (n) {
          (t = j.random(r++)), (e[r - 1] = e[t]), (e[t] = n);
        }),
        e
      );
    }),
    (j.sample = function (n, t, r) {
      return null == t || r
        ? (n.length !== +n.length && (n = j.values(n)),
          n[j.random(n.length - 1)])
        : j.shuffle(n).slice(0, Math.max(0, t));
    });
  var E = function (n) {
    return null == n ? j.identity : j.isFunction(n) ? n : j.property(n);
  };
  j.sortBy = function (n, t, r) {
    return (
      (t = E(t)),
      j.pluck(
        j
          .map(n, function (n, e, u) {
            return { value: n, index: e, criteria: t.call(r, n, e, u) };
          })
          .sort(function (n, t) {
            var r = n.criteria,
              e = t.criteria;
            if (r !== e) {
              if (r > e || void 0 === r) return 1;
              if (r < e || void 0 === e) return -1;
            }
            return n.index - t.index;
          }),
        "value",
      )
    );
  };
  var F = function (n) {
    return function (t, r, e) {
      var u = {};
      return (
        (r = E(r)),
        A(t, function (i, o) {
          var a = r.call(e, i, o, t);
          n(u, a, i);
        }),
        u
      );
    };
  };
  (j.groupBy = F(function (n, t, r) {
    j.has(n, t) ? n[t].push(r) : (n[t] = [r]);
  })),
    (j.indexBy = F(function (n, t, r) {
      n[t] = r;
    })),
    (j.countBy = F(function (n, t) {
      j.has(n, t) ? n[t]++ : (n[t] = 1);
    })),
    (j.sortedIndex = function (n, t, r, e) {
      for (var u = (r = E(r)).call(e, t), i = 0, o = n.length; i < o; ) {
        var a = (i + o) >>> 1;
        r.call(e, n[a]) < u ? (i = a + 1) : (o = a);
      }
      return i;
    }),
    (j.toArray = function (n) {
      return n
        ? j.isArray(n)
          ? a.call(n)
          : n.length === +n.length
            ? j.map(n, j.identity)
            : j.values(n)
        : [];
    }),
    (j.size = function (n) {
      return null == n
        ? 0
        : n.length === +n.length
          ? n.length
          : j.keys(n).length;
    }),
    (j.first =
      j.head =
      j.take =
        function (n, t, r) {
          if (null != n)
            return null == t || r ? n[0] : t < 0 ? [] : a.call(n, 0, t);
        }),
    (j.initial = function (n, t, r) {
      return a.call(n, 0, n.length - (null == t || r ? 1 : t));
    }),
    (j.last = function (n, t, r) {
      if (null != n)
        return null == t || r
          ? n[n.length - 1]
          : a.call(n, Math.max(n.length - t, 0));
    }),
    (j.rest =
      j.tail =
      j.drop =
        function (n, t, r) {
          return a.call(n, null == t || r ? 1 : t);
        }),
    (j.compact = function (n) {
      return j.filter(n, j.identity);
    });
  var M = function (n, t, r) {
    return t && j.every(n, j.isArray)
      ? c.apply(r, n)
      : (A(n, function (n) {
          j.isArray(n) || j.isArguments(n)
            ? t
              ? o.apply(r, n)
              : M(n, t, r)
            : r.push(n);
        }),
        r);
  };
  (j.flatten = function (n, t) {
    return M(n, t, []);
  }),
    (j.without = function (n) {
      return j.difference(n, a.call(arguments, 1));
    }),
    (j.partition = function (n, t) {
      var r = [],
        e = [];
      return (
        A(n, function (n) {
          (t(n) ? r : e).push(n);
        }),
        [r, e]
      );
    }),
    (j.uniq = j.unique =
      function (n, t, r, e) {
        j.isFunction(t) && ((e = r), (r = t), (t = !1));
        var u = r ? j.map(n, r, e) : n,
          i = [],
          o = [];
        return (
          A(u, function (r, e) {
            (t ? e && o[o.length - 1] === r : j.contains(o, r)) ||
              (o.push(r), i.push(n[e]));
          }),
          i
        );
      }),
    (j.union = function () {
      return j.uniq(j.flatten(arguments, !0));
    }),
    (j.intersection = function (n) {
      var t = a.call(arguments, 1);
      return j.filter(j.uniq(n), function (n) {
        return j.every(t, function (t) {
          return j.contains(t, n);
        });
      });
    }),
    (j.difference = function (n) {
      var t = c.apply(e, a.call(arguments, 1));
      return j.filter(n, function (n) {
        return !j.contains(t, n);
      });
    }),
    (j.zip = function () {
      for (
        var n = j.max(j.pluck(arguments, "length").concat(0)),
          t = new Array(n),
          r = 0;
        r < n;
        r++
      )
        t[r] = j.pluck(arguments, "" + r);
      return t;
    }),
    (j.object = function (n, t) {
      if (null == n) return {};
      for (var r = {}, e = 0, u = n.length; e < u; e++)
        t ? (r[n[e]] = t[e]) : (r[n[e][0]] = n[e][1]);
      return r;
    }),
    (j.indexOf = function (n, t, r) {
      if (null == n) return -1;
      var e = 0,
        u = n.length;
      if (r) {
        if ("number" != typeof r)
          return n[(e = j.sortedIndex(n, t))] === t ? e : -1;
        e = r < 0 ? Math.max(0, u + r) : r;
      }
      if (m && n.indexOf === m) return n.indexOf(t, r);
      for (; e < u; e++) if (n[e] === t) return e;
      return -1;
    }),
    (j.lastIndexOf = function (n, t, r) {
      if (null == n) return -1;
      var e = null != r;
      if (b && n.lastIndexOf === b)
        return e ? n.lastIndexOf(t, r) : n.lastIndexOf(t);
      for (var u = e ? r : n.length; u--; ) if (n[u] === t) return u;
      return -1;
    }),
    (j.range = function (n, t, r) {
      arguments.length <= 1 && ((t = n || 0), (n = 0)), (r = arguments[2] || 1);
      for (
        var e = Math.max(Math.ceil((t - n) / r), 0), u = 0, i = new Array(e);
        u < e;

      )
        (i[u++] = n), (n += r);
      return i;
    });
  var R = function () {};
  (j.bind = function (n, t) {
    var r, e;
    if (_ && n.bind === _) return _.apply(n, a.call(arguments, 1));
    if (!j.isFunction(n)) throw new TypeError();
    return (
      (r = a.call(arguments, 2)),
      (e = function () {
        if (!(this instanceof e))
          return n.apply(t, r.concat(a.call(arguments)));
        R.prototype = n.prototype;
        var u = new R();
        R.prototype = null;
        var i = n.apply(u, r.concat(a.call(arguments)));
        return Object(i) === i ? i : u;
      })
    );
  }),
    (j.partial = function (n) {
      var t = a.call(arguments, 1);
      return function () {
        for (var r = 0, e = t.slice(), u = 0, i = e.length; u < i; u++)
          e[u] === j && (e[u] = arguments[r++]);
        for (; r < arguments.length; ) e.push(arguments[r++]);
        return n.apply(this, e);
      };
    }),
    (j.bindAll = function (n) {
      var t = a.call(arguments, 1);
      if (0 === t.length)
        throw new Error("bindAll must be passed function names");
      return (
        A(t, function (t) {
          n[t] = j.bind(n[t], n);
        }),
        n
      );
    }),
    (j.memoize = function (n, t) {
      var r = {};
      return (
        t || (t = j.identity),
        function () {
          var e = t.apply(this, arguments);
          return j.has(r, e) ? r[e] : (r[e] = n.apply(this, arguments));
        }
      );
    }),
    (j.delay = function (n, t) {
      var r = a.call(arguments, 2);
      return setTimeout(function () {
        return n.apply(null, r);
      }, t);
    }),
    (j.defer = function (n) {
      return j.delay.apply(j, [n, 1].concat(a.call(arguments, 1)));
    }),
    (j.throttle = function (n, t, r) {
      var e,
        u,
        i,
        o = null,
        a = 0;
      r || (r = {});
      var c = function () {
        (a = !1 === r.leading ? 0 : j.now()),
          (o = null),
          (i = n.apply(e, u)),
          (e = u = null);
      };
      return function () {
        var l = j.now();
        a || !1 !== r.leading || (a = l);
        var f = t - (l - a);
        return (
          (e = this),
          (u = arguments),
          f <= 0
            ? (clearTimeout(o),
              (o = null),
              (a = l),
              (i = n.apply(e, u)),
              (e = u = null))
            : o || !1 === r.trailing || (o = setTimeout(c, f)),
          i
        );
      };
    }),
    (j.debounce = function (n, t, r) {
      var e,
        u,
        i,
        o,
        a,
        c = function () {
          var l = j.now() - o;
          l < t
            ? (e = setTimeout(c, t - l))
            : ((e = null), r || ((a = n.apply(i, u)), (i = u = null)));
        };
      return function () {
        (i = this), (u = arguments), (o = j.now());
        var l = r && !e;
        return (
          e || (e = setTimeout(c, t)),
          l && ((a = n.apply(i, u)), (i = u = null)),
          a
        );
      };
    }),
    (j.once = function (n) {
      var t,
        r = !1;
      return function () {
        return r || ((r = !0), (t = n.apply(this, arguments)), (n = null)), t;
      };
    }),
    (j.wrap = function (n, t) {
      return j.partial(t, n);
    }),
    (j.compose = function () {
      var n = arguments;
      return function () {
        for (var t = arguments, r = n.length - 1; r >= 0; r--)
          t = [n[r].apply(this, t)];
        return t[0];
      };
    }),
    (j.after = function (n, t) {
      return function () {
        if (--n < 1) return t.apply(this, arguments);
      };
    }),
    (j.keys = function (n) {
      if (!j.isObject(n)) return [];
      if (w) return w(n);
      var t = [];
      for (var r in n) j.has(n, r) && t.push(r);
      return t;
    }),
    (j.values = function (n) {
      for (var t = j.keys(n), r = t.length, e = new Array(r), u = 0; u < r; u++)
        e[u] = n[t[u]];
      return e;
    }),
    (j.pairs = function (n) {
      for (var t = j.keys(n), r = t.length, e = new Array(r), u = 0; u < r; u++)
        e[u] = [t[u], n[t[u]]];
      return e;
    }),
    (j.invert = function (n) {
      for (var t = {}, r = j.keys(n), e = 0, u = r.length; e < u; e++)
        t[n[r[e]]] = r[e];
      return t;
    }),
    (j.functions = j.methods =
      function (n) {
        var t = [];
        for (var r in n) j.isFunction(n[r]) && t.push(r);
        return t.sort();
      }),
    (j.extend = function (n) {
      return (
        A(a.call(arguments, 1), function (t) {
          if (t) for (var r in t) n[r] = t[r];
        }),
        n
      );
    }),
    (j.pick = function (n) {
      var t = {},
        r = c.apply(e, a.call(arguments, 1));
      return (
        A(r, function (r) {
          r in n && (t[r] = n[r]);
        }),
        t
      );
    }),
    (j.omit = function (n) {
      var t = {},
        r = c.apply(e, a.call(arguments, 1));
      for (var u in n) j.contains(r, u) || (t[u] = n[u]);
      return t;
    }),
    (j.defaults = function (n) {
      return (
        A(a.call(arguments, 1), function (t) {
          if (t) for (var r in t) void 0 === n[r] && (n[r] = t[r]);
        }),
        n
      );
    }),
    (j.clone = function (n) {
      return j.isObject(n) ? (j.isArray(n) ? n.slice() : j.extend({}, n)) : n;
    }),
    (j.tap = function (n, t) {
      return t(n), n;
    });
  var S = function (n, t, r, e) {
    if (n === t) return 0 !== n || 1 / n == 1 / t;
    if (null == n || null == t) return n === t;
    n instanceof j && (n = n._wrapped), t instanceof j && (t = t._wrapped);
    var u = l.call(n);
    if (u != l.call(t)) return !1;
    switch (u) {
      case "[object String]":
        return n == String(t);
      case "[object Number]":
        return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t;
      case "[object Date]":
      case "[object Boolean]":
        return +n == +t;
      case "[object RegExp]":
        return (
          n.source == t.source &&
          n.global == t.global &&
          n.multiline == t.multiline &&
          n.ignoreCase == t.ignoreCase
        );
    }
    if ("object" != typeof n || "object" != typeof t) return !1;
    for (var i = r.length; i--; ) if (r[i] == n) return e[i] == t;
    var o = n.constructor,
      a = t.constructor;
    if (
      o !== a &&
      !(
        j.isFunction(o) &&
        o instanceof o &&
        j.isFunction(a) &&
        a instanceof a
      ) &&
      "constructor" in n &&
      "constructor" in t
    )
      return !1;
    r.push(n), e.push(t);
    var c = 0,
      f = !0;
    if ("[object Array]" == u) {
      if ((f = (c = n.length) == t.length))
        for (; c-- && (f = S(n[c], t[c], r, e)); );
    } else {
      for (var s in n)
        if (j.has(n, s) && (c++, !(f = j.has(t, s) && S(n[s], t[s], r, e))))
          break;
      if (f) {
        for (s in t) if (j.has(t, s) && !c--) break;
        f = !c;
      }
    }
    return r.pop(), e.pop(), f;
  };
  (j.isEqual = function (n, t) {
    return S(n, t, [], []);
  }),
    (j.isEmpty = function (n) {
      if (null == n) return !0;
      if (j.isArray(n) || j.isString(n)) return 0 === n.length;
      for (var t in n) if (j.has(n, t)) return !1;
      return !0;
    }),
    (j.isElement = function (n) {
      return !(!n || 1 !== n.nodeType);
    }),
    (j.isArray =
      x ||
      function (n) {
        return "[object Array]" == l.call(n);
      }),
    (j.isObject = function (n) {
      return n === Object(n);
    }),
    A(
      ["Arguments", "Function", "String", "Number", "Date", "RegExp"],
      function (n) {
        j["is" + n] = function (t) {
          return l.call(t) == "[object " + n + "]";
        };
      },
    ),
    j.isArguments(arguments) ||
      (j.isArguments = function (n) {
        return !(!n || !j.has(n, "callee"));
      }),
    "function" != typeof /./ &&
      (j.isFunction = function (n) {
        return "function" == typeof n;
      }),
    (j.isFinite = function (n) {
      return isFinite(n) && !isNaN(parseFloat(n));
    }),
    (j.isNaN = function (n) {
      return j.isNumber(n) && n != +n;
    }),
    (j.isBoolean = function (n) {
      return !0 === n || !1 === n || "[object Boolean]" == l.call(n);
    }),
    (j.isNull = function (n) {
      return null === n;
    }),
    (j.isUndefined = function (n) {
      return void 0 === n;
    }),
    (j.has = function (n, t) {
      return f.call(n, t);
    }),
    (j.noConflict = function () {
      return (n._ = t), this;
    }),
    (j.identity = function (n) {
      return n;
    }),
    (j.constant = function (n) {
      return function () {
        return n;
      };
    }),
    (j.property = function (n) {
      return function (t) {
        return t[n];
      };
    }),
    (j.matches = function (n) {
      return function (t) {
        if (t === n) return !0;
        for (var r in n) if (n[r] !== t[r]) return !1;
        return !0;
      };
    }),
    (j.times = function (n, t, r) {
      for (var e = Array(Math.max(0, n)), u = 0; u < n; u++)
        e[u] = t.call(r, u);
      return e;
    }),
    (j.random = function (n, t) {
      return (
        null == t && ((t = n), (n = 0)),
        n + Math.floor(Math.random() * (t - n + 1))
      );
    }),
    (j.now =
      Date.now ||
      function () {
        return new Date().getTime();
      });
  var T = {
    escape: {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
    },
  };
  T.unescape = j.invert(T.escape);
  var I = {
    escape: new RegExp("[" + j.keys(T.escape).join("") + "]", "g"),
    unescape: new RegExp("(" + j.keys(T.unescape).join("|") + ")", "g"),
  };
  j.each(["escape", "unescape"], function (n) {
    j[n] = function (t) {
      return null == t
        ? ""
        : ("" + t).replace(I[n], function (t) {
            return T[n][t];
          });
    };
  }),
    (j.result = function (n, t) {
      if (null != n) {
        var r = n[t];
        return j.isFunction(r) ? r.call(n) : r;
      }
    }),
    (j.mixin = function (n) {
      A(j.functions(n), function (t) {
        var r = (j[t] = n[t]);
        j.prototype[t] = function () {
          var n = [this._wrapped];
          return o.apply(n, arguments), z.call(this, r.apply(j, n));
        };
      });
    });
  var N = 0;
  (j.uniqueId = function (n) {
    var t = ++N + "";
    return n ? n + t : t;
  }),
    (j.templateSettings = {
      evaluate: /<%([\s\S]+?)%>/g,
      interpolate: /<%=([\s\S]+?)%>/g,
      escape: /<%-([\s\S]+?)%>/g,
    });
  var q = /(.)^/,
    B = {
      "'": "'",
      "\\": "\\",
      "\r": "r",
      "\n": "n",
      "\t": "t",
      "\u2028": "u2028",
      "\u2029": "u2029",
    },
    D = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  (j.template = function (n, t, r) {
    var e;
    r = j.defaults({}, r, j.templateSettings);
    var u = new RegExp(
        [
          (r.escape || q).source,
          (r.interpolate || q).source,
          (r.evaluate || q).source,
        ].join("|") + "|$",
        "g",
      ),
      i = 0,
      o = "__p+='";
    n.replace(u, function (t, r, e, u, a) {
      return (
        (o += n.slice(i, a).replace(D, function (n) {
          return "\\" + B[n];
        })),
        r && (o += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'"),
        e && (o += "'+\n((__t=(" + e + "))==null?'':__t)+\n'"),
        u && (o += "';\n" + u + "\n__p+='"),
        (i = a + t.length),
        t
      );
    }),
      (o += "';\n"),
      r.variable || (o = "with(obj||{}){\n" + o + "}\n"),
      (o =
        "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" +
        o +
        "return __p;\n");
    try {
      e = new Function(r.variable || "obj", "_", o);
    } catch (n) {
      throw ((n.source = o), n);
    }
    if (t) return e(t, j);
    var a = function (n) {
      return e.call(this, n, j);
    };
    return (
      (a.source = "function(" + (r.variable || "obj") + "){\n" + o + "}"), a
    );
  }),
    (j.chain = function (n) {
      return j(n).chain();
    });
  var z = function (n) {
    return this._chain ? j(n).chain() : n;
  };
  j.mixin(j),
    A(
      ["pop", "push", "reverse", "shift", "sort", "splice", "unshift"],
      function (n) {
        var t = e[n];
        j.prototype[n] = function () {
          var r = this._wrapped;
          return (
            t.apply(r, arguments),
            ("shift" != n && "splice" != n) || 0 !== r.length || delete r[0],
            z.call(this, r)
          );
        };
      },
    ),
    A(["concat", "join", "slice"], function (n) {
      var t = e[n];
      j.prototype[n] = function () {
        return z.call(this, t.apply(this._wrapped, arguments));
      };
    }),
    j.extend(j.prototype, {
      chain: function () {
        return (this._chain = !0), this;
      },
      value: function () {
        return this._wrapped;
      },
    }),
    "function" == typeof define &&
      define.amd &&
      define("underscore", [], function () {
        return j;
      });
}).call(this);
