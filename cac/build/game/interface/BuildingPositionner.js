"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
const Cell_1 = require("../computing/Cell");
const BuildingProperties_1 = require("../building/BuildingProperties");
const Ground_1 = require("../map/Ground");
const app_1 = require("../../app");
const UserInterface_1 = require("./UserInterface");
const Distance_1 = require("../computing/Distance");
const ConstructableBuilding_1 = require("../building/ConstructableBuilding");
exports.BUILDING_POSITIONNER_MIN_DIST = 6;
class BuildingPositioner {
    static isAccessible(cell, buildingName, worldKnowledge, player) {
        return this.isCellClose(cell, worldKnowledge, player) &&
            this.isCellAccessible(cell, worldKnowledge, buildingName);
    }
    static isCellClose(cell, worldKnowledge, player) {
        const armies = worldKnowledge.getPlayerArmies(player);
        for (let i = 0; i < armies.length; i++) {
            const army = armies[i];
            if (army instanceof ConstructableBuilding_1.ConstructableBuilding) {
                const distance = Distance_1.Distance.to(cell, army.getCellPositions());
                if (distance < exports.BUILDING_POSITIONNER_MIN_DIST) {
                    return true;
                }
            }
        }
        return false;
    }
    static isCellAccessible(cell, worldKnowledge, buildingName) {
        const cellPositions = BuildingProperties_1.BuildingProperties.getCellPositions(buildingName);
        for (let i = 0; i < cellPositions.length; i++) {
            const position = cellPositions[i];
            let newCell = new PIXI.Point(cell.x + position.x, cell.y + position.y);
            if (!worldKnowledge.isGroundCellAccessible(newCell)) {
                return false;
            }
        }
        return true;
    }
    constructor(worldKnowledge, player) {
        this.worldKnowledge = worldKnowledge;
        this.player = player;
    }
    create(game) {
        this.graphics = new BuildingPositionerGraphics(game, this.worldKnowledge, this.player);
    }
    activate(buildingName) {
        this.graphics.activate(buildingName);
    }
}
exports.BuildingPositioner = BuildingPositioner;
class BuildingPositionerGraphics extends Phaser.Graphics {
    constructor(game, worldKnowledge, player) {
        super(game, 0, 0);
        this.buildingName = null;
        this.worldKnowledge = worldKnowledge;
        this.player = player;
        this.scale.set(Play_1.SCALE, Play_1.SCALE);
        game.add.existing(this);
    }
    static isInBounds(x) {
        return x < app_1.GAME_WIDTH - UserInterface_1.INTERFACE_WIDTH;
    }
    activate(buildingName) {
        this.buildingName = buildingName;
    }
    deactivate() {
        this.buildingName = null;
    }
    update() {
        this.clear();
        if (null !== this.buildingName) {
            if (BuildingPositionerGraphics.isInBounds(this.game.input.mousePointer.x)) {
                let cellX = Cell_1.Cell.realToCell(this.game.input.mousePointer.x + this.game.camera.position.x);
                let cellY = Cell_1.Cell.realToCell(this.game.input.mousePointer.y + this.game.camera.position.y);
                const allowedToBuild = BuildingPositioner.isAccessible(new PIXI.Point(cellX, cellY), this.buildingName, this.worldKnowledge, this.player);
                if (allowedToBuild && this.game.input.activePointer.leftButton.isDown) {
                    this.worldKnowledge.runBuildingCreation(this.player, this.buildingName, new PIXI.Point(cellX, cellY));
                    this.deactivate();
                    return;
                }
                BuildingProperties_1.BuildingProperties.getCellPositions(this.buildingName).forEach((position) => {
                    let cellGapX = cellX + position.x;
                    let cellGapY = cellY + position.y;
                    let realCellGapX = Cell_1.Cell.cellToReal(cellGapX) / Play_1.SCALE;
                    let realCellGapY = Cell_1.Cell.cellToReal(cellGapY) / Play_1.SCALE;
                    this.lineStyle(1, allowedToBuild ? 0xffffff : 0xff0000, 0.8);
                    this.moveTo(realCellGapX - Ground_1.GROUND_SIZE / 2, realCellGapY - Ground_1.GROUND_SIZE / 4);
                    this.lineTo(realCellGapX - Ground_1.GROUND_SIZE / 4, realCellGapY - Ground_1.GROUND_SIZE / 2);
                    this.moveTo(realCellGapX - Ground_1.GROUND_SIZE / 2, realCellGapY);
                    this.lineTo(realCellGapX, realCellGapY - Ground_1.GROUND_SIZE / 2);
                    this.moveTo(realCellGapX - Ground_1.GROUND_SIZE / 2, realCellGapY + Ground_1.GROUND_SIZE / 4);
                    this.lineTo(realCellGapX + Ground_1.GROUND_SIZE / 4, realCellGapY - Ground_1.GROUND_SIZE / 2);
                    this.moveTo(realCellGapX - Ground_1.GROUND_SIZE / 2, realCellGapY + Ground_1.GROUND_SIZE / 2);
                    this.lineTo(realCellGapX + Ground_1.GROUND_SIZE / 2, realCellGapY - Ground_1.GROUND_SIZE / 2);
                    this.moveTo(realCellGapX - Ground_1.GROUND_SIZE / 4, realCellGapY + Ground_1.GROUND_SIZE / 2);
                    this.lineTo(realCellGapX + Ground_1.GROUND_SIZE / 2, realCellGapY - Ground_1.GROUND_SIZE / 4);
                    this.moveTo(realCellGapX, realCellGapY + Ground_1.GROUND_SIZE / 2);
                    this.lineTo(realCellGapX + Ground_1.GROUND_SIZE / 2, realCellGapY);
                    this.moveTo(realCellGapX + Ground_1.GROUND_SIZE / 4, realCellGapY + Ground_1.GROUND_SIZE / 2);
                    this.lineTo(realCellGapX + Ground_1.GROUND_SIZE / 2, realCellGapY + Ground_1.GROUND_SIZE / 4);
                });
            }
        }
    }
}
//# sourceMappingURL=BuildingPositionner.js.map