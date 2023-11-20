import { BaseObject } from "..";

export class Pepe extends BaseObject {
  #img: HTMLImageElement;

  constructor(id: number) {
    super(`pepe-${id}`);
    this.#img = new Image();
    this.#img.src = "/pepe.gif";
    this.transforms.position.x = -100;
    this.transforms.position.y = 0;
    this.transforms.scale.x = 20;
    this.transforms.scale.y = 20;
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
    ctx.transform(1, 0, 0, -1, 0, 2 * this.transforms.position.y);
    ctx.drawImage(
      this.#img,
      this.transforms.position.x - this.transforms.scale.x / 2,
      this.transforms.position.y - this.transforms.scale.y / 2,
      this.transforms.scale.x,
      this.transforms.scale.y
    );
    ctx.closePath();
  }
}
