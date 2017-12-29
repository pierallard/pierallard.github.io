"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuildingProperties_1 = require("../building/BuildingProperties");
const PowerPlant_1 = require("../building/PowerPlant");
const Barracks_1 = require("../building/Barracks");
const AbstractCreator_1 = require("./AbstractCreator");
const TiberiumRefinery_1 = require("../building/TiberiumRefinery");
const Harvester_1 = require("../unit/Harvester");
const AlternativePosition_1 = require("../computing/AlternativePosition");
const ConcreteBarrier_1 = require("../building/ConcreteBarrier");
class BuildingCreator extends AbstractCreator_1.AbstractCreator {
    constructor(worldKnowledge, player) {
        super(worldKnowledge, player);
        this.producedBuildings = [];
        this.inProductionBuildings = [];
    }
    getProducibles() {
        return BuildingProperties_1.BuildingProperties.getConstructableBuildings();
    }
    getRequiredBuildings(itemName) {
        return BuildingProperties_1.BuildingProperties.getRequiredBuildings(itemName);
    }
    runProduction(buildingName) {
        this.inProductionBuildings.push(buildingName);
        this.timerEvent.add(BuildingProperties_1.BuildingProperties.getConstructionTime(buildingName) * Phaser.Timer.SECOND, () => {
            let index = this.inProductionBuildings.indexOf(buildingName);
            if (index > -1) {
                this.inProductionBuildings.splice(index, 1);
            }
            this.producedBuildings.push(buildingName);
        });
        if (this.uiCreator !== null) {
            this.uiCreator.runProduction(buildingName);
        }
    }
    isProduced(buildingName) {
        return this.producedBuildings.indexOf(buildingName) > -1;
    }
    isProducing(buildingName) {
        return this.inProductionBuildings.indexOf(buildingName) > -1;
    }
    runCreation(buildingName, cell) {
        switch (buildingName) {
            case 'PowerPlant':
                let powerPlant = new PowerPlant_1.PowerPlant(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addBuilding(powerPlant, true);
                break;
            case 'Barracks':
                let barracks = new Barracks_1.Barracks(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addBuilding(barracks, true);
                break;
            case 'TiberiumRefinery':
                let tiberiumRefinery = new TiberiumRefinery_1.TiberiumRefinery(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addBuilding(tiberiumRefinery, true);
                const cellHarvester = AlternativePosition_1.AlternativePosition.getClosestAvailable(cell, cell, this.worldKnowledge.isCellAccessible.bind(this.worldKnowledge));
                let harvester = new Harvester_1.Harvester(this.worldKnowledge, cellHarvester, this.player);
                this.worldKnowledge.addUnit(harvester, true);
                break;
            case 'ConcreteBarrier':
                let concreteBarrier = new ConcreteBarrier_1.ConcreteBarrier(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addBuilding(concreteBarrier, false);
                break;
            default:
                throw "Unable to build building " + buildingName;
        }
        this.player.order().updateAllowedUnitsAndBuildings();
        if (this.uiCreator) {
            this.uiCreator.resetButton(buildingName);
        }
        let index = this.producedBuildings.indexOf(buildingName);
        if (index > -1) {
            this.producedBuildings.splice(index, 1);
        }
    }
}
exports.BuildingCreator = BuildingCreator;
//# sourceMappingURL=BuildingCreator.js.map