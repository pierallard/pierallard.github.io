"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = require("./SceneObject");
const app_1 = require("../../app");
class FinalAnim extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, FinalAnim.IDENTIFIER, 200, 0, 'baby');
        this.setSprite(new Phaser.Sprite(play.game, 352 * app_1.SimpleGame.SCALE, 16 * app_1.SimpleGame.SCALE, 'caranim'));
        this.sprite.animations.add('a');
        this.hide();
    }
    display() {
        super.display();
        this.sprite.animations.play('a', 15, false);
    }
    static get IDENTIFIER() {
        return 'finalanim';
    }
}
exports.FinalAnim = FinalAnim;
//# sourceMappingURL=FinalAnim.js.map