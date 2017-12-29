"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("../computing/Cell");
const ConstructableBuilding_1 = require("./ConstructableBuilding");
const PowerPlanSprite_1 = require("../sprite/PowerPlanSprite");
class PowerPlant extends ConstructableBuilding_1.ConstructableBuilding {
    constructor(worldKnowledge, cell, player) {
        super(worldKnowledge, cell, player);
    }
    create(game, group) {
        this.sprite = new PowerPlanSprite_1.PowerPlantSprite(game, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Factory2');
        group.add(this.sprite);
    }
}
exports.PowerPlant = PowerPlant;
//# sourceMappingURL=PowerPlant.js.map