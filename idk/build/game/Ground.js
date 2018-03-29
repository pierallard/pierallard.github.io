"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("./Cell");
const Desk_1 = require("./objects/Desk");
const WallRepository_1 = require("./repositories/WallRepository");
const Sofa_1 = require("./objects/Sofa");
const GRID_WIDTH = 12;
const GRID_HEIGHT = 12;
exports.DEBUG_WORLD = false;
class Ground {
    constructor() {
        this.cells = [];
        this.desks = [];
        this.sofas = [];
        this.wallRepository = new WallRepository_1.WallRepository();
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                this.cells.push(new Cell_1.Cell(new PIXI.Point(x, y)));
            }
        }
        if (exports.DEBUG_WORLD) {
            this.wallRepository.addWall(new PIXI.Point(5, 5));
            this.wallRepository.addWall(new PIXI.Point(6, 5));
            this.desks.push(new Desk_1.Desk(new PIXI.Point(4, 5)));
            return;
        }
        for (let x = 0; x < GRID_WIDTH; x++) {
            this.wallRepository.addWall(new PIXI.Point(x, 0));
            this.wallRepository.addWall(new PIXI.Point(x, GRID_HEIGHT - 1));
        }
        for (let y = 1; y < (GRID_HEIGHT - 1); y++) {
            this.wallRepository.addWall(new PIXI.Point(0, y));
            this.wallRepository.addWall(new PIXI.Point(GRID_WIDTH - 1, y));
        }
        for (let x = 1; x < 3 - 1; x++) {
            this.wallRepository.addWall(new PIXI.Point(x, GRID_WIDTH / 2 + 1));
        }
        for (let x = 5; x < GRID_WIDTH - 1; x++) {
            this.wallRepository.addWall(new PIXI.Point(x, GRID_WIDTH / 2 + 1));
        }
        [
            new PIXI.Point(4, 3),
            new PIXI.Point(4, 4),
            new PIXI.Point(3, 4),
            new PIXI.Point(3, 3),
        ].forEach((cell) => {
            this.wallRepository.addWall(cell);
        });
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
        if (point.x < 0 || point.y < 0 || point.x >= GRID_WIDTH || point.y >= GRID_HEIGHT) {
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
    getRandomFreeSofa(humans) {
        const freeSofas = this.sofas.filter((sofa) => {
            return !Ground.isSittableTaken(sofa, humans);
        });
        if (freeSofas.length === 0) {
            return null;
        }
        return freeSofas[Math.floor(Math.random() * freeSofas.length)];
    }
    static isSittableTaken(sittable, humans) {
        for (let i = 0; i < humans.length; i++) {
            const human = humans[i];
            if (sittable.getPosition().x === human.getPosition().x && sittable.getPosition().y === human.getPosition().y) {
                return true;
            }
        }
        return false;
    }
    getRandomFreeDesk(humans) {
        const freeDesks = this.desks.filter((desks) => {
            return !Ground.isSittableTaken(desks, humans);
        });
        if (freeDesks.length === 0) {
            return null;
        }
        return freeDesks[Math.floor(Math.random() * freeDesks.length)];
    }
}
exports.Ground = Ground;
//# sourceMappingURL=Ground.js.map