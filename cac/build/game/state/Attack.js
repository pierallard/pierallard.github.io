"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Stand_1 = require("./Stand");
const AlternativePosition_1 = require("../computing/AlternativePosition");
const Distance_1 = require("../computing/Distance");
class Attack {
    constructor(worldKnowledge, unit, goal) {
        this.worldKnowledge = worldKnowledge;
        this.unit = unit;
        this.goal = goal;
    }
    getNextStep() {
        if (this.isArrived() || !this.goal.isAlive()) {
            return new Stand_1.Stand(this.unit);
        }
        return this;
    }
    run() {
        if (!this.goal.isAlive()) {
            return;
        }
        if (this.isAbleToShoot()) {
            this.unit.shoot(this.goal);
        }
        else {
            this.unit.moveTowards(this.goal.getCellPositions()[0]);
        }
    }
    isArrived() {
        return AlternativePosition_1.AlternativePosition.isArrived(this.goal.getCellPositions()[0], this.unit.getCellPositions()[0], this.worldKnowledge.isCellAccessible.bind(this.worldKnowledge));
    }
    isAbleToShoot() {
        return Distance_1.Distance.to(this.unit.getCellPositions(), this.goal.getCellPositions()) < this.unit.getShootDistance();
    }
}
exports.Attack = Attack;
//# sourceMappingURL=Attack.js.map