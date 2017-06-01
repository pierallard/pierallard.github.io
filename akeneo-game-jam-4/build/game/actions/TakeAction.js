"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("./Action");
class TakeAction extends Action_1.Action {
    constructor(play, object) {
        super(play);
        this.object = object;
    }
    execute() {
        this.play.getInventory().activeItem(this.object.getGeneratedObjectIdentifier());
        this.object.destroy();
        return true;
    }
    debugText() {
        return 'Take ' + this.object;
    }
}
exports.TakeAction = TakeAction;
//# sourceMappingURL=TakeAction.js.map