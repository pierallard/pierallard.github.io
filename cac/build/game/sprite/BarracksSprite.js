"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuildingSprite_1 = require("./BuildingSprite");
class BarracksSprite extends BuildingSprite_1.BuildingSprite {
    constructor(game, x, y, key) {
        super(game, x, y, key);
        this.anchor.setTo(1 / 4, 5 / 6);
    }
}
exports.BarracksSprite = BarracksSprite;
//# sourceMappingURL=BarracksSprite.js.map