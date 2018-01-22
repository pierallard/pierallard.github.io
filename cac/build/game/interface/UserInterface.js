"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIBuildingCreator_1 = require("../creator/UIBuildingCreator");
const Minimap_1 = require("../map/Minimap");
const BuildingPositionner_1 = require("./BuildingPositionner");
const Selector_1 = require("./Selector");
const UIUnitCreator_1 = require("../creator/UIUnitCreator");
const app_1 = require("../../app");
const PowerInterface_1 = require("./PowerInterface");
const Custor_1 = require("../Custor");
exports.INTERFACE_WIDTH = 94 * 2;
class UserInterface {
    constructor(worldKnowledge, player) {
        this.player = player;
        this.selector = new Selector_1.Selector(worldKnowledge, player);
        this.buildingPositionner = new BuildingPositionner_1.BuildingPositioner(worldKnowledge, this.player);
        this.UIBuildingCreator = new UIBuildingCreator_1.UIBuildingCreator(worldKnowledge, this.player, this.buildingPositionner);
        this.UIUnitCreator = new UIUnitCreator_1.UIUnitCreator(worldKnowledge, this.player);
        this.miniMap = new Minimap_1.MiniMap(worldKnowledge, this.player);
        this.powerInterface = new PowerInterface_1.PowerInterface(worldKnowledge, this.player);
        this.cursor = new Custor_1.Cursor(worldKnowledge, this.player);
    }
    create(game) {
        this.buildingPositionner.create(game);
        this.selector.create(game);
        this.interfaceGroup = game.add.group();
        this.interfaceGroup.fixedToCamera = true;
        let interfaceSprite = new Phaser.Sprite(game, 0, 0, 'interface');
        interfaceSprite.scale.setTo(2);
        this.interfaceGroup.add(interfaceSprite);
        this.UIUnitCreator.create(game, this.interfaceGroup);
        this.UIBuildingCreator.create(game, this.interfaceGroup);
        this.miniMap.create(game, this.interfaceGroup);
        this.mineralText = new Phaser.Text(game, app_1.GAME_WIDTH - exports.INTERFACE_WIDTH / 2, 212, this.player.getMinerals() + '', { align: 'center', fill: "#ffffff", font: '24px 000webfont' });
        this.interfaceGroup.add(this.mineralText);
        this.powerInterface.create(game, this.interfaceGroup);
        this.cursor.create(game);
    }
    update() {
        this.selector.update();
        this.miniMap.update();
        this.powerInterface.update();
        this.mineralText.text = Math.floor(this.player.getMinerals()) + '';
        this.UIUnitCreator.update();
        this.UIBuildingCreator.update();
        this.cursor.update();
    }
}
exports.UserInterface = UserInterface;
//# sourceMappingURL=UserInterface.js.map