"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SELECT_SIZE = 3;
class SelectRectangle extends Phaser.Graphics {
    constructor(game, width, height) {
        super(game, 0, 0);
        this.isVisible = false;
        this.unitWidth = width;
        this.unitHeight = height;
        this.game.add.existing(this);
    }
    render() {
        this.clear();
        if (this.isVisible) {
            this.lineStyle(1, 0xffffff, 1);
            this.moveTo(-this.unitWidth / 2, -this.unitHeight / 2 + SELECT_SIZE);
            this.lineTo(-this.unitWidth / 2, -this.unitHeight / 2);
            this.lineTo(-this.unitWidth / 2 + SELECT_SIZE, -this.unitHeight / 2);
            this.moveTo(this.unitWidth / 2 - SELECT_SIZE, -this.unitHeight / 2);
            this.lineTo(this.unitWidth / 2, -this.unitHeight / 2);
            this.lineTo(this.unitWidth / 2, -this.unitHeight / 2 + SELECT_SIZE);
            this.moveTo(this.unitWidth / 2, this.unitHeight / 2 - SELECT_SIZE);
            this.lineTo(this.unitWidth / 2, this.unitHeight / 2);
            this.lineTo(this.unitWidth / 2 - SELECT_SIZE, this.unitHeight / 2);
            this.moveTo(-this.unitWidth / 2 + SELECT_SIZE, this.unitHeight / 2);
            this.lineTo(-this.unitWidth / 2, this.unitHeight / 2);
            this.lineTo(-this.unitWidth / 2, this.unitHeight / 2 - SELECT_SIZE);
        }
    }
    setVisible(value) {
        this.isVisible = value;
        this.render();
    }
    setAnchor(x, y) {
        this.x = (0.5 - x) * this.unitWidth;
        this.y = (0.5 - y) * this.unitHeight;
    }
}
exports.SelectRectangle = SelectRectangle;
//# sourceMappingURL=SelectRectangle.js.map