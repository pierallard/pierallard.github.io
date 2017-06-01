"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("./Action");
class DisappearAction extends Action_1.Action {
    constructor(play, objectIdentifier, object = null) {
        super(play);
        this.objectIdentifier = objectIdentifier;
        this.object = object;
    }
    execute() {
        let object = this.object;
        if (null === object) {
            object = this.play.getScene().getObject(this.objectIdentifier);
        }
        if (null !== object) {
            object.hide();
        }
        return true;
    }
    debugText() {
        return 'Appear ' + this.objectIdentifier;
    }
}
exports.DisappearAction = DisappearAction;
//# sourceMappingURL=DisappearAction.js.map