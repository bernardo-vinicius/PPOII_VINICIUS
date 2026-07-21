export const setupPasswordToggle = (inputSelector, buttonSelector) => {
  const input = document.querySelector(inputSelector);
  const button = document.querySelector(buttonSelector);

  if (!input || !button) return;

  const icon = button.querySelector("i");

  button.addEventListener("click", () => {
    const isVisible = input.type === "text";

    input.type = isVisible ? "password" : "text";

    icon.className = isVisible ? "bi bi-eye-fill" : "bi bi-eye-slash-fill";

    button.setAttribute(
      "aria-label",
      isVisible ? "Mostrar senha" : "Ocultar senha",
    );
  });
};
