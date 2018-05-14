"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ObjectOrientation_1 = require("./ObjectOrientation");
class ObjectDescription {
    constructor(name, minLevel, occupiedCells, bottomOrientedSpriteInfos, topOrientedSpriteInfos, bottomInteractivePoints, topInteractivePoints, price) {
        this.name = name;
        this.minLevel = minLevel;
        this.occupiedCells = occupiedCells;
        this.bottomOrientedSpriteInfos = bottomOrientedSpriteInfos;
        this.topOrientedSpriteInfos = topOrientedSpriteInfos;
        this.bottomInteractivePoints = bottomInteractivePoints;
        this.topInteractivePoints = topInteractivePoints;
        this.price = price;
    }
    getName() {
        return this.name;
    }
    getSpriteInfos(orientation) {
        return ObjectOrientation_1.ObjectOrientation.isVerticalMirror(orientation)
            ? this.topOrientedSpriteInfos
            : this.bottomOrientedSpriteInfos;
    }
    getSpriteInfo(orientation, objectOrder) {
        return this.getSpriteInfos(orientation)[objectOrder];
    }
    getInteractivePoints(orientation) {
        return ObjectOrientation_1.ObjectOrientation.isVerticalMirror(orientation)
            ? this.topInteractivePoints
            : this.bottomInteractivePoints;
    }
    getInteractivePointEntryPoints(orientation, interactivePointIdentifier) {
        return this.getInteractivePoints(orientation)[interactivePointIdentifier].getEntryPoints(orientation);
    }
    getInteractivePointCellOffset(orientation, interactivePointIdentifier) {
        return this.getInteractivePoints(orientation)[interactivePointIdentifier].getCellOffset(orientation);
    }
    isSalable(remainingMoney) {
        return remainingMoney.isGreaterThan(this.price);
    }
    getPrice() {
        return this.price;
    }
    /**
     * Returns the list of the cell offsets for this object. If there is a single sprite, it will return no gap,
     * i.e. [(0,0)].
     * @param {DIRECTION} orientation
     * @returns {PIXI.Point[]}
     */
    getUniqueCellOffsets(orientation) {
        if (!ObjectOrientation_1.ObjectOrientation.isHorizontalMirror(orientation)) {
            if (!ObjectOrientation_1.ObjectOrientation.isVerticalMirror(orientation)) {
                return this.occupiedCells;
            }
            else {
                return this.occupiedCells.map((cell) => {
                    return new PIXI.Point(cell.y, cell.x);
                });
            }
        }
        else {
            if (!ObjectOrientation_1.ObjectOrientation.isVerticalMirror(orientation)) {
                return this.occupiedCells.map((cell) => {
                    return new PIXI.Point(cell.y, cell.x);
                });
            }
            else {
                return this.occupiedCells;
            }
        }
    }
    canBeTopOriented() {
        return this.topOrientedSpriteInfos.length > 0;
    }
    getMinLevel() {
        return this.minLevel;
    }
}
exports.ObjectDescription = ObjectDescription;
//# sourceMappingURL=ObjectDescription.js.map