"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ObjectInfo_1 = require("./ObjectInfo");
const SpriteInfo_1 = require("./SpriteInfo");
const Direction_1 = require("../Direction");
const Price_1 = require("./Price");
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
            new SpriteInfo_1.SpriteInfo('dispenser', [Direction_1.DIRECTION.BOTTOM], 4, -4, 3, -13, 0, 0, false, false)
        ], new Price_1.Price(70)));
        this.objectInfos.push(new ObjectInfo_1.ObjectInfo('Sofa', [
            new SpriteInfo_1.SpriteInfo('sofa', [Direction_1.DIRECTION.LEFT, Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.RIGHT, Direction_1.DIRECTION.BOTTOM], 0, -8, 3, 0, 0, 0, null, false)
        ], new Price_1.Price(10)));
        this.objectInfos.push(new ObjectInfo_1.ObjectInfo('Desk', [
            new SpriteInfo_1.SpriteInfo('chair', [Direction_1.DIRECTION.BOTTOM, Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.LEFT], -10, -8, 5, 0, 0, 0, false, false),
            new SpriteInfo_1.SpriteInfo('desk', [], 0, 0, 4, 0, 0, 0, false, false)
        ], new Price_1.Price(20)));
        this.objectInfos.push(new ObjectInfo_1.ObjectInfo('Table', [
            new SpriteInfo_1.SpriteInfo('chair2', [Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.LEFT], -8, -9, 5, 0, 1, 1, false, false),
            new SpriteInfo_1.SpriteInfo('table', [], 0, 0, 4, 0, 1, 1, false, false),
            new SpriteInfo_1.SpriteInfo('chair2', [Direction_1.DIRECTION.BOTTOM, Direction_1.DIRECTION.LEFT], -8, -9, 5, 0, 1, 0, false, false),
            new SpriteInfo_1.SpriteInfo('table', [], 0, 0, 4, 0, 1, 0, false, false),
            new SpriteInfo_1.SpriteInfo('table_reverse', [], 0, 0, 10, 0, 0, 1, true, true),
            new SpriteInfo_1.SpriteInfo('chair2_reverse', [Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.RIGHT], 6, -5, 5, 0, 0, 1, true, true),
            new SpriteInfo_1.SpriteInfo('table_reverse', [], 0, 0, 10, 0, 0, 0, true, true),
            new SpriteInfo_1.SpriteInfo('chair2_reverse', [Direction_1.DIRECTION.BOTTOM, Direction_1.DIRECTION.RIGHT], 6, -5, 5, 0, 0, 0, true, true),
        ], new Price_1.Price(12)));
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