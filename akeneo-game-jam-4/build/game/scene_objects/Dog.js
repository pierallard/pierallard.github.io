"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SceneObject_1 = require("./SceneObject");
const app_1 = require("../../app");
class Dog extends SceneObject_1.SceneObject {
    constructor(play) {
        super(play, Dog.IDENTIFIER, 184 * app_1.SimpleGame.SCALE, 47 * app_1.SimpleGame.SCALE, 'chien');
    }
    static get IDENTIFIER() {
        return 'dog';
    }
    getStroke() {
        return '#eec39a';
    }
}
exports.Dog = Dog;
//# sourceMappingURL=Dog.js.map