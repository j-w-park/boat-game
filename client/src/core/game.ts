import { BaseObject, Player } from "@/object";
import { Input } from "./input";

export class Game {
  #canvas: HTMLCanvasElement;

  #renderContext: CanvasRenderingContext2D;

  #frame: ReturnType<typeof requestAnimationFrame> | null;

  #prevTime: number = 0;

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

    this.#update(0);
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

  #update(time: number) {
    if (time - this.#prevTime > 1000 / 120) {
      Game.deltaTime = time - this.#prevTime;
      this.#prevTime = time;

      Game.#objects.forEach((o) => o.update());

      // TODO: Another updates here (ex. collision, interaction, constraints, etc...)

      // render
      this.#render();

      Game.#objects.forEach((o) => o.lateUpdate());
    }

    // request next frame
    this.#frame = requestAnimationFrame(this.#update.bind(this));
  }

  #render() {
    this.#renderContext.fillStyle = "black";
    this.#renderContext.clearRect(
      0,
      0,
      this.#canvas.width,
      this.#canvas.height
    );
    this.#renderContext.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

    const camera = Game.GetObject("camera");
    if (!camera) {
      return;
    }

    Game.#objects.forEach((o) => o.render(this.#renderContext));
  }

  static deltaTime: number = 0;

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
