"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanPropertiesFactory_1 = require("./human_stuff/HumanPropertiesFactory");
const SmoothValue_1 = require("./SmoothValue");
class LevelManager {
    constructor() {
        this.level = 1;
        this.goals = {};
        this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER] = 10;
        this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING] = 10;
        this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE] = 10;
        this.levels = {};
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER] = new SmoothValue_1.SmoothValue(0);
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING] = new SmoothValue_1.SmoothValue(0);
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE] = new SmoothValue_1.SmoothValue(0);
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER].setMaxValue(this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER]);
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING].setMaxValue(this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING]);
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE].setMaxValue(this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE]);
    }
    getLevelProgress(type) {
        return this.levels[type].getValue() / this.goals[type];
    }
    addLevelProgress(type, value) {
        this.levels[type].add(value, Phaser.Timer.SECOND * 5);
    }
    update() {
        if (this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER].getValue() >= this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER] &&
            this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING].getValue() >= this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING] &&
            this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE].getValue() >= this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE]) {
            this.level += 1;
            this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER].setValue(0);
            this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING].setValue(0);
            this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE].setValue(0);
            this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER] = this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER] * 2;
            this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING] = this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING] * 2;
            this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE] = this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE] * 2;
            this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER].setMaxValue(this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER]);
            this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING].setMaxValue(this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING]);
            this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE].setMaxValue(this.goals[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE]);
        }
    }
}
exports.LevelManager = LevelManager;
//# sourceMappingURL=LevelManager.js.map