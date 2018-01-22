"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ground_1 = require("../map/Ground");
const SQUARE_SIZE = 4;
class ShotCounter extends Phaser.Graphics {
    constructor(game, max) {
        super(game, 0, 0);
        this.game.add.existing(this);
        this.max = max;
        this.isVisible = false;
        this.counter = max;
        this.render();
    }
    render() {
        this.clear();
        if (this.isVisible) {
            this.lineStyle(null);
            this.beginFill(0x00ff00, 1);
            for (let i = 0; i < this.counter; i++) {
                this.drawRect(Ground_1.GROUND_SIZE / 2 - i * SQUARE_SIZE, Ground_1.GROUND_SIZE / 2, -SQUARE_SIZE, SQUARE_SIZE);
            }
            this.endFill();
            this.lineStyle(1, 0xffffff, 1);
            for (let i = 0; i < this.max; i++) {
                this.drawRect(Ground_1.GROUND_SIZE / 2 - i * SQUARE_SIZE, Ground_1.GROUND_SIZE / 2, -SQUARE_SIZE, SQUARE_SIZE);
            }
        }
    }
    setVisible(value) {
        this.isVisible = value;
        this.render();
    }
    updateCounter(counter) {
        this.counter = counter;
        this.render();
    }
}
exports.ShotCounter = ShotCounter;
//# sourceMappingURL=ShotCounter.js.map