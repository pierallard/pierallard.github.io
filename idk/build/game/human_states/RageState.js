"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
const HumanAnimationManager_1 = require("../human_stuff/HumanAnimationManager");
const AbstractState_1 = require("./AbstractState");
class RageState extends AbstractState_1.AbstractState {
    start(game) {
        super.start(game);
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.RAGE);
        this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.RAGE), () => {
            this.active = false;
        }, this));
        return true;
    }
    getState() {
        return HumanStateManager_1.STATE.RAGE;
    }
}
exports.RageState = RageState;
//# sourceMappingURL=RageState.js.map