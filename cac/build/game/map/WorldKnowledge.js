"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BuildingRepository_1 = require("../repository/BuildingRepository");
const UnitRepository_1 = require("../repository/UnitRepository");
const Appear_1 = require("../sprite/Appear");
const GeneratedGround_1 = require("./GeneratedGround");
const MiniAppear_1 = require("../sprite/MiniAppear");
class WorldKnowledge {
    constructor() {
        this.ground = new GeneratedGround_1.GeneratedGround();
        this.unitRepository = new UnitRepository_1.UnitRepository();
        this.buildingRepository = new BuildingRepository_1.BuildingRepository();
    }
    create(game) {
        this.game = game;
        this.ground.create(this.game);
        this.unitBuildingGroup = this.game.add.group();
        this.unitBuildingGroup.fixedToCamera = false;
    }
    update() {
        this.unitBuildingGroup.sort('y');
        this.unitRepository.getUnits().forEach((unit) => {
            unit.update();
        });
    }
    isCellAccessible(position) {
        return this.ground.isCellAccessible(position) &&
            this.unitRepository.isCellNotOccupied(position) &&
            this.buildingRepository.isCellNotOccupied(position);
    }
    getGroundWidth() {
        return this.ground.getGroundWidth();
    }
    getGroundHeight() {
        return this.ground.getGroundHeight();
    }
    addBuilding(newBuilding, appear = false) {
        this.buildingRepository.add(newBuilding);
        newBuilding.create(this.game, this.unitBuildingGroup);
        if (appear) {
            newBuilding.setVisible(false);
            let appearSprite = new Appear_1.Appear(newBuilding.getCellPositions()[0]);
            appearSprite.create(this.game, this.unitBuildingGroup);
            this.game.time.events.add(Phaser.Timer.SECOND * 1.5, () => {
                newBuilding.setVisible(true);
            }, this);
        }
    }
    addUnit(newUnit, appear = false) {
        this.unitRepository.add(newUnit);
        newUnit.create(this.game, this.unitBuildingGroup);
        if (appear) {
            newUnit.setVisible(false);
            let appearSprite = new MiniAppear_1.MiniAppear(newUnit.getCellPositions()[0]);
            appearSprite.create(this.game, this.unitBuildingGroup);
            this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
                newUnit.setVisible(true);
            }, this);
        }
    }
    removeUnit(unit, delay = 0) {
        if (delay === 0) {
            this.unitRepository.removeUnit(unit);
        }
        else {
            this.game.time.events.add(delay, () => {
                this.unitRepository.removeUnit(unit);
            });
        }
    }
    getUnitAt(cell) {
        return this.unitRepository.unitAt(cell);
    }
    getBuildingAt(cell) {
        return this.buildingRepository.buildingAt(cell);
    }
    getUnits() {
        return this.unitRepository.getUnits();
    }
    getSelectedUnits() {
        return this.unitRepository.getSelectedUnits();
    }
    getPlayerBuildings(player, type = null) {
        return this.buildingRepository.getBuildings(type).filter((building) => {
            return building.getPlayer() === player;
        });
    }
    getEnemyBuildings(player, type = null) {
        return this.buildingRepository.getBuildings(type).filter((building) => {
            return building.getPlayer() !== null && building.getPlayer() !== player;
        });
    }
    getPlayerUnits(player, type = null) {
        return this.unitRepository.getUnits(type).filter((unit) => {
            return unit.getPlayer() === player;
        });
    }
    getEnemyUnits(player, type = null) {
        return this.unitRepository.getUnits(type).filter((unit) => {
            return unit.getPlayer() !== null && unit.getPlayer() !== player;
        });
    }
    getCreatorOf(buildingName, player) {
        const creators = this.buildingRepository.getCreatorOf(buildingName).filter((building) => {
            return building.getPlayer() === player;
        });
        return creators.length > 0 ? creators[0] : null;
    }
    getEnemies(player) {
        let result = [];
        this.getEnemyUnits(player).forEach((unit) => {
            result.push(unit);
        });
        this.getEnemyBuildings(player).forEach((building) => {
            result.push(building);
        });
        return result;
    }
    removeBuilding(building) {
        this.buildingRepository.removeBuilding(building);
    }
    getGroundCSV() {
        return this.ground.getCSV();
    }
}
exports.WorldKnowledge = WorldKnowledge;
//# sourceMappingURL=WorldKnowledge.js.map