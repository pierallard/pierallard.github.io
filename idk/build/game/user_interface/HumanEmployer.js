"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanPropertiesFactory_1 = require("../human_stuff/HumanPropertiesFactory");
const UserInterface_1 = require("./UserInterface");
const app_1 = require("../../app");
const ObjectSeller_1 = require("./ObjectSeller");
const Play_1 = require("../game_state/Play");
const TextStyle_1 = require("../TextStyle");
const Pico8Colors_1 = require("../Pico8Colors");
const ColoredGauge_1 = require("./ColoredGauge");
const Tooltip_1 = require("./Tooltip");
const STARS = 5;
const MAX_APPLICANTS = 6;
class HumanEmployer {
    constructor(worldKnowledge) {
        this.worldKnowledge = worldKnowledge;
        this.applicantButtons = [];
        this.visible = true;
        for (let i = 0; i < this.getMaxApplicants(); i++) {
            this.applicantButtons.push(new ApplicantButton(this, HumanPropertiesFactory_1.HumanPropertiesFactory.create(this.getEmployeeTypeProbabilities()), this.worldKnowledge));
        }
    }
    create(game, groups) {
        this.game = game;
        this.groups = groups;
        let i = 0;
        this.applicantButtons.forEach((applicant) => {
            applicant.create(game, groups, i);
            i++;
        });
    }
    update() {
        if (this.applicantButtons.length < this.getMaxApplicants()) {
            for (let i = this.applicantButtons.length; i < this.getMaxApplicants(); i++) {
                const toto = new ApplicantButton(this, HumanPropertiesFactory_1.HumanPropertiesFactory.create(this.getEmployeeTypeProbabilities()), this.worldKnowledge);
                toto.create(this.game, this.groups, i);
                this.applicantButtons.push(toto);
            }
        }
        this.applicantButtons.forEach((applicantButton) => {
            applicantButton.update();
        });
    }
    hide() {
        if (this.visible) {
            this.applicantButtons.forEach((applicantButton) => {
                applicantButton.hide();
            });
        }
        this.visible = false;
    }
    show() {
        if (!this.visible) {
            this.applicantButtons.forEach((applicantButton) => {
                applicantButton.show();
            });
        }
        this.visible = true;
    }
    employ(applicant) {
        this.cancel(applicant);
        this.worldKnowledge.addEmployee(applicant.getHumanProperties());
    }
    cancel(applicant) {
        const index = this.applicantButtons.indexOf(applicant);
        this.applicantButtons[index] = new ApplicantButton(this, HumanPropertiesFactory_1.HumanPropertiesFactory.create(this.getEmployeeTypeProbabilities()), this.worldKnowledge);
        this.applicantButtons[index].create(this.game, this.groups, index);
        if (!this.visible) {
            this.applicantButtons[index].hide();
        }
    }
    getEmployeeTypeProbabilities() {
        const result = {};
        result[HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER] = 1;
        if (this.worldKnowledge.getLevel() > 1) {
            result[HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE] = 1;
        }
        if (this.worldKnowledge.getLevel() > 2) {
            result[HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING] = 1;
        }
        return result;
    }
    getMaxApplicants() {
        if (this.worldKnowledge.getLevel() < 2) {
            return MAX_APPLICANTS / 3;
        }
        if (this.worldKnowledge.getLevel() < 3) {
            return MAX_APPLICANTS * 2 / 3;
        }
        return MAX_APPLICANTS;
    }
}
exports.HumanEmployer = HumanEmployer;
class ApplicantButton {
    constructor(humanEmployer, humanProperties, worldKnowledge) {
        this.humanEmployer = humanEmployer;
        this.humanProperties = humanProperties;
        this.worldKnowledge = worldKnowledge;
        this.availabilityTime = (45 + Math.random() * 45) * Phaser.Timer.SECOND;
        this.remainingTime = this.availabilityTime;
        this.remainingGauge = new ColoredGauge_1.ColoredGauge(ObjectSeller_1.OBJECT_SELLER_CELL_SIZE, 5);
        this.stars = [];
        this.tooltips = [];
    }
    create(game, groups, index) {
        const left = app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH;
        const top = UserInterface_1.TOP_GAP + index * ObjectSeller_1.OBJECT_SELLER_CELL_SIZE;
        const squareCenter = new PIXI.Point(left + ObjectSeller_1.OBJECT_SELLER_CELL_SIZE / 2, top + ObjectSeller_1.OBJECT_SELLER_CELL_SIZE / 2);
        this.square = game.add.graphics(left, UserInterface_1.TOP_GAP + index * ObjectSeller_1.OBJECT_SELLER_CELL_SIZE, groups[Play_1.GROUP_INTERFACE]);
        this.square.lineStyle(1, Pico8Colors_1.COLOR.WHITE);
        this.square.drawRect(0, 0, ObjectSeller_1.OBJECT_SELLER_CELL_SIZE, ObjectSeller_1.OBJECT_SELLER_CELL_SIZE);
        this.sprite = game.add.sprite(squareCenter.x, squareCenter.y, this.humanProperties.getSpriteKey(), 12, groups[Play_1.GROUP_INTERFACE]);
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.inputEnabled = true;
        this.sprite.input.pixelPerfectOver = true;
        this.sprite.input.pixelPerfectClick = true;
        this.sprite.input.useHandCursor = true;
        this.sprite.events.onInputDown.add(this.click, this, 0);
        this.name = game.add.text(left + ObjectSeller_1.OBJECT_SELLER_CELL_SIZE + 3, top, this.humanProperties.getName(), TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        this.typeText = game.add.text(left + ObjectSeller_1.OBJECT_SELLER_CELL_SIZE + 3, top + 8, this.humanProperties.getStrType(), TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        this.remainingGauge.create(game, groups, new PIXI.Point(left, top + ObjectSeller_1.OBJECT_SELLER_CELL_SIZE - 5 - 0.5));
        this.remainingGauge.setValue(1);
        game.add.tween(this).to({
            remainingTime: 0
        }, this.availabilityTime, 'Linear', true);
        this.tooltips.push(new Tooltip_1.Tooltip(() => {
            return 'Wage: ' + this.humanProperties.getRealWage().getStringValue() + '/day';
        }).setInput(this, this.drawStars(game, 'coin', this.humanProperties.getWage(), left + ObjectSeller_1.OBJECT_SELLER_CELL_SIZE + 2, top + 18, groups[Play_1.GROUP_INTERFACE]))
            .create(game, groups));
        this.tooltips.push(new Tooltip_1.Tooltip(() => {
            return 'Exp: ' + Math.round(this.humanProperties.getQuality() * 100) + '%';
        }).setInput(this, this.drawStars(game, 'star', this.humanProperties.getQuality(), left + ObjectSeller_1.OBJECT_SELLER_CELL_SIZE + 55, top + 18, groups[Play_1.GROUP_INTERFACE]))
            .create(game, groups));
        this.tooltips.push(new Tooltip_1.Tooltip(() => {
            return 'Speed: ' + Math.round(this.humanProperties.getSpeed() * 100) + '%';
        }).setInput(this, this.drawStars(game, 'star', this.humanProperties.getSpeed(), left + ObjectSeller_1.OBJECT_SELLER_CELL_SIZE + 2, top + 28, groups[Play_1.GROUP_INTERFACE]))
            .create(game, groups));
        this.tooltips.push(new Tooltip_1.Tooltip(() => {
            return 'Perseverance: ' + Math.round(this.humanProperties.getPerseverance() * 100) + '%';
        }).setInput(this, this.drawStars(game, 'star', this.humanProperties.getPerseverance(), left + ObjectSeller_1.OBJECT_SELLER_CELL_SIZE + 55, top + 28, groups[Play_1.GROUP_INTERFACE]))
            .create(game, groups));
    }
    hide() {
        this.sprite.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.name.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.typeText.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.square.position.x += UserInterface_1.INTERFACE_WIDTH + 10;
        this.remainingGauge.hide();
        this.stars.forEach((star) => {
            star.position.x += UserInterface_1.INTERFACE_WIDTH;
        });
    }
    show() {
        this.sprite.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.name.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.typeText.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.square.position.x -= UserInterface_1.INTERFACE_WIDTH + 10;
        this.remainingGauge.show();
        this.stars.forEach((star) => {
            star.position.x -= UserInterface_1.INTERFACE_WIDTH;
        });
    }
    click() {
        this.destroy();
        this.humanEmployer.employ(this);
    }
    getHumanProperties() {
        return this.humanProperties;
    }
    update() {
        if (this.remainingTime <= 0) {
            this.destroy();
            this.humanEmployer.cancel(this);
            return;
        }
        this.tooltips.forEach((tooltip) => {
            tooltip.update();
        });
        this.remainingGauge.setValue(this.remainingTime / this.availabilityTime);
        this.remainingGauge.update();
    }
    destroy() {
        this.sprite.destroy(true);
        this.name.destroy(true);
        this.typeText.destroy(true);
        this.square.destroy(true);
        this.remainingGauge.destroy(true);
        this.stars.forEach((star) => {
            star.destroy(true);
        });
    }
    drawStars(game, key, value, left, top, group) {
        let stars = [];
        const gap = 1 / (STARS * 2 - 1);
        for (let i = 0; i < STARS; i++) {
            let star = null;
            if (value < (i * 2) * gap) {
                star = game.add.sprite(left + i * 8, top, key, 2, group);
            }
            else if (value < (i * 2 + 1) * gap) {
                star = game.add.sprite(left + i * 8, top, key, 1, group);
            }
            else {
                star = game.add.sprite(left + i * 8, top, key, 0, group);
            }
            this.stars.push(star);
            stars.push(star);
        }
        return stars;
    }
}
//# sourceMappingURL=HumanEmployer.js.map