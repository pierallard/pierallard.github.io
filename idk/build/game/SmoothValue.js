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
            if (this.maxValue) {
                this.value = Math.min(this.value + valuePerStep, this.maxValue);
            }
            else {
                this.value += valuePerStep;
            }
            this.add(value - valuePerStep, milliseconds - TIME_GAP);
        }, TIME_GAP);
    }
    setMaxValue(number) {
        this.maxValue = number;
    }
    setValue(number) {
        this.value = number;
    }
}
exports.SmoothValue = SmoothValue;
//# sourceMappingURL=SmoothValue.js.map