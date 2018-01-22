"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuildingProperties_1 = require("../building/BuildingProperties");
class ArmyRepository {
    static itemAt(position, items) {
        for (let i = 0; i < items.length; i++) {
            const cellPositions = items[i].getCellPositions();
            for (let j = 0; j < cellPositions.length; j++) {
                if (cellPositions[j].x === position.x &&
                    cellPositions[j].y === position.y) {
                    return items[i];
                }
            }
        }
        return null;
    }
    constructor() {
        this.items = [];
    }
    add(army) {
        this.items.push(army);
    }
    getItems(type = null) {
        if (null === type) {
            return this.items;
        }
        return this.items.filter((unit) => {
            return unit.constructor.name === type;
        });
    }
    removeArmy(army) {
        army.destroy();
        const index = this.items.indexOf(army);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }
    isGroundCellAccessible(position) {
        return (null === this.groundItemAt(position));
    }
    isAerialCellAccessible(position) {
        return (null === this.aerialItemAt(position));
    }
    groundItemAt(position) {
        return ArmyRepository.itemAt(position, this.items.filter((item) => {
            return item.isOnGround();
        }));
    }
    aerialItemAt(position) {
        return ArmyRepository.itemAt(position, this.items.filter((item) => {
            return !item.isOnGround();
        }));
    }
    getSelectedArmies() {
        return this.items.filter((unit) => {
            return unit.isSelected();
        });
    }
    getCreatorOf(unit) {
        return this.items.filter((item) => {
            return (BuildingProperties_1.BuildingProperties.getConstructableUnits(item.constructor.name).indexOf(unit) > -1);
        });
    }
}
exports.ArmyRepository = ArmyRepository;
//# sourceMappingURL=ArmyRepository.js.map