"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnitProperties_1 = require("../unit/UnitProperties");
const AbstractUICreator_1 = require("./AbstractUICreator");
const X = 1202;
class UIUnitCreator extends AbstractUICreator_1.AbstractUICreator {
    constructor(worldKnowledge, player) {
        super(worldKnowledge, player, X);
    }
    getPossibleButtons() {
        return this.worldKnowledge.getPlayerAllowedUnits(this.player);
    }
    getSpriteKey(itemName) {
        return UnitProperties_1.UnitProperties.getSprite(itemName, this.player.getId());
    }
    getSpriteLayer(itemName) {
        return UnitProperties_1.UnitProperties.getSpriteLayer(itemName);
    }
    onClickFunction(itemName) {
        this.worldKnowledge.productUnit(this.player, itemName);
    }
    getProductionStatus() {
        return this.worldKnowledge.getUnitProductionStatus(this.player);
    }
    canProduct(itemName) {
        return this.worldKnowledge.canProductUnit(this.player, itemName);
    }
    onRightClickFunction(itemName) {
        if (this.worldKnowledge.isUnitProducing(this.player, itemName)) {
            if (this.worldKnowledge.isUnitHold(this.player, itemName)) {
                this.worldKnowledge.cancelUnit(this.player, itemName);
            }
            else {
                this.worldKnowledge.holdUnit(this.player, itemName);
            }
        }
    }
}
exports.UIUnitCreator = UIUnitCreator;
//# sourceMappingURL=UIUnitCreator.js.map