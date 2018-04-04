"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Human_1 = require("../human_stuff/Human");
class HumanRepository {
    constructor(worldKnowledge) {
        this.humans = [
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell()),
            new Human_1.Human(worldKnowledge.getRandomCell())
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