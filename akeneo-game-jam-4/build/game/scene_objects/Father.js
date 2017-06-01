"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = require("./SceneObject");
const app_1 = require("../../app");
class Father extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, Father.IDENTIFIER, 400 * app_1.SimpleGame.SCALE, 65 * app_1.SimpleGame.SCALE, 'father');
        this.busy = false;
        this.sprite.anchor.setTo(0, 1);
    }
    setBusy() {
        this.busy = true;
        this.sprite.loadTexture('fatherBusy');
    }
    static get IDENTIFIER() {
        return 'father';
    }
    isBusy() {
        return this.busy;
    }
    getStroke() {
        return '#d95763';
    }
}
exports.Father = Father;
//# sourceMappingURL=Father.js.map