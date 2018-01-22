"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuildingSprite_1 = require("./BuildingSprite");
class AdvancedPowerPlantSprite extends BuildingSprite_1.BuildingSprite {
    constructor(game, groups, x, y, key) {
        super(game, groups, x, y, key);
        this.anchor.setTo(1 / 4, 5 / 6);
        this.lifeRectangle.setAnchor(1 / 4, 5 / 6);
        this.selectedRectangle.setAnchor(1 / 4, 5 / 6);
        this.animationElec = this.animations.add('toto', [0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14]);
        this.animationElec.play(10, true, false);
    }
}
exports.AdvancedPowerPlantSprite = AdvancedPowerPlantSprite;
//# sourceMappingURL=AdvancedPowerPlantSprite.js.map