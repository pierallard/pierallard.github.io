"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("./Action");
class UpdateAction extends Action_1.Action {
    constructor(play, origin, newTexture) {
        super(play);
        this.origin = origin;
        this.newTexture = newTexture;
    }
    execute() {
        this.origin.loadTexture(this.newTexture);
        return true;
    }
    debugText() {
        return 'Update ' + this.newTexture;
    }
}
exports.UpdateAction = UpdateAction;
//# sourceMappingURL=UpdateAction.js.map