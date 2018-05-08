/// <reference path="../lib/phaser.d.ts"/>
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Boot_1 = require("./game/game_state/Boot");
const Preload_1 = require("./game/game_state/Preload");
const Play_1 = require("./game/game_state/Play");
const PositionTransformer_1 = require("./game/PositionTransformer");
const WorldKnowledge_1 = require("./game/WorldKnowledge");
exports.SCALE = 2;
const CANVAS_WIDTH = 1500;
const CANVAS_HEIGHT = 650;
exports.CAMERA_WIDTH_PIXELS = CANVAS_WIDTH / exports.SCALE;
exports.CAMERA_HEIGHT_PIXELS = CANVAS_HEIGHT / exports.SCALE;
exports.WORLD_WIDTH = WorldKnowledge_1.GRID_WIDTH * PositionTransformer_1.CELL_WIDTH / 2 + WorldKnowledge_1.GRID_HEIGHT * PositionTransformer_1.CELL_WIDTH / 2;
exports.WORLD_HEIGHT = WorldKnowledge_1.GRID_WIDTH * PositionTransformer_1.CELL_HEIGHT / 2 + WorldKnowledge_1.GRID_HEIGHT * PositionTransformer_1.CELL_HEIGHT / 2 + 15;
class SimpleGame extends Phaser.Game {
    constructor() {
        super({
            width: exports.CAMERA_WIDTH_PIXELS,
            height: exports.CAMERA_HEIGHT_PIXELS,
            renderer: Phaser.CANVAS,
            parent: null,
            state: 'content',
            transparent: false,
            antialias: false,
            physicsConfig: false,
        });
        this.antialias = false;
        this.state.add('Boot', Boot_1.default);
        this.state.add('Preload', Preload_1.default);
        this.state.add('Play', Play_1.default);
        this.state.start('Boot');
    }
}
window.onload = () => {
    new SimpleGame();
};
//# sourceMappingURL=app.js.map