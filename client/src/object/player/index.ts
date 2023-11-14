import { Game } from "@/game";
import { BaseObject } from "..";

export class Player extends BaseObject {
  constructor() {
    super("player");
  }

  update(time: number): void {
    if (Game.input.isDown("a")) {
      this.transform.position.x -= 1;
    }
    if (Game.input.isDown("d")) {
      this.transform.position.x += 1;
    }
    if (Game.input.isDown("w")) {
      this.transform.position.y -= 1;
    }
    if (Game.input.isDown("s")) {
      this.transform.position.y += 1;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.ellipse(
      this.transform.position.x,
      this.transform.position.y,
      20,
      20,
      0,
      0,
      2 * Math.PI
    );
    ctx.stroke();
    ctx.fill();
    // ctx.ellipse(0, 0, 0.1, 0.1, 0, 0, 2 * Math.PI);
  }
}
