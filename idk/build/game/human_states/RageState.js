"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
const HumanAnimationManager_1 = require("../human_stuff/HumanAnimationManager");
const AbstractState_1 = require("./AbstractState");
class RageState extends AbstractState_1.AbstractState {
    constructor(human, rageImage) {
        super(human);
        this.rageImage = rageImage;
        this.isRaging = false;
    }
    getNextState() {
        if (!this.isRaging && !this.human.isMoving()) {
            this.isRaging = true;
            this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.RAGE);
            this.human.updateMoodFromState();
            this.human.showThoughtBubble(this.rageImage);
            this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.RAGE), () => {
                this.active = false;
                this.human.hideThoughtBubble();
            }, this));
        }
        return super.getNextState();
    }
    getState() {
        return HumanStateManager_1.STATE.RAGE;
    }
    getRageImage() {
        return this.rageImage;
    }
}
exports.RageState = RageState;
//# sourceMappingURL=RageState.js.map