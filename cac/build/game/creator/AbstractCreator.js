"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractCreator {
    constructor(worldKnowledge, player) {
        this.uiCreator = null;
        this.worldKnowledge = worldKnowledge;
        this.player = player;
    }
    create(game, uiCreator = null) {
        this.timerEvent = game.time.events;
        this.uiCreator = uiCreator;
    }
    updateAllowedItems() {
        if (this.uiCreator) {
            this.uiCreator.updateAllowedItems(this.getAlloweds());
        }
    }
    isAllowed(itemName) {
        let found = true;
        this.getRequiredBuildings(itemName).forEach((requiredBuildingName) => {
            if (this.worldKnowledge.getPlayerBuildings(this.player, requiredBuildingName).length === 0) {
                found = false;
            }
        });
        return found;
    }
    getAlloweds() {
        return this.getProducibles().filter((itemName) => {
            return this.isAllowed(itemName);
        });
    }
}
exports.AbstractCreator = AbstractCreator;
//# sourceMappingURL=AbstractCreator.js.map