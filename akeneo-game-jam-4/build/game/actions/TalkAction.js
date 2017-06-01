"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("./Action");
const app_1 = require("../../app");
const DIALOG_WIDTH = 400;
class TalkAction extends Action_1.Action {
    constructor(play, source, text) {
        super(play);
        this.source = source;
        this.text = text;
        this.timing = Math.round(50 + 110 / 68 * this.text.length);
        this.textSprite = null;
    }
    execute() {
        if (null !== this.textSprite) {
            if (this.text.length) {
                this.textSprite.text = this.textSprite.text + this.text.charAt(0);
                this.text = this.text.substr(1);
                return false;
            }
            else {
                if (this.timing > 0) {
                    this.timing--;
                    return false;
                }
                this.textSprite.destroy();
            }
            return true;
        }
        else {
            let style = {
                font: "32px 3dventuremedium",
                align: "center",
                wordWrapWidth: DIALOG_WIDTH,
                wordWrap: true,
                stroke: this.source.getStroke(),
                strokeThickness: 20,
            };
            let x = this.source.getWorldPosition().x;
            if (x < DIALOG_WIDTH / 2) {
                x = DIALOG_WIDTH / 2;
            }
            else if (x > app_1.SimpleGame.WIDTH - DIALOG_WIDTH / 2) {
                x = app_1.SimpleGame.WIDTH - DIALOG_WIDTH / 2;
            }
            this.textSprite = this.play.game.add.text(x, this.source.getWorldPosition().y - this.source.getHeight(), '', style);
            this.textSprite.anchor.setTo(0.5, 1);
            this.textSprite.lineSpacing = -20;
            return false;
        }
    }
    debugText() {
        return "TalkAction " + this.timing + ' "' + this.text + '"';
    }
}
exports.TalkAction = TalkAction;
//# sourceMappingURL=TalkAction.js.map