"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
class ComputerPlayer extends Player_1.Player {
    update() {
        // Check if MCV to open
        this.worldKnowledge.getPlayerUnits(this, 'MCV').forEach((unit) => {
            this.order().expand(unit);
        });
        // Check if there is Power Plant
        if (this.worldKnowledge.getPlayerBuildings(this, 'PowerPlant').length === 0) {
            if (this.order().getBuildingCreator().isProduced('PowerPlant')) {
                this.order().createBuilding('PowerPlant', this.getRandomCellNearBase());
            }
            else {
                this.order().productBuilding('PowerPlant');
            }
        }
        // Check if there is Barracks
        if (this.worldKnowledge.getPlayerBuildings(this, 'Barracks').length === 0) {
            if (this.order().getBuildingCreator().isProduced('Barracks')) {
                this.order().createBuilding('Barracks', this.getRandomCellNearBase());
            }
            else {
                this.order().productBuilding('Barracks');
            }
        }
        else {
            this.order().productUnit('Tank');
        }
        // Attack
        this.worldKnowledge.getPlayerUnits(this, 'Tank').forEach((unit) => {
            this.order().orderMoveAttack(unit, new PIXI.Point(0, 0));
        });
    }
    getRandomCellNearBase() {
        const cellPos = this.worldKnowledge.getPlayerBuildings(this, 'ConstructionYard')[0].getCellPositions()[0];
        return new PIXI.Point(cellPos.x + (2 + Math.floor(Math.random() * 3)) * (Math.random() > 0.5 ? -1 : 1), cellPos.y + (2 + Math.floor(Math.random() * 3)) * (Math.random() > 0.5 ? -1 : 1));
    }
}
exports.ComputerPlayer = ComputerPlayer;
//# sourceMappingURL=ComputerPlayer.js.map