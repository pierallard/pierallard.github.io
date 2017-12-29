"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
class Explosion extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'exploBig');
        let explode = this.animations.add('explode');
        explode.play(20, false, true);
        this.anchor.set(0.5, 0.5);
        this.scale.setTo(Play_1.SCALE / 1.5, Play_1.SCALE / 1.5);
    }
}
exports.Explosion = Explosion;
//# sourceMappingURL=Explosion.js.map