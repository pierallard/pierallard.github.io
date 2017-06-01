"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = require("./SceneObject");
const MoveAction_1 = require("../actions/MoveAction");
const RemoveInventoryAction_1 = require("../actions/RemoveInventoryAction");
const AddInventoryAction_1 = require("../actions/AddInventoryAction");
const TalkAction_1 = require("../actions/TalkAction");
const app_1 = require("../../app");
const Translator_1 = require("../translations/Translator");
class Four extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, Four.IDENTIFIER, 233 * app_1.SimpleGame.SCALE, 44 * app_1.SimpleGame.SCALE, 'four');
        this.on = false;
    }
    lookAt(origin, pointer) {
        if (!this.on) {
            return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.four.look_off'))];
        }
        return super.lookAt(origin, pointer);
    }
    use(origin, pointer) {
        if (!this.on) {
            return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.four.use_off'))];
        }
        let object = this.play.getCursor().getInventoryObject();
        if (null !== object) {
            if (object.getIdentifier() === 'gode') {
                return [
                    new MoveAction_1.MoveAction(this.play, pointer.position.x),
                    new RemoveInventoryAction_1.RemoveInventoryAction(this.play, object),
                    new AddInventoryAction_1.AddInventoryAction(this.play, 'piles'),
                    new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.four.success')),
                ];
            }
        }
        return super.use(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'four';
    }
    doOn() {
        this.on = true;
    }
}
exports.Four = Four;
//# sourceMappingURL=Four.js.map