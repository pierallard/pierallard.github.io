"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = require("./SceneObject");
const TalkAction_1 = require("../actions/TalkAction");
const MoveAction_1 = require("../actions/MoveAction");
const app_1 = require("../../app");
const Translator_1 = require("../translations/Translator");
class BedroomDoor extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, BedroomDoor.IDENTIFIER, 441 * app_1.SimpleGame.SCALE, 11 * app_1.SimpleGame.SCALE, 'porteChambre');
        this.open = false;
    }
    use(origin, pointer) {
        if (!this.open) {
            return [
                new MoveAction_1.MoveAction(this.play, pointer.position.x),
                new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.bedroomDoor.default_use'))
            ];
        }
        return super.use(origin, pointer);
    }
    doOpen() {
        this.open = true;
        this.sprite.loadTexture('porteChambreOpen');
        MoveAction_1.MoveAction.setRightBorder(-1556);
    }
    static get IDENTIFIER() {
        return 'bedroomDoor';
    }
}
exports.BedroomDoor = BedroomDoor;
//# sourceMappingURL=BedroomDoor.js.map