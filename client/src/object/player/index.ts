import { Game } from "@/core/game";
import { BaseObject } from "..";

export class Player extends BaseObject {
  constructor() {
    super("player");
    this.transforms.scale.x = 5;
    this.transforms.scale.y = 5;
  }

  override update(): void {
    if (Game.input.isDown("a")) {
      this.transforms.position.x -= 1;
    }
    if (Game.input.isDown("d")) {
      this.transforms.position.x += 1;
    }
    if (Game.input.isDown("w")) {
      this.transforms.position.y += 1;
    }
    if (Game.input.isDown("s")) {
      this.transforms.position.y -= 1;
    }
  }

  override render(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();

    ctx.fillStyle = "green";
    ctx.ellipse(
      this.transforms.position.x,
      this.transforms.position.y,
      this.transforms.scale.x,
      this.transforms.scale.y,
      0,
      0,
      2 * Math.PI
    );
    ctx.fill();

    ctx.transform(1, 0, 0, -1, 0, 2 * this.transforms.position.y);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "9px Arial";
    ctx.fillText(
      `${this.transforms.position.x}, ${this.transforms.position.y}`,
      this.transforms.position.x,
      this.transforms.position.y
    );

    const fps = 1000 / Game.deltaTime;

    ctx.fillText(
      `fps: ${(fps * 10 - ((fps * 10) % 1)) / 10}`,
      this.transforms.position.x,
      this.transforms.position.y + 15
    );
    ctx.closePath();
  }
}
