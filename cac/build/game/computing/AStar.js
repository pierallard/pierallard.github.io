"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AlternativePosition_1 = require("./AlternativePosition");
class AStar {
    static getPathOrClosest(cellPosition, cellGoal, isPositionAccessible) {
        let goal = AlternativePosition_1.AlternativePosition.getClosestAvailable(cellGoal, cellPosition, isPositionAccessible);
        return this.getPath(cellPosition, goal, isPositionAccessible);
    }
    static getPath(cellPosition, cellGoal, isPositionAccessible) {
        let firstPath = new Path(cellGoal);
        firstPath.add(cellPosition);
        let paths = new Paths();
        paths.add(firstPath);
        let tries = 500;
        while (tries > 0) {
            let path = paths.getBetterConfidence();
            if (!path) {
                return null;
            }
            const nextPositions = path.getNextPositions().filter(isPositionAccessible.bind(this));
            path.setDone();
            for (let i = 0; i < nextPositions.length; i++) {
                tries--;
                const nextPosition = nextPositions[i];
                let newPath = path.clonez().add(nextPosition);
                let existingPath = paths.getExistingThrough(nextPosition);
                if (!existingPath) {
                    if (nextPosition.x === cellGoal.x &&
                        nextPosition.y === cellGoal.y) {
                        return newPath;
                    }
                    paths.add(newPath);
                }
                else {
                    const newWeight = newPath.weight();
                    const oldWeight = existingPath.weightUntil(nextPosition);
                    if (newWeight < oldWeight) {
                        existingPath.replaceBeginWith(newPath);
                    }
                }
            }
        }
        return null;
    }
}
exports.AStar = AStar;
class Paths {
    constructor() {
        this.paths = [];
    }
    add(path) {
        this.paths.push(path);
    }
    getExistingThrough(position) {
        for (let i = 0; i < this.paths.length; i++) {
            if (this.paths[i].passThrough(position)) {
                return this.paths[i];
            }
        }
        return null;
    }
    length() {
        return this.paths.length;
    }
    getBetterConfidence() {
        const sortedPaths = this.paths.filter((path) => {
            return path.isNotDone();
        }).sort((path1, path2) => {
            return path1.getConfidence() - path2.getConfidence();
        });
        return sortedPaths[0];
    }
}
class Path {
    constructor(goal) {
        this.done = false;
        this.goal = goal;
        this.steps = [];
    }
    add(position) {
        this.steps.push(position);
        this.confidence = Math.sqrt((position.x - this.goal.x) * (position.x - this.goal.x) +
            (position.y - this.goal.y) * (position.y - this.goal.y));
        return this;
    }
    getNextPositions() {
        const lastStep = this.steps[this.steps.length - 1];
        return [
            new PIXI.Point(lastStep.x, lastStep.y - 1),
            new PIXI.Point(lastStep.x + 1, lastStep.y),
            new PIXI.Point(lastStep.x, lastStep.y + 1),
            new PIXI.Point(lastStep.x - 1, lastStep.y),
            new PIXI.Point(lastStep.x - 1, lastStep.y - 1),
            new PIXI.Point(lastStep.x + 1, lastStep.y - 1),
            new PIXI.Point(lastStep.x + 1, lastStep.y + 1),
            new PIXI.Point(lastStep.x - 1, lastStep.y + 1),
        ];
    }
    clonez() {
        let result = new Path(this.goal);
        this.steps.forEach((step) => {
            result.add(step);
        });
        return result;
    }
    toString() {
        return this.steps.map((step) => { return '(' + step.x + ', ' + step.y + ')'; }).join(', ');
    }
    passThrough(position) {
        for (let i = 0; i < this.steps.length; i++) {
            if (this.steps[i].x === position.x && this.steps[i].y === position.y) {
                return true;
            }
        }
        return false;
    }
    getConfidence() {
        return this.confidence;
    }
    firstStep() {
        return this.steps[1];
    }
    setDone() {
        this.done = true;
    }
    isNotDone() {
        return this.done === false;
    }
    weight() {
        let weight = 0;
        for (let i = 0; i < this.steps.length - 1; i++) {
            weight += Math.sqrt((this.steps[i].x - this.steps[i + 1].x) * (this.steps[i].x - this.steps[i + 1].x) +
                (this.steps[i].y - this.steps[i + 1].y) * (this.steps[i].y - this.steps[i + 1].y));
        }
        return weight;
    }
    weightUntil(position) {
        let weight = 0;
        for (let i = 0; i < this.steps.length - 1; i++) {
            weight += Math.sqrt((this.steps[i].x - this.steps[i + 1].x) * (this.steps[i].x - this.steps[i + 1].x) +
                (this.steps[i].y - this.steps[i + 1].y) * (this.steps[i].y - this.steps[i + 1].y));
            if (this.steps[i].x === position.x && this.steps[i].y === position.y) {
                return weight;
            }
        }
        return weight;
    }
    replaceBeginWith(newPath) {
        let newSteps = [];
        for (let i = 0; i < newPath.steps.length; i++) {
            newSteps.push(newPath.steps[i]);
        }
        let add = false;
        const x = newPath.steps[newPath.steps.length - 1].x;
        const y = newPath.steps[newPath.steps.length - 1].y;
        for (let i = 0; i < this.steps.length; i++) {
            if (add) {
                newSteps.push(this.steps[i]);
            }
            else if (this.steps[i].x === x && this.steps[i].y === y) {
                add = true;
            }
        }
        this.steps = newSteps;
    }
    isStillAvailable(isPositionAccessible) {
        for (let i = 0; i < this.steps.length; i++) {
            if (!isPositionAccessible(this.steps[i])) {
                return false;
            }
        }
        return true;
    }
    splice() {
        return this.steps.splice(1, 1)[0];
    }
}
exports.Path = Path;
//# sourceMappingURL=AStar.js.map