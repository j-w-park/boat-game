import { BaseObject } from "./object";

export class Game {
  #frame: number | null = null;

  #canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.#canvas = canvas;
  }

  start() {
    const ctx = this.#canvas.getContext("2d");
    if (!ctx) {
      throw new Error(`canvas context not found `);
    }
    ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.update(0);
  }

  update(time: number) {
    // request next frame
    this.#frame = requestAnimationFrame(this.update.bind(this));
  }

  stop() {
    if (this.#frame) {
      cancelAnimationFrame(this.#frame);
    }
  }

  static #objects: BaseObject[] = [];

  static createObject(object: BaseObject) {
    this.#objects.push(object);
  }

  static findObject(name: BaseObject["name"]) {
    return this.#objects.find((o) => o.name === name);
  }
}
