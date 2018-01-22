"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("../computing/Cell");
const ConstructableBuilding_1 = require("./ConstructableBuilding");
const TiberiumRefinerySprite_1 = require("../sprite/TiberiumRefinerySprite");
class TiberiumRefinery extends ConstructableBuilding_1.ConstructableBuilding {
    constructor(worldKnowledge, cell, player) {
        super(worldKnowledge, cell, player);
    }
    create(game, groups) {
        this.sprite = new TiberiumRefinerySprite_1.TiberiumRefinerySprite(game, groups, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Factory3');
    }
    runUnloadAnimation() {
        this.sprite.runUnloadAnimation();
    }
}
exports.TiberiumRefinery = TiberiumRefinery;
//# sourceMappingURL=TiberiumRefinery.js.map