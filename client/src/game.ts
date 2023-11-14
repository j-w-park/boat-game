import { BaseObject, Player } from "./object";
import { Input } from "./utils";

export class Game {
  #canvas: HTMLCanvasElement;

  #renderContext: CanvasRenderingContext2D;

  #frame: ReturnType<typeof requestAnimationFrame> | null;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error(`canvas context not found`);
    }
    this.#canvas = canvas;
    this.#frame = null;
    this.#renderContext = ctx;
  }

  start() {
    this.#canvas.width = 1920;
    this.#canvas.height = 1080;
    this.#canvas.style.width = "100vw";
    this.#canvas.style.height = "calc(100vw * 9 / 16)";

    Game.CreateObject(new Player());

    this.update(0);
  }

  update(time: number) {
    Game.#objects.forEach((object) => object.update(time));

    // TODO: Another updates here (ex. collision, interaction, constraints, etc...)

    // render
    this.#renderContext.fillStyle = "black";
    this.#renderContext.clearRect(
      0,
      0,
      this.#canvas.width,
      this.#canvas.height
    );
    this.#renderContext.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

    Game.#objects.forEach((object) => object.render(this.#renderContext));

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
      this.#renderContext.clearRect(
        0,
        0,
        this.#canvas.width,
        this.#canvas.height
      );
      this.#renderContext.fillRect(
        0,
        0,
        this.#canvas.width,
        this.#canvas.height
      );
    }
  }

  static input: Input = new Input();

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
