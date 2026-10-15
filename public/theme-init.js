// Apply the saved theme before first paint, otherwise light mode flashes dark.
(function () {
  try {
    var saved = null;
    try { saved = localStorage.getItem("saqlain-theme"); } catch (e) { /* private mode */ }
    var theme = saved === "light" || saved === "dark"
      ? saved
      : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = "dark";
  }
})();
