import { Transforms } from "@/components";

export interface RenderTarget {
  get transforms(): Transforms;

  render(ctx: CanvasRenderingContext2D): void;
}
