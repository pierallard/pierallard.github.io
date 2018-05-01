"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserInterface_1 = require("./UserInterface");
const app_1 = require("../../app");
const Play_1 = require("../game_state/Play");
const TextStyle_1 = require("../TextStyle");
const HumanMoodManager_1 = require("../human_stuff/HumanMoodManager");
const PieChart_1 = require("./PieChart");
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
const ColoredGauge_1 = require("./ColoredGauge");
const GRAPH_GAP = 2;
exports.GAP_BETWEEN_LINES = 10;
const GAUGE_GAP = 100;
class UserInfoPanel {
    constructor(worldKnowledge) {
        this.worldKnowledge = worldKnowledge;
        this.visible = true;
        this.pieChart = new PieChart_1.PieChart();
        const gaugeWidth = UserInterface_1.INTERFACE_WIDTH - GAUGE_GAP - GRAPH_GAP;
        this.moodRelaxationGauge = new ColoredGauge_1.ColoredGauge(gaugeWidth, 8);
        this.moodHungerGauge = new ColoredGauge_1.ColoredGauge(gaugeWidth, 8);
        this.moodSocialGauge = new ColoredGauge_1.ColoredGauge(gaugeWidth, 8);
    }
    create(game, groups) {
        const left = app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH + GRAPH_GAP;
        this.employeeName = game.add.text(left, UserInterface_1.TOP_GAP, '', TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        this.moodRelaxationText = game.add.text(left, UserInterface_1.TOP_GAP + exports.GAP_BETWEEN_LINES, 'Relax', TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        this.moodHungerText = game.add.text(left, UserInterface_1.TOP_GAP + 2 * exports.GAP_BETWEEN_LINES, 'Hunger', TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        this.moodSocialText = game.add.text(left, UserInterface_1.TOP_GAP + 3 * exports.GAP_BETWEEN_LINES, 'Social', TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        this.currentState = game.add.text(left, UserInterface_1.TOP_GAP + 4 * exports.GAP_BETWEEN_LINES, '', TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        this.pieChart.create(game, groups);
        this.moodRelaxationGauge.create(game, groups, new PIXI.Point(app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH + GAUGE_GAP, UserInterface_1.TOP_GAP + exports.GAP_BETWEEN_LINES - 3.5));
        this.moodHungerGauge.create(game, groups, new PIXI.Point(app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH + GAUGE_GAP, UserInterface_1.TOP_GAP + 2 * exports.GAP_BETWEEN_LINES - 3.5));
        this.moodSocialGauge.create(game, groups, new PIXI.Point(app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH + GAUGE_GAP, UserInterface_1.TOP_GAP + 3 * exports.GAP_BETWEEN_LINES - 3.5));
    }
    update() {
        if (this.human) {
            this.moodRelaxationGauge.setValue(this.human.getMood(HumanMoodManager_1.MOOD.RELAXATION));
            this.moodHungerGauge.setValue(this.human.getMood(HumanMoodManager_1.MOOD.HUNGER));
            this.moodSocialGauge.setValue(this.human.getMood(HumanMoodManager_1.MOOD.SOCIAL));
            this.moodRelaxationGauge.update();
            this.moodHungerGauge.update();
            this.moodSocialGauge.update();
            this.pieChart.update();
            this.currentState.setText('State: ' + HumanStateManager_1.HumanStateManager.getStr(this.human.getState()));
        }
    }
    show() {
        if (!this.visible) {
            this.employeeName.position.x -= UserInterface_1.INTERFACE_WIDTH;
            this.pieChart.show();
            this.moodRelaxationText.position.x -= UserInterface_1.INTERFACE_WIDTH;
            this.moodHungerText.position.x -= UserInterface_1.INTERFACE_WIDTH;
            this.moodSocialText.position.x -= UserInterface_1.INTERFACE_WIDTH;
            this.currentState.position.x -= UserInterface_1.INTERFACE_WIDTH;
            this.moodRelaxationGauge.show();
            this.moodHungerGauge.show();
            this.moodSocialGauge.show();
        }
        this.visible = true;
    }
    hide() {
        if (this.visible) {
            this.employeeName.position.x += UserInterface_1.INTERFACE_WIDTH;
            this.pieChart.hide();
            this.moodRelaxationText.position.x += UserInterface_1.INTERFACE_WIDTH;
            this.moodHungerText.position.x += UserInterface_1.INTERFACE_WIDTH;
            this.moodSocialText.position.x += UserInterface_1.INTERFACE_WIDTH;
            this.currentState.position.x += UserInterface_1.INTERFACE_WIDTH;
            this.moodRelaxationGauge.hide();
            this.moodHungerGauge.hide();
            this.moodSocialGauge.hide();
        }
        this.visible = false;
    }
    showEmployeeInfoPanelForYohan(human) {
        this.human = human;
        this.employeeName.setText(human.getName());
        this.pieChart.setHuman(human);
    }
}
exports.UserInfoPanel = UserInfoPanel;
//# sourceMappingURL=UserInfoPanel.js.map