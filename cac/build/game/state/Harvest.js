"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Stand_1 = require("./Stand");
const AlternativePosition_1 = require("../computing/AlternativePosition");
class Harvest {
    constructor(worldKnowledge, harvester, source) {
        this.worldKnowledge = worldKnowledge;
        this.harvester = harvester;
        this.source = source;
    }
    getNextStep() {
        if (null === this.harvester.getClosestRefinery()) {
            return new Stand_1.Stand(this.harvester);
        }
        if (this.source.isEmpty() && !this.harvester.isLoaded()) {
            return new Stand_1.Stand(this.harvester);
        }
        return this;
    }
    run() {
        if (this.harvester.isFull()) {
            this.goToBaseAndUnload();
        }
        else {
            const closestPlant = this.harvester.getClosestPlant(this.source);
            if (!closestPlant) {
                this.goToBaseAndUnload();
            }
            else {
                if (this.isArrivedToPlant(closestPlant)) {
                    this.harvester.load(closestPlant);
                }
                else {
                    this.harvester.moveTowards(closestPlant.getCellPositions()[0]);
                }
            }
        }
    }
    goToBaseAndUnload() {
        const closestRefinery = this.harvester.getClosestRefinery();
        if (null !== closestRefinery) {
            if (this.isArrivedToRefinery(closestRefinery)) {
                this.harvester.unload(closestRefinery);
            }
            else {
                this.harvester.moveTowards(new PIXI.Point(closestRefinery.getCellPositions()[0].x + 1, closestRefinery.getCellPositions()[0].y + 1));
            }
        }
    }
    isArrivedToPlant(plant) {
        return plant.getCellPositions()[0].x === this.harvester.getCellPositions()[0].x &&
            plant.getCellPositions()[0].y === this.harvester.getCellPositions()[0].y;
    }
    isArrivedToRefinery(refinery) {
        return AlternativePosition_1.AlternativePosition.isArrived(refinery.getCellPositions()[0], this.harvester.getCellPositions()[0], this.worldKnowledge.isGroundCellAccessible.bind(this.worldKnowledge));
    }
}
exports.Harvest = Harvest;
//# sourceMappingURL=Harvest.js.map