"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = require("./PositionTransformer");
class Floor {
    constructor(point, key = 'woodcell') {
        this.position = point;
        this.key = key;
    }
    create(game, group) {
        this.sprite = game.add.sprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.position).x, PositionTransformer_1.PositionTransformer.getRealPosition(this.position).y, this.key);
        this.sprite.anchor.setTo(0.5, (1 + 2.1) / 2);
        group.add(this.sprite);
    }
    getPosition() {
        return this.position;
    }
}
exports.Floor = Floor;
//# sourceMappingURL=Floor.js.map