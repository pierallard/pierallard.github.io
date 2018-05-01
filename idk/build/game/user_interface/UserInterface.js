"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
const app_1 = require("../../app");
const ObjectSeller_1 = require("./ObjectSeller");
const TextStyle_1 = require("../TextStyle");
const HumanEmployer_1 = require("./HumanEmployer");
const InfoPanel_1 = require("./InfoPanel");
const LevelDisplayer_1 = require("./LevelDisplayer");
const UserInfoPanel_1 = require("./UserInfoPanel");
const Pico8Colors_1 = require("../Pico8Colors");
exports.INTERFACE_WIDTH = 150.5;
exports.TOP_GAP_2 = 15.5 + 12;
exports.TOP_GAP = exports.TOP_GAP_2 + 15;
var PANEL;
(function (PANEL) {
    PANEL[PANEL["INFO"] = 0] = "INFO";
    PANEL[PANEL["USR"] = 1] = "USR";
    PANEL[PANEL["OBJ"] = 2] = "OBJ";
    PANEL[PANEL["USER_INFO"] = 3] = "USER_INFO";
})(PANEL = exports.PANEL || (exports.PANEL = {}));
class UserInterface {
    constructor(worldKnowledge) {
        this.worldKnowledge = worldKnowledge;
        this.objectSeller = new ObjectSeller_1.ObjectSeller(worldKnowledge);
        this.humanEmployer = new HumanEmployer_1.HumanEmployer(worldKnowledge);
        this.infoPanel = new InfoPanel_1.InfoPanel(worldKnowledge);
        this.userInfoPanel = new UserInfoPanel_1.UserInfoPanel(worldKnowledge);
        this.levelDisplayer = new LevelDisplayer_1.LevelDisplayer(worldKnowledge);
        this.buttons = [];
        let i = 0;
        [['info', PANEL.INFO], ['usr', PANEL.USR], ['obj', PANEL.OBJ]].forEach((panelInfo) => {
            this.buttons.push(new InterfaceTab(this, i, panelInfo[0], panelInfo[1]));
            i++;
        });
        this.selectedPanel = PANEL.OBJ;
    }
    create(game, groups) {
        const interfaceGroup = groups[Play_1.GROUP_INTERFACE];
        this.backgroundGraphics = game.add.graphics(app_1.CAMERA_WIDTH_PIXELS - exports.INTERFACE_WIDTH, 0, interfaceGroup);
        this.backgroundGraphics.beginFill(Pico8Colors_1.COLOR.BLACK);
        this.backgroundGraphics.drawRect(-0.5, 0, exports.INTERFACE_WIDTH, exports.TOP_GAP_2);
        this.backgroundGraphics.beginFill(Pico8Colors_1.COLOR.DARK_BLUE);
        this.backgroundGraphics.drawRect(-0.5, exports.TOP_GAP_2, exports.INTERFACE_WIDTH, app_1.CAMERA_HEIGHT_PIXELS - exports.TOP_GAP_2);
        interfaceGroup.add(this.backgroundGraphics);
        this.objectSeller.create(game, groups);
        this.humanEmployer.create(game, groups);
        this.infoPanel.create(game, groups);
        this.userInfoPanel.create(game, groups);
        this.levelDisplayer.create(game, groups);
        this.levelText = game.add.text(app_1.CAMERA_WIDTH_PIXELS - exports.INTERFACE_WIDTH + 2, 0, 'Lvl 1', TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        this.moneyCounter = game.add.text(app_1.CAMERA_WIDTH_PIXELS - exports.INTERFACE_WIDTH + 2 + 50, 0, this.worldKnowledge.getMoneyInWallet().getStringValue(), TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        const backgroundTabs = game.add.sprite(app_1.CAMERA_WIDTH_PIXELS - exports.INTERFACE_WIDTH, exports.TOP_GAP_2, 'interfacetabs', 2, groups[Play_1.GROUP_INTERFACE]);
        backgroundTabs.scale.set(10, 1);
        this.buttons.forEach((button) => {
            button.create(game, groups);
        });
        this.selectPanel(PANEL.INFO);
    }
    update() {
        this.objectSeller.update();
        this.infoPanel.update();
        this.levelDisplayer.update();
        this.userInfoPanel.update();
        this.humanEmployer.update();
        this.moneyCounter.setText(this.worldKnowledge.getMoneyInWallet().getStringValue());
        this.levelText.setText('Lvl ' + this.worldKnowledge.getLevel());
    }
    selectPanel(panel) {
        if (this.selectedPanel === panel) {
            return;
        }
        this.selectedPanel = panel;
        if (this.selectedPanel === PANEL.INFO) {
            this.objectSeller.hide();
            this.humanEmployer.hide();
            this.infoPanel.show();
            this.userInfoPanel.hide();
            this.worldKnowledge.unselectHuman(false);
            this.highlightButton(PANEL.INFO);
        }
        else if (this.selectedPanel === PANEL.USR) {
            this.objectSeller.hide();
            this.humanEmployer.show();
            this.infoPanel.hide();
            this.userInfoPanel.hide();
            this.worldKnowledge.unselectHuman(false);
            this.highlightButton(PANEL.USR);
        }
        else if (this.selectedPanel === PANEL.OBJ) {
            this.objectSeller.show();
            this.humanEmployer.hide();
            this.infoPanel.hide();
            this.userInfoPanel.hide();
            this.worldKnowledge.unselectHuman(false);
            this.highlightButton(PANEL.OBJ);
        }
        else if (this.selectedPanel === PANEL.USER_INFO) {
            this.objectSeller.hide();
            this.humanEmployer.hide();
            this.infoPanel.hide();
            this.userInfoPanel.show();
            this.highlightButton(PANEL.INFO);
        }
    }
    setSelectedHuman(param) {
        this.selectPanel(PANEL.USER_INFO);
        this.userInfoPanel.showEmployeeInfoPanelForYohan(param);
    }
    highlightButton(panel) {
        this.buttons.forEach((button) => {
            button.highlight(button.getPanel() === panel);
        });
    }
}
exports.UserInterface = UserInterface;
class InterfaceTab {
    constructor(userInterface, i, text, panel) {
        this.position = new PIXI.Point(app_1.CAMERA_WIDTH_PIXELS - exports.INTERFACE_WIDTH + i * (28 + 5), exports.TOP_GAP_2);
        this.text = text;
        this.panel = panel;
        this.userInterface = userInterface;
    }
    create(game, groups) {
        this.buttonSprite = game.add.sprite(this.position.x, this.position.y, 'interfacetabs', 0, groups[Play_1.GROUP_INTERFACE]);
        this.buttonText = game.add.text(this.position.x + 4, this.position.y, this.text, TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        this.buttonSprite.inputEnabled = true;
        this.buttonSprite.input.useHandCursor = true;
        this.buttonSprite.events.onInputDown.add(() => {
            this.userInterface.selectPanel(this.panel);
        });
    }
    getPanel() {
        return this.panel;
    }
    highlight(value) {
        this.buttonSprite.loadTexture('interfacetabs', value ? 1 : 0);
    }
}
//# sourceMappingURL=UserInterface.js.map