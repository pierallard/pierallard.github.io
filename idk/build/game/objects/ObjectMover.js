"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = require("../PositionTransformer");
const ObjectSelector_1 = require("./ObjectSelector");
class ObjectMover {
    static makeMovable(movableObject, world) {
        movableObject.getSprites().forEach((sprite) => {
            sprite.inputEnabled = true;
            sprite.input.pixelPerfectOver = true;
            sprite.input.pixelPerfectClick = true;
            sprite.input.useHandCursor = true;
            sprite.events.onInputDown.add(this.select, this, 0, movableObject, world);
        });
    }
    static select(sprite, _pointer, movableObject, world) {
        const gap = new PIXI.Point(_pointer.position.x - PositionTransformer_1.PositionTransformer.getRealPosition(movableObject.getPosition()).x, _pointer.position.y - PositionTransformer_1.PositionTransformer.getRealPosition(movableObject.getPosition()).y);
        const moveCallback = (p, x, y) => {
            movableObject.tryToMove(new PIXI.Point(x - gap.x, y - gap.y));
        };
        movableObject.getSprites().forEach((sprite) => {
            ObjectSelector_1.ObjectSelector.setSelected(sprite, true);
        });
        _pointer.game.input.addMoveCallback(moveCallback, this);
        sprite.events.onInputUp.add(this.unselect, this, 0, movableObject, world);
    }
    static unselect(sprite, _pointer, bool, movableObject, world) {
        _pointer.game.input.moveCallbacks = [];
        movableObject.getSprites().forEach((sprite) => {
            ObjectSelector_1.ObjectSelector.setSelected(sprite, false);
        });
        world.resetAStar();
    }
}
exports.ObjectMover = ObjectMover;
//# sourceMappingURL=ObjectMover.js.map