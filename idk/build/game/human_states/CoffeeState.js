"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
const HumanAnimationManager_1 = require("../human_stuff/HumanAnimationManager");
const MoveThenActAbstractState_1 = require("./MoveThenActAbstractState");
const ThoughtBubble_1 = require("../human_stuff/ThoughtBubble");
class CoffeeState extends MoveThenActAbstractState_1.MoveThenActAbstractState {
    start(game) {
        this.objectReferer = this.worldKnowledge.getClosestReferer(['Dispenser'], 1, this.human.getPosition());
        if (this.objectReferer === null) {
            return false;
        }
        this.drinkTime = Math.floor(Phaser.Math.random(2, 4)) * HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.DRINK);
        return super.start(game);
    }
    act() {
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.DRINK);
        this.human.updateMoodFromState();
        this.events.push(this.game.time.events.add(this.drinkTime, () => {
            this.finish();
        }, this));
    }
    getActTime() {
        return this.drinkTime + this.human.getWalkDuration();
    }
    getState() {
        return HumanStateManager_1.STATE.COFFEE;
    }
    getDescription() {
        if (!this.isHumanOnTheRightCell) {
            return super.getDescription();
        }
        else {
            return 'Takes a coffee';
        }
    }
    subGetRageImage() {
        return ThoughtBubble_1.RAGE_IMAGE.COFFEE;
    }
    getRetryState() {
        return new CoffeeState(this.human, this.worldKnowledge, this.tries + 1);
    }
}
exports.CoffeeState = CoffeeState;
//# sourceMappingURL=CoffeeState.js.map