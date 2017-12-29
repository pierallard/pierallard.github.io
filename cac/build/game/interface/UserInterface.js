"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UIBuildingCreator_1 = require("../creator/UIBuildingCreator");
const Minimap_1 = require("../map/Minimap");
const BuildingPositionner_1 = require("./BuildingPositionner");
const Selector_1 = require("./Selector");
const UIUnitCreator_1 = require("../creator/UIUnitCreator");
exports.INTERFACE_WIDTH = 160;
class UserInterface {
    constructor(worldKnowledge, player) {
        this.player = player;
        this.selector = new Selector_1.Selector(worldKnowledge, player);
        this.buildingPositionner = new BuildingPositionner_1.BuildingPositioner(worldKnowledge, this.player);
        this.UIBuildingCreator = new UIBuildingCreator_1.UIBuildingCreator(worldKnowledge, this.player, this.buildingPositionner);
        this.UIUnitCreator = new UIUnitCreator_1.UIUnitCreator(worldKnowledge, this.player);
        this.miniMap = new Minimap_1.MiniMap(worldKnowledge);
    }
    create(game) {
        this.buildingPositionner.create(game);
        this.selector.create(game);
        this.interfaceGroup = game.add.group();
        this.interfaceGroup.fixedToCamera = true;
        let interfaceSprite = new Phaser.Sprite(game, 0, 0, 'interface');
        interfaceSprite.scale.setTo(2);
        this.interfaceGroup.add(interfaceSprite);
        this.UIUnitCreator.create(game, this.interfaceGroup, this.player.getUnitCreator());
        this.UIBuildingCreator.create(game, this.interfaceGroup, this.player.getBuildingCreator());
        this.miniMap.create(game);
    }
    update() {
        this.selector.update();
        this.miniMap.update();
    }
}
exports.UserInterface = UserInterface;
//# sourceMappingURL=UserInterface.js.map