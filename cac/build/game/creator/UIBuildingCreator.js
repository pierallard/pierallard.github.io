"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractUICreator_1 = require("./AbstractUICreator");
const BuildingProperties_1 = require("../building/BuildingProperties");
const X = 1202 - 66;
class UIBuildingCreator extends AbstractUICreator_1.AbstractUICreator {
    constructor(worldKnowledge, player, buildingPositioner) {
        super(worldKnowledge, player, X);
        this.buildingPositioner = buildingPositioner;
    }
    getPossibleButtons() {
        return this.worldKnowledge.getPlayerAllowedBuildings(this.player);
    }
    getSpriteKey(itemName) {
        return BuildingProperties_1.BuildingProperties.getSpriteKey(itemName);
    }
    getSpriteLayer(itemName) {
        return BuildingProperties_1.BuildingProperties.getSpriteLayer(itemName);
    }
    onClickFunction(itemName) {
        if (this.worldKnowledge.isBuildingProduced(this.player, itemName)) {
            this.buildingPositioner.activate(itemName);
        }
        else {
            this.worldKnowledge.productBuilding(this.player, itemName);
        }
    }
    onRightClickFunction(itemName) {
        if (this.worldKnowledge.isBuildingProducing(this.player, itemName)) {
            if (this.worldKnowledge.isBuildingHold(this.player, itemName)) {
                this.worldKnowledge.cancelBuilding(this.player, itemName);
            }
            else {
                this.worldKnowledge.holdBuilding(this.player, itemName);
            }
        }
    }
    getProductionStatus() {
        return this.worldKnowledge.getBuildingProductionStatus(this.player);
    }
    canProduct(itemName) {
        return this.worldKnowledge.canProductBuilding(this.player, itemName);
    }
}
exports.UIBuildingCreator = UIBuildingCreator;
//# sourceMappingURL=UIBuildingCreator.js.map