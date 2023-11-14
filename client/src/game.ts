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
      throw new Error(`canvas context not found`);
    }
    ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.update(0);
  }

  update(time: number) {
    const ctx = this.#canvas.getContext("2d");
    if (!ctx) {
      throw new Error(`canvas context not found`);
    }

    Game.#objects.forEach((object) => object.update(time));

    // TODO: Another updates here (ex. collision, interaction, constraints, etc...)

    // re-render
    ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

    Game.#objects.forEach((object) => object.render(ctx));

    // request next frame
    this.#frame = requestAnimationFrame(this.update.bind(this));
  }

  stop() {
    if (this.#frame) {
      cancelAnimationFrame(this.#frame);
      this.#frame = null;

      // clear objects
      Game.#objects.clear();

      // clear canvas
      const ctx = this.#canvas.getContext("2d");
      if (!ctx) {
        throw new Error(`canvas context not found`);
      }
      ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
      ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
    }
  }

  static #objects: Map<BaseObject["name"], BaseObject> = new Map();

  static CreateObject(object: BaseObject) {
    if (this.#objects.has(object.name)) {
      throw new Error(`object name ${object.name} already exists`);
    }
    this.#objects.set(object.name, object);
  }

  static DeleteObject(name: BaseObject["name"]) {
    return this.#objects.delete(name);
  }

  static GetObject(name: BaseObject["name"]) {
    return this.#objects.get(name);
  }
}
