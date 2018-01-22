"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
const BuildingPositionner_1 = require("../interface/BuildingPositionner");
class ComputerPlayer extends Player_1.Player {
    update() {
        // Check if MCV to open
        this.worldKnowledge.getPlayerArmies(this, 'MCV').forEach((unit) => {
            this.order().expand(unit);
        });
        this.constructWhenYouCan('PowerPlant');
        this.constructWhenYouCan('TiberiumRefinery');
        this.constructWhenYouCan('Barracks');
        if (this.worldKnowledge.getPlayerArmies(this, 'Barracks').length > 0) {
            this.order().productUnit('MinigunInfantry');
        }
        // Attack
        if (this.worldKnowledge.getPlayerArmies(this, 'MinigunInfantry').length > 5) {
            this.worldKnowledge.getPlayerArmies(this, 'MinigunInfantry').forEach((unit) => {
                this.order().orderMoveAttack(unit, new PIXI.Point(0, 0));
            });
        }
    }
    getRandomCellNearBase(buildingName) {
        const constructionYard = this.worldKnowledge.getPlayerArmies(this, 'ConstructionYard')[0];
        if (!constructionYard) {
            return null;
        }
        const cellPos = constructionYard.getCellPositions()[0];
        let tries = 10;
        while (tries > 0) {
            const test = new PIXI.Point(cellPos.x + (BuildingPositionner_1.BUILDING_POSITIONNER_MIN_DIST / 2 + Math.floor(Math.random() * BuildingPositionner_1.BUILDING_POSITIONNER_MIN_DIST)), cellPos.y + (BuildingPositionner_1.BUILDING_POSITIONNER_MIN_DIST / 2 + Math.floor(Math.random() * BuildingPositionner_1.BUILDING_POSITIONNER_MIN_DIST)));
            if (BuildingPositionner_1.BuildingPositioner.isAccessible(test, buildingName, this.worldKnowledge, this)) {
                return test;
            }
            tries--;
        }
        return null;
    }
    constructWhenYouCan(buildingName) {
        if (this.worldKnowledge.getPlayerArmies(this, buildingName).length === 0) {
            if (this.worldKnowledge.isBuildingProduced(this, buildingName)) {
                const randomCell = this.getRandomCellNearBase(buildingName);
                if (randomCell) {
                    this.order().createBuilding(buildingName, randomCell);
                }
            }
            else {
                this.order().productBuilding(buildingName);
            }
        }
    }
}
exports.ComputerPlayer = ComputerPlayer;
//# sourceMappingURL=ComputerPlayer.js.map