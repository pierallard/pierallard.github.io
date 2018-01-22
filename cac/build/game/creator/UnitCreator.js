"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractCreator_1 = require("./AbstractCreator");
const UnitProperties_1 = require("../unit/UnitProperties");
const Harvester_1 = require("../unit/Harvester");
const MediumTank_1 = require("../unit/MediumTank");
const MCV_1 = require("../unit/MCV");
const AlternativePosition_1 = require("../computing/AlternativePosition");
const MinigunInfantry_1 = require("../unit/MinigunInfantry");
const Grenadier_1 = require("../unit/Grenadier");
const RocketSoldier_1 = require("../unit/RocketSoldier");
const HummVee_1 = require("../unit/HummVee");
const Orca_1 = require("../unit/Orca");
class UnitCreator extends AbstractCreator_1.AbstractCreator {
    canProduct(itemName) {
        return !this.isProducingAny() && this.isAllowed(itemName);
    }
    getAllowedUnits() {
        return UnitProperties_1.UnitProperties.getConstructableUnits().filter((unitName) => {
            return this.isAllowed(unitName);
        });
    }
    getRequiredBuildings(itemName) {
        return UnitProperties_1.UnitProperties.getRequiredBuildings(itemName);
    }
    runProduction(unitName) {
        this.productionStatus = new AbstractCreator_1.ProductionStatus(unitName, UnitProperties_1.UnitProperties.getConstructionTime(unitName) * Phaser.Timer.SECOND, UnitProperties_1.UnitProperties.getPrice(unitName), this.player, this.runCreation.bind(this), this.game);
    }
    runCreation(unitName) {
        this.productionStatus = null;
        const building = this.worldKnowledge.getCreatorOf(unitName, this.player);
        if (null == building) {
            return;
        }
        const cellPosition = AlternativePosition_1.AlternativePosition.getClosestAvailable(building.getCellPositions()[0], building.getCellPositions()[0], this.worldKnowledge.isGroundCellAccessible.bind(this.worldKnowledge));
        switch (unitName) {
            case 'Harvester':
                let harvester = new Harvester_1.Harvester(this.worldKnowledge, cellPosition, this.player);
                this.worldKnowledge.addArmy(harvester, true);
                break;
            case 'MediumTank':
                let tank = new MediumTank_1.MediumTank(this.worldKnowledge, cellPosition, this.player);
                this.worldKnowledge.addArmy(tank, true);
                break;
            case 'MCV':
                let mcv = new MCV_1.MCV(this.worldKnowledge, cellPosition, this.player);
                this.worldKnowledge.addArmy(mcv, true);
                break;
            case 'MinigunInfantry':
                let minigunInfantry = new MinigunInfantry_1.MinigunInfantry(this.worldKnowledge, cellPosition, this.player);
                this.worldKnowledge.addArmy(minigunInfantry, true);
                break;
            case 'Grenadier':
                let grenadier = new Grenadier_1.Grenadier(this.worldKnowledge, cellPosition, this.player);
                this.worldKnowledge.addArmy(grenadier, true);
                break;
            case 'RocketSoldier':
                let rocketSoldier = new RocketSoldier_1.RocketSoldier(this.worldKnowledge, cellPosition, this.player);
                this.worldKnowledge.addArmy(rocketSoldier, true);
                break;
            case 'HummVee':
                let hummVee = new HummVee_1.HummVee(this.worldKnowledge, cellPosition, this.player);
                this.worldKnowledge.addArmy(hummVee, true);
                break;
            case 'Orca':
                let orca = new Orca_1.Orca(this.worldKnowledge, cellPosition, this.player);
                this.worldKnowledge.addArmy(orca, true);
                break;
            default:
                throw "Unable to build unit " + unitName;
        }
    }
}
exports.UnitCreator = UnitCreator;
//# sourceMappingURL=UnitCreator.js.map