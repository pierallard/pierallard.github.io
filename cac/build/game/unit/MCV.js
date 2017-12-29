"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = require("./Unit");
const UnitProperties_1 = require("./UnitProperties");
const MoveTo_1 = require("../state/MoveTo");
const Follow_1 = require("../state/Follow");
const Stand_1 = require("../state/Stand");
const ConstructionYard_1 = require("../building/ConstructionYard");
class MCV extends Unit_1.Unit {
    constructor(worldKnowledge, cellPosition, player) {
        super(worldKnowledge, cellPosition, player, UnitProperties_1.UnitProperties.getSprite(MCV.prototype.constructor.name, player.getId()));
        this.expanded = false;
        this.life = this.maxLife = UnitProperties_1.UnitProperties.getLife(MCV.prototype.constructor.name);
    }
    orderExpand() {
        this.state = new Stand_1.Stand(this);
        this.expand();
    }
    updateStateAfterClick(cell) {
        if (!this.expanded) {
            const unit = this.worldKnowledge.getUnitAt(cell);
            if (null !== unit) {
                if (unit === this) {
                    this.orderExpand();
                }
                if (this.getPlayer() !== unit.getPlayer()) {
                    this.state = new MoveTo_1.MoveTo(this.worldKnowledge, this, unit.getCellPositions()[0]);
                }
                else {
                    this.state = new Follow_1.Follow(this.worldKnowledge, this, unit);
                }
            }
            else {
                this.state = new MoveTo_1.MoveTo(this.worldKnowledge, this, cell);
            }
        }
    }
    expand() {
        this.expanded = true;
        this.worldKnowledge.addBuilding(new ConstructionYard_1.ConstructionYard(this.worldKnowledge, new PIXI.Point(this.cellPosition.x - 1, this.cellPosition.y), this.player), true);
        this.worldKnowledge.removeUnit(this, 1000);
        this.player.updateAllowedUnitsAndBuildings();
    }
}
exports.MCV = MCV;
//# sourceMappingURL=MCV.js.map