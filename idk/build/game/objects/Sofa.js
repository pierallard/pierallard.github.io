"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = require("../PositionTransformer");
const Direction_1 = require("../Direction");
const ObjectMover_1 = require("./ObjectMover");
const SOFA_BOTTOM = -8;
const SOFA_LEFT = 0;
const SOFA_ANCHOR_BOTTOM = 3;
class Sofa {
    constructor(point, world) {
        this.position = point;
        this.world = world;
    }
    create(game, group) {
        this.sprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x + SOFA_LEFT, PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y + SOFA_BOTTOM - SOFA_ANCHOR_BOTTOM, 'sofa');
        this.sprite.anchor.set(0.5, 1.0 - SOFA_ANCHOR_BOTTOM / this.sprite.height);
        ObjectMover_1.ObjectMover.makeMovable(this, this.world);
        group.add(this.sprite);
    }
    getPosition() {
        return this.position;
    }
    getPositionGap() {
        return new PIXI.Point(SOFA_LEFT, SOFA_BOTTOM);
    }
    getEntries() {
        return [Direction_1.DIRECTION.LEFT, Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.RIGHT, Direction_1.DIRECTION.BOTTOM];
    }
    forceOrientation() {
        return null;
    }
    getSprites() {
        return [this.sprite];
    }
    tryToMove(point) {
        if (this.world.isFreePosition(point, this)) {
            this.position = point;
            this.sprite.x = PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x + SOFA_LEFT;
            this.sprite.y = PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y + SOFA_BOTTOM - SOFA_ANCHOR_BOTTOM;
        }
    }
}
exports.Sofa = Sofa;
//# sourceMappingURL=Sofa.js.map