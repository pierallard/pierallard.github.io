"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserInterface_1 = require("./UserInterface");
const app_1 = require("../../app");
const Play_1 = require("../game_state/Play");
const Pico8Colors_1 = require("../Pico8Colors");
const MoodSprite_1 = require("../human_stuff/MoodSprite");
const TextStyle_1 = require("../TextStyle");
const UserInfoPanel_1 = require("./UserInfoPanel");
const HumanPropertiesFactory_1 = require("../human_stuff/HumanPropertiesFactory");
const HEIGHT = 80;
const GRAPH_GAP = 2;
class InfoPanel {
    constructor(worldKnowledge) {
        this.worldKnowledge = worldKnowledge;
        this.visible = true;
    }
    create(game, groups) {
        const left = app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH + GRAPH_GAP;
        const top = UserInterface_1.TOP_GAP + 100;
        this.softwarePrice = game.add.text(left, UserInterface_1.TOP_GAP, 'Software Price: ', TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        this.developerCount = game.add.text(left, UserInterface_1.TOP_GAP + UserInfoPanel_1.MEDIUM_GAP_BETWEEN_LINES, '', TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        this.salesCount = game.add.text(left, UserInterface_1.TOP_GAP + UserInfoPanel_1.MEDIUM_GAP_BETWEEN_LINES * 2, '', TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        this.marketingCount = game.add.text(left, UserInterface_1.TOP_GAP + UserInfoPanel_1.MEDIUM_GAP_BETWEEN_LINES * 3, '', TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        this.check = game.add.sprite(left, UserInterface_1.TOP_GAP + UserInfoPanel_1.MEDIUM_GAP_BETWEEN_LINES * 4 + 3, 'check', 0, groups[Play_1.GROUP_INTERFACE]);
        this.ambiance = game.add.text(left + 7, UserInterface_1.TOP_GAP + UserInfoPanel_1.MEDIUM_GAP_BETWEEN_LINES * 4, 'Ambiance', TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        this.moods = game.add.graphics(left, top, groups[Play_1.GROUP_INTERFACE]);
        this.employees = game.add.graphics(left, top + 100, groups[Play_1.GROUP_INTERFACE]);
        this.check.anchor.set(0, 0);
        this.check.inputEnabled = true;
        this.check.input.pixelPerfectOver = true;
        this.check.input.pixelPerfectClick = true;
        this.check.input.useHandCursor = true;
        this.check.events.onInputDown.add(this.toggleAmbiance, this);
    }
    toggleAmbiance() {
        if (this.worldKnowledge.getAmbianceDisplayed()) {
            this.check.loadTexture('check', 0);
        }
        else {
            this.check.loadTexture('check', 1);
        }
        this.worldKnowledge.setAmbianceDisplayed(!this.worldKnowledge.getAmbianceDisplayed());
    }
    update() {
        if (this.visible) {
            //const lastMoods = this.worldKnowledge.getLastMoods();
            //InfoPanel.drawChart(this.moods, [lastMoods], 1, [null]);
            const lastLevels = this.worldKnowledge.getLastEmployeesLevel();
            InfoPanel.drawChart(this.moods, lastLevels, null, [Pico8Colors_1.COLOR.LIGHT_GREEN, Pico8Colors_1.COLOR.RED, Pico8Colors_1.COLOR.ROSE]);
            const lastEmployees = this.worldKnowledge.getLastEmployeesCount();
            InfoPanel.drawChart(this.employees, lastEmployees, null, [Pico8Colors_1.COLOR.LIGHT_GREEN, Pico8Colors_1.COLOR.RED, Pico8Colors_1.COLOR.ROSE]);
            this.softwarePrice.setText('Software Price: ' + this.worldKnowledge.getSoftwarePrice().getStringValue());
            this.developerCount.setText('Developers: ' + this.worldKnowledge.getEmployeeCount(HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER));
            this.salesCount.setText('Sales: ' + this.worldKnowledge.getEmployeeCount(HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE));
            this.marketingCount.setText('Marketing: ' + this.worldKnowledge.getEmployeeCount(HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING));
        }
    }
    show() {
        if (!this.visible) {
            this.moods.position.x -= UserInterface_1.INTERFACE_WIDTH;
            this.employees.position.x -= UserInterface_1.INTERFACE_WIDTH;
            this.softwarePrice.position.x -= UserInterface_1.INTERFACE_WIDTH;
            this.developerCount.position.x -= UserInterface_1.INTERFACE_WIDTH;
            this.salesCount.position.x -= UserInterface_1.INTERFACE_WIDTH;
            this.marketingCount.position.x -= UserInterface_1.INTERFACE_WIDTH;
            this.check.position.x -= UserInterface_1.INTERFACE_WIDTH;
            this.ambiance.position.x -= UserInterface_1.INTERFACE_WIDTH;
        }
        this.visible = true;
    }
    hide() {
        if (this.visible) {
            this.moods.position.x += UserInterface_1.INTERFACE_WIDTH;
            this.employees.position.x += UserInterface_1.INTERFACE_WIDTH;
            this.softwarePrice.position.x += UserInterface_1.INTERFACE_WIDTH;
            this.developerCount.position.x += UserInterface_1.INTERFACE_WIDTH;
            this.salesCount.position.x += UserInterface_1.INTERFACE_WIDTH;
            this.marketingCount.position.x += UserInterface_1.INTERFACE_WIDTH;
            this.check.position.x += UserInterface_1.INTERFACE_WIDTH;
            this.ambiance.position.x += UserInterface_1.INTERFACE_WIDTH;
        }
        this.visible = false;
    }
    static drawChart(graphics, valuesSet, max = null, colors = []) {
        const graphWidth = UserInterface_1.INTERFACE_WIDTH - 2 * GRAPH_GAP;
        graphics.clear();
        graphics.lineStyle(1, Pico8Colors_1.COLOR.DARK_GREY);
        for (let i = 0; i < 10; i++) {
            graphics.moveTo(1, i * HEIGHT / 10);
            graphics.lineTo(graphWidth, i * HEIGHT / 10);
        }
        if (max === null || isNaN(max)) {
            max = this.getMaxFromValuesSet(valuesSet);
        }
        for (let v = 0; v < valuesSet.length; v++) {
            const values = valuesSet[v];
            if (colors[v]) {
                graphics.lineStyle(1, colors[v]);
            }
            else {
                graphics.lineStyle(1, MoodSprite_1.MoodSprite.getColor(values[0]));
            }
            graphics.moveTo(graphWidth, HEIGHT - values[0] * HEIGHT / max);
            for (let i = 1; i < graphWidth; i++) {
                graphics.lineTo(graphWidth - i, HEIGHT - values[i] * HEIGHT / max);
                if (!colors[v]) {
                    graphics.lineStyle(1, MoodSprite_1.MoodSprite.getColor(values[i]));
                }
            }
        }
        graphics.lineStyle(1, Pico8Colors_1.COLOR.WHITE);
        graphics.moveTo(0, 0);
        graphics.lineTo(0, HEIGHT);
        graphics.lineTo(graphWidth, HEIGHT);
    }
    static getMaxFromValuesSet(valuesSet) {
        let result = 0;
        valuesSet.forEach((values) => {
            values.forEach((value) => {
                if (value !== undefined) {
                    result = Math.max(result, value);
                }
            });
        });
        return result;
    }
}
exports.InfoPanel = InfoPanel;
//# sourceMappingURL=InfoPanel.js.map