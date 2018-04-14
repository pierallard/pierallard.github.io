"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractObject_1 = require("./AbstractObject");
const ObjectDeleter_1 = require("./ObjectDeleter");
const Play_1 = require("../game_state/Play");
class Dispenser extends AbstractObject_1.AbstractObject {
    create(game, groups) {
        super.create(game, groups);
        ObjectDeleter_1.ObjectDeleter.makeDeletable(this, game, groups[Play_1.GROUP_INFOS]);
    }
}
exports.Dispenser = Dispenser;
//# sourceMappingURL=Dispenser.js.map