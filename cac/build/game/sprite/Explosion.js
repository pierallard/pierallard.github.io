"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
const Ground_1 = require("../map/Ground");
class Explosion extends Phaser.Sprite {
    constructor(game, x, y, size = null) {
        super(game, x, y, 'exploBig');
        let explode = this.animations.add('explode');
        explode.play(20, false, true);
        this.anchor.set(0.5, 0.5);
        const scale = size ? size / (Play_1.SCALE * Ground_1.GROUND_SIZE) : Play_1.SCALE / 1.5;
        this.scale.setTo(scale, scale);
    }
}
exports.Explosion = Explosion;
//# sourceMappingURL=Explosion.js.map