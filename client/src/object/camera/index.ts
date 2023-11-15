import { BaseObject } from "..";

export class Camera extends BaseObject {
  #target: BaseObject;

  #aspectRatio: number = 0;

  #height: number = 0;

  constructor(args: { target: BaseObject }) {
    super("camera");
    this.#target = args.target;
  }

  set aspectRatio(value: number) {
    this.#aspectRatio = value;
    this.#updateScale();
  }

  set height(value: number) {
    this.#height = value;
    this.#updateScale();
  }

  #updateScale() {
    this.transforms.scale.x = this.#height * this.#aspectRatio;
    this.transforms.scale.y = this.#height;
  }

  override update(): void {}

  override render(): void {}

  override lateUpdate(): void {
    this.transforms.position = this.#target.transforms.position;
  }
}
