"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
const app_1 = require("../../app");
const UserInterface_1 = require("./UserInterface");
const BuildingProperties_1 = require("../building/BuildingProperties");
const HEIGHT = 349 * 2;
const TOP = 5 * 2;
class PowerInterface {
    constructor(worldKnowledge, player) {
        this.worldKnowledge = worldKnowledge;
        this.player = player;
        this.maxPower = BuildingProperties_1.BuildingProperties.getPower('AdvancedPowerPlant') * 10;
        this.neededPower = this.worldKnowledge.getPlayerNeededPower(this.player);
        this.providedPower = this.worldKnowledge.getPlayerProvidedPower(this.player);
    }
    create(game, group) {
        this.game = game;
        this.powerProgress = new Phaser.Sprite(game, app_1.GAME_WIDTH - UserInterface_1.INTERFACE_WIDTH + 4, TOP + HEIGHT, 'interfaceprogress');
        this.powerProgress.scale.setTo(Play_1.SCALE);
        this.powerProgress.anchor.setTo(0, 1);
        this.cropPowerProgress = new Phaser.Rectangle(0, 0, 20, this.getHeight(this.providedPower));
        this.cropPowerProgress.scale(Play_1.SCALE);
        this.powerArrow = new Phaser.Sprite(game, app_1.GAME_WIDTH - UserInterface_1.INTERFACE_WIDTH + 4, this.getTop(this.neededPower), 'interfacelimit', 1);
        this.powerArrow.scale.setTo(Play_1.SCALE);
        this.powerArrow.anchor.setTo(0, 0.5);
        group.add(this.powerProgress);
        group.add(this.powerArrow);
    }
    update() {
        const neededPower = this.worldKnowledge.getPlayerNeededPower(this.player);
        const providedPower = this.worldKnowledge.getPlayerProvidedPower(this.player);
        if (this.neededPower !== neededPower) {
            this.game.add.tween(this.powerArrow).to({
                y: this.getTop(neededPower),
            }, 500, Phaser.Easing.Power0, true);
            this.neededPower = neededPower;
        }
        if (this.providedPower !== providedPower) {
            this.game.add.tween(this.cropPowerProgress).to({
                height: this.getHeight(providedPower),
            }, 500, Phaser.Easing.Power0, true);
            this.providedPower = providedPower;
        }
        this.powerArrow.loadTexture(this.powerArrow.key, neededPower > providedPower ? 0 : 1);
        this.powerProgress.crop(this.cropPowerProgress, false);
    }
    getTop(value) {
        return Math.round(TOP + HEIGHT - value * HEIGHT / this.maxPower);
    }
    getHeight(value) {
        // I have no idea why I have to divide by SCALE...
        return value * HEIGHT / this.maxPower / Play_1.SCALE;
    }
}
exports.PowerInterface = PowerInterface;
//# sourceMappingURL=PowerInterface.js.map