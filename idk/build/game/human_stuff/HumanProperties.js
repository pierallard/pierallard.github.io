"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanPropertiesFactory_1 = require("./HumanPropertiesFactory");
const Price_1 = require("../objects/Price");
const MAX_WAGE = 50;
const MIN_WAGE = 10;
exports.DAY_DURATION = 60 * Phaser.Timer.SECOND;
class HumanProperties {
    constructor(spriteVariation, type, name, speed, quality, perseverance) {
        this.spriteVariation = spriteVariation;
        this.type = type;
        this.name = name;
        this.speed = speed;
        this.experience = quality;
        this.perseverance = perseverance;
        this.wage = this.computeWage();
    }
    getSpriteKey() {
        switch (this.type) {
            case HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER: return this.spriteVariation + '_green';
            case HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING: return this.spriteVariation + '_pink';
            case HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE: return this.spriteVariation + '_red';
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
    getWage() {
        return this.wage;
    }
    getExperience() {
        return this.experience;
    }
    computeWage() {
        return (this.speed + this.perseverance + 2 * this.experience) / 4;
    }
    getRealWage() {
        return new Price_1.Price(-(MIN_WAGE + this.wage * (MAX_WAGE - MIN_WAGE)));
    }
}
exports.HumanProperties = HumanProperties;
//# sourceMappingURL=HumanProperties.js.map