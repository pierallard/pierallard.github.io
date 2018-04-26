"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TIME_GAP = Phaser.Timer.SECOND / 10;
class SmoothValue {
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    add(value, milliseconds = Phaser.Timer.SECOND) {
        if (milliseconds < TIME_GAP) {
            this.value += value;
            return;
        }
        setTimeout(() => {
            const numberOfSteps = milliseconds / TIME_GAP;
            const valuePerStep = value / numberOfSteps;
            this.value += valuePerStep;
            if (this.maxValue) {
                this.value = Math.min(this.value, this.maxValue);
            }
            if (this.minValue) {
                this.value = Math.max(this.value, this.minValue);
            }
            this.add(value - valuePerStep, milliseconds - TIME_GAP);
        }, TIME_GAP);
    }
    setMaxValue(number) {
        this.maxValue = number;
    }
    setMinValue(number) {
        this.minValue = number;
    }
    setValue(number) {
        this.value = number;
    }
}
exports.SmoothValue = SmoothValue;
//# sourceMappingURL=SmoothValue.js.map