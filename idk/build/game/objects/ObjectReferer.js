"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ObjectReferer {
    constructor(object, subObjectNumber) {
        this.obj = object;
        this.subObjectNumber = subObjectNumber;
    }
    getObject() {
        return this.obj;
    }
    isUsed() {
        return this.obj.isUsed(this.subObjectNumber);
    }
    getPositionGap() {
        return this.obj.getPositionGap(this.subObjectNumber);
    }
    getEntries() {
        return this.obj.getEntries(this.subObjectNumber);
    }
    getPosition() {
        return this.obj.getCellPositionSubObject(this.subObjectNumber);
    }
    setUsed(human) {
        this.obj.setUsed(this.subObjectNumber, human);
    }
    setUnused() {
        this.obj.setUnused(this.subObjectNumber);
    }
    getIdentifier() {
        return this.subObjectNumber;
    }
}
exports.ObjectReferer = ObjectReferer;
//# sourceMappingURL=ObjectReferer.js.map