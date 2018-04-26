"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TextStyle_1 = require("../TextStyle");
const Play_1 = require("../game_state/Play");
const Pico8Colors_1 = require("../Pico8Colors");
const app_1 = require("../../app");
class Tooltip {
    create(game, groups) {
        this.game = game;
        this.box = game.add.graphics(0, 0, groups[Play_1.GROUP_INTERFACE]);
        this.text = game.add.text(0, 0, '', TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
    }
    update() {
        this.cursorPosition = new PIXI.Point(app_1.SCALE * Math.round(this.game.input.mousePointer.position.x / app_1.SCALE) + 0.5, app_1.SCALE * Math.round(this.game.input.mousePointer.position.y / app_1.SCALE) + 0.5);
        this.text.x = this.cursorPosition.x + 6;
        this.text.y = this.cursorPosition.y + 12;
        this.updateBox();
    }
    setText(text) {
        this.text.text = text;
        this.updateBox();
    }
    show() {
        this.text.alpha = 1;
        this.box.alpha = 1;
    }
    hide() {
        this.text.alpha = 0;
        this.box.alpha = 0;
        this.box.clear();
    }
    updateBox() {
        this.box.clear();
        this.box.beginFill(Pico8Colors_1.COLOR.BLACK);
        this.box.lineStyle(1, Pico8Colors_1.COLOR.WHITE);
        this.box.drawRect(this.cursorPosition.x + 4, this.cursorPosition.y + 13, this.text.width + 1, 8);
    }
}
exports.Tooltip = Tooltip;
//# sourceMappingURL=Tooltip.js.map