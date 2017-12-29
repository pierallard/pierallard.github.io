"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuildingSprite_1 = require("./BuildingSprite");
class TiberiumRefinerySprite extends BuildingSprite_1.BuildingSprite {
    constructor(game, x, y, key) {
        super(game, x, y, key);
        this.anchor.setTo(1 / 4, 5 / 6);
        this.animationElec = this.animations.add('toto', [4, 5, 8, 9, 10, 9, 8, 5]);
        this.animationPump = this.animations.add('toto', [0, 1, 2, 3, 2, 1]);
        // this.animationPump.play(5, true, false);
        this.animationElec.play(10, true, false);
    }
}
exports.TiberiumRefinerySprite = TiberiumRefinerySprite;
//# sourceMappingURL=TiberiumRefinerySprite.js.map