"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = require("../PositionTransformer");
const Direction_1 = require("../Direction");
const ObjectDeleter_1 = require("./ObjectDeleter");
const Play_1 = require("../game_state/Play");
const DISPENSER_BOTTOM = -4;
const DISPENSER_LEFT = 4;
const DISPENSER_ANCHOR_BOTTOM = 3;
class Dispenser {
    constructor(point, worldKnowledge) {
        this.position = point;
        this.worldKnowledge = worldKnowledge;
    }
    create(game, groups) {
        this.sprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x + DISPENSER_LEFT, PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y + DISPENSER_BOTTOM - DISPENSER_ANCHOR_BOTTOM, 'dispenser');
        this.sprite.anchor.set(0.5, 1.0 - DISPENSER_ANCHOR_BOTTOM / this.sprite.height);
        // ObjectMover.makeMovable(this, this.worldKnowledge);
        ObjectDeleter_1.ObjectDeleter.makeDeletable(this, game, groups[Play_1.GROUP_INFOS]);
        groups[Play_1.GROUP_OBJECTS_AND_HUMANS].add(this.sprite);
    }
    getPosition() {
        return this.position;
    }
    getSprites() {
        return [this.sprite];
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
    remove() {
        this.worldKnowledge.moveToDepot(this);
        this.sprite.destroy(true);
    }
}
exports.Dispenser = Dispenser;
//# sourceMappingURL=Dispenser.js.map