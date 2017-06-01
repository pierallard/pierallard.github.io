"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MoveAction_1 = require("../actions/MoveAction");
const TakeAction_1 = require("../actions/TakeAction");
const SceneObject_1 = require("./SceneObject");
class PickableObject extends SceneObject_1.SceneObject {
    constructor(play, identifier, x, y, key, generatedObjectIdentifier, display = true) {
        super(play, identifier, x, y, key);
        this.generatedObjectIdentifier = generatedObjectIdentifier;
        if (!display) {
            this.hide();
        }
    }
    getGeneratedObjectIdentifier() {
        return this.generatedObjectIdentifier;
    }
    pickUp(origin, pointer) {
        return [
            new MoveAction_1.MoveAction(this.play, pointer.position.x),
            new TakeAction_1.TakeAction(this.play, origin),
        ];
    }
}
exports.PickableObject = PickableObject;
//# sourceMappingURL=PickableObject.js.map