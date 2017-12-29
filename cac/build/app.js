/// <reference path="../lib/phaser.d.ts"/>
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Boot_1 = require("./game/game_state/Boot");
const Preload_1 = require("./game/game_state/Preload");
const Play_1 = require("./game/game_state/Play");
exports.GAME_WIDTH = 1600 * 0.8;
exports.GAME_HEIGHT = 900 * 0.8;
class SimpleGame extends Phaser.Game {
    constructor() {
        super(exports.GAME_WIDTH, exports.GAME_HEIGHT, Phaser.AUTO, // Open GL for effect / shader ?
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