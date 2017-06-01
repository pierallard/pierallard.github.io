"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = require("./SceneObject");
const MoveAction_1 = require("../actions/MoveAction");
const BedroomDoor_1 = require("./BedroomDoor");
const RemoveInventoryAction_1 = require("../actions/RemoveInventoryAction");
const TalkAction_1 = require("../actions/TalkAction");
const app_1 = require("../../app");
const Translator_1 = require("../translations/Translator");
class Chain extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, Chain.IDENTIFIER, 438 * app_1.SimpleGame.SCALE, 19 * app_1.SimpleGame.SCALE, 'chaineClose');
    }
    static get IDENTIFIER() {
        return 'chain';
    }
    use(origin, pointer) {
        let object = this.play.getCursor().getInventoryObject();
        if (null !== object && object.getIdentifier() === 'escabeauInventory') {
            this.loadTexture('chaineOpen');
            let porteChambre = this.play.getScene().getObject(BedroomDoor_1.BedroomDoor.IDENTIFIER);
            porteChambre.doOpen();
            return [
                new MoveAction_1.MoveAction(this.play, origin.getPosition().x - 1100),
                new RemoveInventoryAction_1.RemoveInventoryAction(this.play, object)
            ];
        }
        return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.chain.default_use'))];
    }
}
exports.Chain = Chain;
//# sourceMappingURL=Chain.js.map