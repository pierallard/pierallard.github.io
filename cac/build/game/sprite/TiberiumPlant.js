"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("../computing/Cell");
const Play_1 = require("../game_state/Play");
const Ground_1 = require("../map/Ground");
const START_AMOUNT = 1000;
const HARVEST_QUANTITY = 100;
class TiberiumPlant extends Phaser.Sprite {
    static getLayerFromAmount(amount) {
        if (amount < START_AMOUNT / 3) {
            return 4;
        }
        else if (amount < 2 * START_AMOUNT / 3) {
            return 2;
        }
        else {
            return 0;
        }
    }
    constructor(source, game, x, y) {
        const amount = Math.random() * (START_AMOUNT / 2) + START_AMOUNT / 2;
        super(game, Cell_1.Cell.cellToReal(x), Cell_1.Cell.cellToReal(y), 'GrssCrtr', TiberiumPlant.getLayerFromAmount(amount));
        this.source = source;
        this.amount = amount;
        this.cellPosition = new PIXI.Point(x, y);
        this.scale.setTo(Play_1.SCALE * Ground_1.GROUND_SIZE / 27);
        this.anchor.setTo(0.5, 0.5);
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
            this.source.remove(this);
        }
        else {
            this.loadTexture(this.key, TiberiumPlant.getLayerFromAmount(this.amount));
        }
        return result;
    }
    getSource() {
        return this.source;
    }
}
exports.TiberiumPlant = TiberiumPlant;
//# sourceMappingURL=TiberiumPlant.js.map