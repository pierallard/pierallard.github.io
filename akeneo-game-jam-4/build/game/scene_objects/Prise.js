"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = require("./SceneObject");
const MoveAction_1 = require("../actions/MoveAction");
const RemoveInventoryAction_1 = require("../actions/RemoveInventoryAction");
const TalkAction_1 = require("../actions/TalkAction");
const Four_1 = require("./Four");
const Rallonge_1 = require("../inventory_objects/Rallonge");
const UpdateAction_1 = require("../actions/UpdateAction");
const app_1 = require("../../app");
const Translator_1 = require("../translations/Translator");
class Prise extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, Prise.IDENTIFIER, 175 * app_1.SimpleGame.SCALE, 57 * app_1.SimpleGame.SCALE, 'prisepetee');
    }
    static get IDENTIFIER() {
        return 'prise';
    }
    use(origin, pointer) {
        let object = this.play.getCursor().getInventoryObject();
        if (null !== object) {
            if (object.getIdentifier() === Rallonge_1.Rallonge.IDENTIFIER) {
                return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.prise.tip'))];
            }
            if (object.getIdentifier() === 'rallongecoupee') {
                this.loadTexture('prise');
                let four = this.play.getScene().getObject(Four_1.Four.IDENTIFIER);
                four.doOn();
                return [
                    new MoveAction_1.MoveAction(this.play, origin.getPosition().x - 500),
                    new RemoveInventoryAction_1.RemoveInventoryAction(this.play, object),
                    new UpdateAction_1.UpdateAction(this.play, this, 'prise'),
                    new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.prise.success'))
                ];
            }
        }
        return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.prise.default_use'))];
    }
}
exports.Prise = Prise;
//# sourceMappingURL=Prise.js.map