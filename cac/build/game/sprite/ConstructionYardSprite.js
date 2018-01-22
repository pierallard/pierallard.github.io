"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuildingSprite_1 = require("./BuildingSprite");
class ConstructionYardSprite extends BuildingSprite_1.BuildingSprite {
    constructor(game, groups, x, y, key) {
        super(game, groups, x, y, key);
        this.anchor.setTo(1 / 4, 5 / 6);
        this.lifeRectangle.setAnchor(1 / 4, 5 / 6);
        this.selectedRectangle.setAnchor(1 / 4, 5 / 6);
        this.lifeRectangle.setAnchor(1 / 4, 5 / 6);
        this.selectedRectangle.setAnchor(1 / 4, 5 / 6);
        let animationOpen = this.animations.add('toto', [0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
        animationOpen.play(10, false, false);
        animationOpen.onComplete.add(() => {
            this.loadTexture(this.key, 19);
        });
    }
}
exports.ConstructionYardSprite = ConstructionYardSprite;
//# sourceMappingURL=ConstructionYardSprite.js.map