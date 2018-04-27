"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TextStyle_1 = require("../TextStyle");
const Play_1 = require("../game_state/Play");
const Pico8Colors_1 = require("../Pico8Colors");
const app_1 = require("../../app");
class Tooltip {
    constructor(getValueFunction) {
        this.getValueFunction = getValueFunction;
    }
    create(game, groups) {
        this.game = game;
        this.box = game.add.graphics(0, 0, groups[Play_1.GROUP_TOOLTIP]);
        this.text = game.add.text(0, 0, '', TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_TOOLTIP]);
        this.hide();
    }
    update() {
        if (this.text.alpha > 0) {
            this.text.text = this.getValueFunction.call(this.tooltipable);
            this.text.x = this.getTooltipPosition().x;
            this.text.y = this.getTooltipPosition().y;
            this.updateBox();
        }
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
        this.box.drawRect(this.getTooltipPosition().x - 2, this.getTooltipPosition().y + 1, this.getBoxWidth(), 8);
    }
    setInput(tooltipable, graphics) {
        graphics.inputEnabled = true;
        graphics.events.onInputOver.add(this.show, this, 0);
        graphics.events.onInputOut.add(this.hide, this, 0);
        this.tooltipable = tooltipable;
    }
    getTooltipPosition() {
        this.cursorPosition = new PIXI.Point(app_1.SCALE * Math.round(this.game.input.mousePointer.position.x / app_1.SCALE) + 0.5, app_1.SCALE * Math.round(this.game.input.mousePointer.position.y / app_1.SCALE) + 0.5);
        let position = new PIXI.Point(this.cursorPosition.x + 6, this.cursorPosition.y + 9);
        if (position.x + this.getBoxWidth() > app_1.CAMERA_WIDTH_PIXELS) {
            position.x = app_1.CAMERA_WIDTH_PIXELS - this.getBoxWidth() + 0.5;
        }
        return position;
    }
    getBoxWidth() {
        return this.text.width + 1;
    }
}
exports.Tooltip = Tooltip;
//# sourceMappingURL=Tooltip.js.map