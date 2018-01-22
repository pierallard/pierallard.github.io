"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuildingSprite_1 = require("./BuildingSprite");
class CommunicationCenterSprite extends BuildingSprite_1.BuildingSprite {
    constructor(game, groups, x, y, key) {
        super(game, groups, x, y, key);
        this.anchor.setTo(1 / 4, 5 / 6);
        this.lifeRectangle.setAnchor(1 / 4, 5 / 6);
        this.selectedRectangle.setAnchor(1 / 4, 5 / 6);
    }
}
exports.CommunicationCenterSprite = CommunicationCenterSprite;
//# sourceMappingURL=CommunicationCenterSprite.js.map