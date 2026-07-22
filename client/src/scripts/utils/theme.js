document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const toggleBtn = document.querySelector("#toggle-theme");

  const setTheme = (theme) => {
    html.dataset.theme = theme;

    localStorage.setItem("theme", theme);

    if (!toggleBtn) return;

    const icon = toggleBtn.querySelector("i");

    icon.className =
      theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";

    toggleBtn.setAttribute(
      "aria-label",
      theme === "dark"
        ? "Alternar para tema claro"
        : "Alternar para tema escuro",
    );
  };

  const savedTheme = localStorage.getItem("theme");

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  setTheme(savedTheme ?? (prefersDark ? "dark" : "light"));

  toggleBtn?.addEventListener("click", () => {
    setTheme(html.dataset.theme === "dark" ? "light" : "dark");
  });
});
