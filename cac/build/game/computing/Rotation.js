"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ROTATION;
(function (ROTATION) {
    ROTATION[ROTATION["RIGHT"] = 0] = "RIGHT";
    ROTATION[ROTATION["TOP_RIGHT"] = 1] = "TOP_RIGHT";
    ROTATION[ROTATION["TOP"] = 2] = "TOP";
    ROTATION[ROTATION["TOP_LEFT"] = 3] = "TOP_LEFT";
    ROTATION[ROTATION["LEFT"] = 4] = "LEFT";
    ROTATION[ROTATION["BOTTOM_LEFT"] = 5] = "BOTTOM_LEFT";
    ROTATION[ROTATION["BOTTOM"] = 6] = "BOTTOM";
    ROTATION[ROTATION["BOTTOM_RIGHT"] = 7] = "BOTTOM_RIGHT";
})(ROTATION = exports.ROTATION || (exports.ROTATION = {}));
class Rotation {
    static getRotation(vector) {
        if (null === vector) {
            return ROTATION.TOP_LEFT;
        }
        const angle = Math.atan2(vector.y, vector.x);
        if (angle > Math.PI / 8 * 7) {
            return ROTATION.LEFT;
        }
        if (angle > Math.PI / 8 * 5) {
            return ROTATION.BOTTOM_LEFT;
        }
        if (angle > Math.PI / 8 * 3) {
            return ROTATION.BOTTOM;
        }
        if (angle > Math.PI / 8) {
            return ROTATION.BOTTOM_RIGHT;
        }
        if (angle > Math.PI / 8 * -1) {
            return ROTATION.RIGHT;
        }
        if (angle > Math.PI / 8 * -3) {
            return ROTATION.TOP_RIGHT;
        }
        if (angle > Math.PI / 8 * -5) {
            return ROTATION.TOP;
        }
        if (angle > Math.PI / 8 * -7) {
            return ROTATION.TOP_LEFT;
        }
        return ROTATION.LEFT;
    }
}
exports.Rotation = Rotation;
//# sourceMappingURL=Rotation.js.map