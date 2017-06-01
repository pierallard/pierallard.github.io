"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
class Sentence extends Phaser.Text {
    constructor(game) {
        let style = {
            font: "28px 3dventuremedium",
            align: "center",
            fill: '#639bff',
            wordWrapWidth: 400 - 12 * app_1.SimpleGame.SCALE,
            wordWrap: true,
        };
        super(game, (400 - 12 * app_1.SimpleGame.SCALE) / 2, 310, '', style);
        this.object = null;
        this.verb = null;
        this.secondaryObject = null;
        this.lineSpacing = -15;
        this.game.add.existing(this);
        this.anchor.setTo(0.5, 0.5);
    }
    setObject(object) {
        this.object = object;
        this.update();
    }
    setSecondaryObject(object) {
        this.secondaryObject = object;
        this.update();
    }
    setVerb(verb) {
        this.verb = verb;
        this.update();
    }
    update() {
        let result = '';
        if (null !== this.verb) {
            result = result + this.verb.getLabel();
            if (null !== this.object) {
                result = result + ' ' + this.object.getLabel();
                if (null !== this.secondaryObject) {
                    result = result + ' avec ' + this.secondaryObject.getLabel();
                }
            }
        }
        this.text = result;
    }
}
exports.Sentence = Sentence;
//# sourceMappingURL=Sentence.js.map