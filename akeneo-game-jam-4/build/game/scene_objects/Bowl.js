"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = require("./SceneObject");
const MoveAction_1 = require("../actions/MoveAction");
const UpdateAction_1 = require("../actions/UpdateAction");
const TalkAction_1 = require("../actions/TalkAction");
const RemoveInventoryAction_1 = require("../actions/RemoveInventoryAction");
const GarageDoor_1 = require("./GarageDoor");
const Steak_1 = require("../inventory_objects/Steak");
const Dog_1 = require("./Dog");
const app_1 = require("../../app");
const Translator_1 = require("../translations/Translator");
class Bowl extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, Bowl.IDENTIFIER, 203 * app_1.SimpleGame.SCALE, 50 * app_1.SimpleGame.SCALE, 'gamelleVide');
        this.full = false;
    }
    use(origin, pointer) {
        let inventoryObject = this.play.getCursor().getInventoryObject();
        if (null !== inventoryObject) {
            if (inventoryObject.getIdentifier() === 'steaklexomil') {
                this.full = true;
                let porteGarage = this.play.getScene().getObject(GarageDoor_1.GarageDoor.IDENTIFIER);
                porteGarage.doOpen();
                return [
                    new TalkAction_1.TalkAction(this.play, this.play.getScene().getObject(Dog_1.Dog.IDENTIFIER), Translator_1.Translator.t('scene.bowl.dog1')),
                    new MoveAction_1.MoveAction(this.play, origin.getPosition().x - 612),
                    new RemoveInventoryAction_1.RemoveInventoryAction(this.play, inventoryObject),
                    new UpdateAction_1.UpdateAction(this.play, this, 'gamellePleine'),
                    new MoveAction_1.MoveAction(this.play, origin.getPosition().x - 300),
                    new MoveAction_1.MoveAction(this.play, origin.getPosition().x - 320),
                    new TalkAction_1.TalkAction(this.play, this.play.getScene().getObject(Dog_1.Dog.IDENTIFIER), Translator_1.Translator.t('scene.bowl.dog1')),
                    new TalkAction_1.TalkAction(this.play, this.play.getScene().getObject(Dog_1.Dog.IDENTIFIER), Translator_1.Translator.t('scene.bowl.dog2')),
                    new TalkAction_1.TalkAction(this.play, this.play.getScene().getObject(Dog_1.Dog.IDENTIFIER), Translator_1.Translator.t('scene.bowl.dog3')),
                    new TalkAction_1.TalkAction(this.play, this.play.getScene().getObject(Dog_1.Dog.IDENTIFIER), Translator_1.Translator.t('scene.bowl.dog4')),
                    new UpdateAction_1.UpdateAction(this.play, this.play.getScene().getObject(Dog_1.Dog.IDENTIFIER), 'dogsleep'),
                    new TalkAction_1.TalkAction(this.play, this.play.getScene().getObject(Dog_1.Dog.IDENTIFIER), Translator_1.Translator.t('scene.bowl.dog5')),
                    new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.bowl.success'))
                ];
            }
            if (inventoryObject.getIdentifier() === 'icesteak') {
                return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.bowl.use_icesteak'))];
            }
            if (inventoryObject.getIdentifier() === Steak_1.Steak.IDENTIFIER) {
                return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.bowl.use_steak'))];
            }
        }
        return super.use(origin, pointer);
    }
    lookAt(origin, pointer) {
        if (this.full) {
            return [
                new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.bowl.look_full')),
            ];
        }
        else {
            return [
                new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.bowl.look_empty')),
            ];
        }
    }
    static get IDENTIFIER() {
        return 'bowl';
    }
}
exports.Bowl = Bowl;
//# sourceMappingURL=Bowl.js.map