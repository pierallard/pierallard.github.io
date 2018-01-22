"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuildingProperties_1 = require("./BuildingProperties");
class ConstructableBuilding {
    constructor(worldKnowledge, cellPosition, player) {
        this.life = 100;
        this.maxLife = 100;
        this.selected = false;
        this.worldKnowledge = worldKnowledge;
        this.cellPosition = cellPosition;
        this.player = player;
        this.life = this.maxLife = BuildingProperties_1.BuildingProperties.getLife(this.constructor.name);
    }
    setVisible(value) {
        this.sprite.alpha = value ? 1 : 0;
    }
    isVisible() {
        return this.sprite.alpha > 0;
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
            this.worldKnowledge.removeArmy(this);
            this.destroy();
        }
        this.sprite.updateLife(this.life, this.maxLife);
    }
    update() {
    }
    isSelected() {
        return this.selected;
    }
    setSelected(value) {
        this.selected = value;
        this.sprite.setSelected(value);
    }
    updateStateAfterClick(point) {
    }
    isInside(left, right, top, bottom) {
        return this.sprite.isInside(left, right, top, bottom);
    }
    isAlive() {
        return this.life > 0;
    }
    isOnGround() {
        return true;
    }
}
exports.ConstructableBuilding = ConstructableBuilding;
//# sourceMappingURL=ConstructableBuilding.js.map