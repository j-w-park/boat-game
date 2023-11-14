import { Game } from "./game";
import "./style.css";

const canvas = document.getElementById("app");
if (canvas instanceof HTMLCanvasElement) {
  const g = new Game(canvas);
  g.start();
}
