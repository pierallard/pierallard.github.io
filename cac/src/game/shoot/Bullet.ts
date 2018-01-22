import {Rotation, ROTATION} from "../computing/Rotation";
import {SCALE} from "../game_state/Play";
import {Explosion} from "../sprite/Explosion";
import {Distance} from "../computing/Distance";

export class Bullet extends Phaser.Sprite {
    private static getBulletFrame(rotation: ROTATION) {
        switch (rotation) {
            case ROTATION.TOP: return 7;
            case ROTATION.TOP_RIGHT: return 8;
            case ROTATION.RIGHT: return 20;
            case ROTATION.BOTTOM_RIGHT: return 32;
            case ROTATION.BOTTOM: return 31;
            case ROTATION.BOTTOM_LEFT: return 30;
            case ROTATION.LEFT: return 18;
            case ROTATION.TOP_LEFT: return 6;
        }
    }

    constructor(group: Phaser.Group, source: PIXI.Point, dest: PIXI.Point) {
        const rotation = Rotation.getRotation(new Phaser.Point(dest.x - source.x, dest.y - source.y));
        super(group.game, source.x, source.y, 'Bullets', Bullet.getBulletFrame(rotation));

        this.anchor.setTo(0.5, 0.5);
        this.scale.setTo(SCALE, SCALE);
        group.add(this);

        this.game.add.tween(this).to({
            x: dest.x,
            y: dest.y,
        }, Distance.to(source, dest) * 2, Phaser.Easing.Default, true).onComplete.add(() => {
            let explosion = new Explosion(this.game, dest.x, dest.y);
            group.add(explosion);
            this.destroy(true);
        });
    }
}
