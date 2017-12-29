"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = require("../unit/Unit");
class UnitRepository {
    constructor() {
        this.units = [];
    }
    add(unit) {
        this.units.push(unit);
    }
    getUnits(type = null) {
        if (null === type) {
            return this.units;
        }
        return this.units.filter((unit) => {
            return unit.constructor.name === type;
        });
    }
    removeUnit(movedSprite) {
        movedSprite.destroy();
        const index = this.units.indexOf(movedSprite);
        if (index > -1) {
            this.units.splice(index, 1);
        }
    }
    isCellNotOccupied(position) {
        return (null === this.unitAt(position));
    }
    unitAt(position) {
        for (let i = 0; i < this.units.length; i++) {
            if (this.units[i] instanceof Unit_1.Unit) {
                const cellPositions = this.units[i].getCellPositions();
                for (let j = 0; j < cellPositions.length; j++) {
                    if (cellPositions[j].x === position.x &&
                        cellPositions[j].y === position.y) {
                        return this.units[i];
                    }
                }
            }
        }
        return null;
    }
    getSelectedUnits() {
        return this.units.filter((unit) => {
            return unit.isSelected();
        });
    }
}
exports.UnitRepository = UnitRepository;
//# sourceMappingURL=UnitRepository.js.map