import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { Grid } from './grid.js';
import './styles.css';

const app = new PIXI.Application({
  backgroundColor: 0xf5f5f5,
  autoDensity: true,
  antialias: true,
  resizeTo: window
});

const canvas = app.view;
document.body.appendChild(canvas);
globalThis.__PIXI_APP__ = app;

const { width, height } = canvas;

const viewport = new Viewport({
  screenWidth: width,
  screenHeight: height,
  worldWidth: width,
  worldHeight: height,
  events: app.renderer.events
});

app.stage.addChild(viewport);

viewport.drag();
viewport.pinch();
viewport.wheel();
viewport.clampZoom({ minScale: 0.15, maxScale: 2 });

const grid = new Grid(viewport);
grid.draw();
viewport.addChild(grid);

viewport.on('moved', () => { 
  grid.draw();
});

window.addEventListener('resize', () => {
  setTimeout(() => {
    const { width, height } = canvas;
    viewport.resize(width, height, width, height);
    viewport.update();
    grid.draw();
  })
});