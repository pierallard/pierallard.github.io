"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Wall_1 = require("./Wall");
class Window extends Wall_1.Wall {
    create(game, group, hasWallLeft, hasWallTop, hasWallRight, hasWallBottom) {
        super.create(game, group, hasWallLeft, hasWallTop, hasWallRight, hasWallBottom);
        if (hasWallLeft) {
            this.sprite.loadTexture('wall', 16);
        }
        else {
            this.sprite.loadTexture('wall', 17);
        }
    }
}
exports.Window = Window;
//# sourceMappingURL=Window.js.map