"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = require("../human_stuff/HumanAnimationManager");
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
const AbstractState_1 = require("./AbstractState");
class FreezeState extends AbstractState_1.AbstractState {
    start(game) {
        super.start(game);
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.FREEZE);
        this.event = game.time.events.add(Phaser.Math.random(1, 2) * Phaser.Timer.SECOND, () => {
            this.active = false;
        }, this);
        return true;
    }
    getState() {
        return HumanStateManager_1.STATE.FREEZE;
    }
}
exports.FreezeState = FreezeState;
//# sourceMappingURL=FreezeState.js.map