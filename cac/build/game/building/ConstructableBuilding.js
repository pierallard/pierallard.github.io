"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuildingProperties_1 = require("./BuildingProperties");
class ConstructableBuilding {
    constructor(worldKnowledge, cellPosition, player) {
        this.life = 100;
        this.worldKnowledge = worldKnowledge;
        this.cellPosition = cellPosition;
        this.player = player;
    }
    setVisible(value) {
        this.sprite.alpha = value ? 1 : 0;
    }
    getCellPositions() {
        return BuildingProperties_1.BuildingProperties.getCellPositions(this.constructor.name).map((position) => {
            return new PIXI.Point(position.x + this.cellPosition.x, position.y + this.cellPosition.y);
        });
    }
    ;
    getPlayer() {
        return this.player;
    }
    destroy() {
        this.sprite.doDestroy();
    }
    lostLife(life) {
        this.life -= life;
        if (!this.isAlive()) {
            this.sprite.doDestroy();
            this.worldKnowledge.removeBuilding(this);
        }
    }
    isAlive() {
        return this.life > 0;
    }
}
exports.ConstructableBuilding = ConstructableBuilding;
//# sourceMappingURL=ConstructableBuilding.js.map