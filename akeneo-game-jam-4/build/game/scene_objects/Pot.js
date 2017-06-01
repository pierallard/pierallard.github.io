"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = require("./SceneObject");
const MoveAction_1 = require("../actions/MoveAction");
const RemoveInventoryAction_1 = require("../actions/RemoveInventoryAction");
const UpdateAction_1 = require("../actions/UpdateAction");
const AppearAction_1 = require("../actions/AppearAction");
const DisappearAction_1 = require("../actions/DisappearAction");
const TalkAction_1 = require("../actions/TalkAction");
const app_1 = require("../../app");
const Translator_1 = require("../translations/Translator");
class Pot extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, 'potvide', 218 * app_1.SimpleGame.SCALE, 36 * app_1.SimpleGame.SCALE, 'potvide');
        this.graines = false;
        this.lampe = false;
        this.engrais = false;
    }
    use(origin, pointer) {
        let object = this.play.getCursor().getInventoryObject();
        if (null !== object) {
            if (!this.graines) {
                if (object.getIdentifier() === 'sachet') {
                    this.graines = true;
                    return [
                        new MoveAction_1.MoveAction(this.play, pointer.position.x),
                        new RemoveInventoryAction_1.RemoveInventoryAction(this.play, object),
                        new UpdateAction_1.UpdateAction(this.play, this, 'potgraine'),
                    ];
                }
                else {
                    return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.pot.use_empty'))];
                }
            }
            else {
                if (object.getIdentifier() === 'lampePiles' || object.getIdentifier() === 'engrais') {
                    let result = [];
                    if (object.getIdentifier() === 'lampePiles') {
                        this.lampe = true;
                        result = result.concat([
                            new MoveAction_1.MoveAction(this.play, pointer.position.x),
                            new RemoveInventoryAction_1.RemoveInventoryAction(this.play, object),
                        ]);
                        if (this.engrais) {
                            return result.concat([
                                new AppearAction_1.AppearAction(this.play, 'potfull'),
                                new DisappearAction_1.DisappearAction(this.play, this.getIdentifier()),
                            ]);
                        }
                        else {
                            return result.concat([
                                new UpdateAction_1.UpdateAction(this.play, this, 'potpousse'),
                            ]);
                        }
                    }
                    else if (object.getIdentifier() === 'engrais') {
                        this.engrais = true;
                        result = result.concat([
                            new MoveAction_1.MoveAction(this.play, pointer.position.x),
                            new RemoveInventoryAction_1.RemoveInventoryAction(this.play, object),
                        ]);
                        if (this.lampe) {
                            return result.concat([
                                new AppearAction_1.AppearAction(this.play, 'potfull'),
                                new DisappearAction_1.DisappearAction(this.play, this.getIdentifier()),
                            ]);
                        }
                        else {
                            return result.concat([
                                new UpdateAction_1.UpdateAction(this.play, this, 'potpousse'),
                            ]);
                        }
                    }
                    else {
                        return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.pot.use_full'))];
                    }
                }
                else {
                    return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.pot.default_use'))];
                }
            }
        }
        return super.use(origin, pointer);
    }
    getLabel() {
        if (!this.graines) {
            return Translator_1.Translator.t('scene.pot.label_empty');
        }
        else {
            return Translator_1.Translator.t('scene.pot.label_full');
        }
    }
}
exports.Pot = Pot;
//# sourceMappingURL=Pot.js.map