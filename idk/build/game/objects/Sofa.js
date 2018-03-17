"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = require("../PositionTransformer");
exports.SOFA_GAP_FROM_BOTTOM = 8;
exports.SOFA_GAP_FROM_LEFT = 0;
class Sofa {
    constructor(point) {
        this.position = point;
    }
    create(game, group) {
        this.sprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y, 'sofa');
        this.sprite.anchor.set(0.5 + exports.SOFA_GAP_FROM_LEFT / this.sprite.width, 1.0 + exports.SOFA_GAP_FROM_BOTTOM / this.sprite.height);
        group.add(this.sprite);
    }
    getPosition() {
        return this.position;
    }
}
exports.Sofa = Sofa;
//# sourceMappingURL=Sofa.js.map