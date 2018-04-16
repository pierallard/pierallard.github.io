"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ground_1 = require("./Ground");
const HumanRepository_1 = require("./repositories/HumanRepository");
class World {
    constructor() {
        this.ground = new Ground_1.Ground(this);
        this.humanRepository = new HumanRepository_1.HumanRepository(this);
    }
    create(game, groups) {
        this.ground.create(game, groups);
        this.humanRepository.create(game, groups, this);
    }
    update() {
        this.humanRepository.update();
    }
    getGround() {
        return this.ground;
    }
    humanMoved(positions) {
        const walls = this.ground.getWallRepository().getWalls();
        walls.forEach((wall) => {
            let visible = true;
            positions.forEach((position) => {
                if (this.anyHumanIsAboveWall(wall)) {
                    visible = false;
                }
            });
            wall.setVisibility(visible);
        });
    }
    anyHumanIsAboveWall(wall) {
        const humans = this.humanRepository.humans;
        for (let i = 0; i < humans.length; i++) {
            if (World.humanIsAboveWall(humans[i].getPosition(), wall)) {
                return true;
            }
        }
        return false;
    }
    static humanIsAboveWall(humanPosition, wall) {
        const wallPosition = wall.getPosition();
        return (humanPosition.x == wallPosition.x + 1 && humanPosition.y == wallPosition.y + 1) ||
            (humanPosition.x == wallPosition.x && humanPosition.y == wallPosition.y + 1) ||
            (humanPosition.x == wallPosition.x + 1 && humanPosition.y == wallPosition.y);
    }
    getRandomFreeSofa() {
        return this.ground.getRandomFreeSofa(this.humanRepository.humans);
    }
    isSittableTaken(sittable) {
        return Ground_1.Ground.isSittableTaken(sittable, this.humanRepository.humans);
    }
    getRandomFreeDesk() {
        return this.ground.getRandomFreeDesk(this.humanRepository.humans);
    }
    getSelectedHumanSprite() {
        return this.humanRepository.getSelectedHumanSprite();
    }
    isValidPosition(tryPosition, object) {
        return this.ground.isFree(tryPosition, object);
    }
    resetAStar() {
        this.humanRepository.humans.forEach((human) => {
            human.resetAStar();
        });
    }
}
exports.World = World;
//# sourceMappingURL=World.js.map