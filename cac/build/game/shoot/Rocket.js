"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rotation_1 = require("../computing/Rotation");
const Play_1 = require("../game_state/Play");
const Explosion_1 = require("../sprite/Explosion");
const Distance_1 = require("../computing/Distance");
class Rocket extends Phaser.Sprite {
    static getRocketFrame(rotation) {
        switch (rotation) {
            case Rotation_1.ROTATION.TOP: return 10;
            case Rotation_1.ROTATION.TOP_RIGHT: return 11;
            case Rotation_1.ROTATION.RIGHT: return 23;
            case Rotation_1.ROTATION.BOTTOM_RIGHT: return 35;
            case Rotation_1.ROTATION.BOTTOM: return 34;
            case Rotation_1.ROTATION.BOTTOM_LEFT: return 33;
            case Rotation_1.ROTATION.LEFT: return 21;
            case Rotation_1.ROTATION.TOP_LEFT: return 9;
        }
    }
    static getMuzzleFrame(rotation) {
        switch (rotation) {
            case Rotation_1.ROTATION.TOP: return 32;
            case Rotation_1.ROTATION.TOP_RIGHT: return 1;
            case Rotation_1.ROTATION.RIGHT: return 17;
            case Rotation_1.ROTATION.BOTTOM_RIGHT: return 49;
            case Rotation_1.ROTATION.BOTTOM: return 33;
            case Rotation_1.ROTATION.BOTTOM_LEFT: return 48;
            case Rotation_1.ROTATION.LEFT: return 16;
            case Rotation_1.ROTATION.TOP_LEFT: return 0;
        }
    }
    constructor(group, source, dest) {
        const rotation = Rotation_1.Rotation.getRotation(new Phaser.Point(dest.x - source.x, dest.y - source.y));
        super(group.game, source.x, source.y, 'Bullets', Rocket.getRocketFrame(rotation));
        this.anchor.setTo(0.5, 0.5);
        this.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        group.add(this);
        const startAnim = Rocket.getMuzzleFrame(rotation);
        const muzzle = new Phaser.Sprite(this.game, source.x, source.y, 'Muzzle', startAnim);
        muzzle.anchor.setTo(0.5, 0.8);
        muzzle.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        muzzle.animations.add('', [
            startAnim, startAnim + 2, startAnim + 4, startAnim + 6, startAnim + 8, startAnim + 10, startAnim + 12,
            startAnim + 14,
        ]).play(10, false, true);
        group.add(muzzle);
        this.game.add.tween(this).to({
            x: dest.x,
            y: dest.y,
        }, Distance_1.Distance.to(source, dest) * 4, Phaser.Easing.Default, true).onComplete.add(() => {
            let explosion = new Explosion_1.Explosion(this.game, dest.x, dest.y);
            group.add(explosion);
            this.destroy(true);
        });
    }
}
exports.Rocket = Rocket;
//# sourceMappingURL=Rocket.js.map