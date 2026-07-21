import { setupPasswordToggle } from "../utils/password-toggle.js";

document.addEventListener("DOMContentLoaded", () => {
  setupPasswordToggle("#password", "#toggle-password");
  setupPasswordToggle("#confirm-password", "#toggle-confirm-password");

  const passwordInput = document.querySelector("#password");
  const confirmPasswordInput = document.querySelector("#confirm-password");
  const form = document.querySelector("form");

  const validatePasswords = () => {
    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordInput.setCustomValidity("As senhas não coincidem.");
      return;
    }

    confirmPasswordInput.setCustomValidity("");
  };

  passwordInput.addEventListener("input", validatePasswords);
  confirmPasswordInput.addEventListener("input", validatePasswords);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    validatePasswords();

    // Fazer a requisição ao backend futuramente

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    alert("Você pode fazer login agora!");
    window.location.replace("./login.html");
  });
});
