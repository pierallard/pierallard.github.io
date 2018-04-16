"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TOP_ORIENTED_ANIMATION = '_reverse';
const FRAME_RATE = 12;
var ANIMATION;
(function (ANIMATION) {
    ANIMATION[ANIMATION["FREEZE"] = 0] = "FREEZE";
    ANIMATION[ANIMATION["WALK"] = 1] = "WALK";
    ANIMATION[ANIMATION["SMOKE"] = 2] = "SMOKE";
    ANIMATION[ANIMATION["SIT_DOWN"] = 3] = "SIT_DOWN";
    ANIMATION[ANIMATION["STAND_UP"] = 4] = "STAND_UP";
    ANIMATION[ANIMATION["TYPE"] = 5] = "TYPE";
    ANIMATION[ANIMATION["TALK"] = 6] = "TALK";
    ANIMATION[ANIMATION["DRINK"] = 7] = "DRINK";
    ANIMATION[ANIMATION["RAGE"] = 8] = "RAGE";
})(ANIMATION = exports.ANIMATION || (exports.ANIMATION = {}));
class HumanAnimationManager {
    create(humanTile) {
        this.humanTile = humanTile;
        HumanAnimationManager.getAnimations().forEach((animation) => {
            if (HumanAnimationManager.hasTopOrientedVariation(animation)) {
                this.humanTile.animations.add(animation + '', HumanAnimationManager.getAnimationFrames(animation, false));
                this.humanTile.animations.add(animation + TOP_ORIENTED_ANIMATION, HumanAnimationManager.getAnimationFrames(animation, true));
            }
            else {
                this.humanTile.animations.add(animation + '', HumanAnimationManager.getAnimationFrames(animation));
            }
        });
    }
    getAnimationName(animation, isTop = null) {
        if (isTop === null) {
            return this.getAnimationName(animation, this.humanTile.animations.name.endsWith(TOP_ORIENTED_ANIMATION));
        }
        return animation + (isTop ? TOP_ORIENTED_ANIMATION : '');
    }
    loadAnimation(animation, isLeft = null, isTop = null) {
        let animationName = animation + '';
        if (HumanAnimationManager.hasTopOrientedVariation(animation)) {
            animationName = this.getAnimationName(animation, isTop);
        }
        if (this.humanTile.animations.name !== animationName) {
            this.humanTile.animations.play(animationName, FRAME_RATE, HumanAnimationManager.isLooped(animation));
        }
        if (isLeft != null) {
            this.humanTile.scale.set(isLeft ? 1 : -1, 1);
        }
    }
    static getAnimationTime(animation) {
        return this.getAnimationFrames(animation).length * Phaser.Timer.SECOND / FRAME_RATE;
    }
    static getAnimationFrames(animation, topOriented = null) {
        switch (animation) {
            case ANIMATION.FREEZE: return topOriented ? [18, 19, 20] : [12, 13, 14];
            case ANIMATION.WALK: return topOriented ? [6, 7, 8, 9, 10, 11] : [0, 1, 2, 3, 4, 5];
            case ANIMATION.SIT_DOWN: return [12, 36, 37, 38, 39];
            case ANIMATION.STAND_UP: return [39, 38, 37, 36, 12];
            case ANIMATION.TYPE: return [42, 43, 44, 45];
            case ANIMATION.TALK: return topOriented ? [54, 55, 56, 57, 58, 59] : [48, 49, 50, 51, 52, 53];
            case ANIMATION.RAGE:
                let rage_frames = [66, 67, 68, 69];
                for (let i = 0; i < 4; i++) {
                    rage_frames = rage_frames.concat([70, 71, 72, 73, 74, 73]);
                }
                return rage_frames.concat([74, 75, 76]);
            case ANIMATION.DRINK:
                return [60, 61, 60, 60, 60, 62, 63, 63, 64, 63, 63, 64, 63, 62, 60, 60, 60, 60, 60, 60, 60];
            case ANIMATION.SMOKE:
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
                return smoke_frames;
            default:
                throw 'UNKNOWN ANIMATION ' + animation;
        }
    }
    static getAnimations() {
        return [
            ANIMATION.FREEZE,
            ANIMATION.WALK,
            ANIMATION.SMOKE,
            ANIMATION.SIT_DOWN,
            ANIMATION.STAND_UP,
            ANIMATION.TYPE,
            ANIMATION.TALK,
            ANIMATION.DRINK,
            ANIMATION.RAGE,
        ];
    }
    static hasTopOrientedVariation(animation) {
        return [ANIMATION.WALK, ANIMATION.FREEZE, ANIMATION.TALK].indexOf(animation) > -1;
    }
    static isLooped(animation) {
        return [
            ANIMATION.FREEZE,
            ANIMATION.WALK,
            ANIMATION.TALK,
            ANIMATION.SMOKE,
            ANIMATION.TYPE,
            ANIMATION.DRINK,
        ].indexOf(animation) > -1;
    }
}
exports.HumanAnimationManager = HumanAnimationManager;
//# sourceMappingURL=HumanAnimationManager.js.map