"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HEIGHT = 3;
class LifeRectangle extends Phaser.Graphics {
    constructor(game, width, height) {
        super(game, 0, 0);
        this.isVisible = false;
        this.percentage = 1;
        this.unitWidth = width;
        this.unitHeight = height;
        this.game.add.existing(this);
    }
    render() {
        this.clear();
        if (this.isVisible) {
            this.lineStyle(1, 0x000000, 1);
            this.drawRect(-this.unitWidth / 2 + 1, -this.unitHeight / 2 - 1 - HEIGHT, this.unitWidth - 2, HEIGHT);
            this.lineStyle(null);
            this.beginFill(0x00ff00, 1);
            this.drawRect(-this.unitWidth / 2 + 2, -this.unitHeight / 2 - HEIGHT, Math.round((this.unitWidth - 4 + 1) * this.percentage), HEIGHT - 1);
            this.endFill();
        }
    }
    setVisible(value) {
        this.isVisible = value;
        this.render();
    }
    updateLife(percentage) {
        this.percentage = percentage;
        this.render();
    }
    setAnchor(x, y) {
        this.x = (0.5 - x) * this.unitWidth;
        this.y = (0.5 - y) * this.unitHeight;
    }
}
exports.LifeRectangle = LifeRectangle;
//# sourceMappingURL=LifeRectangle.js.map