"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("../computing/Cell");
const ConstructableBuilding_1 = require("./ConstructableBuilding");
const PowerPlantSprite_1 = require("../sprite/PowerPlantSprite");
class PowerPlant extends ConstructableBuilding_1.ConstructableBuilding {
    constructor(worldKnowledge, cell, player) {
        super(worldKnowledge, cell, player);
    }
    create(game, groups) {
        this.sprite = new PowerPlantSprite_1.PowerPlantSprite(game, groups, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Factory2');
    }
}
exports.PowerPlant = PowerPlant;
//# sourceMappingURL=PowerPlant.js.map