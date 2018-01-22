import {AlternativePosition} from "./AlternativePosition";

export class AStar {
    static getPathOrClosest(
        cellPosition: PIXI.Point,
        cellGoal: PIXI.Point,
        isPositionAccessible: (position: PIXI.Point) => boolean
    ): Path {
        let goal = AlternativePosition.getClosestAvailable(cellGoal, cellPosition, isPositionAccessible);

        return this.getPath(cellPosition, goal, isPositionAccessible);
    }

    static getPath(
        cellPosition: PIXI.Point,
        cellGoal: PIXI.Point,
        isPositionAccessible: (position: PIXI.Point) => boolean
    ): Path {
        if (null === cellGoal) {
            debugger;
        }
        let firstPath = new Path(cellGoal);
        firstPath.add(cellPosition);
        let paths = new Paths();
        paths.add(firstPath);

        let tries = 1000;
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
                    if (
                        nextPosition.x === cellGoal.x &&
                        nextPosition.y === cellGoal.y
                    ) {
                        return newPath;
                    }
                    paths.add(newPath);
                } else {
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

class Paths {
    private paths: Path[];

    constructor() {
        this.paths = [];
    }

    add(path: Path): void {
        this.paths.push(path);
    }

    getExistingThrough(position: PIXI.Point): Path {
        for (let i = 0; i < this.paths.length; i++) {
            if (this.paths[i].passThrough(position)) {
                return this.paths[i];
            }
        }

        return null;
    }

    length(): number {
        return this.paths.length;
    }

    getBetterConfidence(): Path {
        const sortedPaths = this.paths.filter((path) => {
            return path.isNotDone();
        }).sort((path1, path2) => {
            return path1.getConfidence() - path2.getConfidence();
        });

        return sortedPaths[0];
    }
}

export class Path {
    private steps: PIXI.Point[];
    private goal: PIXI.Point;
    private confidence: number;
    private done: boolean = false;

    constructor(goal: PIXI.Point) {
        this.goal = goal;
        this.steps = [];
    }

    add(position: PIXI.Point): Path {
        this.steps.push(position);
        this.confidence = Math.sqrt(
            (position.x - this.goal.x) * (position.x - this.goal.x) +
            (position.y - this.goal.y) * (position.y - this.goal.y)
        );

        return this;
    }

    getNextPositions(): PIXI.Point[] {
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

    passThrough(position: PIXI.Point): boolean {
        for (let i = 0; i < this.steps.length; i++) {
            if (this.steps[i].x === position.x && this.steps[i].y === position.y) {
                return true;
            }
        }

        return false;
    }

    getConfidence(): number {
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
            weight += Math.sqrt(
                (this.steps[i].x - this.steps[i + 1].x) * (this.steps[i].x - this.steps[i + 1].x) +
                (this.steps[i].y - this.steps[i + 1].y) * (this.steps[i].y - this.steps[i + 1].y)
            );
        }

        return weight;
    }

    weightUntil(position): number {
        let weight = 0;
        for (let i = 0; i < this.steps.length - 1; i++) {
            weight += Math.sqrt(
                (this.steps[i].x - this.steps[i + 1].x) * (this.steps[i].x - this.steps[i + 1].x) +
                (this.steps[i].y - this.steps[i + 1].y) * (this.steps[i].y - this.steps[i + 1].y)
            );
            if (this.steps[i].x === position.x && this.steps[i].y === position.y) {
                return weight;
            }
        }

        return weight;
    }

    replaceBeginWith(newPath: Path) {
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
            } else if (this.steps[i].x === x && this.steps[i].y === y) {
                add = true;
            }
        }
        this.steps = newSteps;
    }

    isStillAvailable(isPositionAccessible: (position: PIXI.Point) => boolean): boolean {
        for (let i = 0; i < this.steps.length; i++) {
            if (!isPositionAccessible(this.steps[i])) {
                return false;
            }
        }

        return true;
    }

    splice(): PIXI.Point {
        return this.steps.splice(1, 1)[0];
    }
}
