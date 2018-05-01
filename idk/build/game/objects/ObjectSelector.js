"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SELECTED = '_selected';
class ObjectSelector {
    static makeSelectable(sprites, fallbackSelect = () => { }, fallbackUnselect = () => { }) {
        sprites.forEach((sprite) => {
            sprite.inputEnabled = true;
            sprite.input.pixelPerfectOver = true;
            sprite.input.pixelPerfectClick = true;
            sprite.input.useHandCursor = true;
            sprite.events.onInputDown.add(this.click, this, 0, sprites, fallbackSelect, fallbackUnselect);
        });
    }
    static setSelected(sprite, selected) {
        sprite.loadTexture(selected ?
            this.getSelectedKey(sprite.key) :
            this.getNonSelectedKey(sprite.key), sprite.frame, false);
    }
    static isSelected(tile) {
        return tile.key.indexOf(exports.SELECTED) > -1;
    }
    static click(sprite, _pointer, sprites, fallbackSelect = () => { }, fallbackUnselect = () => { }) {
        const isSelected = this.isSelected(sprite);
        sprites.forEach((sprite) => {
            this.setSelected(sprite, !isSelected);
        });
        if (isSelected) {
            fallbackUnselect.call();
        }
        else {
            fallbackSelect.call();
        }
    }
    static getNonSelectedKey(key) {
        return key.replace(exports.SELECTED, '');
    }
    static getSelectedKey(key) {
        if (key.indexOf(exports.SELECTED) > -1) {
            return key;
        }
        return key + exports.SELECTED;
    }
}
exports.ObjectSelector = ObjectSelector;
//# sourceMappingURL=ObjectSelector.js.map