"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../../app");
const UserInfoPanel_1 = require("./UserInfoPanel");
const Play_1 = require("../game_state/Play");
const TextStyle_1 = require("../TextStyle");
const Pico8Colors_1 = require("../Pico8Colors");
const LETTER_WIDTH = 6.5;
const LETTER_HEIGHT = UserInfoPanel_1.MEDIUM_GAP_BETWEEN_LINES;
class InfoBox {
    constructor(title, textLines, buttonText) {
        this.title = title;
        this.textLines = textLines;
        this.buttonText = buttonText;
        this.elements = [];
    }
    create(game, groups) {
        const closableElements = [];
        const internalWidth = this.getMaxLength() * LETTER_WIDTH;
        const internalHeight = LETTER_HEIGHT * this.textLines.length + 12 + 12;
        const width = internalWidth + 9 + 9;
        const height = internalHeight + 12 + 12;
        const left = (app_1.CAMERA_WIDTH_PIXELS - width) / 2;
        const top = (app_1.CAMERA_HEIGHT_PIXELS - height) / 2;
        const graphics = game.add.graphics(0, 0, groups[Play_1.GROUP_INTERFACE]);
        graphics.beginFill(Pico8Colors_1.COLOR.BLACK, 0.7);
        graphics.drawRect(0, 0, app_1.CAMERA_WIDTH_PIXELS, app_1.CAMERA_HEIGHT_PIXELS);
        this.elements.push(graphics);
        this.elements.push(game.add.sprite(left, top, 'info', 0, groups[Play_1.GROUP_INTERFACE]));
        const topBar = game.add.sprite(left + 12, top, 'info', 1, groups[Play_1.GROUP_INTERFACE]);
        topBar.scale.set(internalWidth / 12, 1);
        this.elements.push(topBar);
        const close = game.add.sprite(left + 12 + internalWidth, top, 'info', 2, groups[Play_1.GROUP_INTERFACE]);
        closableElements.push(close);
        this.elements.push(close);
        const leftSprite = game.add.sprite(left, top + 12, 'info', 3, groups[Play_1.GROUP_INTERFACE]);
        this.elements.push(leftSprite);
        leftSprite.scale.set(1, internalHeight / 12);
        const center = game.add.sprite(left + 12, top + 12, 'info', 4, groups[Play_1.GROUP_INTERFACE]);
        this.elements.push(center);
        center.scale.set((internalWidth + 1) / 12, internalHeight / 12);
        const right = game.add.sprite(left + 12 + internalWidth, top + 12, 'info', 5, groups[Play_1.GROUP_INTERFACE]);
        right.scale.set(1, internalHeight / 12);
        this.elements.push(right);
        this.elements.push(game.add.sprite(left, top + 12 + internalHeight, 'info', 6, groups[Play_1.GROUP_INTERFACE]));
        const bottom = game.add.sprite(left + 12, top + 12 + internalHeight, 'info', 7, groups[Play_1.GROUP_INTERFACE]);
        bottom.scale.set(internalWidth / 12, 1);
        this.elements.push(bottom);
        this.elements.push(game.add.sprite(left + 12 + internalWidth, top + 12 + internalHeight, 'info', 8, groups[Play_1.GROUP_INTERFACE]));
        const buttonWidth = this.buttonText.length * LETTER_WIDTH - 12;
        const buttonLeft = left + width - 12 - 8 - buttonWidth - 8;
        const buttonTop = top + height - 12 - 12;
        const buttonLeftSprite = game.add.sprite(buttonLeft, buttonTop, 'info', 9, groups[Play_1.GROUP_INTERFACE]);
        closableElements.push(buttonLeftSprite);
        this.elements.push(buttonLeftSprite);
        const buttonCenter = game.add.sprite(buttonLeft + 12, buttonTop, 'info', 10, groups[Play_1.GROUP_INTERFACE]);
        closableElements.push(buttonCenter);
        buttonCenter.scale.set((buttonWidth + 1) / 12, 1);
        this.elements.push(buttonCenter);
        const buttonRightSprite = game.add.sprite(buttonLeft + 12 + buttonWidth, buttonTop, 'info', 11, groups[Play_1.GROUP_INTERFACE]);
        closableElements.push(buttonRightSprite);
        this.elements.push(buttonRightSprite);
        this.elements.push(game.add.text(left + 8, top, this.title, TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]));
        this.textLines.forEach((str, i) => {
            this.elements.push(game.add.text(left + 9, top + 6 + 12 + i * LETTER_HEIGHT, str, TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]));
        });
        this.elements.push(game.add.text(buttonLeft + 9, buttonTop, this.buttonText, TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]));
        closableElements.forEach((sprite) => {
            sprite.inputEnabled = true;
            sprite.input.pixelPerfectOver = true;
            sprite.input.pixelPerfectClick = true;
            sprite.input.useHandCursor = true;
            sprite.events.onInputDown.add(this.close, this);
        });
    }
    close() {
        this.elements.forEach((element) => {
            element.destroy(true);
        });
    }
    ;
    getMaxLength() {
        return this.textLines.concat(this.title).concat(this.buttonText).reduce((prev, str) => {
            return Math.max(prev, str.length);
        }, 0);
    }
}
exports.InfoBox = InfoBox;
//# sourceMappingURL=Infobox.js.map