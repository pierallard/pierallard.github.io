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
const AdvancedPowerPlant_1 = require("../building/AdvancedPowerPlant");
const GuardTower_1 = require("../building/GuardTower");
const WeaponsFactory_1 = require("../building/WeaponsFactory");
const AdvancedGuardTower_1 = require("../building/AdvancedGuardTower");
const CommunicationCenter_1 = require("../building/CommunicationCenter");
const Helipad_1 = require("../building/Helipad");
class BuildingCreator extends AbstractCreator_1.AbstractCreator {
    constructor(worldKnowledge, player) {
        super(worldKnowledge, player);
    }
    getAllowedBuildings() {
        return BuildingProperties_1.BuildingProperties.getConstructableBuildings().filter((buildingName) => {
            return this.isAllowed(buildingName);
        });
    }
    getRequiredBuildings(itemName) {
        return BuildingProperties_1.BuildingProperties.getRequiredBuildings(itemName);
    }
    canProduct(itemName) {
        return !this.isProducingAny() && this.isAllowed(itemName);
    }
    runProduction(buildingName) {
        this.productionStatus = new AbstractCreator_1.ProductionStatus(buildingName, BuildingProperties_1.BuildingProperties.getConstructionTime(buildingName) * Phaser.Timer.SECOND, BuildingProperties_1.BuildingProperties.getPrice(buildingName), this.player, () => { }, this.game);
    }
    runCreation(buildingName, cell) {
        this.productionStatus = null;
        switch (buildingName) {
            case 'PowerPlant':
                let powerPlant = new PowerPlant_1.PowerPlant(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addArmy(powerPlant, true, 2);
                break;
            case 'AdvancedPowerPlant':
                let advancedPowerPlant = new AdvancedPowerPlant_1.AdvancedPowerPlant(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addArmy(advancedPowerPlant, true, 2);
                break;
            case 'Barracks':
                let barracks = new Barracks_1.Barracks(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addArmy(barracks, true, 2);
                break;
            case 'TiberiumRefinery':
                let tiberiumRefinery = new TiberiumRefinery_1.TiberiumRefinery(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addArmy(tiberiumRefinery, true, 2);
                const cellHarvester = AlternativePosition_1.AlternativePosition.getClosestAvailable(cell, cell, this.worldKnowledge.isGroundCellAccessible.bind(this.worldKnowledge));
                let harvester = new Harvester_1.Harvester(this.worldKnowledge, cellHarvester, this.player);
                this.worldKnowledge.addArmy(harvester, true);
                this.timerEvent.add(3 * Phaser.Timer.SECOND, () => {
                    harvester.harvest();
                });
                break;
            case 'ConcreteBarrier':
                let concreteBarrier = new ConcreteBarrier_1.ConcreteBarrier(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addArmy(concreteBarrier, false);
                break;
            case 'GuardTower':
                let guardTower = new GuardTower_1.GuardTower(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addArmy(guardTower, true, 2);
                break;
            case 'AdvancedGuardTower':
                let advancedGuardTower = new AdvancedGuardTower_1.AdvancedGuardTower(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addArmy(advancedGuardTower, true, 2);
                break;
            case 'CommunicationCenter':
                let communicationCenter = new CommunicationCenter_1.CommunicationCenter(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addArmy(communicationCenter, true, 2);
                break;
            case 'WeaponsFactory':
                let weaponsFactory = new WeaponsFactory_1.WeaponsFactory(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addArmy(weaponsFactory, true, 2);
                break;
            case 'Helipad':
                let helipad = new Helipad_1.Helipad(this.worldKnowledge, cell, this.player);
                this.worldKnowledge.addArmy(helipad, true, 2);
                break;
            default:
                throw "Unable to build building " + buildingName;
        }
    }
}
exports.BuildingCreator = BuildingCreator;
//# sourceMappingURL=BuildingCreator.js.map