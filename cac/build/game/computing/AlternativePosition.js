"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AStar_1 = require("./AStar");
const MAX_SEARCH_RADIUS = 20;
class AlternativePosition {
    /**
     * Returns true if the unit is arrived to its goal, or close enough to be considered as arrived.
     *
     * @param goalPosition    The goal position
     * @param currentPosition The current position of the unit
     * @param isAccessible    This method checks if a position is accessible by this unit
     * @returns {boolean}
     */
    static isArrived(goalPosition, currentPosition, isAccessible) {
        for (let radius = 0; radius < MAX_SEARCH_RADIUS; radius++) {
            const points = this.getPointsFromRadius(goalPosition, radius);
            let foundAccessible = false;
            for (let i = 0; i < points.length; i++) {
                let test = points[i];
                if (currentPosition.x === test.x && currentPosition.y === test.y) {
                    return true;
                }
                if (isAccessible(test) && null !== AStar_1.AStar.getPath(currentPosition, test, isAccessible)) {
                    foundAccessible = true;
                }
            }
            if (foundAccessible) {
                return false;
            }
        }
        return true;
    }
    /**
     * Returns the closest available position to be considered as arrived.
     *
     * @param goalPosition    The goal position
     * @param currentPosition The current position of the unit
     * @param isAccessible    This method checks if a position is accessible by this unit
     * @returns {{PIXI.Point}}
     */
    static getClosestAvailable(goalPosition, currentPosition, isAccessible) {
        for (let radius = 0; radius < MAX_SEARCH_RADIUS; radius++) {
            let possiblePositions = this.getPointsFromRadius(goalPosition, radius);
            possiblePositions = possiblePositions.filter((pos) => {
                return isAccessible(pos) && null !== AStar_1.AStar.getPath(currentPosition, pos, isAccessible);
            });
            if (possiblePositions.length) {
                possiblePositions.sort((pos1, pos2) => {
                    return ((pos1.x - currentPosition.x) * (pos1.x - currentPosition.x) +
                        (pos1.y - currentPosition.y) * (pos1.y - currentPosition.y)) - ((pos2.x - currentPosition.x) * (pos2.x - currentPosition.x) +
                        (pos2.y - currentPosition.y) * (pos2.y - currentPosition.y));
                });
                return possiblePositions[0];
            }
        }
        return null;
    }
    static getPointsFromRadius(position, radius) {
        let possiblePositions = [];
        if (radius === 0) {
            possiblePositions.push(new PIXI.Point(position.x, position.y));
        }
        else {
            for (let x = -radius; x <= radius; x++) {
                possiblePositions.push(new PIXI.Point(position.x + x, position.y - radius));
                possiblePositions.push(new PIXI.Point(position.x + x, position.y + radius));
            }
            for (let y = -radius; y <= radius; y++) {
                possiblePositions.push(new PIXI.Point(position.x - radius, position.y + y));
                possiblePositions.push(new PIXI.Point(position.x + radius, position.y + y));
            }
        }
        return possiblePositions;
    }
}
exports.AlternativePosition = AlternativePosition;
//# sourceMappingURL=AlternativePosition.js.map