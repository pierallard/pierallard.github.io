"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("../computing/Cell");
const ConstructableBuilding_1 = require("./ConstructableBuilding");
const BarracksSprite_1 = require("../sprite/BarracksSprite");
class Barracks extends ConstructableBuilding_1.ConstructableBuilding {
    constructor(worldKnowledge, cell, player) {
        super(worldKnowledge, cell, player);
    }
    create(game, group) {
        this.sprite = new BarracksSprite_1.BarracksSprite(game, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Module');
        group.add(this.sprite);
    }
}
exports.Barracks = Barracks;
//# sourceMappingURL=Barracks.js.map