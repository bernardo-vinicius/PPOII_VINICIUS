const themeLink = document.querySelector("#theme-css");

const systemTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyTheme = (theme) => {
  themeLink.href = `/client/src/styles/${theme}.css`;
};

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  applyTheme(savedTheme ?? systemTheme());

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (localStorage.getItem("theme")) return;

      applyTheme(e.matches ? "dark" : "light");
    });
});

window.toggleTheme = () => {
  const current = localStorage.getItem("theme") ?? systemTheme();

  const next = current === "dark" ? "light" : "dark";

  localStorage.setItem("theme", next);

  applyTheme(next);
};

window.useSystemTheme = () => {
  localStorage.removeItem("theme");

  applyTheme(systemTheme());
};
