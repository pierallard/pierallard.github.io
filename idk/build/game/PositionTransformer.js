"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
exports.CELL_WIDTH = 40;
exports.CELL_HEIGHT = 20;
class PositionTransformer {
    static getRealPosition(point) {
        return new PIXI.Point(app_1.GAME_WIDTH / 2 - (point.x - point.y) * exports.CELL_WIDTH / 2, app_1.GAME_HEIGHT - (point.x + point.y) * exports.CELL_HEIGHT / 2);
    }
    static getCellPosition(point) {
        const x2 = point.x;
        const y2 = point.y;
        const a = -exports.CELL_WIDTH / 2;
        const c = -exports.CELL_HEIGHT / 2;
        const b = app_1.GAME_WIDTH / 2;
        const d = app_1.GAME_HEIGHT;
        return new PIXI.Point(Math.floor((y2 - d) / (2 * c) + (x2 - b) / (2 * a)), Math.floor((y2 - d) / (2 * c) - (x2 - b) / (2 * a)));
    }
}
exports.PositionTransformer = PositionTransformer;
//# sourceMappingURL=PositionTransformer.js.map