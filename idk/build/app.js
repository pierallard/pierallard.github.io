/// <reference path="../lib/phaser.d.ts"/>
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Boot_1 = require("./game/game_state/Boot");
const Preload_1 = require("./game/game_state/Preload");
const Play_1 = require("./game/game_state/Play");
exports.SCALE = 3;
exports.CAMERA_WIDTH_PIXELS = 1280 / exports.SCALE;
exports.CAMERA_HEIGHT_PIXELS = 720 / exports.SCALE;
exports.WORLD_WIDTH = 1280 * 1.1 / exports.SCALE;
exports.WORLD_HEIGHT = 720 * 1.1 / exports.SCALE;
class SimpleGame extends Phaser.Game {
    constructor() {
        super(exports.CAMERA_WIDTH_PIXELS, exports.CAMERA_HEIGHT_PIXELS, Phaser.CANVAS, // Open GL for effect / shader ?
        'content', null, false, false, false);
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