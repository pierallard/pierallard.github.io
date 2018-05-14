"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = require("./PositionTransformer");
const WorldKnowledge_1 = require("./WorldKnowledge");
class Cell {
    constructor(point) {
        this.position = point;
    }
    create(game, group) {
        if (WorldKnowledge_1.DEBUG_WORLD) {
            this.sprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y, 'casedefault');
            this.sprite.anchor.setTo(0.5, 1);
            this.sprite.alpha = 0.5;
            group.add(this.sprite);
        }
    }
    getPosition() {
        return this.position;
    }
}
exports.Cell = Cell;
//# sourceMappingURL=Cell.js.map