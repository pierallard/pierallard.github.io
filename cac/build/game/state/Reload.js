"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Stand_1 = require("./Stand");
const Distance_1 = require("../computing/Distance");
class Reload {
    constructor(orca, helipad) {
        this.orca = orca;
        this.helipad = helipad;
    }
    getNextStep() {
        if (this.orca.isFullyReloaded()) {
            return new Stand_1.Stand(this.orca);
        }
        return this;
    }
    run() {
        if (this.orca.getCurrentHelipad() !== this.helipad) {
            const closestHelipadPoint = Distance_1.Distance.getClosestPosition(this.orca.getCellPositions()[0], this.helipad.getCellPositions());
            this.orca.moveTowards(closestHelipadPoint);
        }
        else {
            if (!this.orca.isFullyReloaded()) {
                this.orca.reload();
            }
        }
    }
}
exports.Reload = Reload;
//# sourceMappingURL=Reload.js.map