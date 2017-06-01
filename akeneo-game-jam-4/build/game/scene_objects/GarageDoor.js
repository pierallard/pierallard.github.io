"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = require("./SceneObject");
const TalkAction_1 = require("../actions/TalkAction");
const MoveAction_1 = require("../actions/MoveAction");
const Dog_1 = require("./Dog");
const app_1 = require("../../app");
const Translator_1 = require("../translations/Translator");
class GarageDoor extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, GarageDoor.IDENTIFIER, 158 * app_1.SimpleGame.SCALE, 11 * app_1.SimpleGame.SCALE, 'porteGarage');
        this.open = false;
    }
    use(origin, pointer) {
        if (!this.open) {
            return [
                new MoveAction_1.MoveAction(this.play, pointer.position.x),
                new TalkAction_1.TalkAction(this.play, this.play.getScene().getObject(Dog_1.Dog.IDENTIFIER), Translator_1.Translator.t('scene.porteGarage.dog')),
                new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.porteGarage.baby'))
            ];
        }
        return super.use(origin, pointer);
    }
    doOpen() {
        this.open = true;
        this.loadTexture('porteGarageOpen');
        MoveAction_1.MoveAction.setLeftBorder(0);
    }
    static get IDENTIFIER() {
        return 'porteGarage';
    }
}
exports.GarageDoor = GarageDoor;
//# sourceMappingURL=GarageDoor.js.map