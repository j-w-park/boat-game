import { Transforms } from "@/components";
import { Vec2 } from "@/utils";

export abstract class BaseObject {
  /** 오브젝트 식별자, 중복 X */
  #name: string;

  #transform: Transforms = new Transforms(new Vec2(0, 0), 0, 1);

  constructor(name: string) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get transform() {
    return this.#transform;
  }

  abstract render(ctx: CanvasRenderingContext2D): void;
}
