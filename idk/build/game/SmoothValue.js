"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SmoothValue {
    constructor(value) {
        this.maxValue = null;
        this.minValue = null;
        this.value = value;
        this.toto = [];
        this.lastUpdate = (new Date()).getTime();
    }
    update() {
        let i = 0;
        const diffTime = (new Date()).getTime() - this.lastUpdate;
        let changed = false;
        while (i < this.toto.length) {
            const tata = this.toto[i];
            if (tata.remainingTime <= diffTime) {
                this.value += tata.value;
                this.toto.splice(i, 1);
            }
            else {
                const diffValue = tata.value / tata.remainingTime * diffTime;
                this.value += diffValue;
                this.toto[i].value -= diffValue;
                this.toto[i].remainingTime -= diffTime;
                i++;
            }
            changed = true;
        }
        if (changed) {
            if (this.maxValue && this.value > this.maxValue) {
                this.value = this.maxValue;
            }
            if (this.minValue && this.value < this.minValue) {
                this.value = this.minValue;
            }
        }
        this.lastUpdate = (new Date()).getTime();
    }
    getValue() {
        return this.value;
    }
    add(value, milliseconds = Phaser.Timer.SECOND) {
        this.toto.push({
            value: value,
            remainingTime: milliseconds
        });
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
}
exports.SmoothValue = SmoothValue;
//# sourceMappingURL=SmoothValue.js.map