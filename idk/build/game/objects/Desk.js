"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = require("../PositionTransformer");
const Direction_1 = require("../Direction");
const ObjectMover_1 = require("./ObjectMover");
/**
 * This variable will fake the position of the sprite without changing it for the enduser.
 * A negative number (e.g. -10) will draw the object 10 pixels on the top but will update the anchor to put it back
 * to its position.
 * If the Human is not seen because the object is in front of it, you have to put a more negative number.
 * @type {number}
 */
const FAKE_ANCHOR_BOTTOM = -4;
/**
 * Negative : will display the object to the left
 * @type {number}
 */
const GAP_HORIZONTAL = -10;
/**
 * Negative: Will display the object to the top
 * @type {number}
 */
const GAP_VERTICAL = -8;
class Desk {
    constructor(point, worldKnowledge) {
        this.position = point;
        this.worldKnowledge = worldKnowledge;
    }
    create(game, group) {
        const isLeftOriented = Math.random() >= 0.5;
        this.chairSprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x + (isLeftOriented ? -GAP_HORIZONTAL : GAP_HORIZONTAL), PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y + FAKE_ANCHOR_BOTTOM + GAP_VERTICAL, 'chair');
        this.deskSprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y + FAKE_ANCHOR_BOTTOM, 'desk');
        this.chairSprite.anchor.set(0.5, 1 + FAKE_ANCHOR_BOTTOM / this.chairSprite.height);
        this.deskSprite.anchor.set(0.5, 1 + FAKE_ANCHOR_BOTTOM / this.deskSprite.height);
        ObjectMover_1.ObjectMover.makeMovable(this, this.worldKnowledge);
        if (isLeftOriented) {
            this.deskSprite.scale.set(-1, 1);
            this.chairSprite.scale.set(-1, 1);
        }
        group.add(this.chairSprite);
        group.add(this.deskSprite);
    }
    getPosition() {
        return this.position;
    }
    getPositionGap() {
        return new PIXI.Point(this.isLeftOriented() ? -GAP_HORIZONTAL : GAP_HORIZONTAL, GAP_VERTICAL - 2);
    }
    getEntries() {
        return this.isLeftOriented() ?
            [Direction_1.DIRECTION.LEFT, Direction_1.DIRECTION.RIGHT, Direction_1.DIRECTION.TOP] :
            [Direction_1.DIRECTION.BOTTOM, Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.LEFT];
    }
    isLeftOriented() {
        return this.deskSprite.scale.x === -1;
    }
    forceOrientation() {
        return this.isLeftOriented();
    }
    getSprites() {
        return [this.deskSprite, this.chairSprite];
    }
    tryToMove(point) {
        if (this.worldKnowledge.isFree(point, this)) {
            this.position = point;
            this.chairSprite.position.x = PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x + (this.isLeftOriented() ? -GAP_HORIZONTAL : GAP_HORIZONTAL);
            this.chairSprite.position.y = PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y + FAKE_ANCHOR_BOTTOM + GAP_VERTICAL;
            this.deskSprite.position.x = PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x;
            this.deskSprite.position.y = PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y + FAKE_ANCHOR_BOTTOM;
        }
    }
}
exports.Desk = Desk;
//# sourceMappingURL=Desk.js.map