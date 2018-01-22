"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandCenter_1 = require("./CommandCenter");
const START_MINERALS = 5000;
exports.START_POWER = 10;
class Player {
    constructor(worldKnowledge, id, color) {
        this.minerals = START_MINERALS;
        this.worldKnowledge = worldKnowledge;
        this.id = id;
        this.color = color;
        this.commandCenter = new CommandCenter_1.CommandCenter(this.worldKnowledge, this);
    }
    getColor() {
        return this.color;
    }
    getId() {
        return this.id;
    }
    order() {
        return this.commandCenter;
    }
    addMinerals(amount) {
        this.minerals = this.minerals + amount;
        this.getUnitCreator().unHoldProductionStatus();
        this.getBuildingCreator().unHoldProductionStatus();
    }
    removeMinerals(amount) {
        this.minerals = this.minerals - amount;
    }
    getMinerals() {
        return this.minerals;
    }
    getUnitCreator() {
        return this.commandCenter.getUnitCreator();
    }
    getBuildingCreator() {
        return this.commandCenter.getBuildingCreator();
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map