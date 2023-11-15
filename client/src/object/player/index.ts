import { Game } from "@/core/game";
import { BaseObject } from "..";

export class Player extends BaseObject {
  constructor() {
    super("player");
    this.transforms.scale.x = 20;
    this.transforms.scale.y = 20;
  }

  override update(): void {
    if (Game.input.isDown("a")) {
      this.transforms.position.x -= 1;
    }
    if (Game.input.isDown("d")) {
      this.transforms.position.x += 1;
    }
    if (Game.input.isDown("w")) {
      this.transforms.position.y -= 1;
    }
    if (Game.input.isDown("s")) {
      this.transforms.position.y += 1;
    }
  }

  override render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.ellipse(
      this.transforms.position.x,
      this.transforms.position.y,
      this.transforms.scale.x,
      this.transforms.scale.y,
      0,
      0,
      2 * Math.PI
    );
    ctx.stroke();
    ctx.fill();
  }
}
