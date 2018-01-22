"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rotation_1 = require("../computing/Rotation");
const Play_1 = require("../game_state/Play");
const Explosion_1 = require("../sprite/Explosion");
const Distance_1 = require("../computing/Distance");
class Bullet extends Phaser.Sprite {
    static getBulletFrame(rotation) {
        switch (rotation) {
            case Rotation_1.ROTATION.TOP: return 7;
            case Rotation_1.ROTATION.TOP_RIGHT: return 8;
            case Rotation_1.ROTATION.RIGHT: return 20;
            case Rotation_1.ROTATION.BOTTOM_RIGHT: return 32;
            case Rotation_1.ROTATION.BOTTOM: return 31;
            case Rotation_1.ROTATION.BOTTOM_LEFT: return 30;
            case Rotation_1.ROTATION.LEFT: return 18;
            case Rotation_1.ROTATION.TOP_LEFT: return 6;
        }
    }
    constructor(group, source, dest) {
        const rotation = Rotation_1.Rotation.getRotation(new Phaser.Point(dest.x - source.x, dest.y - source.y));
        super(group.game, source.x, source.y, 'Bullets', Bullet.getBulletFrame(rotation));
        this.anchor.setTo(0.5, 0.5);
        this.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        group.add(this);
        this.game.add.tween(this).to({
            x: dest.x,
            y: dest.y,
        }, Distance_1.Distance.to(source, dest) * 2, Phaser.Easing.Default, true).onComplete.add(() => {
            let explosion = new Explosion_1.Explosion(this.game, dest.x, dest.y);
            group.add(explosion);
            this.destroy(true);
        });
    }
}
exports.Bullet = Bullet;
//# sourceMappingURL=Bullet.js.map