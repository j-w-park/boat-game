import { Camera } from "@/object/camera";
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

  prepare(): boolean {
    this.clear();
    if (!this.#camera) {
      return false;
    }
    const { width, height } = this.#canvas;
    const kx = width / this.#camera.transforms.scale.x;
    const ky = -height / this.#camera.transforms.scale.y;
    this.#renderContext.setTransform(
      kx,
      0,
      0,
      ky,
      width / 2 - kx * this.#camera.transforms.position.x,
      height / 2 - ky * this.#camera.transforms.position.y
    );
    return true;
  }

  render(rt: RenderTarget) {
    this.#renderContext.save();
    rt.render(this.#renderContext);
    this.#renderContext.restore();
  }

  clear() {
    const { width, height } = this.#canvas;
    this.#renderContext.fillStyle = "#000";
    this.#renderContext.resetTransform();
    this.#renderContext.clearRect(0, 0, width, height);
    this.#renderContext.fillRect(0, 0, width, height);
  }
}
