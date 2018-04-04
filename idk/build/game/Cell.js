"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = require("./PositionTransformer");
const WorldKnowledge_1 = require("./WorldKnowledge");
class Cell {
    constructor(point) {
        this.position = point;
    }
    create(game, group) {
        this.sprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y, WorldKnowledge_1.DEBUG_WORLD ? 'casedefault' : 'woodcell');
        this.sprite.anchor.setTo(0.5, 1);
        group.add(this.sprite);
    }
    getPosition() {
        return this.position;
    }
}
exports.Cell = Cell;
//# sourceMappingURL=Cell.js.map