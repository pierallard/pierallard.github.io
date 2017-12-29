"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Stand_1 = require("./Stand");
const AlternativePosition_1 = require("../computing/AlternativePosition");
class Harvest {
    constructor(worldKnowledge, harvester, cubeSet) {
        this.worldKnowledge = worldKnowledge;
        this.harvester = harvester;
        this.cubeSet = cubeSet;
    }
    getNextStep() {
        if (this.cubeSet.isEmpty() && !this.harvester.isLoaded()) {
            return new Stand_1.Stand(this.harvester);
        }
        return this;
    }
    run() {
        if (this.harvester.isFull()) {
            this.goToBaseAndUnload();
        }
        else {
            const closestCube = this.harvester.getClosestCube(this.cubeSet);
            if (!closestCube) {
                this.goToBaseAndUnload();
            }
            else {
                if (this.isArrivedToCube(closestCube)) {
                    this.harvester.load(closestCube);
                }
                else {
                    this.harvester.moveTowards(closestCube.getCellPositions()[0]);
                }
            }
        }
    }
    goToBaseAndUnload() {
        const closestBase = this.harvester.getClosestBase();
        if (this.isArrivedToBase(closestBase)) {
            this.harvester.unload(closestBase);
        }
        else {
            this.harvester.moveTowards(new PIXI.Point(closestBase.getCellPositions()[0].x + 1, closestBase.getCellPositions()[0].y + 1));
        }
    }
    isArrivedToCube(cube) {
        return AlternativePosition_1.AlternativePosition.isArrived(cube.getCellPositions()[0], this.harvester.getCellPositions()[0], this.worldKnowledge.isCellAccessible.bind(this.worldKnowledge));
    }
    isArrivedToBase(base) {
        return AlternativePosition_1.AlternativePosition.isArrived(new PIXI.Point(base.getCellPositions()[0].x + 1, base.getCellPositions()[0].y + 1), this.harvester.getCellPositions()[0], this.worldKnowledge.isCellAccessible.bind(this.worldKnowledge));
    }
}
exports.Harvest = Harvest;
//# sourceMappingURL=Harvest.js.map