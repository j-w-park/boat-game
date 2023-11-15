import { Transforms } from "@/components";
import { RenderTarget } from "@/core/renderer";

export abstract class BaseObject implements RenderTarget {
  /** 오브젝트 식별자, 중복 X */
  #name: string;

  #transforms: Transforms;

  constructor(name: string) {
    this.#name = name;
    this.#transforms = new Transforms();
  }

  get name() {
    return this.#name;
  }

  get transforms() {
    return this.#transforms;
  }

  abstract update(): void;

  abstract render(ctx: CanvasRenderingContext2D): void;

  lateUpdate(): void {}
}
