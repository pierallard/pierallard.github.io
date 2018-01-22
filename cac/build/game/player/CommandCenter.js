"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnitCreator_1 = require("../creator/UnitCreator");
const BuildingCreator_1 = require("../creator/BuildingCreator");
class CommandCenter {
    constructor(worldKnowledge, player) {
        this.worldKnowledge = worldKnowledge;
        this.player = player;
        this.unitCreator = new UnitCreator_1.UnitCreator(this.worldKnowledge, this.player);
        this.buildingCreator = new BuildingCreator_1.BuildingCreator(this.worldKnowledge, this.player);
    }
    getUnitCreator() {
        return this.unitCreator;
    }
    getBuildingCreator() {
        return this.buildingCreator;
    }
    expand(mcv) {
        if (mcv.getPlayer() === this.player) {
            mcv.orderExpand();
        }
    }
    orderMoveAttack(unit, goal) {
        if (unit.getPlayer() === this.player) {
            unit.orderMoveAttack(goal);
        }
    }
    productBuilding(buildingName) {
        this.buildingCreator.orderProduction(buildingName);
    }
    productUnit(unitName) {
        this.unitCreator.orderProduction(unitName);
    }
    createBuilding(buildingName, cell) {
        if (this.buildingCreator.isProduced(buildingName)) {
            this.buildingCreator.runCreation(buildingName, cell);
        }
    }
}
exports.CommandCenter = CommandCenter;
//# sourceMappingURL=CommandCenter.js.map