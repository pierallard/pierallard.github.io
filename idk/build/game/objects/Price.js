"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Price {
    constructor(value) {
        this.value = value;
    }
    getStringValue() {
        return Math.ceil(this.value).toString() + " FLOOZ";
    }
    isGreaterThan(value) {
        return this.value >= value.value;
    }
    substract(value) {
        this.value -= value.value;
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