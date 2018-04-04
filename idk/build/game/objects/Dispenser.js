"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = require("../PositionTransformer");
const ObjectMover_1 = require("./ObjectMover");
const Direction_1 = require("../Direction");
const DISPENSER_BOTTOM = -4;
const DISPENSER_LEFT = 4;
const DISPENSER_ANCHOR_BOTTOM = 3;
class Dispenser {
    constructor(point, worldKnowledge) {
        this.position = point;
        this.worldKnowledge = worldKnowledge;
    }
    create(game, group) {
        this.sprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x + DISPENSER_LEFT, PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y + DISPENSER_BOTTOM - DISPENSER_ANCHOR_BOTTOM, 'dispenser');
        this.sprite.anchor.set(0.5, 1.0 - DISPENSER_ANCHOR_BOTTOM / this.sprite.height);
        ObjectMover_1.ObjectMover.makeMovable(this, this.worldKnowledge);
        group.add(this.sprite);
    }
    getPosition() {
        return this.position;
    }
    getSprites() {
        return [this.sprite];
    }
    tryToMove(point) {
        if (this.worldKnowledge.isFree(point, this)) {
            this.position = point;
            this.sprite.x = PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x + DISPENSER_LEFT;
            this.sprite.y = PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y + DISPENSER_BOTTOM - DISPENSER_ANCHOR_BOTTOM;
        }
    }
    getEntries() {
        return [Direction_1.DIRECTION.BOTTOM];
    }
    getPositionGap() {
        return new PIXI.Point(0, 0);
    }
    forceOrientation() {
        return true;
    }
}
exports.Dispenser = Dispenser;
//# sourceMappingURL=Dispenser.js.map