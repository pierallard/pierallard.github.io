"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = require("../human_stuff/HumanAnimationManager");
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
const MoveThenActAbstractState_1 = require("./MoveThenActAbstractState");
const ThoughtBubble_1 = require("../human_stuff/ThoughtBubble");
const SECOND_MIN = 15 * Phaser.Timer.SECOND;
const SECOND_MAX = 40 * Phaser.Timer.SECOND;
class TypeState extends MoveThenActAbstractState_1.MoveThenActAbstractState {
    start(game) {
        this.objectReferer = this.worldKnowledge.getClosestReferer(['Desk'], 1, this.human.getPosition());
        if (this.objectReferer === null) {
            return false;
        }
        this.typeTime = Phaser.Math.random(SECOND_MIN, SECOND_MAX);
        return super.start(game);
    }
    act() {
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.SIT_DOWN, this.objectReferer.getObject().forceLeftOrientation(this.objectReferer.getIdentifier()));
        this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SIT_DOWN), () => {
            this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.TYPE, this.objectReferer.forceLeftOrientation(), this.objectReferer.forceTopOrientation());
            this.worldKnowledge.addProgress(this.human.getType(), this.typeTime / SECOND_MAX, this.typeTime);
            this.events.push(this.game.time.events.add(this.typeTime, () => {
                this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.STAND_UP);
                this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.STAND_UP) + 100, () => {
                    this.finish();
                }, this));
            }, this));
        }));
    }
    getActTime() {
        return HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SIT_DOWN) +
            this.typeTime +
            HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.STAND_UP) +
            this.human.getWalkDuration();
    }
    getState() {
        return HumanStateManager_1.STATE.TYPE;
    }
    subGetRageImage() {
        return ThoughtBubble_1.RAGE_IMAGE.LAPTOP;
    }
    getRetryState() {
        return new TypeState(this.human, this.worldKnowledge, this.tries + 1);
    }
}
exports.TypeState = TypeState;
//# sourceMappingURL=TypeState.js.map