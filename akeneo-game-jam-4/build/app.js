/// <reference path="../lib/phaser.d.ts"/>
/// <reference path="../lib/beepbox_synth.d.ts"/>
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Boot_1 = require("./game/state/Boot");
const Preload_1 = require("./game/state/Preload");
const Play_1 = require("./game/state/Play");
class SimpleGame extends Phaser.Game {
    constructor() {
        super(SimpleGame.WIDTH, SimpleGame.HEIGHT, Phaser.CANVAS, 'content', null, false, false);
        this.state.add('Boot', Boot_1.default);
        this.state.add('Preload', Preload_1.default);
        this.state.add('Play', Play_1.default);
        this.state.start('Boot');
    }
}
SimpleGame.WIDTH = 800;
SimpleGame.HEIGHT = 456;
SimpleGame.SCALE = 4;
exports.SimpleGame = SimpleGame;
window.onload = () => {
    new SimpleGame();
};
//# sourceMappingURL=app.js.map