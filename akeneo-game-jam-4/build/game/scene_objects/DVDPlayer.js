"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = require("./SceneObject");
const MoveAction_1 = require("../actions/MoveAction");
const RemoveInventoryAction_1 = require("../actions/RemoveInventoryAction");
const Father_1 = require("./Father");
const app_1 = require("../../app");
class DVDPlayer extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, DVDPlayer.IDENTIFIER, 420 * app_1.SimpleGame.SCALE, 44 * app_1.SimpleGame.SCALE, 'dvdplayer');
    }
    use(origin, pointer) {
        let object = this.play.getCursor().getInventoryObject();
        if (null !== object && object.getIdentifier() === 'dvdporno') {
            let father = this.play.getScene().getObject(Father_1.Father.IDENTIFIER);
            father.setBusy();
            return [
                new MoveAction_1.MoveAction(this.play, pointer.position.x),
                new RemoveInventoryAction_1.RemoveInventoryAction(this.play, object)
            ];
        }
        return super.use(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'dvdplayer';
    }
}
exports.DVDPlayer = DVDPlayer;
//# sourceMappingURL=DVDPlayer.js.map