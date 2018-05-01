"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Direction_1 = require("../Direction");
class ObjectInfo {
    constructor(name, spriteInfos, entryPoints) {
        this.name = name;
        this.sprites = spriteInfos;
        this.entryPoints = entryPoints;
    }
    getName() {
        return this.name;
    }
    getSpriteInfos() {
        return this.sprites;
    }
    getEntryPoints(leftOriented) {
        if (!leftOriented) {
            return this.entryPoints;
        }
        else {
            return this.entryPoints.map((entryPoint) => {
                return Direction_1.Direction.getHorizontalMirror(entryPoint);
            });
        }
    }
}
exports.ObjectInfo = ObjectInfo;
//# sourceMappingURL=ObjectInfo.js.map