"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
const Pico8Colors_1 = require("../Pico8Colors");
exports.DEFAULT_BAR_HEIGHT = 10;
class Gauge {
    constructor(width, color, height = null) {
        this.value = 0;
        this.width = Math.round(width);
        this.color = color;
        this.visible = true;
        this.height = height ? height : exports.DEFAULT_BAR_HEIGHT;
    }
    create(game, groups, position) {
        this.graphics = game.add.graphics(position.x, position.y, groups[Play_1.GROUP_INTERFACE]);
        this.update();
    }
    setValue(value) {
        this.value = value;
        this.update();
    }
    update() {
        this.graphics.clear();
        if (this.visible) {
            this.graphics.lineStyle(1, Pico8Colors_1.COLOR.WHITE);
            this.graphics.drawRect(0, 0.5, this.width, this.height);
            this.graphics.lineStyle(0);
            this.graphics.beginFill(Pico8Colors_1.COLOR.BLACK);
            this.graphics.drawRect(0.5, 1, this.width - 1, this.height - 1);
            if (this.value > 0) {
                this.graphics.beginFill(this.getColor());
                if (this.value >= 1) {
                    this.graphics.drawRect(0.5, 1, Math.floor(this.width - 2) + 1, this.height - 1);
                }
                else {
                    this.graphics.drawRect(0.5, 1, Math.floor((this.width - 2) * this.value) + 1, this.height - 1);
                }
            }
            this.graphics.endFill();
        }
    }
    show() {
        this.visible = true;
        this.update();
    }
    hide() {
        this.visible = false;
        this.update();
    }
    destroy(destroyChildren) {
        this.graphics.destroy(destroyChildren);
    }
    getGraphics() {
        return this.graphics;
    }
    getColor() {
        return this.color;
    }
}
exports.Gauge = Gauge;
//# sourceMappingURL=Gauge.js.map