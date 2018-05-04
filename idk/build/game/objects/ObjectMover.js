"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = require("../PositionTransformer");
const ObjectSelector_1 = require("./ObjectSelector");
class ObjectMover {
    static makeMovable(movableObject, worldKnowledge) {
        movableObject.getSprites().forEach((sprite) => {
            sprite.inputEnabled = true;
            sprite.input.pixelPerfectOver = true;
            sprite.input.pixelPerfectClick = true;
            sprite.input.useHandCursor = true;
            sprite.events.onInputDown.add(this.select, this, 0, movableObject, worldKnowledge);
        });
    }
    static select(sprite, _pointer, movableObject, worldKnowledge) {
        const gap = new PIXI.Point(_pointer.position.x - PositionTransformer_1.PositionTransformer.getRealPosition(movableObject.getPosition()).x, _pointer.position.y - PositionTransformer_1.PositionTransformer.getRealPosition(movableObject.getPosition()).y);
        const moveCallback = (p, x, y) => {
            movableObject.tryToMove(PositionTransformer_1.PositionTransformer.getCellPosition(new PIXI.Point(x - gap.x, y - gap.y)));
        };
        movableObject.getSprites().forEach((sprite) => {
            ObjectSelector_1.ObjectSelector.setSelected(sprite, true);
        });
        _pointer.game.input.addMoveCallback(moveCallback, this);
        sprite.events.onInputUp.add(this.unselect, this, 0, movableObject, worldKnowledge, movableObject.getPosition());
    }
    static unselect(sprite, _pointer, bool, movableObject, worldKnowledge, startPoint) {
        _pointer.game.input.moveCallbacks = [];
        movableObject.getSprites().forEach((sprite) => {
            ObjectSelector_1.ObjectSelector.setSelected(sprite, false);
        });
        if (startPoint.x !== movableObject.getPosition().x || startPoint.y !== movableObject.getPosition().y) {
            worldKnowledge.resetAStar(startPoint, movableObject.getPosition());
        }
    }
}
exports.ObjectMover = ObjectMover;
//# sourceMappingURL=ObjectMover.js.map