"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = require("./Unit");
const Attack_1 = require("../state/Attack");
const Follow_1 = require("../state/Follow");
const MoveAttack_1 = require("../state/MoveAttack");
const Harvest_1 = require("../state/Harvest");
const Distance_1 = require("../computing/Distance");
const CubeSet_1 = require("../building/CubeSet");
const UnitProperties_1 = require("./UnitProperties");
class Harvester extends Unit_1.Unit {
    constructor(worldKnowledge, cellPosition, player) {
        super(worldKnowledge, cellPosition, player, UnitProperties_1.UnitProperties.getSprite(Harvester.prototype.constructor.name, player.getId()));
        this.life = this.maxLife = UnitProperties_1.UnitProperties.getLife(Harvester.prototype.constructor.name);
        this.loading = 0;
    }
    updateStateAfterClick(cell) {
        const unit = this.worldKnowledge.getUnitAt(cell);
        if (null !== unit) {
            if (this.getPlayer() !== unit.getPlayer()) {
                this.state = new Attack_1.Attack(this.worldKnowledge, this, unit);
            }
            else {
                this.state = new Follow_1.Follow(this.worldKnowledge, this, unit);
            }
        }
        else {
            const building = this.worldKnowledge.getBuildingAt(cell);
            if (building && building instanceof CubeSet_1.CubeSet) {
                this.state = new Harvest_1.Harvest(this.worldKnowledge, this, building);
            }
            else {
                this.state = new MoveAttack_1.MoveAttack(this.worldKnowledge, this, cell);
            }
        }
    }
    getClosestBase() {
        return Distance_1.Distance.getClosest(this.getCellPositions()[0], this.worldKnowledge.getPlayerBuildings(this.player, 'ConstructionYard'));
    }
    getClosestCube(cubeSet) {
        return Distance_1.Distance.getClosest(this.getCellPositions()[0], cubeSet.getCubes());
    }
    isFull() {
        return this.loading >= UnitProperties_1.UnitProperties.getOption(this.constructor.name, 'max_loading');
    }
    unload(base) {
        base.addMinerals(this.loading);
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