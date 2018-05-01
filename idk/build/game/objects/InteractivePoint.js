"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Direction_1 = require("../Direction");
const ObjectOrientation_1 = require("./ObjectOrientation");
class InteractivePoint {
    constructor(entryPoints, gap = new PIXI.Point(0, 0), cellOffset = new PIXI.Point(0, 0), leftLooking = false, topLooking = false) {
        this.entryPoints = entryPoints;
        this.gap = gap;
        this.cellOffset = cellOffset;
        this.leftLooking = leftLooking;
        this.topLooking = topLooking;
    }
    /**
     * Returns the gap from the cell where the sprite is set.
     *
     * @param {DIRECTION} orientation
     * @returns {PIXI.Point}
     */
    getInteractionPosition(orientation) {
        return new PIXI.Point((ObjectOrientation_1.ObjectOrientation.isHorizontalMirror(orientation) ? -1 : 1) * (this.gap.x), this.gap.y);
    }
    getEntryPoints(orientation) {
        if (!ObjectOrientation_1.ObjectOrientation.isHorizontalMirror(orientation)) {
            return this.entryPoints;
        }
        else {
            return this.entryPoints.map((entryPoint) => {
                return Direction_1.Direction.getHorizontalMirror(entryPoint);
            });
        }
    }
    /**
     * Returns the gap from the origin cell. It takes the mirror effect in account. For examples:
     * [1, 0] => [0, 1]
     * [0, 1] => [1, 0]
     * [1, 1] => [1, 1]
     * @param {DIRECTION} orientation
     * @returns {PIXI.Point}
     */
    getCellOffset(orientation) {
        if (!ObjectOrientation_1.ObjectOrientation.isHorizontalMirror(orientation)) {
            return this.cellOffset;
        }
        else {
            return new PIXI.Point(this.cellOffset.y, this.cellOffset.x);
        }
    }
    isHumanTopLooking() {
        return this.topLooking;
    }
    /**
     * Returns true if the user looks to the left when he interacts with the object.
     * Returns false if the user looks to the right when he interacts with the object.
     *
     * @param {DIRECTION} orientation
     * @returns {boolean}
     */
    isHumanLeftLooking(orientation) {
        return ObjectOrientation_1.ObjectOrientation.isHorizontalMirror(orientation) ? !this.leftLooking : this.leftLooking;
    }
}
exports.InteractivePoint = InteractivePoint;
//# sourceMappingURL=InteractivePoint.js.map