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
    this.#canvas.width = 1920;
    this.#canvas.height = 1080;
    this.#canvas.style.width = "100vw";
    this.#canvas.style.height = "calc(100vw * 9 / 16)";

    this.#camera = camera;
    this.#camera.transforms.scale.x = 100;
    this.#camera.transforms.scale.y =
      (100 * this.#canvas.height) / this.#canvas.width;
  }

  prepare(): boolean {
    this.clear();
    if (!this.#camera) {
      return false;
    }
    const kx = this.#canvas.width / this.#camera.transforms.scale.x;
    const ky = -this.#canvas.height / this.#camera.transforms.scale.y;
    this.#renderContext.setTransform(
      kx,
      0,
      0,
      ky,
      -kx * this.#camera.transforms.position.x + this.#canvas.width / 2,
      -ky * this.#camera.transforms.position.y + this.#canvas.height / 2
    );
    return true;
  }

  render(rt: RenderTarget) {
    rt.render(this.#renderContext);
  }

  clear() {
    const { width, height } = this.#canvas;
    this.#renderContext.fillStyle = "#000";
    this.#renderContext.resetTransform();
    this.#renderContext.clearRect(0, 0, width, height);
    this.#renderContext.fillRect(0, 0, width, height);
  }
}
