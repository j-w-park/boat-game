import { Transforms } from "@/components";
import { Vec2 } from "@/utils";

export abstract class BaseObject {
  /** 오브젝트 식별자, 중복 X */
  #name: string;

  #transforms: Transforms = new Transforms({
    position: new Vec2(0, 0),
    rotation: 0,
    scale: new Vec2(1, 1),
  });

  constructor(name: string) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get transforms() {
    return this.#transforms;
  }

  abstract update(time: number): void;

  abstract render(ctx: CanvasRenderingContext2D): void;
}
