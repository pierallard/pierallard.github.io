"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("../computing/Cell");
const ConstructableBuilding_1 = require("./ConstructableBuilding");
const ConstructionYardSprite_1 = require("../sprite/ConstructionYardSprite");
class ConstructionYard extends ConstructableBuilding_1.ConstructableBuilding {
    constructor(worldKnowledge, cellPosition, player) {
        super(worldKnowledge, cellPosition, player);
        this.minerals = 0;
    }
    create(game, group) {
        this.sprite = new ConstructionYardSprite_1.ConstructionYardSprite(game, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Base');
        group.add(this.sprite);
    }
    addMinerals(loading) {
        this.minerals += loading;
    }
}
exports.ConstructionYard = ConstructionYard;
//# sourceMappingURL=ConstructionYard.js.map