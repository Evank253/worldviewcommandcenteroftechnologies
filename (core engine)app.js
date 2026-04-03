let currentMode = "finance";

function switchMode(mode) {
  currentMode = mode;
  loadModule();
}

function loadModule() {
  const app = document.getElementById("app");

  if (currentMode === "finance") app.innerHTML = renderFinance();
  if (currentMode === "global") app.innerHTML = renderGlobal();
  if (currentMode === "ai") app.innerHTML = renderAI();
  if (currentMode === "business") app.innerHTML = renderBusiness();
  if (currentMode === "cyber") app.innerHTML = renderCyber();
}

loadModule();