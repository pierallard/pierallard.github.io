"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractCreator_1 = require("./AbstractCreator");
const UnitProperties_1 = require("../unit/UnitProperties");
const Harvester_1 = require("../unit/Harvester");
const Tank_1 = require("../unit/Tank");
const MCV_1 = require("../unit/MCV");
const AlternativePosition_1 = require("../computing/AlternativePosition");
class UnitCreator extends AbstractCreator_1.AbstractCreator {
    constructor(worldKnowledge, player) {
        super(worldKnowledge, player);
        this.inProductionUnits = [];
    }
    getProducibles() {
        return UnitProperties_1.UnitProperties.getConstructableUnits();
    }
    getRequiredBuildings(itemName) {
        return UnitProperties_1.UnitProperties.getRequiredBuildings(itemName);
    }
    isProducing(itemName) {
        return this.inProductionUnits.indexOf(itemName) > -1;
    }
    runProduction(unitName) {
        this.inProductionUnits.push(unitName);
        this.timerEvent.add(UnitProperties_1.UnitProperties.getConstructionTime(unitName) * Phaser.Timer.SECOND, () => {
            let index = this.inProductionUnits.indexOf(unitName);
            if (index > -1) {
                this.inProductionUnits.splice(index, 1);
            }
            if (this.uiCreator) {
                this.uiCreator.resetButton(unitName);
            }
            const building = this.worldKnowledge.getCreatorOf(unitName, this.player);
            if (null == building) {
                return;
            }
            const cellPosition = AlternativePosition_1.AlternativePosition.getClosestAvailable(building.getCellPositions()[0], building.getCellPositions()[0], this.worldKnowledge.isCellAccessible.bind(this.worldKnowledge));
            switch (unitName) {
                case 'Harvester':
                    let harvester = new Harvester_1.Harvester(this.worldKnowledge, cellPosition, this.player);
                    this.worldKnowledge.addUnit(harvester);
                    break;
                case 'Tank':
                    let tank = new Tank_1.Tank(this.worldKnowledge, cellPosition, this.player);
                    this.worldKnowledge.addUnit(tank);
                    break;
                case 'MCV':
                    let mcv = new MCV_1.MCV(this.worldKnowledge, cellPosition, this.player);
                    this.worldKnowledge.addUnit(mcv);
                    break;
                default:
                    throw "Unable to build unit " + unitName;
            }
        });
        if (this.uiCreator !== null) {
            this.uiCreator.runProduction(unitName);
        }
    }
}
exports.UnitCreator = UnitCreator;
//# sourceMappingURL=UnitCreator.js.map