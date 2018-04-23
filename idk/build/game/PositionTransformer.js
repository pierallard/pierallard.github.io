"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
exports.CELL_WIDTH = 40;
exports.CELL_HEIGHT = 20;
class PositionTransformer {
    static getRealPosition(point) {
        return this.addGap(new PIXI.Point(app_1.WORLD_WIDTH / 2, app_1.WORLD_HEIGHT), point);
    }
    static getCellPosition(point) {
        return new PIXI.Point(Math.floor((point.y - app_1.WORLD_HEIGHT) / (2 * (-exports.CELL_HEIGHT / 2)) +
            (point.x - (app_1.WORLD_WIDTH / 2)) / (2 * (-exports.CELL_WIDTH / 2))), Math.floor((point.y - app_1.WORLD_HEIGHT) / (2 * (-exports.CELL_HEIGHT / 2)) -
            (point.x - (app_1.WORLD_WIDTH / 2)) / (2 * (-exports.CELL_WIDTH / 2))));
    }
    static dist(position1, position2) {
        return (position1.x - position2.x) * (position1.x - position2.x) +
            (position1.y - position2.y) * (position1.y - position2.y);
    }
    static isNeighbor(position1, position2) {
        return this.dist(position1, position2) === 1;
    }
    static getCentroid(points) {
        return new PIXI.Point(points.reduce((sum, point) => { return sum + point.x; }, 0) / points.length, points.reduce((sum, point) => { return sum + point.y; }, 0) / points.length);
    }
    static addGap(realPosition, cellGap) {
        return new PIXI.Point(realPosition.x - (cellGap.x - cellGap.y) * exports.CELL_WIDTH / 2, realPosition.y - (cellGap.x + cellGap.y) * exports.CELL_HEIGHT / 2);
    }
}
exports.PositionTransformer = PositionTransformer;
//# sourceMappingURL=PositionTransformer.js.map