"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("../computing/Cell");
const AbstractShootingBuilding_1 = require("./AbstractShootingBuilding");
const AdvancedGuardTowerSprite_1 = require("../sprite/AdvancedGuardTowerSprite");
class AdvancedGuardTower extends AbstractShootingBuilding_1.AbstractShootingBuilding {
    create(game, groups) {
        this.sprite = new AdvancedGuardTowerSprite_1.AdvancedGuardTowerSprite(game, groups, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Artilery2');
        super.create(game, groups);
    }
}
exports.AdvancedGuardTower = AdvancedGuardTower;
//# sourceMappingURL=AdvancedGuardTower.js.map