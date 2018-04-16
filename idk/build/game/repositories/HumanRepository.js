"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Employee_1 = require("../human_stuff/Employee");
const HumanPropertiesFactory_1 = require("../human_stuff/HumanPropertiesFactory");
class HumanRepository {
    constructor(worldKnowledge) {
        this.humans = [
            new Employee_1.Employee(worldKnowledge.getRandomCell(), HumanPropertiesFactory_1.HumanPropertiesFactory.create())
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
    getSelectedHumanSprite() {
        for (let i = 0; i < this.humans.length; i++) {
            if (this.humans[i].isSelected()) {
                return this.humans[i].getSprite();
            }
        }
        return null;
    }
}
exports.HumanRepository = HumanRepository;
//# sourceMappingURL=HumanRepository.js.map