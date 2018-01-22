"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Stand_1 = require("./Stand");
const AlternativePosition_1 = require("../computing/AlternativePosition");
class MoveTo {
    constructor(worldKnowledge, unit, goal) {
        this.worldKnowledge = worldKnowledge;
        this.unit = unit;
        this.goal = goal;
        this.standUpCounter = 0;
        this.lastPosition = this.unit.getCellPositions()[0];
    }
    getNextStep() {
        if (this.unit.getCellPositions()[0] === this.lastPosition) {
            this.standUpCounter += 1;
        }
        else {
            this.lastPosition = this.unit.getCellPositions()[0];
            this.standUpCounter = 0;
        }
        if (this.isArrived() || this.standUpCounter > 5) {
            return new Stand_1.Stand(this.unit);
        }
        return this;
    }
    run() {
        if (!this.isArrived()) {
            this.unit.moveTowards(this.goal);
        }
    }
    isArrived() {
        return AlternativePosition_1.AlternativePosition.isArrived(this.goal, this.unit.getCellPositions()[0], this.unit.isOnGround() ?
            this.worldKnowledge.isGroundCellAccessible.bind(this.worldKnowledge) :
            this.worldKnowledge.isAerialCellAccessible.bind(this.worldKnowledge));
    }
}
exports.MoveTo = MoveTo;
//# sourceMappingURL=MoveTo.js.map