"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = require("../PositionTransformer");
class SpriteInfo {
    constructor(name, left, bottom, anchorBottom, gapLeft) {
        this.name = name;
        this.left = left;
        this.bottom = bottom;
        this.anchorBottom = anchorBottom;
        this.gapLeft = gapLeft;
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
    getRealPositionFromOrigin(spriteSource, leftOriented) {
        return new PIXI.Point(spriteSource.x + (leftOriented ? -this.left : this.left), spriteSource.y + this.bottom - this.anchorBottom);
    }
    getAnchor(sprite) {
        return new PIXI.Point(0.5, 1.0 - this.anchorBottom / sprite.height);
    }
}
exports.SpriteInfo = SpriteInfo;
//# sourceMappingURL=SpriteInfo.js.map