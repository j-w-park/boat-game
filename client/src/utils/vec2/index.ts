export class Vec2 {
  #x: number;
  #y: number;

  constructor(x: number, y: number) {
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }
  set x(value) {
    this.#x = value;
  }

  get y() {
    return this.#y;
  }
  set y(value) {
    this.#y = value;
  }
}
