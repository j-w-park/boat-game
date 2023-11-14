export class Input {
  #inputs = new Map<string, boolean>();

  constructor() {
    window.addEventListener("keydown", (e) => this.#inputs.set(e.key, true));
    window.addEventListener("keyup", (e) => this.#inputs.set(e.key, false));
  }

  isDown(key: string) {
    return this.#inputs.get(key) ?? false;
  }
}
