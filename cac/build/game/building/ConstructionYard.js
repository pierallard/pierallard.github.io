"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("../computing/Cell");
const ConstructableBuilding_1 = require("./ConstructableBuilding");
const ConstructionYardSprite_1 = require("../sprite/ConstructionYardSprite");
class ConstructionYard extends ConstructableBuilding_1.ConstructableBuilding {
    create(game, groups) {
        this.sprite = new ConstructionYardSprite_1.ConstructionYardSprite(game, groups, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'MinerAni');
    }
}
exports.ConstructionYard = ConstructionYard;
//# sourceMappingURL=ConstructionYard.js.map