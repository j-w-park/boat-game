import { Vec2 } from "@/utils";
import { BaseObject } from "..";

export class Camera extends BaseObject {
  #target: BaseObject;

  constructor(args: { scale: Vec2; target: BaseObject }) {
    super("camera");
    this.transforms.scale = args.scale;
    this.#target = args.target;
  }

  override update(): void {}

  override render(): void {}

  override lateUpdate(): void {}
}
