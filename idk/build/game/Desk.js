"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = require("./PositionTransformer");
class Desk {
    constructor(game, group, point) {
        this.position = point;
        this.chairSprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(point).x, PositionTransformer_1.PositionTransformer.getRealPosition(point).y, 'chair');
        this.deskSprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(point).x, PositionTransformer_1.PositionTransformer.getRealPosition(point).y, 'desk');
        this.chairSprite.anchor.set(0.5, 1);
        this.deskSprite.anchor.set(0.5, 1);
        if (Math.random() >= 0.5) {
            this.deskSprite.scale.set(-1, 1);
            this.chairSprite.scale.set(-1, 1);
        }
        group.add(this.chairSprite);
        group.add(this.deskSprite);
    }
    getPosition() {
        return this.position;
    }
}
exports.Desk = Desk;
//# sourceMappingURL=Desk.js.map