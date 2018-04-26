"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
const Pico8Colors_1 = require("../Pico8Colors");
const UserInterface_1 = require("./UserInterface");
const app_1 = require("../../app");
const HumanStateManager_1 = require("../human_stuff/HumanStateManager");
const Tooltip_1 = require("./Tooltip");
const PARTS = 36;
class Camembert {
    constructor() {
        this.data = [];
        this.tooltipShowed = false;
        this.tooltip = new Tooltip_1.Tooltip();
    }
    create(game, groups) {
        this.game = game;
        this.graphics = game.add.graphics(app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH / 2, 180, groups[Play_1.GROUP_INTERFACE]);
        this.drawCamembert();
        this.graphics.inputEnabled = true;
        this.graphics.events.onInputOver.add(this.showTooltip, this, 0, game);
        this.graphics.events.onInputOut.add(this.hideTooltip, this, 0, game);
        groups[Play_1.GROUP_INTERFACE].add(this.graphics);
        this.tooltip.create(game, groups);
        this.hideTooltip();
    }
    setHuman(human) {
        this.human = human;
    }
    update() {
        if (this.human) {
            this.refreshData();
            this.drawCamembert();
        }
        if (this.tooltipShowed) {
            this.tooltip.update();
            const position = this.game.input.mousePointer.position;
            const positionThroughtCenter = new PIXI.Point(position.x - this.graphics.x, position.y - this.graphics.y);
            let angle = Math.atan2(positionThroughtCenter.x, -positionThroughtCenter.y);
            if (angle < 0) {
                angle += 2 * Math.PI;
            }
            const currentCamembert = this.getSelectedCamembertPart(angle);
            this.tooltip.setText(currentCamembert.getString());
        }
    }
    showTooltip() {
        this.tooltipShowed = true;
        this.tooltip.show();
    }
    hideTooltip() {
        this.tooltipShowed = false;
        this.tooltip.hide();
    }
    drawCamembert() {
        this.graphics.clear();
        const sumValues = this.sumValues();
        let currentAngle = 0;
        const RADIUS = (UserInterface_1.INTERFACE_WIDTH - 30) / 2;
        for (let i = 0; i < this.data.length; i++) {
            const camembertPart = this.data[i];
            const points = camembertPart.getPoints(currentAngle, sumValues, RADIUS);
            currentAngle += camembertPart.getAngle(sumValues);
            this.graphics.beginFill(camembertPart.getColor());
            this.graphics.drawPolygon(points);
            this.graphics.endFill();
        }
    }
    refreshData() {
        this.data = [];
        this.human.getNextProbabilities().forEach((state) => {
            this.data.push(new CamembertPart(state.probability, Camembert.getColor(state.state), HumanStateManager_1.HumanStateManager.getStr(state.state)));
        });
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
    getSelectedCamembertPart(angle) {
        let currentAngle = 0;
        const sum = this.sumValues();
        for (let i = 0; i < this.data.length; i++) {
            const camembertPart = this.data[i];
            const camembertAngle = camembertPart.getAngle(sum);
            if (angle >= currentAngle && angle <= (currentAngle + camembertAngle)) {
                return camembertPart;
            }
            currentAngle += camembertAngle;
        }
        return null;
    }
    sumValues() {
        return this.data.reduce((cur, camembertPart) => {
            return cur + camembertPart.getValue();
        }, 0);
    }
    show() {
        this.graphics.position.x -= UserInterface_1.INTERFACE_WIDTH;
    }
    hide() {
        this.graphics.position.x += UserInterface_1.INTERFACE_WIDTH;
    }
}
exports.Camembert = Camembert;
class CamembertPart {
    constructor(value, color, text) {
        this.value = value;
        this.color = color;
        this.text = text;
    }
    getValue() {
        return this.value;
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
        return this.value / sumValues * Math.PI * 2;
    }
    getColor() {
        return this.color;
    }
    getString() {
        return this.text;
    }
}
//# sourceMappingURL=Camembert.js.map