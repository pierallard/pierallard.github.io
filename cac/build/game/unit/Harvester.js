"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = require("./Unit");
const Harvest_1 = require("../state/Harvest");
const TiberiumPlant_1 = require("../sprite/TiberiumPlant");
const Distance_1 = require("../computing/Distance");
const UnitProperties_1 = require("./UnitProperties");
class Harvester extends Unit_1.Unit {
    constructor(worldKnowledge, cellPosition, player) {
        super(worldKnowledge, cellPosition, player);
        this.loading = 0;
    }
    harvest() {
        const closestGround = Distance_1.Distance.getClosestItem(this.getCellPositions()[0], this.worldKnowledge.getGrounds());
        this.state = new Harvest_1.Harvest(this.worldKnowledge, this, closestGround.getSource());
    }
    updateStateAfterClick(cell) {
        const unit = this.worldKnowledge.getGroundArmyAt(cell);
        if (null === unit) {
            const ground = this.worldKnowledge.getGroundAt(cell);
            if (ground && ground instanceof TiberiumPlant_1.TiberiumPlant) {
                this.state = new Harvest_1.Harvest(this.worldKnowledge, this, ground.getSource());
                return;
            }
        }
        super.updateStateAfterClick(cell);
    }
    getClosestRefinery() {
        return Distance_1.Distance.getClosestItem(this.getCellPositions()[0], this.worldKnowledge.getPlayerArmies(this.player, 'TiberiumRefinery'));
    }
    getClosestPlant(source) {
        return Distance_1.Distance.getClosestItem(this.getCellPositions()[0], source.getFreePlants(this));
    }
    isFull() {
        return this.loading >= UnitProperties_1.UnitProperties.getOption(this.constructor.name, 'max_loading');
    }
    unload(refinery) {
        refinery.runUnloadAnimation();
        refinery.getPlayer().addMinerals(this.loading);
        this.loading = 0;
        this.freeze(UnitProperties_1.UnitProperties.getOption(this.constructor.name, 'unload_time') * Phaser.Timer.SECOND);
    }
    load(cube) {
        this.unitSprite.doLoad(cube.getCellPositions()[0]);
        this.loading += cube.harvest();
        this.freeze(UnitProperties_1.UnitProperties.getOption(this.constructor.name, 'load_time') * Phaser.Timer.SECOND);
    }
    isLoaded() {
        return this.loading > 0;
    }
}
exports.Harvester = Harvester;
//# sourceMappingURL=Harvester.js.map