"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserInterface_1 = require("./UserInterface");
const app_1 = require("../../app");
const HumanPropertiesFactory_1 = require("../human_stuff/HumanPropertiesFactory");
const Pico8Colors_1 = require("../Pico8Colors");
const Gauge_1 = require("./Gauge");
const Tooltip_1 = require("./Tooltip");
const GAP = 3;
const TOP = 12;
class LevelDisplayer {
    constructor(worldKnowledge) {
        this.worldKnowledge = worldKnowledge;
        this.gauges = {};
        this.tooltips = {};
        const width = Math.floor((UserInterface_1.INTERFACE_WIDTH - 4 * GAP) / 3);
        this.gauges[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER] = new Gauge_1.Gauge(width, Pico8Colors_1.COLOR.LIGHT_GREEN);
        this.gauges[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE] = new Gauge_1.Gauge(width, Pico8Colors_1.COLOR.RED);
        this.gauges[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING] = new Gauge_1.Gauge(width, Pico8Colors_1.COLOR.ROSE);
        this.tooltips[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER] = new Tooltip_1.Tooltip(() => {
            return Math.round(this.worldKnowledge.getLevelProgress(HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER) * 1000) + ' lines coded';
        });
        this.tooltips[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE] = new Tooltip_1.Tooltip(() => {
            return Math.round(this.worldKnowledge.getLevelProgress(HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE) * 10) + ' licence sell';
        });
        this.tooltips[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING] = new Tooltip_1.Tooltip(() => {
            return Math.round(this.worldKnowledge.getLevelProgress(HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING) * 10) + ' campaigns done';
        });
    }
    create(game, groups) {
        const width = Math.floor((UserInterface_1.INTERFACE_WIDTH - 4 * GAP) / 3);
        for (let i = 0; i < Object.keys(this.gauges).length; i++) {
            this.gauges[Object.keys(this.gauges)[i]].create(game, groups, new PIXI.Point(app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH + GAP + (width + GAP) * i, TOP));
        }
        Object.keys(this.tooltips).forEach((employeeType) => {
            this.tooltips[employeeType].create(game, groups);
            this.tooltips[employeeType].setInput(this, this.gauges[parseInt(employeeType)].getGraphics());
        });
    }
    update() {
        Object.keys(this.gauges).forEach((employeeType) => {
            this.gauges[employeeType].setValue(this.worldKnowledge.getLevelProgress(parseInt(employeeType)));
            this.gauges[employeeType].update();
        });
        Object.keys(this.tooltips).forEach((employeeType) => {
            this.tooltips[employeeType].update();
        });
    }
}
exports.LevelDisplayer = LevelDisplayer;
//# sourceMappingURL=LevelDisplayer.js.map