"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = require("../PositionTransformer");
const FAKE_ANCHOR = -4;
exports.WALL_ALPHA = 1;
class Wall {
    constructor(position) {
        this.cell = position;
    }
    create(game, group, hasWallLeft, hasWallTop, hasWallRight, hasWallBottom) {
        this.game = game;
        this.sprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).y + FAKE_ANCHOR, 'wall', Wall.getFrame(hasWallLeft, hasWallTop, hasWallRight, hasWallBottom));
        this.sprite.anchor.set(0.5, 1 + FAKE_ANCHOR / this.sprite.height);
        group.add(this.sprite);
    }
    getPosition() {
        return this.cell;
    }
    static getFrame(hasWallLeft, hasWallTop, hasWallRight, hasWallBottom) {
        return (hasWallLeft ? 1 : 0)
            + (hasWallTop ? 1 : 0) * 2
            + (hasWallRight ? 1 : 0) * 4
            + (hasWallBottom ? 1 : 0) * 8;
    }
    setVisibility(visible) {
        this.game.add.tween(this.sprite).to({
            alpha: visible ? 1 : exports.WALL_ALPHA
        }, 400, 'Linear', true);
    }
}
exports.Wall = Wall;
//# sourceMappingURL=Wall.js.map