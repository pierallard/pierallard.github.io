"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
const Explosion_1 = require("./Explosion");
const Shoot_1 = require("./Shoot");
const Cell_1 = require("../computing/Cell");
const SelectRectangle_1 = require("./SelectRectangle");
const LifeRectangle_1 = require("./LifeRectangle");
var Rotation;
(function (Rotation) {
    Rotation[Rotation["TOP"] = 1] = "TOP";
    Rotation[Rotation["TOP_RIGHT"] = 2] = "TOP_RIGHT";
    Rotation[Rotation["RIGHT"] = 3] = "RIGHT";
    Rotation[Rotation["BOTTOM_RIGHT"] = 4] = "BOTTOM_RIGHT";
    Rotation[Rotation["BOTTOM"] = 5] = "BOTTOM";
    Rotation[Rotation["BOTTOM_LEFT"] = 6] = "BOTTOM_LEFT";
    Rotation[Rotation["LEFT"] = 7] = "LEFT";
    Rotation[Rotation["TOP_LEFT"] = 8] = "TOP_LEFT";
})(Rotation = exports.Rotation || (exports.Rotation = {}));
class UnitSprite extends Phaser.Sprite {
    constructor(game, group, cellPosition, key) {
        super(game, Cell_1.Cell.cellToReal(cellPosition.x), Cell_1.Cell.cellToReal(cellPosition.y), key);
        this.group = group;
        this.group.add(this);
        this.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        this.anchor.setTo(0.5, 0.5);
        this.selectedRectable = new SelectRectangle_1.SelectRectangle(game, this.width / Play_1.SCALE, this.height / Play_1.SCALE);
        this.addChild(this.selectedRectable);
        this.lifeRectangle = new LifeRectangle_1.LifeRectangle(game, this.width / Play_1.SCALE, this.height / Play_1.SCALE);
        this.addChild(this.lifeRectangle);
        group.add(this);
    }
    doDestroy() {
        this.doExplodeEffect();
        this.destroy(true);
    }
    doShoot(cellPosition) {
        this.rotateTowards(cellPosition);
        this.doShootEffect(cellPosition);
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
        this.selectedRectable.setVisible(value);
        this.lifeRectangle.setVisible(value);
    }
    isInside(left, right, top, bottom) {
        return this.x + this.width / 2 > left &&
            this.x - this.width / 2 < right &&
            this.y + this.height / 2 > top &&
            this.y - this.height / 2 < bottom;
    }
    rotateTowards(cellPosition) {
        const rotation = this.getRotation(new Phaser.Point(cellPosition.x - Cell_1.Cell.realToCell(this.x), cellPosition.y - Cell_1.Cell.realToCell(this.y)));
        this.loadRotation(rotation);
    }
    doExplodeEffect() {
        this.group.add(new Explosion_1.Explosion(this.game, this.x, this.y));
    }
    doShootEffect(cellPosition) {
        const rotation = this.getRotation(new Phaser.Point(cellPosition.x - Cell_1.Cell.realToCell(this.x), cellPosition.y - Cell_1.Cell.realToCell(this.y)));
        this.group.add(new Shoot_1.Shoot(this.game, this.x, this.y, rotation));
    }
    loadRotation(rotation) {
        switch (rotation) {
            case Rotation.TOP:
                this.loadTexture(this.key, 1);
                break;
            case Rotation.TOP_RIGHT:
                this.loadTexture(this.key, 2);
                break;
            case Rotation.RIGHT:
                this.loadTexture(this.key, 5);
                break;
            case Rotation.BOTTOM_RIGHT:
                this.loadTexture(this.key, 8);
                break;
            case Rotation.BOTTOM:
                this.loadTexture(this.key, 7);
                break;
            case Rotation.BOTTOM_LEFT:
                this.loadTexture(this.key, 6);
                break;
            case Rotation.LEFT:
                this.loadTexture(this.key, 3);
                break;
            case Rotation.TOP_LEFT:
                this.loadTexture(this.key, 0);
                break;
        }
    }
    getRotation(vector) {
        if (null === vector) {
            return Rotation.TOP_LEFT;
        }
        const angle = Math.atan2(vector.y, vector.x);
        if (angle > Math.PI / 8 * 7) {
            return Rotation.LEFT;
        }
        if (angle > Math.PI / 8 * 5) {
            return Rotation.BOTTOM_LEFT;
        }
        if (angle > Math.PI / 8 * 3) {
            return Rotation.BOTTOM;
        }
        if (angle > Math.PI / 8) {
            return Rotation.BOTTOM_RIGHT;
        }
        if (angle > Math.PI / 8 * -1) {
            return Rotation.RIGHT;
        }
        if (angle > Math.PI / 8 * -3) {
            return Rotation.TOP_RIGHT;
        }
        if (angle > Math.PI / 8 * -5) {
            return Rotation.TOP;
        }
        if (angle > Math.PI / 8 * -7) {
            return Rotation.TOP_LEFT;
        }
        return Rotation.LEFT;
    }
}
exports.UnitSprite = UnitSprite;
//# sourceMappingURL=UnitSprite.js.map