"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserInterface_1 = require("./UserInterface");
const app_1 = require("../../app");
const TextStyle_1 = require("../TextStyle");
const HumanMoodManager_1 = require("../human_stuff/HumanMoodManager");
const Camembert_1 = require("./Camembert");
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
const HEIGHT = 80;
const GRAPH_GAP = 2;
class UserInfoPanel {
    constructor(worldKnowledge) {
        this.worldKnowledge = worldKnowledge;
        this.visible = true;
        this.camembert = new Camembert_1.Camembert();
    }
    create(game, groups) {
        const left = app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH + GRAPH_GAP;
        const top = UserInterface_1.TOP_GAP;
        const gap = 10;
        this.employeeName = game.add.text(left, top, '', TextStyle_1.TEXT_STYLE);
        this.moodRelaxationText = game.add.text(left, top + gap, 'Relax', TextStyle_1.TEXT_STYLE);
        this.moodHungerText = game.add.text(left, top + 2 * gap, 'Hunger', TextStyle_1.TEXT_STYLE);
        this.moodSocialText = game.add.text(left, top + 3 * gap, 'Social', TextStyle_1.TEXT_STYLE);
        this.currentState = game.add.text(left, top + 4 * gap, '', TextStyle_1.TEXT_STYLE);
        this.camembert.create(game, groups);
    }
    update() {
        if (this.human) {
            this.moodRelaxationText.setText('Relax  ' + UserInfoPanel.getPercentageStr(this.human.getMood(HumanMoodManager_1.MOOD.RELAXATION)));
            this.moodHungerText.setText('Hunger ' + UserInfoPanel.getPercentageStr(this.human.getMood(HumanMoodManager_1.MOOD.HUNGER)));
            this.moodSocialText.setText('Social ' + UserInfoPanel.getPercentageStr(this.human.getMood(HumanMoodManager_1.MOOD.SOCIAL)));
            this.camembert.update();
            this.currentState.setText('State: ' + HumanStateManager_1.HumanStateManager.getStr(this.human.getState()));
        }
    }
    static getPercentageStr(percentage) {
        return Math.round(percentage * 100) + '%';
    }
    show() {
        if (!this.visible) {
            this.employeeName.position.x -= UserInterface_1.INTERFACE_WIDTH;
            this.camembert.show();
            this.moodRelaxationText.position.x -= UserInterface_1.INTERFACE_WIDTH;
            this.moodHungerText.position.x -= UserInterface_1.INTERFACE_WIDTH;
            this.moodSocialText.position.x -= UserInterface_1.INTERFACE_WIDTH;
            this.currentState.position.x -= UserInterface_1.INTERFACE_WIDTH;
        }
        this.visible = true;
    }
    hide() {
        if (this.visible) {
            this.employeeName.position.x += UserInterface_1.INTERFACE_WIDTH;
            this.camembert.hide();
            this.moodRelaxationText.position.x += UserInterface_1.INTERFACE_WIDTH;
            this.moodHungerText.position.x += UserInterface_1.INTERFACE_WIDTH;
            this.moodSocialText.position.x += UserInterface_1.INTERFACE_WIDTH;
            this.currentState.position.x += UserInterface_1.INTERFACE_WIDTH;
        }
        this.visible = false;
    }
    showEmployeeInfoPanelForYohan(human) {
        this.human = human;
        this.employeeName.setText(human.getName());
        this.camembert.setHuman(human);
    }
}
exports.UserInfoPanel = UserInfoPanel;
//# sourceMappingURL=UserInfoPanel.js.map