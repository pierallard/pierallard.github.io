"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cube_1 = require("./Cube");
class CubeSet {
    constructor(cubePositions) {
        this.cubePositions = cubePositions;
    }
    create(game, group) {
        this.cubes = this.cubePositions.map((position) => {
            return new Cube_1.Cube(game, position.x, position.y, group);
        });
    }
    getCellPositions() {
        this.checkEmptyCubes();
        return this.cubes.map((cube) => {
            return cube.getCellPositions()[0];
        });
    }
    isEmpty() {
        this.checkEmptyCubes();
        for (let i = 0; i < this.cubes.length; i++) {
            if (!this.cubes[i].isEmpty()) {
                return false;
            }
        }
        return true;
    }
    getCubes() {
        this.checkEmptyCubes();
        return this.cubes;
    }
    setVisible(value) {
    }
    getPlayer() {
        return null;
    }
    lostLife(life) {
    }
    destroy() {
    }
    checkEmptyCubes() {
        this.cubes = this.cubes.filter((cube) => {
            return !cube.isEmpty();
        });
    }
}
exports.CubeSet = CubeSet;
//# sourceMappingURL=CubeSet.js.map