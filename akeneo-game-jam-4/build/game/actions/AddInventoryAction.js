"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("./Action");
class AddInventoryAction extends Action_1.Action {
    constructor(play, objectIndentifier) {
        super(play);
        this.objectIdentifier = objectIndentifier;
    }
    execute() {
        this.play.getInventory().activeItem(this.objectIdentifier);
        return true;
    }
    debugText() {
        return undefined;
    }
}
exports.AddInventoryAction = AddInventoryAction;
//# sourceMappingURL=AddInventoryAction.js.map