import { BaseObject, Player } from "@/object";
import { Camera } from "@/object/camera";
import { Vec2 } from "@/utils";
import { Input } from "./input";
import { Renderer } from "./renderer";

export class Game {
  #renderer: Renderer;

  #frame: ReturnType<typeof requestAnimationFrame> | null;

  #prevTime: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.#renderer = new Renderer(canvas);
    this.#frame = null;
  }

  start() {
    const playerObject = new Player();
    const cameraObject = new Camera({
      scale: new Vec2(100, 100),
      target: playerObject,
    });
    Game.CreateObject(cameraObject);
    Game.CreateObject(playerObject);
    this.#renderer.init(cameraObject);
    this.#update(0);
  }

  stop() {
    if (this.#frame === null) {
      return;
    }
    cancelAnimationFrame(this.#frame);
    this.#frame = null;
    Game.#objects.clear();
    this.#renderer.clear();
  }

  #update(time: number) {
    if (time - this.#prevTime > 1000 / 120) {
      Game.deltaTime = time - this.#prevTime;
      this.#prevTime = time;

      Game.#objects.forEach((o) => o.update());

      // TODO: Another updates here (ex. collision, interaction, constraints, etc...)

      if (this.#renderer.prepare()) {
        Game.#objects.forEach((o) => this.#renderer.render(o));
      }

      Game.#objects.forEach((o) => o.lateUpdate());
    }

    // request next frame
    this.#frame = requestAnimationFrame(this.#update.bind(this));
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
