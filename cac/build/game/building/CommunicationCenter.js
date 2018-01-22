"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("../computing/Cell");
const ConstructableBuilding_1 = require("./ConstructableBuilding");
const CommunicationCenterSprite_1 = require("../sprite/CommunicationCenterSprite");
class CommunicationCenter extends ConstructableBuilding_1.ConstructableBuilding {
    constructor(worldKnowledge, cell, player) {
        super(worldKnowledge, cell, player);
    }
    create(game, groups) {
        this.sprite = new CommunicationCenterSprite_1.CommunicationCenterSprite(game, groups, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Silo');
    }
}
exports.CommunicationCenter = CommunicationCenter;
//# sourceMappingURL=CommunicationCenter.js.map