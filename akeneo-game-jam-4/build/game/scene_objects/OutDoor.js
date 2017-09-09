"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = require("./SceneObject");
const TalkAction_1 = require("../actions/TalkAction");
const MoveAction_1 = require("../actions/MoveAction");
const UpdateAction_1 = require("../actions/UpdateAction");
const Father_1 = require("./Father");
const Mother_1 = require("./Mother");
const RemoveInventoryAction_1 = require("../actions/RemoveInventoryAction");
const app_1 = require("../../app");
const Translator_1 = require("../translations/Translator");
const AppearAction_1 = require("../actions/AppearAction");
const DisappearAction_1 = require("../actions/DisappearAction");
const FinalAnim_1 = require("./FinalAnim");
class OutDoor extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, OutDoor.IDENTIFIER, 352 * app_1.SimpleGame.SCALE, 16 * app_1.SimpleGame.SCALE, 'porteSortie');
        this.open = false;
    }
    use(origin, pointer) {
        let object = this.play.getCursor().getInventoryObject();
        if (null !== object && object.getIdentifier() === 'perceuse') {
            let mother = this.play.getScene().getObject(Mother_1.Mother.IDENTIFIER);
            if (mother.isDefoncee()) {
                this.doOpen();
                return [
                    new MoveAction_1.MoveAction(this.play, pointer.position.x),
                    new RemoveInventoryAction_1.RemoveInventoryAction(this.play, object),
                    new UpdateAction_1.UpdateAction(this.play, this, 'porteSortieOpen')
                ];
            }
            else {
                return [
                    new TalkAction_1.TalkAction(this.play, mother, Translator_1.Translator.t('scene.porteSortie.use_close'))
                ];
            }
        }
        if (!this.open) {
            return [
                new MoveAction_1.MoveAction(this.play, pointer.position.x),
                new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.porteSortie.is_closed'))
            ];
        }
        return super.use(origin, pointer);
    }
    walkTo(origin, pointer) {
        if (!this.open) {
            return super.walkTo(origin, pointer);
        }
        return [
            new MoveAction_1.MoveAction(this.play, pointer.position.x),
            new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.porteSortie.success_baby')),
            new TalkAction_1.TalkAction(this.play, this.play.getScene().getObject(Father_1.Father.IDENTIFIER), Translator_1.Translator.t('scene.porteSortie.success_father')),
            new TalkAction_1.TalkAction(this.play, this.play.getScene().getObject(Mother_1.Mother.IDENTIFIER), Translator_1.Translator.t('scene.porteSortie.success_mother')),
            new AppearAction_1.AppearAction(this.play, FinalAnim_1.FinalAnim.IDENTIFIER),
            new DisappearAction_1.DisappearAction(this.play, null, this.play.getBaby())
        ];
    }
    doOpen() {
        this.open = true;
    }
    static get IDENTIFIER() {
        return 'porteSortie';
    }
}
exports.OutDoor = OutDoor;
//# sourceMappingURL=OutDoor.js.map