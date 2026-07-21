import { setupPasswordToggle } from "../utils/password-toggle.js";

document.addEventListener("DOMContentLoaded", () => {
  setupPasswordToggle("#password", "#toggle-password");

  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    alert("Login bem sucedido!");
    window.location.replace("./control.html");
  });
});
