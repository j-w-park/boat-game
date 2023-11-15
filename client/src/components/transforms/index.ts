import { Vec2 } from "@/utils";

export class Transforms {
  #position: Vec2;
  #rotation: number;
  #scale: Vec2;

  constructor(args?: { position?: Vec2; rotation?: number; scale?: Vec2 }) {
    this.#position = args?.position ?? new Vec2(0, 0);
    this.#rotation = args?.rotation ?? 0;
    this.#scale = args?.scale ?? new Vec2(0, 0);
  }

  get position() {
    return this.#position;
  }
  set position(value) {
    this.#position = new Vec2(value.x, value.y);
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
    this.#scale = new Vec2(value.x, value.y);
  }
}
