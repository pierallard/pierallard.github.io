"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("../player/Player");
const ArmyRepository_1 = require("../repository/ArmyRepository");
const GeneratedGround_1 = require("./GeneratedGround");
const MiniAppear_1 = require("../sprite/MiniAppear");
const BuildingProperties_1 = require("../building/BuildingProperties");
const Fog_1 = require("../Fog");
const Appear_1 = require("../sprite/Appear");
const Play_1 = require("../game_state/Play");
class WorldKnowledge {
    constructor() {
        this.ground = new GeneratedGround_1.GeneratedGround();
        this.armyRepository = new ArmyRepository_1.ArmyRepository();
        this.groundRepository = [];
        this.unitCreators = [];
        this.buildingCreators = [];
        this.players = [];
        this.fogs = [];
        this.groups = [];
    }
    create(game, startPositions, player) {
        this.game = game;
        this.ground.create(this.game, startPositions);
        this.groups[Play_1.GROUP.GROUND] = this.game.add.group();
        this.groups[Play_1.GROUP.UNIT] = this.game.add.group();
        this.groups[Play_1.GROUP.SHADOW] = this.game.add.group();
        this.groups[Play_1.GROUP.EFFECTS] = this.game.add.group();
        this.groups[Play_1.GROUP.AERIAL] = this.game.add.group();
        this.groups.forEach((group) => {
            group.fixedToCamera = false;
        });
        this.unitCreators.forEach((unitCreator) => {
            unitCreator.create(game);
        });
        this.buildingCreators.forEach((buildingCreator) => {
            buildingCreator.create(game);
        });
        this.fogGroup = this.game.add.group();
        this.fogs.forEach((fog) => {
            fog.create(game, this.fogGroup, fog.getPlayer() === player);
        });
    }
    update() {
        this.groups[Play_1.GROUP.UNIT].sort('y');
        this.armyRepository.getItems().forEach((army) => {
            army.update();
        });
        this.fogs.forEach((fog) => {
            fog.update();
        });
    }
    isGroundCellAccessible(position) {
        return this.ground.isCellAccessible(position) && this.armyRepository.isGroundCellAccessible(position);
    }
    isAerialCellAccessible(position) {
        return this.armyRepository.isAerialCellAccessible(position);
    }
    getGroundWidth() {
        return this.ground.getGroundWidth();
    }
    getGroundHeight() {
        return this.ground.getGroundHeight();
    }
    addArmy(army, appear = false, appearSize = 1) {
        this.armyRepository.add(army);
        army.create(this.game, this.groups);
        if (appear) {
            army.setVisible(false);
            let appearSprite = appearSize === 1 ?
                new MiniAppear_1.MiniAppear(army.getCellPositions()[0]) :
                new Appear_1.Appear(army.getCellPositions()[0]);
            appearSprite.create(this.game, this.groups[Play_1.GROUP.UNIT]);
            this.game.time.events.add(Phaser.Timer.SECOND * (appearSize === 1 ? 2 : 1.2), () => {
                army.setVisible(true);
            }, this);
        }
    }
    removeArmy(army, delay = 0) {
        if (delay === 0) {
            this.armyRepository.removeArmy(army);
        }
        else {
            this.game.time.events.add(delay, () => {
                this.armyRepository.removeArmy(army);
            });
        }
    }
    getArmyAt(cell) {
        const aerial = this.armyRepository.aerialItemAt(cell);
        return aerial ? aerial : this.armyRepository.groundItemAt(cell);
    }
    getGroundArmyAt(cell) {
        return this.armyRepository.groundItemAt(cell);
    }
    getGroundAt(cell) {
        for (let i = 0; i < this.groundRepository.length; i++) {
            if (this.groundRepository[i].getCellPositions()[0].x === cell.x &&
                this.groundRepository[i].getCellPositions()[0].y === cell.y) {
                return this.groundRepository[i];
            }
        }
        return null;
    }
    getArmies() {
        return this.armyRepository.getItems();
    }
    getSelectedArmies() {
        return this.armyRepository.getSelectedArmies();
    }
    getPlayerArmies(player, type = null) {
        return this.armyRepository.getItems(type).filter((army) => {
            return army.getPlayer() === player;
        });
    }
    getEnemyArmies(player, type = null) {
        return this.armyRepository.getItems(type).filter((army) => {
            return army.getPlayer() !== null && army.getPlayer() !== player;
        });
    }
    getCreatorOf(buildingName, player) {
        const creators = this.armyRepository.getCreatorOf(buildingName).filter((building) => {
            return building.getPlayer() === player;
        });
        return creators.length > 0 ? creators[0] : null;
    }
    getGroundCSV() {
        return this.ground.getCSV();
    }
    addGroundElement(newPlant) {
        this.groups[Play_1.GROUP.GROUND].add(newPlant);
        this.groundRepository.push(newPlant);
    }
    getGrounds() {
        return this.groundRepository;
    }
    getPlayerNeededPower(player) {
        return -this.getPlayerArmies(player).reduce((power, building) => {
            return power + Math.min(0, BuildingProperties_1.BuildingProperties.getPower(building.constructor.name));
        }, 0);
    }
    getPlayerProvidedPower(player) {
        return Player_1.START_POWER + this.getPlayerArmies(player).reduce((power, building) => {
            return power + Math.max(0, BuildingProperties_1.BuildingProperties.getPower(building.constructor.name));
        }, 0);
    }
    addPlayer(player) {
        this.players.push(player);
        this.unitCreators.push(player.getUnitCreator());
        this.buildingCreators.push(player.getBuildingCreator());
        this.fogs.push(new Fog_1.Fog(this, player));
    }
    getPlayers() {
        return this.players;
    }
    productUnit(player, unitName) {
        this.getPlayerUnitCreator(player).orderProduction(unitName);
    }
    productBuilding(player, unitName) {
        this.getPlayerBuildingCreator(player).orderProduction(unitName);
    }
    isBuildingProduced(player, buildingName) {
        return this.getPlayerBuildingCreator(player).isProduced(buildingName);
    }
    runBuildingCreation(player, buildingName, cell) {
        this.getPlayerBuildingCreator(player).runCreation(buildingName, cell);
    }
    getPlayerAllowedBuildings(player) {
        return this.getPlayerBuildingCreator(player).getAllowedBuildings();
    }
    getPlayerAllowedUnits(player) {
        return this.getPlayerUnitCreator(player).getAllowedUnits();
    }
    getBuildingProductionStatus(player) {
        return this.getPlayerBuildingCreator(player).getProductionStatus();
    }
    canProductBuilding(player, buildingName) {
        return this.getPlayerBuildingCreator(player).canProduct(buildingName);
    }
    getUnitProductionStatus(player) {
        return this.getPlayerUnitCreator(player).getProductionStatus();
    }
    canProductUnit(player, unitName) {
        return this.getPlayerUnitCreator(player).canProduct(unitName);
    }
    holdBuilding(player, itemName) {
        return this.getPlayerBuildingCreator(player).hold(itemName);
    }
    holdUnit(player, itemName) {
        return this.getPlayerUnitCreator(player).hold(itemName);
    }
    isBuildingProducing(player, itemName) {
        return this.getPlayerBuildingCreator(player).isProducing(itemName);
    }
    isBuildingHold(player, itemName) {
        return this.getPlayerBuildingCreator(player).isHold(itemName);
    }
    isUnitHold(player, itemName) {
        return this.getPlayerUnitCreator(player).isHold(itemName);
    }
    isUnitProducing(player, itemName) {
        return this.getPlayerUnitCreator(player).isProducing(itemName);
    }
    cancelBuilding(player, itemName) {
        return this.getPlayerBuildingCreator(player).cancel(itemName);
    }
    cancelUnit(player, itemName) {
        return this.getPlayerUnitCreator(player).cancel(itemName);
    }
    getFogKnownCells(player) {
        return this.fogs.filter((fog) => {
            return fog.getPlayer() === player;
        })[0].getKnownCells();
    }
    getPlayerUnitCreator(player) {
        return this.unitCreators.filter((unitCreator) => {
            return unitCreator.getPlayer() === player;
        })[0];
    }
    getPlayerBuildingCreator(player) {
        return this.buildingCreators.filter((buildingCreator) => {
            return buildingCreator.getPlayer() === player;
        })[0];
    }
}
exports.WorldKnowledge = WorldKnowledge;
//# sourceMappingURL=WorldKnowledge.js.map