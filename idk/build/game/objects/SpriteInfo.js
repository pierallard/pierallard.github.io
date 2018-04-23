"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = require("../PositionTransformer");
const Direction_1 = require("../Direction");
class SpriteInfo {
    constructor(name, entryPoints, left, bottom, anchorBottom, gapLeft, cellGapX, cellGapY, leftOriented, topOriented) {
        this.name = name;
        this.entryPoints = entryPoints;
        this.left = left;
        this.bottom = bottom;
        this.anchorBottom = anchorBottom;
        this.gapLeft = gapLeft;
        this.cellGap = new PIXI.Point(cellGapX, cellGapY);
        this.leftOriented = leftOriented;
        this.topOriented = topOriented;
    }
    getSpriteName() {
        return this.name;
    }
    getAnchorBottom() {
        return this.anchorBottom;
    }
    getRealPosition(position, leftOriented) {
        return this.getRealPositionFromOrigin(PositionTransformer_1.PositionTransformer.getRealPosition(position), leftOriented);
    }
    getSittablePosition(leftOriented) {
        return new PIXI.Point(leftOriented ? -(this.left + this.gapLeft) : (this.left + this.gapLeft), this.bottom - this.anchorBottom + 3);
    }
    getRealPositionFromOrigin(spriteSource, leftOriented, scale = 1) {
        return new PIXI.Point(spriteSource.x + (leftOriented ? -1 : 1) * (this.left - (this.cellGap.x - this.cellGap.y) * PositionTransformer_1.CELL_WIDTH / 2) * scale, spriteSource.y + this.bottom - this.anchorBottom - ((this.cellGap.x + this.cellGap.y) * PositionTransformer_1.CELL_HEIGHT / 2) * scale);
    }
    getAnchor(sprite) {
        return new PIXI.Point(0.5, 1.0 - this.anchorBottom / sprite.height);
    }
    getEntryPoints(leftOriented) {
        if (!leftOriented) {
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
     * @param {boolean} leftOriented
     * @returns {PIXI.Point}
     */
    getPositionGapFromOrigin(leftOriented) {
        if (!leftOriented) {
            return this.cellGap;
        }
        else {
            return new PIXI.Point(this.cellGap.y, this.cellGap.x);
        }
    }
    getTopOrientation() {
        return this.topOriented;
    }
    /**
     * Returns false if the user looks to the right when he interacts with the object.
     * Returns true if the user looks to the left when he interacts with the object.
     *
     * @param {boolean} leftOriented
     * @returns {boolean}
     */
    getOrientation(leftOriented) {
        return leftOriented ? !this.leftOriented : this.leftOriented;
    }
}
exports.SpriteInfo = SpriteInfo;
//# sourceMappingURL=SpriteInfo.js.map