"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanPropertiesFactory_1 = require("./HumanPropertiesFactory");
const UserInterface_1 = require("../user_interface/UserInterface");
class EmployeeCountRegister {
    constructor(humanRepository) {
        this.humanRepository = humanRepository;
        this.counts = {};
        this.counts[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER] = [];
        this.counts[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE] = [];
        this.counts[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING] = [];
    }
    create(game) {
        game.time.events.loop(Phaser.Timer.SECOND * 2, this.updateCounts, this);
    }
    updateCounts() {
        this.counts[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER].push(this.humanRepository.getCount(HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER));
        this.counts[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE].push(this.humanRepository.getCount(HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE));
        this.counts[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING].push(this.humanRepository.getCount(HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING));
    }
    getLastCounts() {
        let result = [[], [], []];
        for (let i = 0; i < UserInterface_1.INTERFACE_WIDTH; i++) {
            result[0].push(this.counts[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER][this.counts[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER].length - 1 - i]);
            result[1].push(this.counts[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE][this.counts[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE].length - 1 - i]);
            result[2].push(this.counts[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING][this.counts[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING].length - 1 - i]);
        }
        return result;
    }
}
exports.EmployeeCountRegister = EmployeeCountRegister;
//# sourceMappingURL=EmployeeCountRegister.js.map