"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
const app_1 = require("../../app");
const ObjectSeller_1 = require("./ObjectSeller");
const TextStyle_1 = require("../TextStyle");
const HumanEmployer_1 = require("./HumanEmployer");
const InfoPanel_1 = require("./InfoPanel");
const LevelDisplayer_1 = require("./LevelDisplayer");
exports.INTERFACE_WIDTH = 150.5;
exports.TOP_GAP_2 = 15.5 + 12;
exports.TOP_GAP = exports.TOP_GAP_2 + 15;
var PANEL;
(function (PANEL) {
    PANEL[PANEL["INFO"] = 0] = "INFO";
    PANEL[PANEL["USR"] = 1] = "USR";
    PANEL[PANEL["OBJ"] = 2] = "OBJ";
})(PANEL || (PANEL = {}));
class UserInterface {
    constructor(worldKnowledge) {
        this.worldKnowledge = worldKnowledge;
        this.objectSeller = new ObjectSeller_1.ObjectSeller(worldKnowledge);
        this.humanEmployer = new HumanEmployer_1.HumanEmployer(worldKnowledge);
        this.infoPanel = new InfoPanel_1.InfoPanel(worldKnowledge);
        this.levelDisplayer = new LevelDisplayer_1.LevelDisplayer(worldKnowledge);
        this.buttons = [];
        this.selectedPanel = PANEL.OBJ;
    }
    create(game, groups) {
        const interfaceGroup = groups[Play_1.GROUP_INTERFACE];
        this.backgroundGraphics = game.add.graphics(app_1.CAMERA_WIDTH_PIXELS - exports.INTERFACE_WIDTH, 0, interfaceGroup);
        this.backgroundGraphics.beginFill(0x272a60);
        this.backgroundGraphics.drawRect(-0.5, 0, exports.INTERFACE_WIDTH, app_1.CAMERA_HEIGHT_PIXELS);
        interfaceGroup.add(this.backgroundGraphics);
        this.objectSeller.create(game, groups);
        this.humanEmployer.create(game, groups);
        this.infoPanel.create(game, groups);
        this.levelDisplayer.create(game, groups);
        const buttonWidth = exports.INTERFACE_WIDTH / 3;
        this.moneyCounter = game.add.text(app_1.CAMERA_WIDTH_PIXELS - exports.INTERFACE_WIDTH + 2, 0, this.worldKnowledge.getMoneyInWallet().getStringValue(), TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        let i = 0;
        [['info', PANEL.INFO], ['usr', PANEL.USR], ['obj', PANEL.OBJ]].forEach((panelInfo) => {
            const button = game.add.text(app_1.CAMERA_WIDTH_PIXELS - exports.INTERFACE_WIDTH + i * buttonWidth, exports.TOP_GAP_2, panelInfo[0], TextStyle_1.TEXT_STYLE, interfaceGroup);
            button.inputEnabled = true;
            button.input.useHandCursor = true;
            button.events.onInputDown.add(() => {
                this.selectPanel(panelInfo[1]);
            });
            this.buttons.push(button);
            i++;
        });
        this.selectPanel(PANEL.INFO);
    }
    update() {
        this.objectSeller.update();
        this.infoPanel.update();
        this.levelDisplayer.update();
        this.moneyCounter.setText(this.worldKnowledge.getMoneyInWallet().getStringValue());
    }
    selectPanel(panel) {
        this.selectedPanel = panel;
        if (this.selectedPanel === PANEL.INFO) {
            this.objectSeller.hide();
            this.humanEmployer.hide();
            this.infoPanel.show();
        }
        else if (this.selectedPanel === PANEL.USR) {
            this.objectSeller.hide();
            this.humanEmployer.show();
            this.infoPanel.hide();
        }
        else {
            this.objectSeller.show();
            this.humanEmployer.hide();
            this.infoPanel.hide();
        }
    }
}
exports.UserInterface = UserInterface;
//# sourceMappingURL=UserInterface.js.map