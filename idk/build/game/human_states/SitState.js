"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = require("../human_stuff/HumanAnimationManager");
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
const MoveThenActAbstractState_1 = require("./MoveThenActAbstractState");
const ThoughtBubble_1 = require("../human_stuff/ThoughtBubble");
class SitState extends MoveThenActAbstractState_1.MoveThenActAbstractState {
    start(game) {
        this.objectReferer = this.worldKnowledge.getClosestReferer(['Sofa', 'Couch'], 1, this.human.getPosition());
        if (this.objectReferer === null) {
            return false;
        }
        this.sitTime = Phaser.Math.random(3, 10) * Phaser.Timer.SECOND;
        return super.start(game);
    }
    act() {
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.SIT_DOWN, this.objectReferer.getObject().forceLeftOrientation(this.objectReferer.getIdentifier()), this.objectReferer.getObject().forceTopOrientation(this.objectReferer.getIdentifier()));
        this.human.updateMoodFromState();
        this.events.push(this.game.time.events.add(this.sitTime + HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SIT_DOWN), () => {
            this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.STAND_UP);
            this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.STAND_UP) + 100, () => {
                this.finish();
            }, this));
        }, this));
    }
    getActTime() {
        return HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SIT_DOWN) +
            this.sitTime +
            HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.STAND_UP) +
            this.human.getWalkDuration();
    }
    getState() {
        return HumanStateManager_1.STATE.SIT;
    }
    getDescription() {
        if (!this.isHumanOnTheRightCell) {
            return super.getDescription();
        }
        else {
            return 'is resting';
        }
    }
    subGetRageImage() {
        return ThoughtBubble_1.RAGE_IMAGE.SLEEP;
    }
    getRetryState() {
        return new SitState(this.human, this.worldKnowledge, this.tries + 1);
    }
}
exports.SitState = SitState;
//# sourceMappingURL=SitState.js.map