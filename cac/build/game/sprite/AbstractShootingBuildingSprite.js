"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuildingSprite_1 = require("./BuildingSprite");
const Rotation_1 = require("../computing/Rotation");
const Cell_1 = require("../computing/Cell");
const Rocket_1 = require("../shoot/Rocket");
class AbstractShootingBuildingSprite extends BuildingSprite_1.BuildingSprite {
    doShoot(closestEnemyPosition) {
        this.rotateTowards(closestEnemyPosition);
        new Rocket_1.Rocket(this.effectsGroup, this.getShootSource(closestEnemyPosition), new PIXI.Point(Cell_1.Cell.cellToReal(closestEnemyPosition.x), Cell_1.Cell.cellToReal(closestEnemyPosition.y)));
    }
    getShootSource(cellDest) {
        return this.position;
    }
    rotateTowards(cellPosition) {
        const rotation = Rotation_1.Rotation.getRotation(new Phaser.Point(cellPosition.x - Cell_1.Cell.realToCell(this.x), cellPosition.y - Cell_1.Cell.realToCell(this.y)));
        this.loadRotation(rotation);
    }
    loadRotation(rotation) {
        switch (rotation) {
            case Rotation_1.ROTATION.TOP:
                this.loadTexture(this.key, 0);
                break;
            case Rotation_1.ROTATION.TOP_RIGHT:
                this.loadTexture(this.key, 1);
                break;
            case Rotation_1.ROTATION.RIGHT:
                this.loadTexture(this.key, 2);
                break;
            case Rotation_1.ROTATION.BOTTOM_RIGHT:
                this.loadTexture(this.key, 3);
                break;
            case Rotation_1.ROTATION.BOTTOM:
                this.loadTexture(this.key, 4);
                break;
            case Rotation_1.ROTATION.BOTTOM_LEFT:
                this.loadTexture(this.key, 5);
                break;
            case Rotation_1.ROTATION.LEFT:
                this.loadTexture(this.key, 6);
                break;
            case Rotation_1.ROTATION.TOP_LEFT:
                this.loadTexture(this.key, 7);
                break;
        }
    }
}
exports.AbstractShootingBuildingSprite = AbstractShootingBuildingSprite;
//# sourceMappingURL=AbstractShootingBuildingSprite.js.map