"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
class InteractiveObject {
    constructor(play) {
        this.play = play;
    }
    setSprite(sprite) {
        this.sprite = sprite;
        this.sprite.scale.setTo(app_1.SimpleGame.SCALE);
        this.sprite.anchor.x = 0;
        this.sprite.anchor.y = 0;
    }
    getStroke() {
        throw 'getStroke should be implemented';
    }
    getWorldPosition() {
        return this.sprite.worldPosition;
    }
    getPosition() {
        return this.sprite.position;
    }
    getHeight() {
        return this.sprite.height;
    }
    destroy() {
        this.sprite.destroy();
    }
    loadTexture(newTexture) {
        this.sprite.loadTexture(newTexture);
        this.sprite.update();
    }
    hide() {
        this.sprite.visible = false;
    }
}
exports.InteractiveObject = InteractiveObject;
//# sourceMappingURL=InteractiveObject.js.map