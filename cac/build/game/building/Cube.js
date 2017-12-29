"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("../computing/Cell");
const Play_1 = require("../game_state/Play");
const Ground_1 = require("../map/Ground");
const START_AMOUNT = 100;
const HARVEST_QUANTITY = 10;
class Cube extends Phaser.Sprite {
    constructor(game, x, y, group) {
        super(game, Cell_1.Cell.cellToReal(x), Cell_1.Cell.cellToReal(y), 'Cube');
        this.amount = START_AMOUNT;
        this.frame = 2;
        this.cellPosition = new PIXI.Point(x, y);
        this.scale.setTo(Play_1.SCALE * Ground_1.GROUND_SIZE / 27);
        this.anchor.setTo(0.5, 0.5);
        group.add(this);
    }
    getCellPositions() {
        return [this.cellPosition];
    }
    isEmpty() {
        return this.amount <= 0;
    }
    harvest() {
        let result = HARVEST_QUANTITY;
        if (this.amount < HARVEST_QUANTITY) {
            result = this.amount;
        }
        this.amount--;
        if (this.amount <= 0) {
            this.destroy();
        }
        else if (this.amount < START_AMOUNT / 3) {
            this.loadTexture(this.key, 0);
        }
        else if (this.amount < 2 * START_AMOUNT / 3) {
            this.loadTexture(this.key, 1);
        }
        return result;
    }
}
exports.Cube = Cube;
//# sourceMappingURL=Cube.js.map