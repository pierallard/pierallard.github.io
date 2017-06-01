"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = require("./SceneObject");
const MoveAction_1 = require("../actions/MoveAction");
const RemoveInventoryAction_1 = require("../actions/RemoveInventoryAction");
const UpdateAction_1 = require("../actions/UpdateAction");
const TalkAction_1 = require("../actions/TalkAction");
const app_1 = require("../../app");
const Translator_1 = require("../translations/Translator");
class Mother extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, Mother.IDENTIFIER, 323 * app_1.SimpleGame.SCALE, 66 * app_1.SimpleGame.SCALE, 'mother');
        this.zippo = false;
        this.bedo = false;
        this.sprite.anchor.setTo(0, 1);
    }
    isDefoncee() {
        return this.zippo && this.bedo;
    }
    static get IDENTIFIER() {
        return 'mother';
    }
    use(origin, pointer) {
        let object = this.play.getCursor().getInventoryObject();
        if (null !== object) {
            if (object.getIdentifier() === 'bedo') {
                this.bedo = true;
                let result = [
                    new MoveAction_1.MoveAction(this.play, origin.getPosition().x - 800),
                    new RemoveInventoryAction_1.RemoveInventoryAction(this.play, object)
                ];
                if (!this.zippo) {
                    result.push(new TalkAction_1.TalkAction(this.play, this, Translator_1.Translator.t('scene.mother.bedo')));
                }
                else {
                    result.push(new TalkAction_1.TalkAction(this.play, this, Translator_1.Translator.t('scene.mother.success')), new UpdateAction_1.UpdateAction(this.play, this, 'motherdefoncee'));
                }
                return result;
            }
            if (object.getIdentifier() === 'zippo') {
                this.zippo = true;
                let result = [
                    new MoveAction_1.MoveAction(this.play, origin.getPosition().x - 800),
                    new RemoveInventoryAction_1.RemoveInventoryAction(this.play, object)
                ];
                if (!this.bedo) {
                    result.push(new TalkAction_1.TalkAction(this.play, this, Translator_1.Translator.t('scene.mother.zippo')));
                }
                else {
                    result.push(new TalkAction_1.TalkAction(this.play, this, Translator_1.Translator.t('scene.mother.success')), new UpdateAction_1.UpdateAction(this.play, this, 'motherdefoncee'));
                }
                return result;
            }
        }
        return super.use(origin, pointer);
    }
    lookAt(origin, pointer) {
        return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.mother.description'))];
    }
    getStroke() {
        return '#d77bba';
    }
}
exports.Mother = Mother;
//# sourceMappingURL=Mother.js.map