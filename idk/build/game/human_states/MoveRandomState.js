"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MoveRandomState {
    constructor(human, world) {
        this.human = human;
        this.goal = world.getGround().getRandomCell();
        while (this.human.getPosition().x === this.goal.x && this.human.getPosition().y === this.goal.y) {
            this.goal = world.getGround().getRandomCell();
        }
    }
    isActive() {
        return this.human.getPosition().x !== this.goal.x ||
            this.human.getPosition().y !== this.goal.y ||
            this.human.isMoving();
    }
    start(game) {
        this.human.moveTo(this.goal);
    }
}
exports.MoveRandomState = MoveRandomState;
//# sourceMappingURL=MoveRandomState.js.map