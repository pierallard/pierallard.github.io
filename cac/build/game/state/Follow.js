"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AlternativePosition_1 = require("../computing/AlternativePosition");
class Follow {
    constructor(worldKnowledge, unit, goal) {
        this.worldKnowledge = worldKnowledge;
        this.unit = unit;
        this.goal = goal;
    }
    getNextStep() {
        return this;
    }
    run() {
        if (!this.isArrived()) {
            this.unit.moveTowards(this.goal.getCellPositions()[0]);
        }
    }
    isArrived() {
        return AlternativePosition_1.AlternativePosition.isArrived(this.goal.getCellPositions()[0], this.unit.getCellPositions()[0], this.worldKnowledge.isCellAccessible.bind(this.worldKnowledge));
    }
}
exports.Follow = Follow;
//# sourceMappingURL=Follow.js.map