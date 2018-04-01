"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
class MoveRandomState {
    constructor(human, world) {
        this.active = false;
        this.human = human;
        this.goal = world.getGround().getRandomCell();
        while (this.human.getPosition().x === this.goal.x && this.human.getPosition().y === this.goal.y) {
            this.goal = world.getGround().getRandomCell();
        }
    }
    isActive() {
        return this.active && this.human.getPosition().x !== this.goal.x ||
            this.human.getPosition().y !== this.goal.y ||
            this.human.isMoving();
    }
    start(game) {
        this.active = true;
        if (!this.human.moveTo(this.goal)) {
            this.stop(game);
            return false;
        }
        return true;
    }
    stop(game) {
        this.active = false;
    }
    getState() {
        return HumanStateManager_1.STATE.MOVE_RANDOM;
    }
}
exports.MoveRandomState = MoveRandomState;
//# sourceMappingURL=MoveRandomState.js.map