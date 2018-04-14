"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
const app_1 = require("../../app");
const ObjectSeller_1 = require("./ObjectSeller");
exports.INTERFACE_WIDTH = 100;
class UserInterface {
    constructor(worldKnowledge) {
        this.objectSeller = new ObjectSeller_1.ObjectSeller(worldKnowledge);
    }
    create(game, groups) {
        const interfaceGroup = groups[Play_1.GROUP_INTERFACE];
        this.backgroundGraphics = game.add.graphics(app_1.CAMERA_WIDTH_PIXELS - exports.INTERFACE_WIDTH, 0, interfaceGroup);
        this.backgroundGraphics.beginFill(0x272a60);
        this.backgroundGraphics.drawRect(0, 0, exports.INTERFACE_WIDTH, app_1.CAMERA_HEIGHT_PIXELS);
        interfaceGroup.add(this.backgroundGraphics);
        for (let i = 0; i < 10; i++) {
            this.backgroundGraphics.endFill();
            this.backgroundGraphics.lineStyle(1, 0xffffff);
            this.backgroundGraphics.drawRect(0, 10 + i * ObjectSeller_1.OBJECT_SELLER_CELL_SIZE, ObjectSeller_1.OBJECT_SELLER_CELL_SIZE, ObjectSeller_1.OBJECT_SELLER_CELL_SIZE);
        }
        this.objectSeller.create(game, groups);
    }
    update() {
        this.objectSeller.update();
    }
}
exports.UserInterface = UserInterface;
//# sourceMappingURL=UserInterface.js.map