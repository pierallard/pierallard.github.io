"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractUICreator_1 = require("./AbstractUICreator");
const BuildingProperties_1 = require("../building/BuildingProperties");
const X = 1202 - 66;
class UIBuildingCreator extends AbstractUICreator_1.AbstractUICreator {
    constructor(worldKnowledge, player, buildingPositionner) {
        super(worldKnowledge, player, X);
        this.buildingPositioner = buildingPositionner;
    }
    getConstructableItems() {
        return BuildingProperties_1.BuildingProperties.getConstructableBuildings();
    }
    getSpriteKey(itemName) {
        return BuildingProperties_1.BuildingProperties.getSpriteKey(itemName);
    }
    getSpriteLayer(itemName) {
        return BuildingProperties_1.BuildingProperties.getSpriteLayer(itemName);
    }
    getConstructionTime(itemName) {
        return BuildingProperties_1.BuildingProperties.getConstructionTime(itemName);
    }
    onProductFinish(itemName) {
        return this.setPendingButton(itemName);
    }
    onClickFunction(itemName) {
        if (this.player.order().getBuildingCreator().isProduced(itemName)) {
            this.buildingPositioner.activate(this.player.order().getBuildingCreator(), itemName);
        }
        else if (this.player.order().getBuildingCreator().isProducing(itemName)) {
            // Do nothing
        }
        else if (this.player.order().getBuildingCreator().isAllowed(itemName)) {
            this.player.order().productBuilding(itemName);
        }
    }
}
exports.UIBuildingCreator = UIBuildingCreator;
//# sourceMappingURL=UIBuildingCreator.js.map