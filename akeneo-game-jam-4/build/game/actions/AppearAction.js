"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("./Action");
class AppearAction extends Action_1.Action {
    constructor(play, objectIdentifier) {
        super(play);
        this.objectIdentifier = objectIdentifier;
    }
    execute() {
        let object = this.play.getScene().getObject(this.objectIdentifier);
        if (null !== object) {
            object.display();
        }
        return true;
    }
    debugText() {
        return 'Appear ' + this.objectIdentifier;
    }
}
exports.AppearAction = AppearAction;
//# sourceMappingURL=AppearAction.js.map