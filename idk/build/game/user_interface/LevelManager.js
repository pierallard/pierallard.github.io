"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanPropertiesFactory_1 = require("../human_stuff/HumanPropertiesFactory");
const SmoothValue_1 = require("../SmoothValue");
const Price_1 = require("../objects/Price");
const DEVELOPER_RATIO = 500;
const MARKETING_RATIO = 5;
const SALE_RATIO = 10;
const STARTING_LEVEL = 1;
const GLOBAL_PROGRESS_EARN = 7;
class LevelManager {
    constructor() {
        this.level = STARTING_LEVEL;
        this.starts = {};
        this.starts[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER] = 0;
        this.starts[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING] = 0;
        this.starts[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE] = 0;
        this.levels = {};
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER] = new SmoothValue_1.SmoothValue(0);
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING] = new SmoothValue_1.SmoothValue(0);
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE] = new SmoothValue_1.SmoothValue(0);
    }
    getLevelProgress(type) {
        return Math.min((this.levels[type].getValue() - this.starts[type]) / (this.getGoal(type) - this.starts[type]), 1);
    }
    getLevelValue(type) {
        return this.levels[type].getValue();
    }
    addLevelProgress(type, value, time) {
        let realValue = 0;
        switch (type) {
            case HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER:
                realValue = value * DEVELOPER_RATIO / GLOBAL_PROGRESS_EARN;
                break;
            case HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING:
                realValue = value * MARKETING_RATIO / GLOBAL_PROGRESS_EARN;
                break;
            case HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE:
                realValue = value * SALE_RATIO / GLOBAL_PROGRESS_EARN;
                break;
        }
        this.levels[type].add(realValue, time);
    }
    update() {
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER].update();
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING].update();
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE].update();
        if (this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER].getValue() >= this.getGoal(HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER) &&
            this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING].getValue() >= this.getGoal(HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING) &&
            this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE].getValue() >= this.getGoal(HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE)) {
            this.starts[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER] = this.getGoal(HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER);
            this.starts[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING] = this.getGoal(HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING);
            this.starts[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE] = this.getGoal(HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE);
            this.level += 1;
            return true;
        }
        return false;
    }
    getLevel() {
        return this.level;
    }
    getGoal(type) {
        if (this.level <= 1 && type === HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE) {
            return 0;
        }
        if (this.level <= 2 && type === HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING) {
            return 0;
        }
        switch (type) {
            case HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER: return DEVELOPER_RATIO * Math.pow(2, this.level - 1);
            case HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE: return SALE_RATIO * Math.pow(2, this.level - 2);
            case HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING: return MARKETING_RATIO * Math.pow(2, this.level - 3);
        }
    }
    getEarnedMoney() {
        return new Price_1.Price(1000 * Math.pow(2, this.level - 1));
    }
    getSoftwarePrice() {
        return new Price_1.Price(this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER].getValue() / 2);
    }
}
exports.LevelManager = LevelManager;
//# sourceMappingURL=LevelManager.js.map