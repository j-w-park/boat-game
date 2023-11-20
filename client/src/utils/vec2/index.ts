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

  get magnitude() {
    return Math.sqrt(this.#x * this.#x + this.#y * this.#y);
  }

  get normalized() {
    if (this.magnitude === 0) {
      return Vec2.zero;
    }
    return new Vec2(this.#x / this.magnitude, this.#y / this.magnitude);
  }

  get angle() {
    return Math.atan2(this.#y, this.#x);
  }

  scale(k: number) {
    return new Vec2(this.#x * k, this.#y * k);
  }

  add(other: Vec2) {
    return new Vec2(this.#x + other.x, this.#y + other.y);
  }

  sub(other: Vec2) {
    return new Vec2(this.#x - other.x, this.#y - other.y);
  }

  dot(other: Vec2) {
    return this.#x * other.x + this.#y * other.y;
  }

  static get zero() {
    return new Vec2(0, 0);
  }

  static get one() {
    return new Vec2(1, 1);
  }

  static get up() {
    return new Vec2(0, 1);
  }

  static get right() {
    return new Vec2(1, 0);
  }
}
