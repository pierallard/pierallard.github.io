"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuildingSprite_1 = require("./BuildingSprite");
class ConstructionYardSprite extends BuildingSprite_1.BuildingSprite {
    constructor(game, x, y, key) {
        super(game, x, y, key);
        this.anchor.setTo(1 / 6, 5 / 6);
        this.animationPump = this.animations.add('toto', [0, 1, 2, 3, 2, 1]);
        this.animationElec = this.animations.add('toto', [5, 6, 7]);
        this.animationElec.play(10, true, false);
    }
}
exports.ConstructionYardSprite = ConstructionYardSprite;
//# sourceMappingURL=ConstructionYardSprite.js.map