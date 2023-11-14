import { Vec2 } from "@/utils";

export class Transforms {
  #position: Vec2;
  #rotation: number;
  #scale: Vec2;

  constructor(args: { position: Vec2; rotation: number; scale: Vec2 }) {
    this.#position = args.position;
    this.#rotation = args.rotation;
    this.#scale = args.scale;
  }

  get position() {
    return this.#position;
  }
  set position(value) {
    this.#position = value;
  }

  get rotation() {
    return this.#rotation;
  }
  set rotation(value) {
    this.#rotation = value;
  }

  get scale() {
    return this.#scale;
  }
  set scale(value) {
    this.#scale = value;
  }
}
