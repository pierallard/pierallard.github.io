"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Stand {
    constructor(unit) {
        this.unit = unit;
    }
    getNextStep() {
        return this;
    }
    run() {
        const shootable = this.unit.getClosestShootable();
        if (shootable) {
            this.unit.shoot(shootable);
        }
    }
}
exports.Stand = Stand;
//# sourceMappingURL=Stand.js.map