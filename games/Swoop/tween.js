// tween.js - http://github.com/sole/tween.js
"use strict";
void 0 === Date.now &&
  (Date.now = function () {
    return new Date().valueOf();
  });
var TWEEN =
  TWEEN ||
  (function () {
    var a = [];
    return {
      REVISION: "12",
      getAll: function () {
        return a;
      },
      removeAll: function () {
        a = [];
      },
      add: function (c) {
        a.push(c);
      },
      remove: function (c) {
        c = a.indexOf(c);
        -1 !== c && a.splice(c, 1);
      },
      update: function (c) {
        if (0 === a.length) return !1;
        for (
          var b = 0,
            c =
              void 0 !== c
                ? c
                : "undefined" !== typeof window &&
                    void 0 !== window.performance &&
                    void 0 !== window.performance.now
                  ? window.performance.now()
                  : Date.now();
          b < a.length;

        )
          a[b].update(c) ? b++ : a.splice(b, 1);
        return !0;
      },
    };
  })();
TWEEN.Tween = function (a) {
  var c = {},
    b = {},
    d = {},
    e = 1e3,
    g = 0,
    h = !1,
    j = !1,
    q = 0,
    m = null,
    v = TWEEN.Easing.Linear.None,
    w = TWEEN.Interpolation.Linear,
    n = [],
    r = null,
    s = !1,
    t = null,
    u = null,
    k;
  for (k in a) c[k] = parseFloat(a[k], 10);
  this.to = function (a, c) {
    void 0 !== c && (e = c);
    b = a;
    return this;
  };
  this.start = function (e) {
    TWEEN.add(this);
    j = !0;
    s = !1;
    m =
      void 0 !== e
        ? e
        : "undefined" !== typeof window &&
            void 0 !== window.performance &&
            void 0 !== window.performance.now
          ? window.performance.now()
          : Date.now();
    m += q;
    for (var f in b) {
      if (b[f] instanceof Array) {
        if (0 === b[f].length) continue;
        b[f] = [a[f]].concat(b[f]);
      }
      c[f] = a[f];
      !1 === c[f] instanceof Array && (c[f] *= 1);
      d[f] = c[f] || 0;
    }
    return this;
  };
  this.stop = function () {
    if (!j) return this;
    TWEEN.remove(this);
    j = !1;
    this.stopChainedTweens();
    return this;
  };
  this.stopChainedTweens = function () {
    for (var a = 0, b = n.length; a < b; a++) n[a].stop();
  };
  this.delay = function (a) {
    q = a;
    return this;
  };
  this.repeat = function (a) {
    g = a;
    return this;
  };
  this.yoyo = function (a) {
    h = a;
    return this;
  };
  this.easing = function (a) {
    v = a;
    return this;
  };
  this.interpolation = function (a) {
    w = a;
    return this;
  };
  this.chain = function () {
    n = arguments;
    return this;
  };
  this.onStart = function (a) {
    r = a;
    return this;
  };
  this.onUpdate = function (a) {
    t = a;
    return this;
  };
  this.onComplete = function (a) {
    u = a;
    return this;
  };
  this.update = function (p) {
    var f;
    if (p < m) return !0;
    !1 === s && (null !== r && r.call(a), (s = !0));
    var i = (p - m) / e,
      i = 1 < i ? 1 : i,
      j = v(i);
    for (f in b) {
      var k = c[f] || 0,
        l = b[f];
      l instanceof Array
        ? (a[f] = w(l, j))
        : ("string" === typeof l && (l = k + parseFloat(l, 10)),
          "number" === typeof l && (a[f] = k + (l - k) * j));
    }
    null !== t && t.call(a, j);
    if (1 == i)
      if (0 < g) {
        isFinite(g) && g--;
        for (f in d)
          "string" === typeof b[f] && (d[f] += parseFloat(b[f], 10)),
            h && ((i = d[f]), (d[f] = b[f]), (b[f] = i)),
            (c[f] = d[f]);
        m = p + q;
      } else {
        null !== u && u.call(a);
        f = 0;
        for (i = n.length; f < i; f++) n[f].start(p);
        return !1;
      }
    return !0;
  };
};
TWEEN.Easing = {
  Linear: {
    None: function (a) {
      return a;
    },
  },
  Quadratic: {
    In: function (a) {
      return a * a;
    },
    Out: function (a) {
      return a * (2 - a);
    },
    InOut: function (a) {
      return 1 > (a *= 2) ? 0.5 * a * a : -0.5 * (--a * (a - 2) - 1);
    },
  },
  Cubic: {
    In: function (a) {
      return a * a * a;
    },
    Out: function (a) {
      return --a * a * a + 1;
    },
    InOut: function (a) {
      return 1 > (a *= 2) ? 0.5 * a * a * a : 0.5 * ((a -= 2) * a * a + 2);
    },
  },
  Quartic: {
    In: function (a) {
      return a * a * a * a;
    },
    Out: function (a) {
      return 1 - --a * a * a * a;
    },
    InOut: function (a) {
      return 1 > (a *= 2)
        ? 0.5 * a * a * a * a
        : -0.5 * ((a -= 2) * a * a * a - 2);
    },
  },
  Quintic: {
    In: function (a) {
      return a * a * a * a * a;
    },
    Out: function (a) {
      return --a * a * a * a * a + 1;
    },
    InOut: function (a) {
      return 1 > (a *= 2)
        ? 0.5 * a * a * a * a * a
        : 0.5 * ((a -= 2) * a * a * a * a + 2);
    },
  },
  Sinusoidal: {
    In: function (a) {
      return 1 - Math.cos((a * Math.PI) / 2);
    },
    Out: function (a) {
      return Math.sin((a * Math.PI) / 2);
    },
    InOut: function (a) {
      return 0.5 * (1 - Math.cos(Math.PI * a));
    },
  },
  Exponential: {
    In: function (a) {
      return 0 === a ? 0 : Math.pow(1024, a - 1);
    },
    Out: function (a) {
      return 1 === a ? 1 : 1 - Math.pow(2, -10 * a);
    },
    InOut: function (a) {
      return 0 === a
        ? 0
        : 1 === a
          ? 1
          : 1 > (a *= 2)
            ? 0.5 * Math.pow(1024, a - 1)
            : 0.5 * (-Math.pow(2, -10 * (a - 1)) + 2);
    },
  },
  Circular: {
    In: function (a) {
      return 1 - Math.sqrt(1 - a * a);
    },
    Out: function (a) {
      return Math.sqrt(1 - --a * a);
    },
    InOut: function (a) {
      return 1 > (a *= 2)
        ? -0.5 * (Math.sqrt(1 - a * a) - 1)
        : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1);
    },
  },
  Elastic: {
    In: function (a) {
      var c,
        b = 0.1;
      if (0 === a) return 0;
      if (1 === a) return 1;
      !b || 1 > b
        ? ((b = 1), (c = 0.1))
        : (c = (0.4 * Math.asin(1 / b)) / (2 * Math.PI));
      return -(
        b *
        Math.pow(2, 10 * (a -= 1)) *
        Math.sin(((a - c) * 2 * Math.PI) / 0.4)
      );
    },
    Out: function (a) {
      var c,
        b = 0.1;
      if (0 === a) return 0;
      if (1 === a) return 1;
      !b || 1 > b
        ? ((b = 1), (c = 0.1))
        : (c = (0.4 * Math.asin(1 / b)) / (2 * Math.PI));
      return (
        b * Math.pow(2, -10 * a) * Math.sin(((a - c) * 2 * Math.PI) / 0.4) + 1
      );
    },
    InOut: function (a) {
      var c,
        b = 0.1;
      if (0 === a) return 0;
      if (1 === a) return 1;
      !b || 1 > b
        ? ((b = 1), (c = 0.1))
        : (c = (0.4 * Math.asin(1 / b)) / (2 * Math.PI));
      return 1 > (a *= 2)
        ? -0.5 *
            b *
            Math.pow(2, 10 * (a -= 1)) *
            Math.sin(((a - c) * 2 * Math.PI) / 0.4)
        : 0.5 *
            b *
            Math.pow(2, -10 * (a -= 1)) *
            Math.sin(((a - c) * 2 * Math.PI) / 0.4) +
            1;
    },
  },
  Back: {
    In: function (a) {
      return a * a * (2.70158 * a - 1.70158);
    },
    Out: function (a) {
      return --a * a * (2.70158 * a + 1.70158) + 1;
    },
    InOut: function (a) {
      return 1 > (a *= 2)
        ? 0.5 * a * a * (3.5949095 * a - 2.5949095)
        : 0.5 * ((a -= 2) * a * (3.5949095 * a + 2.5949095) + 2);
    },
  },
  Bounce: {
    In: function (a) {
      return 1 - TWEEN.Easing.Bounce.Out(1 - a);
    },
    Out: function (a) {
      return a < 1 / 2.75
        ? 7.5625 * a * a
        : a < 2 / 2.75
          ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75
          : a < 2.5 / 2.75
            ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375
            : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375;
    },
    InOut: function (a) {
      return 0.5 > a
        ? 0.5 * TWEEN.Easing.Bounce.In(2 * a)
        : 0.5 * TWEEN.Easing.Bounce.Out(2 * a - 1) + 0.5;
    },
  },
};
TWEEN.Interpolation = {
  Linear: function (a, c) {
    var b = a.length - 1,
      d = b * c,
      e = Math.floor(d),
      g = TWEEN.Interpolation.Utils.Linear;
    return 0 > c
      ? g(a[0], a[1], d)
      : 1 < c
        ? g(a[b], a[b - 1], b - d)
        : g(a[e], a[e + 1 > b ? b : e + 1], d - e);
  },
  Bezier: function (a, c) {
    var b = 0,
      d = a.length - 1,
      e = Math.pow,
      g = TWEEN.Interpolation.Utils.Bernstein,
      h;
    for (h = 0; h <= d; h++) b += e(1 - c, d - h) * e(c, h) * a[h] * g(d, h);
    return b;
  },
  CatmullRom: function (a, c) {
    var b = a.length - 1,
      d = b * c,
      e = Math.floor(d),
      g = TWEEN.Interpolation.Utils.CatmullRom;
    return a[0] === a[b]
      ? (0 > c && (e = Math.floor((d = b * (1 + c)))),
        g(a[(e - 1 + b) % b], a[e], a[(e + 1) % b], a[(e + 2) % b], d - e))
      : 0 > c
        ? a[0] - (g(a[0], a[0], a[1], a[1], -d) - a[0])
        : 1 < c
          ? a[b] - (g(a[b], a[b], a[b - 1], a[b - 1], d - b) - a[b])
          : g(
              a[e ? e - 1 : 0],
              a[e],
              a[b < e + 1 ? b : e + 1],
              a[b < e + 2 ? b : e + 2],
              d - e,
            );
  },
  Utils: {
    Linear: function (a, c, b) {
      return (c - a) * b + a;
    },
    Bernstein: function (a, c) {
      var b = TWEEN.Interpolation.Utils.Factorial;
      return b(a) / b(c) / b(a - c);
    },
    Factorial: (function () {
      var a = [1];
      return function (c) {
        var b = 1,
          d;
        if (a[c]) return a[c];
        for (d = c; 1 < d; d--) b *= d;
        return (a[c] = b);
      };
    })(),
    CatmullRom: function (a, c, b, d, e) {
      var a = 0.5 * (b - a),
        d = 0.5 * (d - c),
        g = e * e;
      return (
        (2 * c - 2 * b + a + d) * e * g +
        (-3 * c + 3 * b - 2 * a - d) * g +
        a * e +
        c
      );
    },
  },
};
