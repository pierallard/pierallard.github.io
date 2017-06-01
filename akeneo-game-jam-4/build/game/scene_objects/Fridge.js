"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = require("./SceneObject");
const UpdateAction_1 = require("../actions/UpdateAction");
const TalkAction_1 = require("../actions/TalkAction");
const MoveAction_1 = require("../actions/MoveAction");
const AppearAction_1 = require("../actions/AppearAction");
const DisappearAction_1 = require("../actions/DisappearAction");
const app_1 = require("../../app");
const Translator_1 = require("../translations/Translator");
class Fridge extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, Fridge.IDENTIFIER, 294 * app_1.SimpleGame.SCALE, 42 * app_1.SimpleGame.SCALE, 'fridgeClose');
        this.open = false;
    }
    use(origin, pointer) {
        if (null !== this.play.getCursor().getInventoryObject()) {
            return super.use(origin, pointer);
        }
        let actions = [
            new MoveAction_1.MoveAction(this.play, pointer.position.x)
        ];
        if (this.open) {
            actions.push(new UpdateAction_1.UpdateAction(this.play, this, 'fridgeClose'));
            actions.push(new DisappearAction_1.DisappearAction(this.play, 'coldMeat'));
        }
        else {
            actions.push(new UpdateAction_1.UpdateAction(this.play, this, 'fridgeOpen'));
            actions.push(new AppearAction_1.AppearAction(this.play, 'coldMeat'));
        }
        this.open = !this.open;
        return actions;
    }
    lookAt(origin, pointer) {
        if (this.open) {
            return [
                new TalkAction_1.TalkAction(this.play, this.play.getBaby(), Translator_1.Translator.t('scene.fridge.look_open')),
            ];
        }
        else {
            return super.lookAt(origin, pointer);
        }
    }
    static get IDENTIFIER() {
        return 'fridge';
    }
}
exports.Fridge = Fridge;
//# sourceMappingURL=Fridge.js.map