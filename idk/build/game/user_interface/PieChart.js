"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
const Pico8Colors_1 = require("../Pico8Colors");
const UserInterface_1 = require("./UserInterface");
const app_1 = require("../../app");
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
const Tooltip_1 = require("./Tooltip");
const SmoothValue_1 = require("../SmoothValue");
const PARTS = 36;
class PieChart {
    constructor() {
        this.data = [];
        this.tooltip = new Tooltip_1.Tooltip(() => {
            const position = this.game.input.mousePointer.position;
            const positionThroughtCenter = new PIXI.Point(position.x - this.graphics.x, position.y - this.graphics.y);
            let angle = Math.atan2(positionThroughtCenter.x, -positionThroughtCenter.y);
            if (angle < 0) {
                angle += 2 * Math.PI;
            }
            const currentPieChart = this.getSelectedPieChartPart(angle);
            if (currentPieChart) {
                return currentPieChart.getString();
            }
            return '';
        });
        this.shouldRefreshData = true;
        this.shouldRefreshPieChart = true;
    }
    create(game, groups) {
        this.game = game;
        this.graphics = game.add.graphics(app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH / 2, 180, groups[Play_1.GROUP_INTERFACE]);
        this.drawPieChart();
        this.tooltip.setInput(this, [this.graphics]);
        groups[Play_1.GROUP_INTERFACE].add(this.graphics);
        this.tooltip.create(game, groups);
    }
    setHuman(human) {
        this.human = human;
    }
    update() {
        if (this.human) {
            if (this.shouldRefreshData) {
                this.refreshData();
            }
            if (this.shouldRefreshPieChart) {
                this.drawPieChart();
            }
        }
        this.tooltip.update();
    }
    drawPieChart() {
        this.graphics.clear();
        const sumValues = this.sumValues();
        let currentAngle = 0;
        const RADIUS = (UserInterface_1.INTERFACE_WIDTH - 30) / 2;
        for (let i = 0; i < this.data.length; i++) {
            const pieChartPart = this.data[i];
            const points = pieChartPart.getPoints(currentAngle, sumValues, RADIUS);
            currentAngle += pieChartPart.getAngle(sumValues);
            this.graphics.beginFill(pieChartPart.getColor());
            this.graphics.drawPolygon(points);
            this.graphics.endFill();
        }
        this.shouldRefreshPieChart = false;
        this.game.time.events.add(Phaser.Timer.SECOND * 0.1, () => {
            this.shouldRefreshPieChart = true;
        }, this);
    }
    refreshData() {
        let foundIdentifiers = [];
        const probabilities = this.human.getNextProbabilities();
        Object.keys(probabilities).forEach((key) => {
            const state = parseInt(key);
            let found = false;
            for (let i = 0; i < this.data.length; i++) {
                const pieChartPart = this.data[i];
                if (pieChartPart.getState() === state) {
                    pieChartPart.setValue(probabilities[state]);
                    found = true;
                    foundIdentifiers.push(i);
                }
            }
            if (!found) {
                const pieChartPart = new PieChartPart(state, probabilities[state], PieChart.getColor(state), HumanStateManager_1.HumanStateManager.getStr(state));
                pieChartPart.create(this.game);
                this.data.push(pieChartPart);
            }
        });
        for (let i = 0; i < this.data.length; i++) {
            if (foundIdentifiers.indexOf(i) <= -1) {
                this.data[i].setValue(0);
            }
        }
        this.shouldRefreshData = false;
        this.game.time.events.add(Phaser.Timer.SECOND * 1.1, () => {
            this.shouldRefreshData = true;
        }, this);
    }
    static getColor(state) {
        switch (state) {
            case HumanStateManager_1.STATE.SMOKE: return Pico8Colors_1.COLOR.DARK_GREY;
            case HumanStateManager_1.STATE.FREEZE: return Pico8Colors_1.COLOR.LIGHT_BLUE;
            case HumanStateManager_1.STATE.MOVE_RANDOM: return Pico8Colors_1.COLOR.ROSE;
            case HumanStateManager_1.STATE.SIT: return Pico8Colors_1.COLOR.ORANGE;
            case HumanStateManager_1.STATE.TYPE: return Pico8Colors_1.COLOR.LIGHT_GREEN;
            case HumanStateManager_1.STATE.TALK: return Pico8Colors_1.COLOR.YELLOW;
            case HumanStateManager_1.STATE.COFFEE: return Pico8Colors_1.COLOR.MARROON;
            case HumanStateManager_1.STATE.RAGE: return Pico8Colors_1.COLOR.RED;
            case HumanStateManager_1.STATE.SIT_TALK: return Pico8Colors_1.COLOR.DARK_GREEN;
        }
    }
    getSelectedPieChartPart(angle) {
        let currentAngle = 0;
        const sum = this.sumValues();
        for (let i = 0; i < this.data.length; i++) {
            const pieChartPart = this.data[i];
            const pieChartAngle = pieChartPart.getAngle(sum);
            if (angle >= currentAngle && angle <= (currentAngle + pieChartAngle)) {
                return pieChartPart;
            }
            currentAngle += pieChartAngle;
        }
        return null;
    }
    sumValues() {
        return this.data.reduce((cur, pieChartPart) => {
            return cur + pieChartPart.getValue();
        }, 0);
    }
    show() {
        this.graphics.position.x -= UserInterface_1.INTERFACE_WIDTH;
    }
    hide() {
        this.graphics.position.x += UserInterface_1.INTERFACE_WIDTH;
    }
}
exports.PieChart = PieChart;
class PieChartPart {
    constructor(state, value, color, text) {
        this.state = state;
        this.value = new SmoothValue_1.SmoothValue(value);
        this.color = color;
        this.text = text;
    }
    create(game) {
        this.value.create(game);
    }
    getValue() {
        return this.value.getValue();
    }
    getPoints(currentAngle, sumValues, RADIUS) {
        const angleOfAPart = Math.PI * 2 / PARTS;
        const littleGap = 1 * Math.PI * 2 / 360;
        const valueAngle = this.getAngle(sumValues);
        let points = [
            new PIXI.Point(Math.sin(currentAngle) * RADIUS, -Math.cos(currentAngle) * RADIUS)
        ];
        for (let j = 0; j < Math.PI * 2; j += angleOfAPart) {
            if (j > currentAngle && j < currentAngle + valueAngle) {
                points.push(new PIXI.Point(Math.sin(j) * RADIUS, -Math.cos(j) * RADIUS));
            }
        }
        points.push(new PIXI.Point(Math.sin(Math.min(currentAngle + valueAngle + littleGap, Math.PI * 2)) * RADIUS, -Math.cos(Math.min(currentAngle + valueAngle + littleGap, Math.PI * 2)) * RADIUS));
        points.push(new PIXI.Point(0, 0));
        return points;
    }
    getAngle(sumValues) {
        return this.value.getValue() / sumValues * Math.PI * 2;
    }
    getColor() {
        return this.color;
    }
    getString() {
        return this.text;
    }
    getState() {
        return this.state;
    }
    setValue(probability) {
        this.value.setValue(probability);
    }
}
//# sourceMappingURL=PieChart.js.map