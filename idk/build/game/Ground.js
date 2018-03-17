"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("./Cell");
const Desk_1 = require("./objects/Desk");
const WallRepository_1 = require("./repositories/WallRepository");
const Sofa_1 = require("./objects/Sofa");
const WIDTH = 10;
const HEIGHT = 10;
class Ground {
    constructor() {
        this.cells = [];
        this.desks = [];
        this.sofas = [];
        this.wallRepository = new WallRepository_1.WallRepository();
        [
            new PIXI.Point(3, 3),
            new PIXI.Point(3, 4),
            new PIXI.Point(2, 4),
            new PIXI.Point(2, 3),
        ].forEach((cell) => {
            this.wallRepository.addWall(cell);
        });
        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                this.cells.push(new Cell_1.Cell(new PIXI.Point(x, y)));
            }
        }
        for (let i = 0; i < 3; i++) {
            this.desks.push(new Desk_1.Desk(this.getRandomCell()));
        }
        for (let i = 0; i < 3; i++) {
            this.sofas.push(new Sofa_1.Sofa(this.getRandomCell()));
        }
    }
    create(game, groups) {
        const floor = groups['floor'];
        const noname = groups['noname'];
        this.cells.forEach((cell) => {
            cell.create(game, floor);
        });
        this.desks.forEach((desk) => {
            desk.create(game, noname);
        });
        this.sofas.forEach((sofa) => {
            sofa.create(game, noname);
        });
        this.wallRepository.create(game, noname);
    }
    getRandomCell() {
        const acceptableIndexes = this.getAcceptables();
        const random = Math.floor(Math.random() * acceptableIndexes.length);
        return this.cells[acceptableIndexes[random]].getPosition();
    }
    getGrid() {
        let grid = [];
        for (let i = 0; i < this.cells.length; i++) {
            if (undefined === grid[this.cells[i].getPosition().y]) {
                grid[this.cells[i].getPosition().y] = [];
            }
            grid[this.cells[i].getPosition().y][this.cells[i].getPosition().x] = {
                index: i
            };
        }
        return grid;
    }
    getAcceptables() {
        let acceptables = [];
        for (let i = 0; i < this.cells.length; i++) {
            if (this.isFree(this.cells[i].getPosition())) {
                acceptables.push(i);
            }
        }
        return acceptables;
    }
    isFree(point) {
        if (point.x < 0 || point.y < 0 || point.x >= WIDTH || point.y >= HEIGHT) {
            return false;
        }
        for (let j = 0; j < this.desks.length; j++) {
            if (this.desks[j].getPosition().x === point.x && this.desks[j].getPosition().y === point.y) {
                return false;
            }
        }
        for (let j = 0; j < this.sofas.length; j++) {
            if (this.sofas[j].getPosition().x === point.x && this.sofas[j].getPosition().y === point.y) {
                return false;
            }
        }
        if (this.wallRepository.hasWall(point.x, point.y)) {
            return false;
        }
        return true;
    }
    getWallRepository() {
        return this.wallRepository;
    }
    getRandomSofa() {
        return this.sofas[Math.floor(Math.random() * this.sofas.length)];
    }
}
exports.Ground = Ground;
//# sourceMappingURL=Ground.js.map