"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ObjectInfo_1 = require("./ObjectInfo");
const SpriteInfo_1 = require("./SpriteInfo");
const Direction_1 = require("../Direction");
class ObjectInfoRegistry {
    static getObjectInfo(name) {
        if (this.objectInfos === null) {
            this.generateObjectInfos();
        }
        for (let i = 0; i < this.objectInfos.length; i++) {
            if (this.objectInfos[i].getName() === name) {
                return this.objectInfos[i];
            }
        }
        throw "Impossible to find info for " + name;
    }
    static generateObjectInfos() {
        this.objectInfos = [];
        this.objectInfos.push(new ObjectInfo_1.ObjectInfo('Dispenser', [
            new SpriteInfo_1.SpriteInfo('dispenser', 4, -4, 3, -13)
        ], [Direction_1.DIRECTION.BOTTOM]));
        this.objectInfos.push(new ObjectInfo_1.ObjectInfo('Sofa', [
            new SpriteInfo_1.SpriteInfo('sofa', 0, -8, 3, 0)
        ], [Direction_1.DIRECTION.LEFT, Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.RIGHT, Direction_1.DIRECTION.BOTTOM]));
        this.objectInfos.push(new ObjectInfo_1.ObjectInfo('Desk', [
            new SpriteInfo_1.SpriteInfo('chair', -10, -8, 5, 0),
            new SpriteInfo_1.SpriteInfo('desk', 0, 0, 4, 0)
        ], [Direction_1.DIRECTION.BOTTOM, Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.LEFT]));
    }
    static getSellableObjects() {
        if (this.objectInfos === null) {
            this.generateObjectInfos();
        }
        return this.objectInfos;
    }
}
ObjectInfoRegistry.objectInfos = null;
exports.ObjectInfoRegistry = ObjectInfoRegistry;
//# sourceMappingURL=ObjectInfoRegistry.js.map