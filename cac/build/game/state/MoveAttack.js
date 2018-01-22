"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MoveTo_1 = require("./MoveTo");
class MoveAttack extends MoveTo_1.MoveTo {
    run() {
        const shootable = this.unit.getClosestShootable();
        if (shootable && this.unit.canShoot()) {
            this.unit.shoot(shootable);
        }
        else {
            this.unit.moveTowards(this.goal);
        }
    }
}
exports.MoveAttack = MoveAttack;
//# sourceMappingURL=MoveAttack.js.map