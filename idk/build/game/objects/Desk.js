"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = require("../PositionTransformer");
const Direction_1 = require("../Direction");
const CHAIR_BOTTOM = -10;
const CHAIR_LEFT = -10;
const CHAIR_ANCHOR_BOTTOM = 2;
class Desk {
    constructor(point) {
        this.position = point;
    }
    create(game, group) {
        this.chairSprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x + CHAIR_LEFT, PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y + CHAIR_BOTTOM, 'chair');
        this.deskSprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y, 'desk');
        this.chairSprite.anchor.set(0.5, 1 - CHAIR_ANCHOR_BOTTOM / this.chairSprite.height);
        this.deskSprite.anchor.set(0.5, 1);
        // if (Math.random() >= 0.5) {
        //     this.deskSprite.scale.set(-1, 1);
        //     this.chairSprite.scale.set(-1, 1);
        // }
        group.add(this.chairSprite);
        group.add(this.deskSprite);
    }
    getPosition() {
        return this.position;
    }
    getPositionGap() {
        return new PIXI.Point(CHAIR_LEFT, CHAIR_BOTTOM);
    }
    getEntries() {
        // return [DIRECTION.LEFT, DIRECTION.TOP, DIRECTION.BOTTOM];
        return [Direction_1.DIRECTION.BOTTOM];
    }
}
exports.Desk = Desk;
//# sourceMappingURL=Desk.js.map