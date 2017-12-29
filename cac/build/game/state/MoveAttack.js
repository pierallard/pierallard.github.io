"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Stand_1 = require("./Stand");
const AlternativePosition_1 = require("../computing/AlternativePosition");
class MoveAttack {
    constructor(worldKnowledge, unit, goal) {
        this.worldKnowledge = worldKnowledge;
        this.unit = unit;
        this.goal = goal;
    }
    getNextStep() {
        if (this.isArrived()) {
            return new Stand_1.Stand(this.unit);
        }
        return this;
    }
    run() {
        const shootable = this.unit.getClosestShootable();
        if (shootable) {
            this.unit.shoot(shootable);
        }
        else {
            this.unit.moveTowards(this.goal);
        }
    }
    isArrived() {
        return AlternativePosition_1.AlternativePosition.isArrived(this.goal, this.unit.getCellPositions()[0], this.worldKnowledge.isCellAccessible.bind(this.worldKnowledge));
    }
}
exports.MoveAttack = MoveAttack;
//# sourceMappingURL=MoveAttack.js.map