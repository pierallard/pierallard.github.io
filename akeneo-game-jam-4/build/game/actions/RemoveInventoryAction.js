"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("./Action");
class RemoveInventoryAction extends Action_1.Action {
    constructor(play, object) {
        super(play);
        this.objectIdentifier = object;
    }
    execute() {
        this.play.getInventory().removeItem(this.objectIdentifier);
        return true;
    }
    debugText() {
        return undefined;
    }
}
exports.RemoveInventoryAction = RemoveInventoryAction;
//# sourceMappingURL=RemoveInventoryAction.js.map