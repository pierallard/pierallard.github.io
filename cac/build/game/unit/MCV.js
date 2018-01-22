"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = require("./Unit");
const Stand_1 = require("../state/Stand");
const ConstructionYard_1 = require("../building/ConstructionYard");
class MCV extends Unit_1.Unit {
    constructor() {
        super(...arguments);
        this.expanded = false;
    }
    orderExpand() {
        this.state = new Stand_1.Stand(this);
        this.expand();
    }
    updateStateAfterClick(cell) {
        if (!this.expanded) {
            const unit = this.worldKnowledge.getGroundArmyAt(cell);
            if (null !== unit && unit === this) {
                this.orderExpand();
                return;
            }
        }
        super.updateStateAfterClick(cell);
    }
    expand() {
        this.expanded = true;
        this.worldKnowledge.addArmy(new ConstructionYard_1.ConstructionYard(this.worldKnowledge, new PIXI.Point(this.cellPosition.x - 1, this.cellPosition.y), this.player));
        this.worldKnowledge.removeArmy(this, 1000);
    }
}
exports.MCV = MCV;
//# sourceMappingURL=MCV.js.map