"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = require("./SceneObject");
const TalkAction_1 = require("../actions/TalkAction");
const MoveAction_1 = require("../actions/MoveAction");
const Father_1 = require("./Father");
const AddInventoryAction_1 = require("../actions/AddInventoryAction");
const BouteilleAlcool_1 = require("../inventory_objects/BouteilleAlcool");
const DisappearAction_1 = require("../actions/DisappearAction");
const app_1 = require("../../app");
const Translator_1 = require("../translations/Translator");
class Bouteille extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, Bouteille.IDENTIFIER, 382 * app_1.SimpleGame.SCALE, 41 * app_1.SimpleGame.SCALE, 'bouteille');
    }
    pickUp(origin, pointer) {
        let father = this.play.getScene().getObject(Father_1.Father.IDENTIFIER);
        if (!father.isBusy()) {
            return [
                new MoveAction_1.MoveAction(this.play, pointer.position.x),
                new TalkAction_1.TalkAction(this.play, father, Translator_1.Translator.t('scene.bouteille.father')),
                new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.bouteille.baby'))
            ];
        }
        else {
            return [
                new MoveAction_1.MoveAction(this.play, pointer.position.x),
                new DisappearAction_1.DisappearAction(this.play, Bouteille.IDENTIFIER),
                new AddInventoryAction_1.AddInventoryAction(this.play, BouteilleAlcool_1.BouteilleAlcool.IDENTIFIER),
                new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.bouteille.success'))
            ];
        }
    }
    static get IDENTIFIER() {
        return 'bouteille';
    }
}
exports.Bouteille = Bouteille;
//# sourceMappingURL=Bouteille.js.map