"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Direction_1 = require("../Direction");
const ObjectOrientation_1 = require("./ObjectOrientation");
class ObjectDescription {
    constructor(name, bottomOrientedSpriteInfos, topOrientedSpriteInfos, bottomInteractivePoints, topInteractivePoints, price) {
        this.name = name;
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
        let result = [];
        this.getSpriteInfos(orientation).forEach((spriteInfo) => {
            const newGap = spriteInfo.getCellOffset(orientation);
            let found = false;
            result.forEach((previousGap) => {
                found = found || (previousGap.x === newGap.x && previousGap.y === newGap.y);
            });
            if (!found) {
                result.push(newGap);
            }
        });
        return result;
    }
    /**
     * Returns the list of all the entry cells of this object.
     * @param {PIXI.Point} originCell
     * @param {DIRECTION} orientation
     * @returns {PIXI.Point[]}
     */
    getEntryCells(originCell, orientation) {
        let result = [];
        this.getInteractivePoints(orientation).forEach((interactivePoint) => {
            interactivePoint.getEntryPoints(orientation).forEach((entryPoint) => {
                const gap = interactivePoint.getCellOffset(orientation);
                const spriteCell = new PIXI.Point(originCell.x + gap.x, originCell.y + gap.y);
                result.push(Direction_1.Direction.getNeighbor(spriteCell, entryPoint));
            });
        });
        return result;
    }
    canBeTopOriented() {
        return this.topOrientedSpriteInfos.length > 0;
    }
}
exports.ObjectDescription = ObjectDescription;
//# sourceMappingURL=ObjectDescription.js.map