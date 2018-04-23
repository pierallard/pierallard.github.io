"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanPropertiesFactory_1 = require("./HumanPropertiesFactory");
class HumanProperties {
    constructor(type, name, salary, speed, quality, perseverance) {
        this.type = type;
        this.name = name;
        this.salary = salary;
        this.speed = speed;
        this.quality = quality;
        this.perseverance = perseverance;
    }
    getSpriteKey() {
        switch (this.type) {
            case HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER: return 'human';
            case HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING: return 'human_pink';
            case HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE: return 'human_red';
        }
    }
    getName() {
        return this.name;
    }
    getSpeed() {
        return this.speed;
    }
    getStrType() {
        switch (this.type) {
            case HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER: return 'Developer';
            case HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING: return 'Marketing';
            case HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE: return 'Sale';
        }
    }
    getPerseverance() {
        return this.perseverance;
    }
    getType() {
        return this.type;
    }
}
exports.HumanProperties = HumanProperties;
//# sourceMappingURL=HumanProperties.js.map