"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Human_1 = require("../human_stuff/Human");
class HumanRepository {
    constructor(world) {
        this.humans = [
            new Human_1.Human(world.getGround().getRandomCell()),
            new Human_1.Human(world.getGround().getRandomCell()),
            new Human_1.Human(world.getGround().getRandomCell()),
            new Human_1.Human(world.getGround().getRandomCell()),
            new Human_1.Human(world.getGround().getRandomCell()),
            new Human_1.Human(world.getGround().getRandomCell()),
            new Human_1.Human(world.getGround().getRandomCell())
        ];
    }
    create(game, groups, world) {
        this.humans.forEach((human) => {
            human.create(game, groups['noname'], world);
        });
    }
    update() {
        this.humans.forEach((human) => {
            human.update();
        });
    }
}
exports.HumanRepository = HumanRepository;
//# sourceMappingURL=HumanRepository.js.map