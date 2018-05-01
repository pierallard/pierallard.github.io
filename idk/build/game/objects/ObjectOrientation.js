"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Direction_1 = require("../Direction");
exports.DIRECTION_LOOP = [Direction_1.DIRECTION.RIGHT, Direction_1.DIRECTION.BOTTOM, Direction_1.DIRECTION.LEFT, Direction_1.DIRECTION.TOP];
class ObjectOrientation {
    static isHorizontalMirror(direction) {
        return [Direction_1.DIRECTION.BOTTOM, Direction_1.DIRECTION.LEFT].indexOf(direction) > -1;
    }
    static isVerticalMirror(direction) {
        return [Direction_1.DIRECTION.LEFT, Direction_1.DIRECTION.TOP].indexOf(direction) > -1;
    }
    static getNextOrientation(direction, canBeTopOriented) {
        const index = exports.DIRECTION_LOOP.indexOf(direction);
        return exports.DIRECTION_LOOP[(index + 1) % (canBeTopOriented ? 4 : 2)];
    }
}
exports.ObjectOrientation = ObjectOrientation;
//# sourceMappingURL=ObjectOrientation.js.map