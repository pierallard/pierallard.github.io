"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Human_1 = require("./Human");
const TOP_ORIENTED_ANIMATION = '_reverse';
const FRAME_RATE = 12;
class HumanAnimationManager {
    create(humanTile) {
        this.humanTile = humanTile;
        this.humanTile.animations.add(Human_1.ANIMATION.WALK + '', [0, 1, 2, 3, 4, 5]);
        this.humanTile.animations.add(Human_1.ANIMATION.WALK + TOP_ORIENTED_ANIMATION, [6, 7, 8, 9, 10, 11]);
        this.humanTile.animations.add(Human_1.ANIMATION.FREEZE + '', [12, 13, 14]);
        this.humanTile.animations.add(Human_1.ANIMATION.FREEZE + TOP_ORIENTED_ANIMATION, [18, 19, 20]);
        let smoke_frames = [24, 25, 26, 27, 30, 31, 32, 33];
        for (let i = 0; i < 6; i++) {
            // Take smoke length
            smoke_frames.push(33);
        }
        smoke_frames = smoke_frames.concat([32, 31, 30, 27, 26, 25, 24]);
        for (let i = 0; i < 20; i++) {
            // Do nothing length
            smoke_frames.push(24);
        }
        this.humanTile.animations.add(Human_1.ANIMATION.SMOKE + '', smoke_frames);
        this.humanTile.animations.add(Human_1.ANIMATION.SIT_DOWN + '', [12, 36, 37, 38, 39]);
        this.humanTile.animations.add(Human_1.ANIMATION.STAND_UP + '', [39, 38, 37, 36, 12]);
    }
    getAnimationName(animation, isTop = null) {
        if (isTop === null) {
            return this.getAnimationName(animation, this.humanTile.animations.name.endsWith(TOP_ORIENTED_ANIMATION));
        }
        return animation + (isTop ? TOP_ORIENTED_ANIMATION : '');
    }
    loadAnimation(animation, isLeft = null, isTop = null) {
        switch (animation) {
            case Human_1.ANIMATION.FREEZE:
            case Human_1.ANIMATION.WALK:
                const animationName = this.getAnimationName(animation, isTop);
                if (this.humanTile.animations.name !== animationName) {
                    this.humanTile.animations.play(animationName, FRAME_RATE, true);
                }
                if (isLeft != null) {
                    this.humanTile.scale.set(isLeft ? 1 : -1, 1);
                }
                break;
            case Human_1.ANIMATION.SMOKE:
                const animationSmokeName = animation + '';
                if (this.humanTile.animations.name !== animationSmokeName) {
                    this.humanTile.animations.play(animationSmokeName, FRAME_RATE, true);
                }
                break;
            case Human_1.ANIMATION.SIT_DOWN:
            case Human_1.ANIMATION.STAND_UP:
                const animationSitDownName = animation + '';
                if (this.humanTile.animations.name !== animationSitDownName) {
                    this.humanTile.animations.play(animationSitDownName, FRAME_RATE, false);
                }
                break;
            default:
                console.log('UNKNOWN ANIMATION ' + animation);
        }
    }
    getAnimationTime(animation) {
        return this.humanTile.animations.getAnimation(animation + '').frameTotal * Phaser.Timer.SECOND / FRAME_RATE;
    }
}
exports.HumanAnimationManager = HumanAnimationManager;
//# sourceMappingURL=HumanAnimationManager.js.map