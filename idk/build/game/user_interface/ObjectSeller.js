"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserInterface_1 = require("./UserInterface");
const app_1 = require("../../app");
const ObjectInfoRegistry_1 = require("../objects/ObjectInfoRegistry");
const ObjectPhantom_1 = require("../objects/ObjectPhantom");
const Play_1 = require("../game_state/Play");
const TextStyle_1 = require("../TextStyle");
const PositionTransformer_1 = require("../PositionTransformer");
const Pico8Colors_1 = require("../Pico8Colors");
exports.OBJECT_SELLER_CELL_SIZE = 41;
const CIRCLE_GAP = 7;
class ObjectSeller {
    constructor(worldKnowledge) {
        this.worldKnowledge = worldKnowledge;
        this.visible = true;
        this.objectProvisionnerButtons = ObjectInfoRegistry_1.ObjectInfoRegistry
            .getSellableObjects()
            .map((object) => new ObjectProvisionnerButton(object, this.worldKnowledge));
        this.sellerButtons = ObjectInfoRegistry_1.ObjectInfoRegistry
            .getSellableObjects()
            .map((object) => new SellerButton(object, this.worldKnowledge));
    }
    create(game, groups) {
        let i = 0;
        this.objectProvisionnerButtons.forEach((objectProvisionnerButton) => {
            objectProvisionnerButton.create(game, groups, i);
            i++;
        });
        i = 0;
        this.sellerButtons.forEach((sellerButton) => {
            sellerButton.create(game, groups, i);
            i++;
        });
    }
    update() {
        this.objectProvisionnerButtons.forEach((objectProvisionnerButton) => {
            objectProvisionnerButton.updateCount(this.getCount(objectProvisionnerButton.getName()));
        });
        this.sellerButtons.forEach((sellerButton) => {
            sellerButton.updateSprites();
        });
    }
    getCount(name) {
        return this.worldKnowledge.getDepot().getCount(name);
    }
    hide() {
        if (this.visible) {
            this.objectProvisionnerButtons.forEach((objectProvisionnerButton) => {
                objectProvisionnerButton.hide();
            });
            this.sellerButtons.forEach((sellerButton) => {
                sellerButton.hide();
            });
        }
        this.visible = false;
    }
    show() {
        if (!this.visible) {
            this.objectProvisionnerButtons.forEach((objectProvisionnerButton) => {
                objectProvisionnerButton.show();
            });
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
        this.isDown = false;
    }
    create(game, groups, index) {
        const left = app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH;
        const top = UserInterface_1.TOP_GAP + index * (exports.OBJECT_SELLER_CELL_SIZE / 2);
        const textTop = index * exports.OBJECT_SELLER_CELL_SIZE + 12 + UserInterface_1.TOP_GAP + CIRCLE_GAP;
        this.price = game.add.text(left + exports.OBJECT_SELLER_CELL_SIZE + 10, textTop, this.objectInfo.getPrice().getStringValue(), TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        groups[Play_1.GROUP_INTERFACE].add(this.price);
        this.button = game.add.sprite(this.price.x + this.price.width + 12, textTop, 'buy_button', 0, groups[Play_1.GROUP_INTERFACE]);
        this.button.inputEnabled = true;
        this.button.input.useHandCursor = true;
        this.button.events.onInputDown.add(this.buy, this, 0);
        this.button.events.onInputUp.add(this.up, this, 0);
        groups[Play_1.GROUP_INTERFACE].add(this.button);
    }
    updateSprites() {
        if (this.isDown) {
            this.button.loadTexture(this.button.key, 1);
        }
        else {
            if (this.objectInfo.isSellable(this.worldKnowledge.getMoneyInWallet())) {
                this.button.loadTexture(this.button.key, 0);
            }
            else {
                this.button.loadTexture(this.button.key, 2);
            }
        }
    }
    buy() {
        if (this.objectInfo.isSellable(this.worldKnowledge.getMoneyInWallet())) {
            this.isDown = true;
            this.worldKnowledge.buy(this.objectInfo.getName(), this.objectInfo.getPrice());
        }
    }
    up() {
        this.isDown = false;
    }
    hide() {
        this.price.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.button.position.x += UserInterface_1.INTERFACE_WIDTH;
    }
    show() {
        this.price.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.button.position.x -= UserInterface_1.INTERFACE_WIDTH;
    }
}
class ObjectProvisionnerButton {
    constructor(objectInfo, worldKnowledge) {
        this.objectInfo = objectInfo;
        this.worldKnowledge = worldKnowledge;
        this.sprites = [];
        this.fakeCells = [];
    }
    create(game, groups, index) {
        const left = app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH;
        const top = UserInterface_1.TOP_GAP + index * exports.OBJECT_SELLER_CELL_SIZE;
        const spriteOrigin = new PIXI.Point(left + exports.OBJECT_SELLER_CELL_SIZE / 2, top + exports.OBJECT_SELLER_CELL_SIZE);
        let width = 1;
        let height = 1;
        this.objectInfo.getCellGaps(false).forEach((gap) => {
            width = Math.max(width, 1 + gap.x);
            height = Math.max(height, 1 + gap.y);
        });
        const scale = 2 / (width + height);
        this.square = game.add.graphics(left, UserInterface_1.TOP_GAP + index * exports.OBJECT_SELLER_CELL_SIZE, groups[Play_1.GROUP_INTERFACE]);
        this.square.lineStyle(1, Pico8Colors_1.COLOR.WHITE);
        this.square.drawRect(0, 0, exports.OBJECT_SELLER_CELL_SIZE, exports.OBJECT_SELLER_CELL_SIZE);
        this.objectInfo.getCellGaps(false).forEach((cellGap) => {
            const fakeCell = game.add.sprite(spriteOrigin.x - (cellGap.x - cellGap.y) * (PositionTransformer_1.CELL_WIDTH / 2) * scale, spriteOrigin.y - (cellGap.x + cellGap.y) * (PositionTransformer_1.CELL_HEIGHT / 2) * scale, 'casedefault');
            fakeCell.scale.set(scale, scale);
            fakeCell.anchor.set(0.5, 1);
            groups[Play_1.GROUP_INTERFACE].add(fakeCell);
            this.fakeCells.push(fakeCell);
        });
        this.objectInfo.getSpriteInfos().forEach((spriteInfo) => {
            const seller = game.add.sprite(spriteInfo.getRealPositionFromOrigin(spriteOrigin, false, scale).x, spriteInfo.getRealPositionFromOrigin(spriteOrigin, false, scale).y, spriteInfo.getSpriteName());
            seller.scale.set(scale, scale);
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
        this.circle.beginFill(Pico8Colors_1.COLOR.RED);
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
        if (this.worldKnowledge.getDepot().getCount(this.objectInfo.getName()) > 0) {
            this.worldKnowledge.getDepot().remove(this.objectInfo.getName());
            const phantom = new ObjectPhantom_1.ObjectPhantom(this.objectInfo.getName(), game, this.worldKnowledge);
            phantom.create(game, groups);
        }
    }
    hide() {
        this.counter.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.fakeCells.forEach((fakeCell) => {
            fakeCell.position.x += UserInterface_1.INTERFACE_WIDTH;
        });
        this.circle.position.x += UserInterface_1.INTERFACE_WIDTH;
        this.sprites.forEach((sprite) => {
            sprite.position.x += UserInterface_1.INTERFACE_WIDTH;
        });
        this.square.position.x += UserInterface_1.INTERFACE_WIDTH + 10;
    }
    show() {
        this.counter.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.fakeCells.forEach((fakeCell) => {
            fakeCell.position.x -= UserInterface_1.INTERFACE_WIDTH;
        });
        this.circle.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.sprites.forEach((sprite) => {
            sprite.position.x -= UserInterface_1.INTERFACE_WIDTH;
        });
        this.square.position.x -= UserInterface_1.INTERFACE_WIDTH + 10;
    }
}
//# sourceMappingURL=ObjectSeller.js.map