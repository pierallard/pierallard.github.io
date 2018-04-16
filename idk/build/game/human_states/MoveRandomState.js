"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
class MoveRandomState {
    constructor(human, worldKnowledge) {
        this.active = false;
        this.human = human;
        this.goal = worldKnowledge.getRandomCell();
        while (this.human.getPosition().x === this.goal.x && this.human.getPosition().y === this.goal.y) {
            this.goal = worldKnowledge.getRandomCell();
        }
    }
    getNextState() {
        return (this.active && this.human.getPosition().x !== this.goal.x ||
            this.human.getPosition().y !== this.goal.y ||
            this.human.isMoving()) ? this : null;
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