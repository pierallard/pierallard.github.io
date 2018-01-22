"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("../computing/Cell");
const ConstructableBuilding_1 = require("./ConstructableBuilding");
const AdvancedPowerPlantSprite_1 = require("../sprite/AdvancedPowerPlantSprite");
class AdvancedPowerPlant extends ConstructableBuilding_1.ConstructableBuilding {
    constructor(worldKnowledge, cell, player) {
        super(worldKnowledge, cell, player);
    }
    create(game, groups) {
        this.sprite = new AdvancedPowerPlantSprite_1.AdvancedPowerPlantSprite(game, groups, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Generator');
    }
}
exports.AdvancedPowerPlant = AdvancedPowerPlant;
//# sourceMappingURL=AdvancedPowerPlant.js.map