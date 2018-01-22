"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("../computing/Cell");
const ConstructableBuilding_1 = require("./ConstructableBuilding");
const WeaponsFactorySprite_1 = require("../sprite/WeaponsFactorySprite");
class WeaponsFactory extends ConstructableBuilding_1.ConstructableBuilding {
    create(game, groups) {
        this.sprite = new WeaponsFactorySprite_1.WeaponsFactorySprite(game, groups, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Base');
    }
}
exports.WeaponsFactory = WeaponsFactory;
//# sourceMappingURL=WeaponsFactory.js.map