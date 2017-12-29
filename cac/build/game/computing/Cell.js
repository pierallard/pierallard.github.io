"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ground_1 = require("../map/Ground");
const Play_1 = require("../game_state/Play");
class Cell {
    static cellToReal(position) {
        return Ground_1.GROUND_SIZE * Play_1.SCALE * position + (Ground_1.GROUND_SIZE * Play_1.SCALE) / 2;
    }
    static realToCell(position) {
        return Math.round((position - (Ground_1.GROUND_SIZE * Play_1.SCALE) / 2) / (Ground_1.GROUND_SIZE * Play_1.SCALE));
    }
}
exports.Cell = Cell;
//# sourceMappingURL=Cell.js.map