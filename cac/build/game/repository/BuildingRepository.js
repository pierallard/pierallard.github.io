"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuildingProperties_1 = require("../building/BuildingProperties");
class BuildingRepository {
    constructor() {
        this.buildings = [];
    }
    add(building) {
        this.buildings.push(building);
    }
    isCellNotOccupied(position) {
        return this.buildingAt(position) === null;
    }
    buildingAt(position) {
        for (let i = 0; i < this.buildings.length; i++) {
            let building = this.buildings[i];
            const cellPositions = building.getCellPositions();
            for (let j = 0; j < cellPositions.length; j++) {
                if (cellPositions[j].x === position.x &&
                    cellPositions[j].y === position.y) {
                    return building;
                }
            }
        }
        return null;
    }
    getBuildings(type = null) {
        if (type === null) {
            return this.buildings;
        }
        return this.buildings.filter((building) => {
            return building.constructor.name === type;
        });
    }
    getCreatorOf(unit) {
        return this.buildings.filter((building) => {
            return (BuildingProperties_1.BuildingProperties.getConstructableUnits(building.constructor.name).indexOf(unit) > -1);
        });
    }
    removeBuilding(building) {
        building.destroy();
        const index = this.buildings.indexOf(building);
        if (index > -1) {
            this.buildings.splice(index, 1);
        }
    }
}
exports.BuildingRepository = BuildingRepository;
//# sourceMappingURL=BuildingRepository.js.map