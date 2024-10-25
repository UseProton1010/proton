SharkGame.MathUtil = {
  constantCost: function (t, n, r) {
    return (n - t) * r;
  },
  constantMax: function (t, n, r) {
    return (n = Math.floor(Math.floor(n) * (1 - 1e-9) + 0.1)) / r + t;
  },
  linearCost: function (t, n, r) {
    return (r / 2) * (n * n + n) - (r / 2) * (t * t + t);
  },
  linearMax: function (t, n, r) {
    return (
      (n = Math.floor(Math.floor(n) * (1 - 1e-9) + 0.1)),
      Math.sqrt(t * t + t + (2 * n) / r + 0.25) - 0.5
    );
  },
  uniqueCost: function (t, n, r) {
    return t < 1 && n - 1 <= 1 ? r : Number.POSITIVE_INFINITY;
  },
  uniqueMax: function (t, n, r) {
    return 1;
  },
};
