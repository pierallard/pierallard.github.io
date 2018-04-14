"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
const AbstractObject_1 = require("./AbstractObject");
const ObjectDeleter_1 = require("./ObjectDeleter");
class Desk extends AbstractObject_1.AbstractObject {
    create(game, groups) {
        super.create(game, groups);
        ObjectDeleter_1.ObjectDeleter.makeDeletable(this, game, groups[Play_1.GROUP_INFOS]);
    }
}
exports.Desk = Desk;
//# sourceMappingURL=Desk.js.map