"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = require("./SceneObject");
const UpdateAction_1 = require("../actions/UpdateAction");
const MoveAction_1 = require("../actions/MoveAction");
const AppearAction_1 = require("../actions/AppearAction");
const app_1 = require("../../app");
class Cupboard extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, Cupboard.IDENTIFIER, 270 * app_1.SimpleGame.SCALE, 43 * app_1.SimpleGame.SCALE, 'placardClose');
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
            actions.push(new UpdateAction_1.UpdateAction(this.play, this, 'placardClose'));
        }
        else {
            actions.push(new UpdateAction_1.UpdateAction(this.play, this, 'placardOpen'));
            actions.push(new AppearAction_1.AppearAction(this.play, 'engrais'));
        }
        this.open = !this.open;
        return actions;
    }
    static get IDENTIFIER() {
        return 'cupboard';
    }
}
exports.Cupboard = Cupboard;
//# sourceMappingURL=Cupboard.js.map