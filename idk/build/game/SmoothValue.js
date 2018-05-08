"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TIME_GAP = Phaser.Timer.SECOND / 10;
class SmoothValue {
    constructor(value) {
        this.maxValue = null;
        this.minValue = null;
        this.value = value;
    }
    create(game) {
        this.game = game;
    }
    getValue() {
        return this.value;
    }
    add(value, milliseconds = Phaser.Timer.SECOND) {
        if (isNaN(value)) {
            debugger;
        }
        if (milliseconds < TIME_GAP) {
            this.value += value;
        }
        else {
            this.game.time.events.add(TIME_GAP, () => {
                const numberOfSteps = milliseconds / TIME_GAP;
                const valuePerStep = value / numberOfSteps;
                this.value += valuePerStep;
                this.add(value - valuePerStep, milliseconds - TIME_GAP);
            }, this);
        }
        if (this.maxValue !== null) {
            this.value = Math.min(this.value, this.maxValue);
        }
        if (this.minValue !== null) {
            this.value = Math.max(this.value, this.minValue);
        }
    }
    setMaxValue(number) {
        this.maxValue = number;
    }
    setMinValue(number) {
        this.minValue = number;
    }
    setValue(number) {
        this.add(number - this.value);
    }
    setInstantValue(number) {
        this.value = number;
    }
}
exports.SmoothValue = SmoothValue;
//# sourceMappingURL=SmoothValue.js.map