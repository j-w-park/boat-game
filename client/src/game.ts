import { BaseObject } from "./object";

export class Game {
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
  }

  static #objects: BaseObject[] = [];

  static createObject(object: BaseObject) {
    this.#objects.push(object);
  }

  static findObject(name: BaseObject["name"]) {
    return this.#objects.find((o) => o.name === name);
  }
}
