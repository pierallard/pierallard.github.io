"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Employee_1 = require("../human_stuff/Employee");
const HumanPropertiesFactory_1 = require("../human_stuff/HumanPropertiesFactory");
class HumanRepository {
    constructor(worldKnowledge) {
        const probabilities = {};
        probabilities[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER] = 1;
        this.humans = [
            new Employee_1.Employee(worldKnowledge.getRandomCell(), HumanPropertiesFactory_1.HumanPropertiesFactory.create(probabilities))
        ];
    }
    create(game, groups, worldKnowledge) {
        this.humans.forEach((human) => {
            human.create(game, groups, worldKnowledge);
        });
    }
    update() {
        this.humans.forEach((human) => {
            human.update();
        });
    }
    getCount(type) {
        return this.humans.filter((human) => {
            return human.getType() === type;
        }).length;
    }
}
exports.HumanRepository = HumanRepository;
//# sourceMappingURL=HumanRepository.js.map