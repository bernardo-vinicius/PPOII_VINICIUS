// Aplica o tema o mais rápido possível (evita o "piscar" da tela)
(function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme ?? (prefersDark ? "dark" : "light");

  document.documentElement.dataset.theme = initialTheme;
})();

document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const toggleBtn = document.querySelector("#toggle-theme");

  const updateUI = (theme) => {
    if (!toggleBtn) return;

    const icon = toggleBtn.querySelector("i");
    if (icon) {
      icon.className =
        theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
    }

    toggleBtn.setAttribute(
      "aria-label",
      theme === "dark"
        ? "Alternar para tema claro"
        : "Alternar para tema escuro",
    );
  };

  const setTheme = (theme) => {
    html.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    updateUI(theme);
  };

  updateUI(html.dataset.theme);

  toggleBtn?.addEventListener("click", () => {
    const nextTheme = html.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });

  // Atualiza dinamicamente se o usuário mudar o tema do SO e não tiver preferência salva
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    });
});
