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
    const [w, h] = [1920, 1080];
    this.#canvas.width = w;
    this.#canvas.height = h;
    this.#canvas.style.width = "100vw";
    this.#canvas.style.height = `calc(100vw * ${h} / ${w})`;

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

    // Toroidal space rendering
    if (
      camPos.x + camScale.x / 2 > mapScale.x / 2 &&
      -mapScale.x / 2 < rtPos.x - rtScale.x / 2 &&
      rtPos.x - rtScale.x / 2 < camPos.x + camScale.x / 2 - mapScale.x
    ) {
      this.#renderContext.translate(mapScale.x, 0);
      this.#renderContext.save();
      rt.render(this.#renderContext);
      this.#renderContext.restore();
    } else {
      this.#renderContext.save();
      rt.render(this.#renderContext);
      this.#renderContext.restore();
    }
  }

  clear() {
    const { width, height } = this.#canvas;
    this.#renderContext.fillStyle = "#000";
    this.#renderContext.resetTransform();
    this.#renderContext.clearRect(0, 0, width, height);
    this.#renderContext.fillRect(0, 0, width, height);
  }
}
