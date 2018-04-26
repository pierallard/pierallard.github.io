"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanPropertiesFactory_1 = require("../human_stuff/HumanPropertiesFactory");
const UserInterface_1 = require("./UserInterface");
const app_1 = require("../../app");
const ObjectSeller_1 = require("./ObjectSeller");
const Play_1 = require("../game_state/Play");
const TextStyle_1 = require("../TextStyle");
const Pico8Colors_1 = require("../Pico8Colors");
class HumanEmployer {
    constructor(worldKnowledge) {
        this.worldKnowledge = worldKnowledge;
        this.applicantButtons = [];
        this.visible = true;
        for (let i = 0; i < 6; i++) {
            this.applicantButtons.push(new ApplicantButton(this, HumanPropertiesFactory_1.HumanPropertiesFactory.create(), this.worldKnowledge));
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
        const index = this.applicantButtons.indexOf(applicant);
        this.applicantButtons[index] = new ApplicantButton(this, HumanPropertiesFactory_1.HumanPropertiesFactory.create(), this.worldKnowledge);
        this.applicantButtons[index].create(this.game, this.groups, index);
        this.worldKnowledge.addEmployee(applicant.getHumanProperties());
    }
}
exports.HumanEmployer = HumanEmployer;
class ApplicantButton {
    constructor(humanEmployer, humanProperties, worldKnowledge) {
        this.humanEmployer = humanEmployer;
        this.humanProperties = humanProperties;
        this.worldKnowledge = worldKnowledge;
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
    }
    hide() {
        this.sprite.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.name.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.typeText.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.square.position.x += UserInterface_1.INTERFACE_WIDTH + 10;
    }
    show() {
        this.sprite.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.name.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.typeText.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.square.position.x -= UserInterface_1.INTERFACE_WIDTH + 10;
    }
    click() {
        this.sprite.destroy(true);
        this.name.destroy(true);
        this.typeText.destroy(true);
        this.square.destroy(true);
        this.humanEmployer.employ(this);
    }
    getHumanProperties() {
        return this.humanProperties;
    }
}
//# sourceMappingURL=HumanEmployer.js.map