import { Vec2 } from "@/utils";
import { BaseObject } from "..";

export class Camera extends BaseObject {
  #size: Vec2;

  constructor(args: { size: Vec2 }) {
    super("camera");

    this.#size = args.size;
  }

  override update(): void {}

  override render(): void {}

  override lateUpdate(): void {}
}
