"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanAnimationManager_1 = require("../human_stuff/HumanAnimationManager");
class SmokeState {
    constructor(human, timeLoop) {
        this.human = human;
        this.timeLoop = timeLoop;
    }
    isActive() {
        return this.active;
    }
    start(game) {
        game.time.events.add(Phaser.Math.random(1, 3) * this.timeLoop, this.end, this);
        this.active = true;
        this.human.loadAnimation(HumanAnimationManager_1.ANIMATION.SMOKE);
    }
    end() {
        this.active = false;
    }
}
exports.SmokeState = SmokeState;
//# sourceMappingURL=SmokeState.js.map