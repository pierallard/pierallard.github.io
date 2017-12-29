"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandCenter_1 = require("./CommandCenter");
class Player {
    constructor(worldKnowledge, id, color) {
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
    getBuildingCreator() {
        return this.commandCenter.getBuildingCreator();
    }
    getUnitCreator() {
        return this.commandCenter.getUnitCreator();
    }
    updateAllowedUnitsAndBuildings() {
        this.commandCenter.updateAllowedUnitsAndBuildings();
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map