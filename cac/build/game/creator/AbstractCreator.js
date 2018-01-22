"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractCreator {
    constructor(worldKnowledge, player) {
        this.productionStatus = null;
        this.worldKnowledge = worldKnowledge;
        this.player = player;
    }
    create(game) {
        this.timerEvent = game.time.events;
        this.game = game;
    }
    getPlayer() {
        return this.player;
    }
    orderProduction(itemName) {
        if (this.productionStatus && this.productionStatus.getItemName() === itemName) {
            this.productionStatus.playerUnHold();
        }
        else {
            if (this.canProduct(itemName)) {
                return this.runProduction(itemName);
            }
        }
    }
    isAllowed(itemName) {
        let found = true;
        this.getRequiredBuildings(itemName).forEach((requiredBuildingName) => {
            if (this.worldKnowledge.getPlayerArmies(this.player, requiredBuildingName).length === 0) {
                found = false;
            }
        });
        return found;
    }
    getProductionStatus() {
        return this.productionStatus;
    }
    isProduced(itemName) {
        return this.productionStatus &&
            this.productionStatus.getItemName() === itemName &&
            this.productionStatus.percentage >= 1;
    }
    isProducingAny() {
        return null !== this.productionStatus;
    }
    isProducing(itemName) {
        return this.productionStatus && this.productionStatus.getItemName() === itemName;
    }
    hold(itemName) {
        if (this.productionStatus && this.productionStatus.getItemName() === itemName) {
            this.productionStatus.playerHold();
        }
    }
    isHold(itemName) {
        return this.productionStatus &&
            this.productionStatus.getItemName() === itemName &&
            this.productionStatus.isHold();
    }
    cancel(itemName) {
        if (this.isHold(itemName)) {
            this.productionStatus.cancel();
            this.productionStatus = null;
        }
    }
    unHoldProductionStatus() {
        if (this.productionStatus) {
            this.productionStatus.unHold();
        }
    }
}
exports.AbstractCreator = AbstractCreator;
class ProductionStatus {
    constructor(itemName, duration, price, player, callBack, game) {
        this.itemName = itemName;
        this.percentage = 0;
        this.previousPercentage = 0;
        this.price = price;
        this.player = player;
        this.isHoldPlayer = false;
        this.tween = game.add.tween(this).to({
            percentage: 1,
        }, duration, Phaser.Easing.Default, true);
        this.tween.onComplete.add(() => {
            player.removeMinerals(this.diffMinerals());
            player.removeMinerals(this.diffMinerals());
            callBack(this.itemName);
        });
        this.tween.onUpdateCallback(() => {
            if (this.player.getMinerals() - this.diffMinerals() > 0) {
                player.removeMinerals(this.diffMinerals());
            }
            else {
                this.hold();
            }
            this.previousPercentage = this.percentage;
        });
    }
    getItemName() {
        return this.itemName;
    }
    playerHold() {
        this.isHoldPlayer = true;
        this.hold();
    }
    playerUnHold() {
        this.isHoldPlayer = false;
        this.unHold();
    }
    unHold() {
        this.tween.resume();
    }
    isHold() {
        return this.isHoldPlayer && this.tween.isPaused;
    }
    cancel() {
        this.tween.stop(false);
        this.player.addMinerals(this.percentage * this.price);
    }
    diffMinerals() {
        return (this.percentage - this.previousPercentage) * this.price;
    }
    hold() {
        this.tween.pause();
    }
}
exports.ProductionStatus = ProductionStatus;
//# sourceMappingURL=AbstractCreator.js.map