"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bubble_1 = require("./Bubble");
var RAGE_IMAGE;
(function (RAGE_IMAGE) {
    RAGE_IMAGE[RAGE_IMAGE["COFFEE"] = 0] = "COFFEE";
    RAGE_IMAGE[RAGE_IMAGE["LAPTOP"] = 1] = "LAPTOP";
    RAGE_IMAGE[RAGE_IMAGE["SLEEP"] = 2] = "SLEEP";
    RAGE_IMAGE[RAGE_IMAGE["TABLE"] = 3] = "TABLE";
    RAGE_IMAGE[RAGE_IMAGE["PATH"] = 4] = "PATH";
})(RAGE_IMAGE = exports.RAGE_IMAGE || (exports.RAGE_IMAGE = {}));
class ThoughtBubble extends Bubble_1.Bubble {
    getSpriteFrame() {
        return 1;
    }
    getImageSpriteKey() {
        return 'bubble_images_angry';
    }
    showRage(rageImage) {
        this.imageSprite.loadTexture(this.getImageSpriteKey(), rageImage);
        super.show();
    }
}
exports.ThoughtBubble = ThoughtBubble;
//# sourceMappingURL=ThoughtBubble.js.map