"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConstructableBuilding_1 = require("./ConstructableBuilding");
const Cell_1 = require("../computing/Cell");
const Play_1 = require("../game_state/Play");
const Ground_1 = require("../map/Ground");
const LifeRectangle_1 = require("../sprite/LifeRectangle");
const SelectRectangle_1 = require("../sprite/SelectRectangle");
class ConcreteBarrier extends ConstructableBuilding_1.ConstructableBuilding {
    create(game, groups) {
        const positionX = Cell_1.Cell.cellToReal(this.cellPosition.x);
        const positionY = Cell_1.Cell.cellToReal(this.cellPosition.y);
        this.topLeftSprite = new Phaser.Sprite(game, positionX, positionY, 'Wall', this.getTopLeftLayer());
        this.topLeftSprite.anchor.setTo(1, 1);
        this.topRightSprite = new Phaser.Sprite(game, positionX, positionY, 'Wall', this.getTopRightLayer());
        this.topRightSprite.anchor.setTo(0, 1);
        this.bottomRightSprite = new Phaser.Sprite(game, positionX, positionY, 'Wall', this.getBottomRightLayer());
        this.bottomRightSprite.anchor.setTo(0, 0.5);
        this.bottomLeftSprite = new Phaser.Sprite(game, positionX, positionY, 'Wall', this.getBottomLeftLayer());
        this.bottomLeftSprite.anchor.setTo(1, 0.5);
        this.getSprites().forEach((sprite) => {
            sprite.scale.setTo(Play_1.SCALE / 2, Play_1.SCALE / 2); // Wall texture should be resized by 50%
            groups[Play_1.GROUP.UNIT].add(sprite);
        });
        this.updateConcretes();
        this.selectedRectable = new SelectRectangle_1.SelectRectangle(game, Ground_1.GROUND_SIZE / Play_1.SCALE, Ground_1.GROUND_SIZE / Play_1.SCALE);
        groups[Play_1.GROUP.UNIT].add(this.selectedRectable);
        this.lifeRectangle = new LifeRectangle_1.LifeRectangle(game, Ground_1.GROUND_SIZE / Play_1.SCALE, Ground_1.GROUND_SIZE / Play_1.SCALE);
        groups[Play_1.GROUP.UNIT].add(this.lifeRectangle);
    }
    updateTileLayers() {
        this.topLeftSprite.loadTexture(this.topLeftSprite.key, this.getTopLeftLayer());
        this.topRightSprite.loadTexture(this.topRightSprite.key, this.getTopRightLayer());
        this.bottomRightSprite.loadTexture(this.bottomRightSprite.key, this.getBottomRightLayer());
        this.bottomLeftSprite.loadTexture(this.bottomLeftSprite.key, this.getBottomLeftLayer());
    }
    destroy() {
        this.getSprites().forEach((sprite) => {
            sprite.destroy(true);
        });
        this.updateConcretes();
    }
    isInside(left, right, top, bottom) {
        return this.topLeftSprite.x + Ground_1.GROUND_SIZE / 2 > left &&
            this.topLeftSprite.x - Ground_1.GROUND_SIZE / 2 < right &&
            this.topLeftSprite.y + Ground_1.GROUND_SIZE / 2 > top &&
            this.topLeftSprite.y - Ground_1.GROUND_SIZE / 2 < bottom;
    }
    setSelected(value) {
        this.selected = value;
        this.selectedRectable.setVisible(value);
        this.lifeRectangle.setVisible(value);
    }
    getSprites() {
        return [
            this.topLeftSprite,
            this.topRightSprite,
            this.bottomRightSprite,
            this.bottomLeftSprite,
        ];
    }
    getTopLeftLayer() {
        // left, top left, top
        switch ([this.getNeighbours()[3], this.getNeighbours()[0], this.getNeighbours()[1]].toString()) {
            case [true, true, true].toString():
                return 15;
            case [true, false, false].toString():
                return 2;
            case [false, false, true].toString():
                return 13;
            case [true, true, false].toString():
                return 2;
            case [false, true, true].toString():
                return 13;
            case [true, false, true].toString():
                return 41;
            default:
                return 0;
        }
    }
    getTopRightLayer() {
        // right, top right, top
        switch ([this.getNeighbours()[4], this.getNeighbours()[2], this.getNeighbours()[1]].toString()) {
            case [true, true, true].toString():
                return 15;
            case [true, false, false].toString():
                return 2;
            case [false, false, true].toString():
                return 17;
            case [true, true, false].toString():
                return 2;
            case [false, true, true].toString():
                return 17;
            case [true, false, true].toString():
                return 39;
            default:
                return 4;
        }
    }
    getBottomRightLayer() {
        // right, bottom right, bottom
        switch ([this.getNeighbours()[4], this.getNeighbours()[7], this.getNeighbours()[6]].toString()) {
            case [true, true, true].toString():
                return 15;
            case [true, false, false].toString():
                return 28;
            case [false, false, true].toString():
                return 17;
            case [true, true, false].toString():
                return 28;
            case [false, true, true].toString():
                return 17;
            case [true, false, true].toString():
                return 43;
            default:
                return 30;
        }
    }
    getBottomLeftLayer() {
        // left, bottom left, bottom
        switch ([this.getNeighbours()[3], this.getNeighbours()[5], this.getNeighbours()[6]].toString()) {
            case [true, true, true].toString():
                return 15;
            case [true, false, false].toString():
                return 28;
            case [false, false, true].toString():
                return 13;
            case [true, true, false].toString():
                return 28;
            case [false, true, true].toString():
                return 13;
            case [true, false, true].toString():
                return 45;
            default:
                return 26;
        }
    }
    getNeighbours() {
        return [
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x - 1, this.cellPosition.y - 1)),
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x, this.cellPosition.y - 1)),
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x + 1, this.cellPosition.y - 1)),
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x - 1, this.cellPosition.y)),
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x + 1, this.cellPosition.y)),
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x - 1, this.cellPosition.y + 1)),
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x, this.cellPosition.y + 1)),
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x + 1, this.cellPosition.y + 1)),
        ];
    }
    hasConcreteNeighbourAt(cell) {
        const building = this.worldKnowledge.getGroundArmyAt(cell);
        return (null !== building &&
            building.constructor.name === this.constructor.name &&
            building.getPlayer() === this.getPlayer());
    }
    updateConcretes() {
        this.worldKnowledge.getPlayerArmies(this.player, this.constructor.name).forEach((building) => {
            const concreteBarrier = building;
            if (concreteBarrier !== this) {
                concreteBarrier.updateTileLayers();
            }
        });
    }
}
exports.ConcreteBarrier = ConcreteBarrier;
//# sourceMappingURL=ConcreteBarrier.js.map