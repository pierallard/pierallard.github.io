"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractShootingBuildingSprite_1 = require("./AbstractShootingBuildingSprite");
class GuardTowerSprite extends AbstractShootingBuildingSprite_1.AbstractShootingBuildingSprite {
    constructor(game, groups, x, y, key) {
        super(game, groups, x, y, key);
        this.anchor.setTo(1 / 4, 3 / 4);
        this.lifeRectangle.setAnchor(1 / 4, 3 / 4);
        this.selectedRectangle.setAnchor(1 / 4, 3 / 4);
    }
}
exports.GuardTowerSprite = GuardTowerSprite;
//# sourceMappingURL=GuardTowerSprite.js.map