"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("../computing/Cell");
const GuardTowerSprite_1 = require("../sprite/GuardTowerSprite");
const AbstractShootingBuilding_1 = require("./AbstractShootingBuilding");
class GuardTower extends AbstractShootingBuilding_1.AbstractShootingBuilding {
    create(game, groups) {
        this.sprite = new GuardTowerSprite_1.GuardTowerSprite(game, groups, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Turret');
        super.create(game, groups);
    }
}
exports.GuardTower = GuardTower;
//# sourceMappingURL=GuardTower.js.map