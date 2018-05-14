"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Wall_1 = require("./Wall");
const PositionTransformer_1 = require("../PositionTransformer");
const FAKE_ANCHOR_TOP = -13.5;
const FAKE_ANCHOR_BOTTOM = 0;
class Door extends Wall_1.Wall {
    create(game, group, hasWallLeft, hasWallTop, hasWallRight, hasWallBottom) {
        this.game = game;
        if (hasWallLeft) {
            this.sprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).y + FAKE_ANCHOR_TOP, 'wall', 18);
            this.secondSprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).y + FAKE_ANCHOR_BOTTOM, 'wall', 19);
        }
        else {
            this.sprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).y + FAKE_ANCHOR_TOP, 'wall', 20);
            this.secondSprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).y + FAKE_ANCHOR_BOTTOM, 'wall', 21);
        }
        this.sprite.anchor.set(0.5, 1 + FAKE_ANCHOR_TOP / this.sprite.height);
        this.secondSprite.anchor.set(0.5, 1 + FAKE_ANCHOR_BOTTOM / this.sprite.height);
        group.add(this.sprite);
        group.add(this.secondSprite);
    }
    setVisibility(visible) {
        super.setVisibility(visible);
        this.game.add.tween(this.secondSprite).to({
            alpha: visible ? 1 : Wall_1.WALL_ALPHA
        }, 400, 'Linear', true);
    }
}
exports.Door = Door;
//# sourceMappingURL=Door.js.map