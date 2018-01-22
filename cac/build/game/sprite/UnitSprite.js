"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
const Explosion_1 = require("./Explosion");
const Cell_1 = require("../computing/Cell");
const SelectRectangle_1 = require("./SelectRectangle");
const LifeRectangle_1 = require("./LifeRectangle");
const Rotation_1 = require("../computing/Rotation");
var IMAGE_FORMAT;
(function (IMAGE_FORMAT) {
    IMAGE_FORMAT[IMAGE_FORMAT["THREE"] = 0] = "THREE";
    IMAGE_FORMAT[IMAGE_FORMAT["FIVE"] = 1] = "FIVE";
    IMAGE_FORMAT[IMAGE_FORMAT["NINE"] = 2] = "NINE";
    IMAGE_FORMAT[IMAGE_FORMAT["ANIMATED"] = 3] = "ANIMATED";
})(IMAGE_FORMAT = exports.IMAGE_FORMAT || (exports.IMAGE_FORMAT = {}));
class UnitSprite extends Phaser.Sprite {
    constructor(game, groups, cellPosition, key, imageFormat = IMAGE_FORMAT.THREE) {
        super(game, Cell_1.Cell.cellToReal(cellPosition.x), Cell_1.Cell.cellToReal(cellPosition.y), key);
        this.imageFormat = imageFormat;
        this.group = groups[Play_1.GROUP.UNIT];
        this.group.add(this);
        this.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        this.anchor.setTo(0.5, 0.5);
        this.selectedRectangle = new SelectRectangle_1.SelectRectangle(game, this.width / Play_1.SCALE, this.height / Play_1.SCALE);
        this.addChild(this.selectedRectangle);
        this.lifeRectangle = new LifeRectangle_1.LifeRectangle(game, this.width / Play_1.SCALE, this.height / Play_1.SCALE);
        this.addChild(this.lifeRectangle);
    }
    doDestroy() {
        this.doExplodeEffect();
        this.destroy(true);
    }
    updateLife(life, maxLife) {
        this.lifeRectangle.updateLife(life / maxLife);
    }
    doMove(cellPosition, duration) {
        this.rotateTowards(cellPosition);
        this.game.add.tween(this).to({
            x: Cell_1.Cell.cellToReal(cellPosition.x),
            y: Cell_1.Cell.cellToReal(cellPosition.y),
        }, duration, Phaser.Easing.Default, true);
    }
    doLoad(cellPosition) {
        this.rotateTowards(cellPosition);
    }
    setSelected(value = true) {
        this.selectedRectangle.setVisible(value);
        this.lifeRectangle.setVisible(value);
    }
    isInside(left, right, top, bottom) {
        return this.x + this.width / 2 > left &&
            this.x - this.width / 2 < right &&
            this.y + this.height / 2 > top &&
            this.y - this.height / 2 < bottom;
    }
    rotateTowards(cellPosition) {
        const rotation = Rotation_1.Rotation.getRotation(new Phaser.Point(cellPosition.x - Cell_1.Cell.realToCell(this.x), cellPosition.y - Cell_1.Cell.realToCell(this.y)));
        this.loadRotation(rotation);
    }
    loadRotation(rotation) {
        if (this.imageFormat === IMAGE_FORMAT.THREE) {
            switch (rotation) {
                case Rotation_1.ROTATION.TOP:
                    this.loadTexture(this.key, 1);
                    break;
                case Rotation_1.ROTATION.TOP_RIGHT:
                    this.loadTexture(this.key, 2);
                    break;
                case Rotation_1.ROTATION.RIGHT:
                    this.loadTexture(this.key, 5);
                    break;
                case Rotation_1.ROTATION.BOTTOM_RIGHT:
                    this.loadTexture(this.key, 8);
                    break;
                case Rotation_1.ROTATION.BOTTOM:
                    this.loadTexture(this.key, 7);
                    break;
                case Rotation_1.ROTATION.BOTTOM_LEFT:
                    this.loadTexture(this.key, 6);
                    break;
                case Rotation_1.ROTATION.LEFT:
                    this.loadTexture(this.key, 3);
                    break;
                case Rotation_1.ROTATION.TOP_LEFT:
                    this.loadTexture(this.key, 0);
                    break;
            }
        }
        else if (this.imageFormat === IMAGE_FORMAT.FIVE) {
            switch (rotation) {
                case Rotation_1.ROTATION.TOP:
                    this.loadTexture(this.key, 2);
                    break;
                case Rotation_1.ROTATION.TOP_RIGHT:
                    this.loadTexture(this.key, 4);
                    break;
                case Rotation_1.ROTATION.RIGHT:
                    this.loadTexture(this.key, 14);
                    break;
                case Rotation_1.ROTATION.BOTTOM_RIGHT:
                    this.loadTexture(this.key, 24);
                    break;
                case Rotation_1.ROTATION.BOTTOM:
                    this.loadTexture(this.key, 22);
                    break;
                case Rotation_1.ROTATION.BOTTOM_LEFT:
                    this.loadTexture(this.key, 20);
                    break;
                case Rotation_1.ROTATION.LEFT:
                    this.loadTexture(this.key, 10);
                    break;
                case Rotation_1.ROTATION.TOP_LEFT:
                    this.loadTexture(this.key, 0);
                    break;
            }
        }
        else {
            switch (rotation) {
                case Rotation_1.ROTATION.TOP:
                    this.loadTexture(this.key, 8);
                    break;
                case Rotation_1.ROTATION.TOP_RIGHT:
                    this.loadTexture(this.key, 6);
                    break;
                case Rotation_1.ROTATION.RIGHT:
                    this.loadTexture(this.key, 4);
                    break;
                case Rotation_1.ROTATION.BOTTOM_RIGHT:
                    this.loadTexture(this.key, 2);
                    break;
                case Rotation_1.ROTATION.BOTTOM:
                    this.loadTexture(this.key, 0);
                    break;
                case Rotation_1.ROTATION.BOTTOM_LEFT:
                    this.loadTexture(this.key, 14);
                    break;
                case Rotation_1.ROTATION.LEFT:
                    this.loadTexture(this.key, 12);
                    break;
                case Rotation_1.ROTATION.TOP_LEFT:
                    this.loadTexture(this.key, 10);
                    break;
            }
        }
    }
    doExplodeEffect() {
        this.group.add(new Explosion_1.Explosion(this.game, this.x, this.y));
    }
}
exports.UnitSprite = UnitSprite;
//# sourceMappingURL=UnitSprite.js.map