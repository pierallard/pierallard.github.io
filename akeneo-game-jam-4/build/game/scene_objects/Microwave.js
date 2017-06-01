"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = require("./SceneObject");
const TalkAction_1 = require("../actions/TalkAction");
const MoveAction_1 = require("../actions/MoveAction");
const AddInventoryAction_1 = require("../actions/AddInventoryAction");
const RemoveInventoryAction_1 = require("../actions/RemoveInventoryAction");
const app_1 = require("../../app");
const Translator_1 = require("../translations/Translator");
class Microwave extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, Microwave.IDENTIFIER, 251 * app_1.SimpleGame.SCALE, 44 * app_1.SimpleGame.SCALE, 'microOndes');
    }
    use(origin, pointer) {
        let inventoryObject = this.play.getCursor().getInventoryObject();
        if (null !== inventoryObject) {
            if (inventoryObject.getIdentifier() === 'icesteak') {
                return [
                    new MoveAction_1.MoveAction(this.play, pointer.position.x),
                    new RemoveInventoryAction_1.RemoveInventoryAction(this.play, inventoryObject),
                    new AddInventoryAction_1.AddInventoryAction(this.play, 'steak'),
                    new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.microOndes.success'))
                ];
            }
            return super.use(origin, pointer);
        }
        else {
            return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.microOndes.default_use'))];
        }
    }
    static get IDENTIFIER() {
        return 'microOndes';
    }
}
exports.Microwave = Microwave;
//# sourceMappingURL=Microwave.js.map