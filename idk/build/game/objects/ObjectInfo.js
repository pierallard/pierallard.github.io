"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Direction_1 = require("../Direction");
class ObjectInfo {
    constructor(name, spriteInfos, price) {
        this.name = name;
        this.spriteInfos = spriteInfos;
        this.price = price;
    }
    getName() {
        return this.name;
    }
    getSpriteInfos() {
        return this.spriteInfos;
    }
    getSpriteInfo(objectOrder) {
        return this.spriteInfos[objectOrder];
    }
    getEntryPoints(leftOriented, objectNumber) {
        return this.spriteInfos[objectNumber].getEntryPoints(leftOriented);
    }
    getPositionGapOfSubObject(leftOriented, subObjectNumber) {
        return this.spriteInfos[subObjectNumber].getPositionGapFromOrigin(leftOriented);
    }
    isSellable(remainingMoney) {
        return remainingMoney.isGreaterThan(this.price);
    }
    getPrice() {
        return this.price;
    }
    getCellGaps(leftOriented) {
        let result = [];
        this.spriteInfos.forEach((spriteInfo) => {
            const newGap = spriteInfo.getPositionGapFromOrigin(leftOriented);
            let found = false;
            result.forEach((previousGap) => {
                found = found || (previousGap.x === newGap.x && previousGap.y === newGap.y);
            });
            if (!found) {
                result.push(newGap);
            }
        });
        return result;
    }
    getEntryCells(origin, leftOriented) {
        let result = [];
        this.spriteInfos.forEach((spriteInfo) => {
            spriteInfo.getEntryPoints(leftOriented).forEach((entryPoint) => {
                const gap = spriteInfo.getPositionGapFromOrigin(leftOriented);
                const spriteCell = new PIXI.Point(origin.x + gap.x, origin.y + gap.y);
                result.push(Direction_1.Direction.getNeighbor(spriteCell, entryPoint));
            });
        });
        return result;
    }
}
exports.ObjectInfo = ObjectInfo;
//# sourceMappingURL=ObjectInfo.js.map