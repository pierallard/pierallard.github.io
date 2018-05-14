"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Wall_1 = require("../objects/Wall");
const Window_1 = require("../objects/Window");
const Door_1 = require("../objects/Door");
class WallRepository {
    constructor() {
        this.walls = [];
    }
    addWall(cell) {
        this.walls.push(new Wall_1.Wall(cell));
    }
    create(game, group) {
        this.walls.forEach((wall) => {
            wall.create(game, group, this.hasWall(wall.getPosition().x + 1, wall.getPosition().y), this.hasWall(wall.getPosition().x, wall.getPosition().y + 1), this.hasWall(wall.getPosition().x - 1, wall.getPosition().y), this.hasWall(wall.getPosition().x, wall.getPosition().y - 1));
        });
    }
    getWall(x, y) {
        for (let i = 0; i < this.walls.length; i++) {
            if (this.walls[i].getPosition().x === x && this.walls[i].getPosition().y === y) {
                return this.walls[i];
            }
        }
        return null;
    }
    hasWall(x, y, includeDoor = true) {
        if (includeDoor) {
            return this.getWall(x, y) !== null;
        }
        else {
            return this.getWall(x, y) !== null && this.getWall(x, y).constructor.name !== 'Door';
        }
    }
    getWalls() {
        return this.walls;
    }
    addWindow(cell) {
        this.walls.push(new Window_1.Window(cell));
    }
    addDoor(cell) {
        this.walls.push(new Door_1.Door(cell));
    }
}
exports.WallRepository = WallRepository;
//# sourceMappingURL=WallRepository.js.map