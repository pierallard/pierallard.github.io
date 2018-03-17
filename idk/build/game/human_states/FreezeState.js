"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Human_1 = require("../Human");
class FreezeState {
    constructor(human) {
        this.human = human;
    }
    isActive() {
        return this.active;
    }
    start(game) {
        game.time.events.add(Phaser.Math.random(1, 3) * Phaser.Timer.SECOND, this.end, this);
        this.active = true;
        this.human.loadAnimation(Human_1.ANIMATION.FREEZE);
    }
    end() {
        this.active = false;
    }
}
exports.FreezeState = FreezeState;
//# sourceMappingURL=FreezeState.js.map