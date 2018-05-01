"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Gauge_1 = require("./Gauge");
const Pico8Colors_1 = require("../Pico8Colors");
const MoodSprite_1 = require("../human_stuff/MoodSprite");
class ColoredGauge extends Gauge_1.Gauge {
    constructor(width, height = null) {
        super(width, Pico8Colors_1.COLOR.WHITE, height);
    }
    getColor() {
        return MoodSprite_1.MoodSprite.getColor(this.value);
    }
}
exports.ColoredGauge = ColoredGauge;
//# sourceMappingURL=ColoredGauge.js.map