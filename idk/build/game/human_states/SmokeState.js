"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = require("../human_stuff/HumanAnimationManager");
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
const AbstractState_1 = require("./AbstractState");
class SmokeState extends AbstractState_1.AbstractState {
    start(game) {
        super.start(game);
        game.time.events.add(Phaser.Math.random(1, 3) * HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.SMOKE), () => {
            this.active = false;
        }, this);
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.SMOKE);
        this.human.updateMoodFromState();
        return true;
    }
    getState() {
        return HumanStateManager_1.STATE.SMOKE;
    }
}
exports.SmokeState = SmokeState;
//# sourceMappingURL=SmokeState.js.map