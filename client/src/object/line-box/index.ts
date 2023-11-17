import { BaseObject } from "..";

export class LineBox extends BaseObject {
  constructor() {
    super("line-box");
  }

  update(): void {}

  render(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.strokeRect(
      this.transforms.position.x - this.transforms.scale.x / 2,
      this.transforms.position.y - this.transforms.scale.y / 2,
      this.transforms.scale.x,
      this.transforms.scale.y
    );
    ctx.closePath();
  }
}
