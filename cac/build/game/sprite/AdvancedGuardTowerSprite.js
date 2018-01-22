"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractShootingBuildingSprite_1 = require("./AbstractShootingBuildingSprite");
class AdvancedGuardTowerSprite extends AbstractShootingBuildingSprite_1.AbstractShootingBuildingSprite {
    constructor(game, groups, x, y, key) {
        super(game, groups, x, y, key);
        this.loadTexture(this.key, 4);
        this.anchor.setTo(3 / 8, 5 / 6);
        this.lifeRectangle.setAnchor(3 / 8, 5 / 6);
        this.selectedRectangle.setAnchor(3 / 8, 5 / 6);
    }
}
exports.AdvancedGuardTowerSprite = AdvancedGuardTowerSprite;
//# sourceMappingURL=AdvancedGuardTowerSprite.js.map