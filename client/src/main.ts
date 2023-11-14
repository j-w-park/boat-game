import "./style.css";

const canvas = document.getElementById("app");

if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error(`canvas element not found`);
}

const ctx = canvas.getContext("2d");
if (!ctx) {
  throw new Error(`canvas context not found `);
}
