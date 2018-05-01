"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Price {
    constructor(value) {
        this.value = value;
    }
    getStringValue() {
        if (this.value >= 10000000) {
            return Math.round(this.value / 100000) / 10 + ' m$';
        }
        if (this.value >= 10000) {
            return Math.round(this.value / 100) / 10 + ' k$';
        }
        return Math.ceil(this.value).toString() + " $";
    }
    isGreaterThan(value) {
        return this.value >= value.value;
    }
    add(value) {
        this.value += value.value;
    }
    getValue() {
        return this.value;
    }
}
exports.Price = Price;
//# sourceMappingURL=Price.js.map