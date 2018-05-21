"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanPropertiesFactory_1 = require("./HumanPropertiesFactory");
const UserInterface_1 = require("../user_interface/UserInterface");
const LevelManager_1 = require("../user_interface/LevelManager");
class EmployeeLevelRegister {
    constructor(levelManager) {
        this.levelManager = levelManager;
        this.levels = {};
        this.lastLevels = {};
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER] = [];
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE] = [];
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING] = [];
        this.lastLevels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER] = 0;
        this.lastLevels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE] = 0;
        this.lastLevels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING] = 0;
    }
    create(game) {
        game.time.events.loop(Phaser.Timer.SECOND * 2, this.updateCounts, this);
    }
    updateCounts() {
        const dev = this.levelManager.getLevelValue(HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER) / LevelManager_1.DEVELOPER_RATIO;
        const sal = this.levelManager.getLevelValue(HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE) / LevelManager_1.SALE_RATIO;
        const mar = this.levelManager.getLevelValue(HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING) / LevelManager_1.MARKETING_RATIO;
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER].push(dev - this.lastLevels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER]);
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE].push(sal - this.lastLevels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE]);
        this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING].push(mar - this.lastLevels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING]);
        this.lastLevels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER] = dev;
        this.lastLevels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE] = sal;
        this.lastLevels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING] = mar;
    }
    getLastCounts() {
        let result = [[], [], []];
        for (let i = 0; i < UserInterface_1.INTERFACE_WIDTH; i++) {
            result[0].push(this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER][this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER].length - 1 - i]);
            result[1].push(this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE][this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE].length - 1 - i]);
            result[2].push(this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING][this.levels[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING].length - 1 - i]);
        }
        return result;
    }
}
exports.EmployeeLevelRegister = EmployeeLevelRegister;
//# sourceMappingURL=EmployeeLevelRegister.js.map