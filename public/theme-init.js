// Applies the saved (or system) theme before first paint so light-theme
// visitors never see a dark flash. Runs as a classic script in <head>;
// keep the key and fallback in sync with Navbar's theme toggle.
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
