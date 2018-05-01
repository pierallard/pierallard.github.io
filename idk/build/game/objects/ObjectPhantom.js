"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ObjectDescriptionRegistry_1 = require("./ObjectDescriptionRegistry");
const PositionTransformer_1 = require("../PositionTransformer");
const ObjectDeleter_1 = require("./ObjectDeleter");
const Direction_1 = require("../Direction");
const Play_1 = require("../game_state/Play");
const Pico8Colors_1 = require("../Pico8Colors");
const ObjectOrientation_1 = require("./ObjectOrientation");
const ARROW_SIZE = 0.9;
const GAP = 4;
const SPRITE_OPACITY = 0.7;
class ObjectPhantom {
    constructor(objectSeller, name, game, worldKnowledge) {
        this.objectSeller = objectSeller;
        this.phantomSprites = [];
        this.orientation = ObjectOrientation_1.DIRECTION_LOOP[0];
        this.worldKnowledge = worldKnowledge;
        this.position = new PIXI.Point(-10, -10);
        this.objectDescription = ObjectDescriptionRegistry_1.ObjectDescriptionRegistry.getObjectDescription(name);
        this.objectDescription.getSpriteInfos(ObjectOrientation_1.DIRECTION_LOOP[0]).forEach((spriteInfo) => {
            this.phantomSprites.push(new PhantomSprite(spriteInfo));
        });
        this.directionsSprite = new DirectionsSprite(this);
        game.input.addMoveCallback((_pointer, x, y) => {
            this.updatePosition(new PIXI.Point(x, y), game.camera);
        }, this);
        this.putEvent = () => {
            if (this.worldKnowledge.canPutHere(this.objectDescription, this.position, this.orientation)) {
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
        this.game = game;
        this.groups = groups;
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
        const previousTopOriented = ObjectOrientation_1.ObjectOrientation.isVerticalMirror(this.orientation);
        this.orientation = ObjectOrientation_1.ObjectOrientation.getNextOrientation(this.orientation, this.objectDescription.canBeTopOriented());
        if (previousTopOriented !== ObjectOrientation_1.ObjectOrientation.isVerticalMirror(this.orientation)) {
            this.phantomSprites.forEach((phantomSprite) => {
                phantomSprite.destroy();
            });
            this.phantomSprites = [];
            this.objectDescription.getSpriteInfos(this.orientation).forEach((spriteInfo) => {
                this.phantomSprites.push(new PhantomSprite(spriteInfo));
            });
            this.phantomSprites.forEach((phantomSprite) => {
                phantomSprite.create(this.game, this.groups[Play_1.GROUP_INFOS]);
            });
        }
        this.phantomSprites.forEach((phantomSprite) => {
            phantomSprite.updateOrientation(this.orientation);
            phantomSprite.setPosition(this.position);
        });
        this.updateForbiddenSprite();
        this.directionsSprite.updatePolygons();
    }
    getPositions() {
        return this.objectDescription.getUniqueCellOffsets(this.orientation).map((cellGap) => {
            return new PIXI.Point(this.position.x + cellGap.x, this.position.y + cellGap.y);
        });
    }
    getEntries(objectNumber) {
        return this.objectDescription.getInteractivePointEntryPoints(this.orientation, objectNumber);
    }
    updateForbiddenSprite() {
        const center = ObjectDeleter_1.ObjectDeleter.getCenterOfSprites(this.phantomSprites.map((phantomSprite) => {
            return phantomSprite.getSprite();
        }));
        this.forbiddenSprite.position.set(center.x, center.y);
        this.forbiddenSprite.alpha = this.worldKnowledge.canPutHere(this.objectDescription, this.position, this.orientation) ? 0 : 1;
    }
    put(game) {
        this.worldKnowledge.add(this.objectDescription.getName(), this.getOrigin(), this.orientation);
        this.destroy(game);
        if (this.worldKnowledge.getDepot().getCount(this.objectDescription.getName()) > 0) {
            this.worldKnowledge.getDepot().remove(this.objectDescription.getName());
            const phantom = new ObjectPhantom(this.objectSeller, this.objectDescription.getName(), game, this.worldKnowledge);
            phantom.create(game, this.groups);
            this.objectSeller.setCurrentPhantom(phantom);
        }
        else {
            this.objectSeller.removeCurrentPhantom();
        }
    }
    cancel(game) {
        this.worldKnowledge.getDepot().add(this.objectDescription.getName());
        this.destroy(game);
        this.objectSeller.removeCurrentPhantom();
    }
    destroy(game) {
        game.input.moveCallbacks = [];
        game.input.activePointer.leftButton.onDown.remove(this.putEvent);
        game.input.keyboard.onUpCallback = () => { };
        this.phantomSprites.forEach((phantomSprite) => {
            phantomSprite.destroy();
        });
        this.forbiddenSprite.destroy(true);
        this.directionsSprite.destroy();
    }
    getObjectDescription() {
        return this.objectDescription;
    }
    isEntryAccessible(cellGap, direction) {
        return this.worldKnowledge.isEntryAccessibleForObject(this.position, cellGap, direction);
    }
    isCellFree() {
        for (let i = 0; i < this.getPositions().length; i++) {
            if (!this.worldKnowledge.isFree(this.getPositions()[i])) {
                return false;
            }
        }
        return true;
    }
    getOrigin() {
        return this.position;
    }
    getOrientation() {
        return this.orientation;
    }
    getName() {
        return this.objectDescription.getName();
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
        this.phantom.getObjectDescription().getInteractivePoints(this.phantom.getOrientation()).forEach((interactivePoint) => {
            interactivePoint.getEntryPoints(this.phantom.getOrientation()).forEach((direction) => {
                const cellGap = interactivePoint.getCellOffset(this.phantom.getOrientation());
                if (this.phantom.isEntryAccessible(cellGap, direction)) {
                    this.graphics.beginFill(Pico8Colors_1.COLOR.LIGHT_GREEN); // Green
                }
                else {
                    this.graphics.beginFill(Pico8Colors_1.COLOR.RED); // Red
                }
                switch (direction) {
                    case Direction_1.DIRECTION.BOTTOM:
                        this.graphics.drawPolygon(PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(-GAP, PositionTransformer_1.CELL_HEIGHT / 2), cellGap), PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(-PositionTransformer_1.CELL_WIDTH / 2, GAP), cellGap), PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(-PositionTransformer_1.CELL_WIDTH / 2 * ARROW_SIZE, PositionTransformer_1.CELL_HEIGHT / 2 * ARROW_SIZE), cellGap));
                        break;
                    case Direction_1.DIRECTION.LEFT:
                        this.graphics.drawPolygon(PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(-PositionTransformer_1.CELL_WIDTH / 2, -GAP), cellGap), PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(-GAP, -PositionTransformer_1.CELL_HEIGHT / 2), cellGap), PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(-PositionTransformer_1.CELL_WIDTH / 2 * ARROW_SIZE, -PositionTransformer_1.CELL_HEIGHT / 2 * ARROW_SIZE), cellGap));
                        break;
                    case Direction_1.DIRECTION.TOP:
                        this.graphics.drawPolygon(PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(PositionTransformer_1.CELL_WIDTH / 2, -GAP), cellGap), PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(GAP, -PositionTransformer_1.CELL_HEIGHT / 2), cellGap), PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(PositionTransformer_1.CELL_WIDTH / 2 * ARROW_SIZE, -PositionTransformer_1.CELL_HEIGHT / 2 * ARROW_SIZE), cellGap));
                        break;
                    case Direction_1.DIRECTION.RIGHT:
                        this.graphics.drawPolygon(PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(GAP, PositionTransformer_1.CELL_HEIGHT / 2), cellGap), PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(PositionTransformer_1.CELL_WIDTH / 2, GAP), cellGap), PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(PositionTransformer_1.CELL_WIDTH / 2 * ARROW_SIZE, PositionTransformer_1.CELL_HEIGHT / 2 * ARROW_SIZE), cellGap));
                }
            });
        });
        this.graphics.beginFill(this.phantom.isCellFree() ? Pico8Colors_1.COLOR.LIGHT_GREEN : Pico8Colors_1.COLOR.RED);
        this.phantom.getObjectDescription().getUniqueCellOffsets(this.phantom.getOrientation()).forEach((cellGap) => {
            this.graphics.drawPolygon(PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(-PositionTransformer_1.CELL_WIDTH / 2, 0), cellGap), PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(0, PositionTransformer_1.CELL_HEIGHT / 2), cellGap), PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(PositionTransformer_1.CELL_WIDTH / 2, 0), cellGap), PositionTransformer_1.PositionTransformer.addGap(new PIXI.Point(0, -PositionTransformer_1.CELL_HEIGHT / 2), cellGap));
        });
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
        this.orientation = ObjectOrientation_1.DIRECTION_LOOP[0];
    }
    create(game, group) {
        this.sprite = game.add.sprite(0, 0, this.spriteInfo.getSpriteKey(), 0, group);
        this.sprite.anchor.set(0.5, 1.0 - this.spriteInfo.getAnchorBottom() / this.sprite.height);
        this.sprite.alpha = SPRITE_OPACITY;
    }
    setPosition(position) {
        this.sprite.x = this.spriteInfo.getRealPosition(position, this.orientation).x;
        this.sprite.y = this.spriteInfo.getRealPosition(position, this.orientation).y;
    }
    destroy() {
        this.sprite.destroy(true);
    }
    updateOrientation(orientation) {
        this.orientation = orientation;
        this.sprite.scale.set(ObjectOrientation_1.ObjectOrientation.isHorizontalMirror(orientation) ? -1 : 1, 1);
    }
    getSprite() {
        return this.sprite;
    }
}
//# sourceMappingURL=ObjectPhantom.js.map