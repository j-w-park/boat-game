import { Camera } from "@/object/camera";
import { Game } from "../game";
import { RenderTarget } from "./types";

export * from "./types";

export class Renderer {
  #camera: Camera | null = null;

  #canvas: HTMLCanvasElement;

  #renderContext: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error(`canvas context not found`);
    }
    this.#canvas = canvas;
    this.#renderContext = ctx;
  }

  get canvas() {
    return this.#canvas;
  }

  get camera() {
    if (!this.#camera) {
      throw new Error(`camera not initialized`);
    }
    return this.#camera;
  }

  init(camera: Camera) {
    const [w, h] = [2400, 1800]; // resolution
    this.#canvas.width = w;
    this.#canvas.height = h;
    this.#canvas.style.width = "var(--ui-width)";
    this.#canvas.style.height = `calc(var(--ui-width) * ${h} / ${w})`;

    this.#camera = camera;
    this.#camera.aspectRatio = w / h;
    this.#camera.height = 200;
  }

  render(rt: RenderTarget) {
    if (!this.#camera) {
      return;
    }
    const { mapScale } = Game;
    const { width: scrW, height: scrH } = this.#canvas;
    const { position: camPos, scale: camScale } = this.#camera.transforms;
    const { position: rtPos, scale: rtScale } = rt.transforms;

    const kx = scrW / camScale.x;
    const ky = -scrH / camScale.y;
    this.#renderContext.setTransform(
      kx,
      0,
      0,
      ky,
      scrW / 2 - kx * camPos.x,
      scrH / 2 - ky * camPos.y
    );

    const mapLeft = -mapScale.x / 2;
    const mapRight = mapScale.x / 2;
    const mapUp = mapScale.y / 2;
    const mapDown = -mapScale.y / 2;

    const camLeft = camPos.x - camScale.x / 2;
    const camRight = camPos.x + camScale.x / 2;
    const camUp = camPos.y + camScale.y / 2;
    const camDown = camPos.y - camScale.y / 2;

    const rtLeft = rtPos.x - rtScale.x / 2;
    const rtRight = rtPos.x + rtScale.x / 2;
    const rtUp = rtPos.y + rtScale.y / 2;
    const rtDown = rtPos.y - rtScale.y / 2;

    // Toroidal space rendering
    if (mapRight < camRight && rtLeft + mapScale.x < camRight) {
      this.#renderContext.translate(mapScale.x, 0);
    } else if (camLeft < mapLeft && camLeft < rtRight - mapScale.x) {
      this.#renderContext.translate(-mapScale.x, 0);
    }
    if (mapUp < camUp && rtDown + mapScale.y < camUp) {
      this.#renderContext.translate(0, mapScale.y);
    } else if (camDown < mapDown && camDown < rtUp - mapScale.y) {
      this.#renderContext.translate(0, -mapScale.y);
    }

    rt.render(this.#renderContext);
  }

  clear() {
    const { width, height } = this.#canvas;
    this.#renderContext.fillStyle = "#fff";
    this.#renderContext.resetTransform();
    this.#renderContext.clearRect(0, 0, width, height);
    this.#renderContext.fillRect(0, 0, width, height);

    // clip a circular area in the center
    this.#renderContext.beginPath();
    this.#renderContext.strokeStyle = "#000";
    this.#renderContext.lineWidth = 2;
    this.#renderContext.ellipse(
      width / 2,
      height / 2,
      (height / 2) * 0.9,
      (height / 2) * 0.9,
      0,
      0,
      Math.PI * 2,
      true
    );
    this.#renderContext.stroke();
    this.#renderContext.closePath();
    this.#renderContext.clip();
  }
}
