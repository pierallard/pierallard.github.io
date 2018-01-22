"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("../computing/Cell");
const ConstructableBuilding_1 = require("./ConstructableBuilding");
const HelipadSprite_1 = require("../sprite/HelipadSprite");
class Helipad extends ConstructableBuilding_1.ConstructableBuilding {
    constructor(worldKnowledge, cellPosition, player) {
        super(worldKnowledge, cellPosition, player);
        this.loading = false;
    }
    create(game, groups) {
        this.sprite = new HelipadSprite_1.HelipadSprite(game, groups, Cell_1.Cell.cellToReal(this.cellPosition.x), Cell_1.Cell.cellToReal(this.cellPosition.y), 'Starport');
    }
    runLoadAnimation() {
        this.sprite.runLoadAnimation();
    }
    setLoading(value) {
        this.loading = value;
    }
    isLoading() {
        return this.loading;
    }
}
exports.Helipad = Helipad;
//# sourceMappingURL=Helipad.js.map