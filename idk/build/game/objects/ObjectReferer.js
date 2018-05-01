"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ObjectReferer {
    constructor(object, interactivePointIdentifier) {
        this.obj = object;
        this.interactivePointIdentifier = interactivePointIdentifier;
    }
    getObject() {
        return this.obj;
    }
    isUsed() {
        return this.obj.isUsed(this.interactivePointIdentifier);
    }
    getPositionGap() {
        return this.obj.getPositionGap(this.interactivePointIdentifier);
    }
    getEntries() {
        return this.obj.getEntries(this.interactivePointIdentifier);
    }
    getPosition() {
        return this.obj.getCellPositionSubObject(this.interactivePointIdentifier);
    }
    setUsed(human) {
        this.obj.setUsed(this.interactivePointIdentifier, human);
    }
    setUnused() {
        this.obj.setUnused(this.interactivePointIdentifier);
    }
    getIdentifier() {
        return this.interactivePointIdentifier;
    }
    forceLeftOrientation() {
        return this.obj.forceLeftOrientation(this.interactivePointIdentifier);
    }
    forceTopOrientation() {
        return this.obj.forceTopOrientation(this.interactivePointIdentifier);
    }
}
exports.ObjectReferer = ObjectReferer;
//# sourceMappingURL=ObjectReferer.js.map