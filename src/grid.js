import * as PIXI from 'pixi.js';

const SIZE_MIN = 30;
const SIZE = 80;
const SIZE_MAX = 100;
const CELLS_COUNT = 5;
const LINE_WIDTH = 0.5;
const LINE_COLOR = '0xa9a9a9';

export class Grid extends PIXI.Graphics {
  constructor(viewport) {
    super();
    this.viewport = viewport;
  }

  drawLine(from, to, opacity) {
    const { viewport } = this;
    const scale = viewport.scaled;

    this.lineStyle({
      color: LINE_COLOR,
      width: LINE_WIDTH / scale,
      alpha: opacity
    });

    this.moveTo(from.x, from.y);
    this.lineTo(to.x, to.y);
  }

  drawVertical(coordinate, opacity) {
    const { viewport } = this;
    const { top } = viewport;
    const { bottom } = viewport;

    this.drawLine(
      { x: coordinate, y: top },
      { x: coordinate, y: bottom },
      opacity
    );
  }

  drawHorizontal(coordinate, opacity) {
    const { viewport } = this;
    const { left } = viewport;
    const { right } = viewport;

    this.drawLine(
      { x: left, y: coordinate },
      { x: right, y: coordinate },
      opacity
    );
  }

  draw() {
    this.clear();

    const { viewport } = this;
    const scale = viewport.scaled;
    const offset = { x: -viewport.left, y: -viewport.top };

    let sizeScaled = SIZE * scale;
    while (sizeScaled < SIZE_MIN) { sizeScaled *= CELLS_COUNT; }
    while (sizeScaled > SIZE_MAX) { sizeScaled /= CELLS_COUNT; }

    const countVertical = viewport.screenWidth / sizeScaled;
    const countHorizontal = viewport.screenHeight / sizeScaled;

    const offsetCountVertical = Math.floor(scale * offset.x / sizeScaled);
    const offsetCountHorizontal = Math.floor(scale * offset.y / sizeScaled);

    let opacity = sizeScaled / SIZE;
    if (opacity < 0) { opacity = 0; }
    if (opacity > 1) { opacity = 1; }
    
    for (let i = 0; i < countVertical; i++) {
      this.drawVertical(
        (i - offsetCountVertical) * sizeScaled / scale,
        ((i - offsetCountVertical) % CELLS_COUNT === 0) ? 1 : opacity
      );
    }

    for (let i = 0; i < countHorizontal; i++) {
      this.drawHorizontal(
        (i - offsetCountHorizontal) * sizeScaled / scale,
        ((i - offsetCountHorizontal) % CELLS_COUNT === 0) ? 1 : opacity
      );
    }
  }
}