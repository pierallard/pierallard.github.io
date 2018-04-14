"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ObjectInfoRegistry_1 = require("./ObjectInfoRegistry");
const PositionTransformer_1 = require("../PositionTransformer");
const ObjectDeleter_1 = require("./ObjectDeleter");
const Direction_1 = require("../Direction");
const Play_1 = require("../game_state/Play");
const ARROW_SIZE = 0.9;
const GAP = 4;
const SPRITE_OPACITY = 0.7;
class ObjectPhantom {
    constructor(name, game, worldKnowledge) {
        this.phantomSprites = [];
        this.leftOriented = false;
        this.worldKnowledge = worldKnowledge;
        this.position = new PIXI.Point(-10, -10);
        this.objectInfo = ObjectInfoRegistry_1.ObjectInfoRegistry.getObjectInfo(name);
        this.objectInfo.getSpriteInfos().forEach((spriteInfo) => {
            this.phantomSprites.push(new PhantomSprite(spriteInfo));
        });
        this.directionsSprite = new DirectionsSprite(this);
        game.input.addMoveCallback((_pointer, x, y) => {
            this.updatePosition(new PIXI.Point(x, y), game.camera);
        }, this);
        this.putEvent = () => {
            debugger;
            if (this.worldKnowledge.canPutHere(this)) {
                this.put(game);
            }
        };
        game.input.activePointer.leftButton.onDown.add(this.putEvent);
        game.input.keyboard.onUpCallback = (event) => {
            if (event.keyCode == Phaser.Keyboard.ESC) {
                this.cancel(game);
                game.input.moveCallbacks = [];
            }
            else if (event.keyCode === Phaser.Keyboard.SPACEBAR) {
                this.switchOrientation();
            }
        };
    }
    create(game, groups) {
        this.directionsSprite.create(game, groups[Play_1.GROUP_INFOS]);
        this.directionsSprite.setPosition(this.position);
        this.phantomSprites.forEach((phantomSprite) => {
            phantomSprite.create(game, groups[Play_1.GROUP_INFOS]);
            phantomSprite.setPosition(this.position);
        });
        this.forbiddenSprite = game.add.sprite(0, 0, 'forbidden');
        this.forbiddenSprite.anchor.setTo(0.5, 0.5);
        groups[Play_1.GROUP_INFOS].add(this.forbiddenSprite);
    }
    cancel(game) {
        this.destroy();
        this.worldKnowledge.getDepot().add(this.objectInfo.getName());
        game.input.activePointer.leftButton.onDown.remove(this.putEvent);
    }
    destroy() {
        this.phantomSprites.forEach((phantomSprite) => {
            phantomSprite.destroy();
        });
        this.forbiddenSprite.destroy(true);
        this.directionsSprite.destroy();
    }
    updatePosition(point, camera) {
        const gappedPoint = new PIXI.Point(point.x + camera.x, point.y + camera.y);
        this.position = PositionTransformer_1.PositionTransformer.getCellPosition(gappedPoint);
        this.phantomSprites.forEach((phantomSprite) => {
            phantomSprite.setPosition(this.position);
        });
        this.directionsSprite.setPosition(this.position);
        this.updateForbiddenSprite();
    }
    switchOrientation() {
        this.leftOriented = !this.leftOriented;
        this.phantomSprites.forEach((phantomSprite) => {
            phantomSprite.updateOrientation(this.leftOriented);
            phantomSprite.setPosition(this.position);
        });
        this.updateForbiddenSprite();
        this.directionsSprite.updatePolygons();
    }
    getPosition() {
        return this.position;
    }
    getEntries() {
        return this.objectInfo.getEntryPoints(this.leftOriented);
    }
    updateForbiddenSprite() {
        const center = ObjectDeleter_1.ObjectDeleter.getCenterOfSprites(this.phantomSprites.map((phantomSprite) => {
            return phantomSprite.getSprite();
        }));
        this.forbiddenSprite.position.set(center.x, center.y);
        this.forbiddenSprite.alpha = this.worldKnowledge.canPutHere(this) ? 0 : 1;
    }
    put(game) {
        game.input.activePointer.leftButton.onDown.remove(this.putEvent);
        this.worldKnowledge.add(this.objectInfo.getName(), this.getPosition(), this.leftOriented);
        this.destroy();
    }
    getInfo() {
        return this.objectInfo;
    }
    getLeftOriented() {
        return this.leftOriented;
    }
    isEntryAccessible(direction) {
        return this.worldKnowledge.isEntryAccessibleForObject(this, direction);
    }
    isCellFree() {
        return this.worldKnowledge.isFree(this.getPosition());
    }
}
exports.ObjectPhantom = ObjectPhantom;
class DirectionsSprite {
    constructor(phantom) {
        this.phantom = phantom;
    }
    create(game, group) {
        this.graphics = game.add.graphics(0, 0, group);
        this.updatePolygons();
        group.add(this.graphics);
    }
    updatePolygons() {
        this.graphics.clear();
        Direction_1.Direction.neighborDirections().forEach((direction) => {
            if (this.phantom.getInfo().getEntryPoints(this.phantom.getLeftOriented()).indexOf(direction) <= -1) {
                this.graphics.beginFill(0x494947); // Grey
            }
            else if (this.phantom.isEntryAccessible(direction)) {
                this.graphics.beginFill(0x00de2d); // Green
            }
            else {
                this.graphics.beginFill(0xff004d); // Red
            }
            switch (direction) {
                case Direction_1.DIRECTION.BOTTOM:
                    this.graphics.drawPolygon(new PIXI.Point(-GAP, PositionTransformer_1.CELL_HEIGHT / 2), new PIXI.Point(-PositionTransformer_1.CELL_WIDTH / 2, GAP), new PIXI.Point(-PositionTransformer_1.CELL_WIDTH / 2 * ARROW_SIZE, PositionTransformer_1.CELL_HEIGHT / 2 * ARROW_SIZE));
                    break;
                case Direction_1.DIRECTION.LEFT:
                    this.graphics.drawPolygon(new PIXI.Point(-PositionTransformer_1.CELL_WIDTH / 2, -GAP), new PIXI.Point(-GAP, -PositionTransformer_1.CELL_HEIGHT / 2), new PIXI.Point(-PositionTransformer_1.CELL_WIDTH / 2 * ARROW_SIZE, -PositionTransformer_1.CELL_HEIGHT / 2 * ARROW_SIZE));
                    break;
                case Direction_1.DIRECTION.TOP:
                    this.graphics.drawPolygon(new PIXI.Point(PositionTransformer_1.CELL_WIDTH / 2, -GAP), new PIXI.Point(GAP, -PositionTransformer_1.CELL_HEIGHT / 2), new PIXI.Point(PositionTransformer_1.CELL_WIDTH / 2 * ARROW_SIZE, -PositionTransformer_1.CELL_HEIGHT / 2 * ARROW_SIZE));
                    break;
                case Direction_1.DIRECTION.RIGHT:
                    this.graphics.drawPolygon(new PIXI.Point(GAP, PositionTransformer_1.CELL_HEIGHT / 2), new PIXI.Point(PositionTransformer_1.CELL_WIDTH / 2, GAP), new PIXI.Point(PositionTransformer_1.CELL_WIDTH / 2 * ARROW_SIZE, PositionTransformer_1.CELL_HEIGHT / 2 * ARROW_SIZE));
            }
        });
        this.graphics.beginFill(this.phantom.isCellFree() ? 0x00de2d : 0xff004d);
        this.graphics.drawPolygon(new PIXI.Point(-PositionTransformer_1.CELL_WIDTH / 2, 0), new PIXI.Point(0, PositionTransformer_1.CELL_HEIGHT / 2), new PIXI.Point(PositionTransformer_1.CELL_WIDTH / 2, 0), new PIXI.Point(0, -PositionTransformer_1.CELL_HEIGHT / 2));
    }
    setPosition(position) {
        this.graphics.x = PositionTransformer_1.PositionTransformer.getRealPosition(position).x;
        this.graphics.y = PositionTransformer_1.PositionTransformer.getRealPosition(position).y - PositionTransformer_1.CELL_HEIGHT / 2;
        this.updatePolygons();
    }
    destroy() {
        this.graphics.destroy(true);
    }
}
class PhantomSprite {
    constructor(infos) {
        this.spriteInfo = infos;
        this.leftOriented = false;
    }
    create(game, group) {
        this.sprite = game.add.sprite(0, 0, this.spriteInfo.getSpriteName(), 0, group);
        this.sprite.anchor.set(0.5, 1.0 - this.spriteInfo.getAnchorBottom() / this.sprite.height);
        this.sprite.alpha = SPRITE_OPACITY;
    }
    setPosition(position) {
        this.sprite.x = this.spriteInfo.getRealPosition(position, this.leftOriented).x;
        this.sprite.y = this.spriteInfo.getRealPosition(position, this.leftOriented).y;
    }
    destroy() {
        this.sprite.destroy(true);
    }
    updateOrientation(leftOriented) {
        this.leftOriented = leftOriented;
        this.sprite.scale.set(this.leftOriented ? -1 : 1, 1);
    }
    getSprite() {
        return this.sprite;
    }
}
//# sourceMappingURL=ObjectPhantom.js.map