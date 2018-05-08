"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
const AbstractState_1 = require("./AbstractState");
const ThoughtBubble_1 = require("../human_stuff/ThoughtBubble");
class MoveRandomState extends AbstractState_1.AbstractState {
    constructor(human, worldKnowledge) {
        super(human);
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
        super.start(game);
        if (!this.human.moveTo(this.goal)) {
            this.startTimer(this.human.getMoveTime());
            this.stop();
            return false;
        }
        return true;
    }
    getState() {
        return HumanStateManager_1.STATE.MOVE_RANDOM;
    }
    getRageImage() {
        return ThoughtBubble_1.RAGE_IMAGE.PATH;
    }
}
exports.MoveRandomState = MoveRandomState;
//# sourceMappingURL=MoveRandomState.js.map