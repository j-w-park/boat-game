import { BaseObject } from "..";

export class Camera extends BaseObject {
  constructor() {
    super("camera");
  }

  override update(): void {}

  override render(): void {}

  override lateUpdate(): void {}
}
