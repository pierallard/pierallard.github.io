"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
const Rotation_1 = require("../computing/Rotation");
class Shoot extends Phaser.Sprite {
    static getStartFrame(rotation) {
        switch (rotation) {
            case Rotation_1.ROTATION.TOP: return 8;
            case Rotation_1.ROTATION.TOP_RIGHT: return 34;
            case Rotation_1.ROTATION.RIGHT: return 42;
            case Rotation_1.ROTATION.BOTTOM_RIGHT: return 0;
            case Rotation_1.ROTATION.BOTTOM: return 12;
            case Rotation_1.ROTATION.BOTTOM_LEFT: return 4;
            case Rotation_1.ROTATION.LEFT: return 38;
            case Rotation_1.ROTATION.TOP_LEFT: return 30;
        }
    }
    static getAnchor(rotation) {
        switch (rotation) {
            case Rotation_1.ROTATION.TOP: return [0, 1];
            case Rotation_1.ROTATION.TOP_RIGHT: return [0.7, 0.7];
            case Rotation_1.ROTATION.RIGHT: return [1, 0];
            case Rotation_1.ROTATION.BOTTOM_RIGHT: return [0.7, -0.7];
            case Rotation_1.ROTATION.BOTTOM: return [0, -1];
            case Rotation_1.ROTATION.BOTTOM_LEFT: return [-0.7, -0.7];
            case Rotation_1.ROTATION.LEFT: return [-1, 0];
            case Rotation_1.ROTATION.TOP_LEFT: return [-0.7, 0.7];
        }
    }
    constructor(game, x, y, rotation) {
        super(game, x, y, 'ArtlFlsh');
        this.firstFrame = Shoot.getStartFrame(rotation);
        let explode = this.animations.add('explode');
        explode.play(10, false, true);
        explode.setFrame(this.firstFrame);
        explode.enableUpdate = true;
        explode.onUpdate.add(() => {
            if (explode.currentFrame.index >= this.firstFrame + 3) {
                explode.stop();
                explode.destroy();
            }
        });
        this.anchor.set(0.5 - Shoot.getAnchor(rotation)[0] * 0.5, 0.5 + Shoot.getAnchor(rotation)[1] * 0.5);
        this.scale.setTo(Play_1.SCALE, Play_1.SCALE);
    }
}
exports.Shoot = Shoot;
//# sourceMappingURL=Shoot.js.map