"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = require("./Unit");
const Rotation_1 = require("../computing/Rotation");
const Cell_1 = require("../computing/Cell");
class RocketSoldier extends Unit_1.Unit {
    getShootSource(cellDest) {
        const rotation = Rotation_1.Rotation.getRotation(new Phaser.Point(cellDest.x - this.cellPosition.x, cellDest.y - this.cellPosition.y));
        const angle = rotation / 8 * 2 * Math.PI;
        const dist = 12;
        return new PIXI.Point(Cell_1.Cell.cellToReal(this.cellPosition.x) + Math.cos(angle) * dist, Cell_1.Cell.cellToReal(this.cellPosition.y) - Math.sin(angle) * dist);
    }
}
exports.RocketSoldier = RocketSoldier;
//# sourceMappingURL=RocketSoldier.js.map