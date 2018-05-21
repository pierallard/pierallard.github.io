"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
const HumanAnimationManager_1 = require("../human_stuff/HumanAnimationManager");
const AbstractState_1 = require("./AbstractState");
class RageState extends AbstractState_1.AbstractState {
    constructor(human, sourceState) {
        super(human);
        this.sourceState = sourceState;
        this.isRaging = false;
    }
    getNextState() {
        if (!this.isRaging && !this.human.isMoving()) {
            this.isRaging = true;
            if (this.human.getMood() < 0.5) {
                this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.RAGE);
            }
            else {
                this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.FREEZE);
            }
            this.human.updateMoodFromState();
            const time = HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.RAGE) + 3 * Phaser.Timer.SECOND;
            this.human.showThoughtBubble(this.sourceState.getRageImage());
            this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.RAGE), () => {
                this.human.hideThoughtBubble();
                this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.FREEZE);
                this.events.push(this.game.time.events.add(3 * Phaser.Timer.SECOND, () => {
                    this.active = false;
                }, this));
            }, this));
        }
        return super.getNextState();
    }
    getDescription() {
        return "Can't do what he wants!";
    }
    getState() {
        return HumanStateManager_1.STATE.RAGE;
    }
    getRageImage() {
        return this.sourceState.getRageImage();
    }
    getSourceState() {
        return this.sourceState;
    }
    stop() {
        this.human.hideThoughtBubble();
        super.stop();
    }
}
exports.RageState = RageState;
//# sourceMappingURL=RageState.js.map