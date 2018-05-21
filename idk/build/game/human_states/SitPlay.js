"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MoveThenActAbstractState_1 = require("./MoveThenActAbstractState");
const ThoughtBubble_1 = require("../human_stuff/ThoughtBubble");
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
const HumanAnimationManager_1 = require("../human_stuff/HumanAnimationManager");
class SitPlay extends MoveThenActAbstractState_1.MoveThenActAbstractState {
    start(game) {
        this.objectReferer = this.worldKnowledge.getClosestReferer(['Console'], 1, this.human.getPosition());
        if (this.objectReferer === null) {
            return false;
        }
        this.playTime = Phaser.Math.random(3, 10) * Phaser.Timer.SECOND;
        return super.start(game);
    }
    getState() {
        return HumanStateManager_1.STATE.SIT_PLAY;
    }
    subGetRageImage() {
        return ThoughtBubble_1.RAGE_IMAGE.CONSOLE;
    }
    act() {
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.SIT_DOWN, this.objectReferer.getObject().forceLeftOrientation(this.objectReferer.getIdentifier()), this.objectReferer.getObject().forceTopOrientation(this.objectReferer.getIdentifier()));
        this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SIT_DOWN), () => {
            this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.SIT_FREEZE);
            this.human.updateMoodFromState();
            const console = this.objectReferer.getObject();
            console.addPlayer();
            this.events.push(this.game.time.events.add(this.playTime, () => {
                console.removePlayer();
                this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.STAND_UP);
                this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.STAND_UP) + 100, () => {
                    this.finish();
                }, this));
            }, this));
        }, this));
    }
    getDescription() {
        if (!this.isHumanOnTheRightCell) {
            return super.getDescription();
        }
        else {
            return 'is playing';
        }
    }
    getRetryState() {
        return new SitPlay(this.human, this.worldKnowledge, this.tries + 1);
    }
    getActTime() {
        return HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SIT_FREEZE) +
            this.playTime +
            HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.STAND_UP) +
            this.human.getWalkDuration();
    }
}
exports.SitPlay = SitPlay;
//# sourceMappingURL=SitPlay.js.map