"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("./Cell");
const Desk_1 = require("./objects/Desk");
const WallRepository_1 = require("./repositories/WallRepository");
const Sofa_1 = require("./objects/Sofa");
const Dispenser_1 = require("./objects/Dispenser");
const PositionTransformer_1 = require("./PositionTransformer");
const GRID_WIDTH = 12;
const GRID_HEIGHT = 12;
exports.DEBUG_WORLD = false;
class Ground {
    constructor(world) {
        this.cells = [];
        this.objects = [];
        this.wallRepository = new WallRepository_1.WallRepository();
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                this.cells.push(new Cell_1.Cell(new PIXI.Point(x, y)));
            }
        }
        if (exports.DEBUG_WORLD) {
            this.wallRepository.addWall(new PIXI.Point(5, 5));
            this.wallRepository.addWall(new PIXI.Point(6, 5));
            this.objects.push(new Desk_1.Desk(new PIXI.Point(4, 5), world));
            this.objects.push(new Desk_1.Desk(new PIXI.Point(4, 6), world));
            this.objects.push(new Dispenser_1.Dispenser(new PIXI.Point(5, 4), world));
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
            this.objects.push(new Desk_1.Desk(this.getRandomCell(), world));
        }
        for (let i = 0; i < 3; i++) {
            this.objects.push(new Sofa_1.Sofa(this.getRandomCell(), world));
        }
        this.objects.push(new Dispenser_1.Dispenser(this.getRandomCell(), world));
    }
    create(game, groups) {
        const floor = groups['floor'];
        const noname = groups['noname'];
        this.cells.forEach((cell) => {
            cell.create(game, floor);
        });
        this.objects.forEach((desk) => {
            desk.create(game, noname);
        });
        this.wallRepository.create(game, noname);
    }
    getRandomCell() {
        const acceptableIndexes = this.getAcceptables();
        const random = Math.floor(Math.random() * acceptableIndexes.length);
        return this.cells[acceptableIndexes[random]].getPosition();
    }
    getMeetingCells(cells) {
        const acceptableIndexes = this.getAcceptables();
        let result = null;
        let dist = null;
        for (let i = 0; i < acceptableIndexes.length; i++) {
            const position1 = this.cells[acceptableIndexes[i]].getPosition();
            for (let j = i + 1; j < acceptableIndexes.length; j++) {
                const position2 = this.cells[acceptableIndexes[j]].getPosition();
                if (PositionTransformer_1.PositionTransformer.isNeighbor(position1, position2)) {
                    const newDist = Ground.getDist(cells, position1);
                    if (result === null || newDist < dist) {
                        dist = newDist;
                        result = [position1, position2];
                    }
                }
            }
        }
        return result;
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
    isFree(point, object = null) {
        if (point.x < 0 || point.y < 0 || point.x >= GRID_WIDTH || point.y >= GRID_HEIGHT) {
            return false;
        }
        for (let j = 0; j < this.objects.length; j++) {
            if (this.objects[j].getPosition().x === point.x && this.objects[j].getPosition().y === point.y && this.objects[j] !== object) {
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
        const freeSofas = this.objects.filter((object) => {
            return object.constructor.name === 'Sofa' && !Ground.isSittableTaken(object, humans);
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
        const freeDesks = this.objects.filter((object) => {
            return object.constructor.name === 'Desk' && !Ground.isSittableTaken(object, humans);
        });
        if (freeDesks.length === 0) {
            return null;
        }
        return freeDesks[Math.floor(Math.random() * freeDesks.length)];
    }
    getRandomFreeDispenser(humans) {
        const freeDispensers = this.objects.filter((object) => {
            return object.constructor.name === 'Dispenser' && !Ground.isSittableTaken(object, humans);
        });
        if (freeDispensers.length === 0) {
            return null;
        }
        return freeDispensers[Math.floor(Math.random() * freeDispensers.length)];
    }
    static getDist(sources, point) {
        let dist = 0;
        sources.forEach((source) => {
            dist += PositionTransformer_1.PositionTransformer.dist(source, point);
        });
        return dist;
    }
}
exports.Ground = Ground;
//# sourceMappingURL=Ground.js.map