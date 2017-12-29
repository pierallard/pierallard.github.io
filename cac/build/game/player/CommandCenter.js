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
        if (this.buildingCreator.isAllowed(buildingName) && !this.buildingCreator.isProducing(buildingName)) {
            this.buildingCreator.runProduction(buildingName);
        }
    }
    createBuilding(buildingName, cell) {
        if (this.buildingCreator.isProduced(buildingName)) {
            this.buildingCreator.runCreation(buildingName, cell);
        }
    }
    getBuildingCreator() {
        return this.buildingCreator;
    }
    getUnitCreator() {
        return this.unitCreator;
    }
    updateAllowedUnitsAndBuildings() {
        this.unitCreator.updateAllowedItems();
        this.buildingCreator.updateAllowedItems();
    }
    productUnit(unitName) {
        if (this.unitCreator.isAllowed(unitName) && !this.unitCreator.isProducing(unitName)) {
            this.unitCreator.runProduction(unitName);
        }
    }
}
exports.CommandCenter = CommandCenter;
//# sourceMappingURL=CommandCenter.js.map