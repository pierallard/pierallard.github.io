"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UnitProperties_1 = require("../unit/UnitProperties");
const AbstractUICreator_1 = require("./AbstractUICreator");
const X = 1202;
class UIUnitCreator extends AbstractUICreator_1.AbstractUICreator {
    constructor(worldKnowledge, player) {
        super(worldKnowledge, player, X);
    }
    getConstructableItems() {
        return UnitProperties_1.UnitProperties.getConstructableUnits();
    }
    getSpriteKey(itemName) {
        return UnitProperties_1.UnitProperties.getSprite(itemName, this.player.getId());
    }
    getSpriteLayer(itemName) {
        return UnitProperties_1.UnitProperties.getSpriteLayer(itemName);
    }
    getConstructionTime(itemName) {
        return UnitProperties_1.UnitProperties.getConstructionTime(itemName);
    }
    onProductFinish(itemName) {
        return this.resetButton(itemName);
    }
    onClickFunction(itemName) {
        if (this.player.order().getUnitCreator().isProducing(itemName)) {
            // Do nothing
        }
        else if (this.player.order().getUnitCreator().isAllowed(itemName)) {
            this.player.order().productUnit(itemName);
        }
    }
}
exports.UIUnitCreator = UIUnitCreator;
//# sourceMappingURL=UIUnitCreator.js.map