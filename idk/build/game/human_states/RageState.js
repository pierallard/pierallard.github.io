"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
const HumanAnimationManager_1 = require("../human_stuff/HumanAnimationManager");
class RageState {
    constructor(human) {
        this.human = human;
        this.events = [];
    }
    getNextState() {
        return this.active ? this : null;
    }
    start(game) {
        this.game = game;
        this.active = true;
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.RAGE);
        this.events.push(this.game.time.events.add(HumanAnimationManager_1.HumanAnimationManager.getAnimationTime(HumanAnimationManager_1.ANIMATION.RAGE), () => {
            this.active = false;
        }, this));
        return true;
    }
    stop(game) {
        this.events.forEach((event) => {
            game.time.events.remove(event);
        });
        this.active = false;
    }
    getState() {
        return HumanStateManager_1.STATE.RAGE;
    }
}
exports.RageState = RageState;
//# sourceMappingURL=RageState.js.map