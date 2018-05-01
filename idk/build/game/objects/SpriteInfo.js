"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = require("../PositionTransformer");
const ObjectOrientation_1 = require("./ObjectOrientation");
class SpriteInfo {
    /**
     * Create a SpriteInfo
     *
     * @param {string} spriteKey
     * @param {number} gap The gap of the sprite from the bottom corner of the offset cell
     * @param {number} anchorBottom Used as a trick to show the user in front of the sprite.
     * @param {number} cellOffset The cell offset of the sprite is not on the origin cell
     */
    constructor(spriteKey, gap = new PIXI.Point(0, 0), anchorBottom = 0, cellOffset = new PIXI.Point(0, 0)) {
        this.spriteKey = spriteKey;
        this.gap = gap;
        this.anchorBottom = anchorBottom;
        this.cellOffset = cellOffset;
    }
    getSpriteKey() {
        return this.spriteKey;
    }
    getAnchorBottom() {
        return this.anchorBottom;
    }
    getRealPosition(originCell, orientation) {
        return this.getRealPositionFromOrigin(PositionTransformer_1.PositionTransformer.getRealPosition(originCell), orientation);
    }
    getRealPositionFromOrigin(realPosition, orientation, scale = 1) {
        return new PIXI.Point(realPosition.x + (ObjectOrientation_1.ObjectOrientation.isHorizontalMirror(orientation) ? -1 : 1) * (this.gap.x - (this.cellOffset.x - this.cellOffset.y) * PositionTransformer_1.CELL_WIDTH / 2) * scale, realPosition.y + this.gap.y * scale - this.anchorBottom - ((this.cellOffset.x + this.cellOffset.y) * PositionTransformer_1.CELL_HEIGHT / 2) * scale);
    }
    getAnchor(sprite) {
        return new PIXI.Point(0.5, 1.0 - this.anchorBottom / sprite.height);
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
}
exports.SpriteInfo = SpriteInfo;
//# sourceMappingURL=SpriteInfo.js.map