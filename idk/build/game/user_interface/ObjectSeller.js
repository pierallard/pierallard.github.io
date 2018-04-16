"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserInterface_1 = require("./UserInterface");
const app_1 = require("../../app");
const ObjectInfoRegistry_1 = require("../objects/ObjectInfoRegistry");
const ObjectPhantom_1 = require("../objects/ObjectPhantom");
const Play_1 = require("../game_state/Play");
const TextStyle_1 = require("../TextStyle");
exports.OBJECT_SELLER_CELL_SIZE = 41;
const CIRCLE_GAP = 7;
class ObjectSeller {
    constructor(worldKnowledge) {
        this.sellerButtons = [];
        this.worldKnowledge = worldKnowledge;
        this.visible = true;
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
    hide() {
        if (this.visible) {
            this.sellerButtons.forEach((sellerButton) => {
                sellerButton.hide();
            });
        }
        this.visible = false;
    }
    show() {
        if (!this.visible) {
            this.sellerButtons.forEach((sellerButton) => {
                sellerButton.show();
            });
        }
        this.visible = true;
    }
}
exports.ObjectSeller = ObjectSeller;
class SellerButton {
    constructor(objectInfo, worldKnowledge) {
        this.objectInfo = objectInfo;
        this.worldKnowledge = worldKnowledge;
        this.sprites = [];
    }
    create(game, groups, index) {
        const left = app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH;
        const top = UserInterface_1.TOP_GAP + index * exports.OBJECT_SELLER_CELL_SIZE;
        const spriteOrigin = new PIXI.Point(left + exports.OBJECT_SELLER_CELL_SIZE / 2, top + exports.OBJECT_SELLER_CELL_SIZE);
        this.square = game.add.graphics(left, UserInterface_1.TOP_GAP + index * exports.OBJECT_SELLER_CELL_SIZE, groups[Play_1.GROUP_INTERFACE]);
        this.square.lineStyle(1, 0xffffff);
        this.square.drawRect(0, 0, exports.OBJECT_SELLER_CELL_SIZE, exports.OBJECT_SELLER_CELL_SIZE);
        this.fakeCell = game.add.sprite(spriteOrigin.x, spriteOrigin.y, 'casedefault');
        this.fakeCell.anchor.set(0.5, 1);
        groups[Play_1.GROUP_INTERFACE].add(this.fakeCell);
        this.objectInfo.getSpriteInfos().forEach((spriteInfo) => {
            const seller = game.add.sprite(spriteInfo.getRealPositionFromOrigin(spriteOrigin, false).x, spriteInfo.getRealPositionFromOrigin(spriteOrigin, false).y, spriteInfo.getSpriteName());
            seller.anchor.set(spriteInfo.getAnchor(seller).x, spriteInfo.getAnchor(seller).y);
            seller.inputEnabled = true;
            seller.input.pixelPerfectOver = true;
            seller.input.pixelPerfectClick = true;
            seller.input.useHandCursor = true;
            seller.events.onInputDown.add(this.createPhantom, this, 0, game, groups);
            this.sprites.push(seller);
            groups[Play_1.GROUP_INTERFACE].add(seller);
        });
        this.circle = game.add.graphics(left, top + CIRCLE_GAP, groups[Play_1.GROUP_INTERFACE]);
        this.circle.beginFill(0xff0000);
        this.circle.drawCircle(exports.OBJECT_SELLER_CELL_SIZE, 0, 9);
        groups[Play_1.GROUP_INTERFACE].add(this.circle);
        this.counter = game.add.text(left + exports.OBJECT_SELLER_CELL_SIZE - 1.5, index * exports.OBJECT_SELLER_CELL_SIZE + UserInterface_1.TOP_GAP + CIRCLE_GAP - 5, '0', TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        groups[Play_1.GROUP_INTERFACE].add(this.counter);
        this.updateCount(0);
    }
    getName() {
        return this.objectInfo.getName();
    }
    updateCount(count) {
        const str = count + '';
        const previousStr = this.counter.text;
        const diff = str.length - previousStr.length;
        this.counter.setText(str);
        this.counter.position.x -= diff * 3;
    }
    createPhantom(sprite, pointer, game, groups) {
        this.worldKnowledge.getDepot().remove(this.objectInfo.getName());
        const phantom = new ObjectPhantom_1.ObjectPhantom(this.objectInfo.getName(), game, this.worldKnowledge);
        phantom.create(game, groups);
    }
    hide() {
        this.counter.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.fakeCell.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.circle.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.sprites.forEach((sprite) => {
            sprite.position.x += UserInterface_1.INTERFACE_WIDTH;
        });
        this.square.position.x += UserInterface_1.INTERFACE_WIDTH + 10;
    }
    show() {
        this.counter.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.fakeCell.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.circle.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.sprites.forEach((sprite) => {
            sprite.position.x -= UserInterface_1.INTERFACE_WIDTH;
        });
        this.square.position.x -= UserInterface_1.INTERFACE_WIDTH + 10;
    }
}
//# sourceMappingURL=ObjectSeller.js.map