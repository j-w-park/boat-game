import { Game } from "@/core/game";
import { Vec2 } from "@/utils";
import { BaseObject } from "..";

export class Player extends BaseObject {
  #velocity: Vec2;

  constructor() {
    super("player");
    this.transforms.scale.x = 5;
    this.transforms.scale.y = 5;
    this.#velocity = Vec2.zero;
  }

  override update(): void {
    this.#velocity = Vec2.zero;
    if (Game.input.isDown("a")) {
      this.#velocity.x = -1;
    }
    if (Game.input.isDown("d")) {
      this.#velocity.x = 1;
    }
    if (Game.input.isDown("w")) {
      this.#velocity.y = 1;
    }
    if (Game.input.isDown("s")) {
      this.#velocity.y = -1;
    }
    this.transforms.position = this.transforms.position.add(
      this.#velocity.normalized.scale(100 * Game.deltaTime)
    );
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
    ctx.fill();

    // ctx.transform(1, 0, 0, -1, 0, 2 * this.transforms.position.y);
    // const fps = 1 / Game.deltaTime;
    // ctx.fillStyle = "black";
    // ctx.textAlign = "center";
    // ctx.textBaseline = "middle";
    // ctx.font = "9px Arial";
    // ctx.fillText(
    //   `${Math.round(this.transforms.position.x)}, ${Math.round(
    //     this.transforms.position.y
    //   )}`,
    //   this.transforms.position.x,
    //   this.transforms.position.y
    // );
    // ctx.fillText(
    //   `fps: ${(fps * 10 - ((fps * 10) % 1)) / 10}`,
    //   this.transforms.position.x,
    //   this.transforms.position.y + 15
    // );
  }
}
