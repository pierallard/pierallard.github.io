"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuildingSprite_1 = require("./BuildingSprite");
class WeaponsFactorySprite extends BuildingSprite_1.BuildingSprite {
    constructor(game, groups, x, y, key) {
        super(game, groups, x, y, key);
        this.anchor.setTo(1 / 6, 5 / 6);
        this.lifeRectangle.setAnchor(1 / 6, 5 / 6);
        this.selectedRectangle.setAnchor(1 / 6, 5 / 6);
        let animationOpen = this.animations.add('toto', [5, 6, 7]);
        animationOpen.play(10, true, false);
    }
}
exports.WeaponsFactorySprite = WeaponsFactorySprite;
//# sourceMappingURL=WeaponsFactorySprite.js.map