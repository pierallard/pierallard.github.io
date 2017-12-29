"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Distance {
    static to(from, to) {
        let toArray = ((!(to instanceof Array)) ? [to] : to);
        let fromArray = ((!(from instanceof Array)) ? [from] : from);
        let distances = [];
        toArray.forEach((posTo) => {
            fromArray.forEach((posFrom) => {
                distances.push(Math.sqrt((posFrom.x - posTo.x) * (posFrom.x - posTo.x) +
                    (posFrom.y - posTo.y) * (posFrom.y - posTo.y)));
            });
        });
        return distances.reduce((dist1, dist2) => {
            return Math.min(dist1, dist2);
        });
    }
    static getClosest(from, objects) {
        let minDistance = null;
        let closest = null;
        for (let i = 0; i < objects.length; i++) {
            const object = objects[i];
            const distance = Distance.to(from, object.getCellPositions());
            if (null === closest || minDistance > distance) {
                minDistance = distance;
                closest = object;
            }
        }
        return closest;
    }
}
exports.Distance = Distance;
//# sourceMappingURL=Distance.js.map