"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SELECTED = '_selected';
class ObjectSelector {
    static makeSelectable(sprites) {
        sprites.forEach((sprite) => {
            sprite.inputEnabled = true;
            sprite.input.pixelPerfectOver = true;
            sprite.input.pixelPerfectClick = true;
            sprite.input.useHandCursor = true;
            sprite.events.onInputDown.add(this.click, this, 0, sprites);
        });
    }
    static setSelected(sprite, selected) {
        sprite.loadTexture(selected ?
            this.getSelectedKey(sprite.key) :
            this.getNonSelectedKey(sprite.key), sprite.frame, false);
    }
    static isSelected(tile) {
        return tile.key.indexOf(SELECTED) > -1;
    }
    static click(sprite, _pointer, sprites) {
        const isSelected = this.isSelected(sprite);
        sprites.forEach((sprite) => {
            this.setSelected(sprite, !isSelected);
        });
    }
    static getNonSelectedKey(key) {
        return key.replace(SELECTED, '');
    }
    static getSelectedKey(key) {
        if (key.indexOf(SELECTED) > -1) {
            return key;
        }
        return key + SELECTED;
    }
}
exports.ObjectSelector = ObjectSelector;
//# sourceMappingURL=ObjectSelector.js.map