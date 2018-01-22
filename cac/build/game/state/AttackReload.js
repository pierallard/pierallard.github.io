"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Attack_1 = require("./Attack");
const Distance_1 = require("../computing/Distance");
class AttackReload extends Attack_1.Attack {
    run() {
        if (this.unit.isOnHelipad()) {
            if (this.unit.isFullyReloaded()) {
                super.run();
            }
            else {
                this.unit.reload();
            }
        }
        else if (this.unit.canShoot()) {
            super.run();
        }
        else {
            const closestHelipad = this.getClosestHelipad();
            if (closestHelipad) {
                const closestPoint = Distance_1.Distance.getClosestPosition(this.unit.getCellPositions()[0], closestHelipad.getCellPositions());
                this.unit.moveTowards(closestPoint);
            }
        }
    }
    getClosestHelipad() {
        return this.worldKnowledge.getPlayerArmies(this.unit.getPlayer(), 'Helipad').filter((helipad) => {
            return !helipad.isLoading();
        })[0];
    }
}
exports.AttackReload = AttackReload;
//# sourceMappingURL=AttackReload.js.map