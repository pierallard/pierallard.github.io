"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = require("./Unit");
const UnitProperties_1 = require("./UnitProperties");
class Tank extends Unit_1.Unit {
    constructor(worldKnowledge, cellPosition, player) {
        super(worldKnowledge, cellPosition, player, UnitProperties_1.UnitProperties.getSprite(Tank.prototype.constructor.name, player.getId()));
        this.life = this.maxLife = UnitProperties_1.UnitProperties.getLife(Tank.prototype.constructor.name);
    }
}
exports.Tank = Tank;
//# sourceMappingURL=Tank.js.map