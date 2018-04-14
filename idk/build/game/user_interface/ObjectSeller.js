"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserInterface_1 = require("./UserInterface");
const app_1 = require("../../app");
const ObjectInfoRegistry_1 = require("../objects/ObjectInfoRegistry");
const ObjectPhantom_1 = require("../objects/ObjectPhantom");
const Play_1 = require("../game_state/Play");
exports.OBJECT_SELLER_CELL_SIZE = 42;
class ObjectSeller {
    constructor(worldKnowledge) {
        this.sellerButtons = [];
        this.worldKnowledge = worldKnowledge;
        ObjectInfoRegistry_1.ObjectInfoRegistry.getSellableObjects().forEach((object) => {
            this.sellerButtons.push(new SellerButton(object, this.worldKnowledge));
        });
    }
    create(game, groups) {
        let i = 0;
        this.sellerButtons.forEach((sellerButton) => {
            sellerButton.create(game, groups, i);
            i++;
        });
    }
    update() {
        this.sellerButtons.forEach((sellerButton) => {
            sellerButton.updateCount(this.getCount(sellerButton.getName()));
        });
    }
    getCount(name) {
        return this.worldKnowledge.getDepot().getCount(name);
    }
}
exports.ObjectSeller = ObjectSeller;
class SellerButton {
    constructor(objectInfo, worldKnowledge) {
        this.objectInfo = objectInfo;
        this.worldKnowledge = worldKnowledge;
    }
    create(game, groups, index) {
        const left = app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH;
        const spriteSource = new PIXI.Point(left + exports.OBJECT_SELLER_CELL_SIZE / 2, 10 + (index + 1) * exports.OBJECT_SELLER_CELL_SIZE);
        const fakeCell = game.add.sprite(spriteSource.x, spriteSource.y, 'casedefault');
        fakeCell.anchor.set(0.5, 1);
        groups[Play_1.GROUP_INTERFACE].add(fakeCell);
        this.objectInfo.getSpriteInfos().forEach((spriteInfo) => {
            const seller = game.add.sprite(spriteInfo.getRealPositionFromOrigin(spriteSource, false).x, spriteInfo.getRealPositionFromOrigin(spriteSource, false).y, spriteInfo.getSpriteName());
            seller.anchor.set(spriteInfo.getAnchor(seller).x, spriteInfo.getAnchor(seller).y);
            seller.inputEnabled = true;
            seller.input.pixelPerfectOver = true;
            seller.input.pixelPerfectClick = true;
            seller.input.useHandCursor = true;
            seller.events.onInputDown.add(this.createPhantom, this, 0, game, groups);
            groups[Play_1.GROUP_INTERFACE].add(seller);
        });
        const circle = game.add.graphics(left, index * exports.OBJECT_SELLER_CELL_SIZE + 10, groups[Play_1.GROUP_INTERFACE]);
        circle.beginFill(0xff0000);
        circle.drawCircle(exports.OBJECT_SELLER_CELL_SIZE, 0, 10);
        groups[Play_1.GROUP_INTERFACE].add(circle);
        this.counter = game.add.text(left + exports.OBJECT_SELLER_CELL_SIZE - 4, index * exports.OBJECT_SELLER_CELL_SIZE + 10 - 6, '', {
            align: 'center',
            fill: "#ffffff",
            font: '16px 000webfont'
        }, groups[Play_1.GROUP_INTERFACE]);
        groups[Play_1.GROUP_INTERFACE].add(this.counter);
        this.updateCount(0);
    }
    getName() {
        return this.objectInfo.getName();
    }
    updateCount(count) {
        const str = count + '';
        this.counter.setText(str);
        if (str.length > 1) {
            this.counter.position.set(app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH + exports.OBJECT_SELLER_CELL_SIZE - 4, this.counter.position.y);
        }
        else {
            this.counter.position.set(app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH + exports.OBJECT_SELLER_CELL_SIZE - 1, this.counter.position.y);
        }
    }
    createPhantom(sprite, pointer, game, groups) {
        this.worldKnowledge.getDepot().remove(this.objectInfo.getName());
        const phantom = new ObjectPhantom_1.ObjectPhantom(this.objectInfo.getName(), game, this.worldKnowledge);
        phantom.create(game, groups);
    }
}
//# sourceMappingURL=ObjectSeller.js.map