import { Vec2 } from "@/utils";

export class Transforms {
  #position: Vec2;
  #rotation: number;
  #scale: number;

  constructor(position: Vec2, rotation: number, scale: number) {
    this.#position = position;
    this.#rotation = rotation;
    this.#scale = scale;
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
