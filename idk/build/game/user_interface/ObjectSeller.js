"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserInterface_1 = require("./UserInterface");
const app_1 = require("../../app");
const ObjectDescriptionRegistry_1 = require("../objects/ObjectDescriptionRegistry");
const ObjectPhantom_1 = require("../objects/ObjectPhantom");
const Play_1 = require("../game_state/Play");
const TextStyle_1 = require("../TextStyle");
const PositionTransformer_1 = require("../PositionTransformer");
const Pico8Colors_1 = require("../Pico8Colors");
const ObjectOrientation_1 = require("../objects/ObjectOrientation");
const UserInfoPanel_1 = require("./UserInfoPanel");
exports.OBJECT_SELLER_CELL_SIZE = 41;
const CIRCLE_GAP = 7;
class ObjectSeller {
    constructor(worldKnowledge) {
        this.worldKnowledge = worldKnowledge;
        this.visible = true;
        this.currentPhantom = null;
        this.objectProvisionnerButtons = [];
        this.sellerButtons = [];
    }
    create(game, groups) {
        this.game = game;
        this.groups = groups;
        this.addMissingButtons();
    }
    addMissingButtons() {
        ObjectDescriptionRegistry_1.ObjectDescriptionRegistry
            .getSalableObjects(this.worldKnowledge.getLevel())
            .forEach((objectDescription) => {
            if (this.objectProvisionnerButtons.filter((previsionner) => {
                return previsionner.getName() === objectDescription.getName();
            }).length === 0) {
                const objectProvisionnerButton = new ObjectProvisionnerButton(this, objectDescription, this.worldKnowledge);
                const sellerButton = new SellerButton(objectDescription, this.worldKnowledge);
                objectProvisionnerButton.create(this.game, this.groups, this.objectProvisionnerButtons.length);
                sellerButton.create(this.game, this.groups, this.sellerButtons.length);
                if (!this.visible) {
                    objectProvisionnerButton.hide();
                    sellerButton.hide();
                }
                this.objectProvisionnerButtons.push(objectProvisionnerButton);
                this.sellerButtons.push(sellerButton);
            }
        });
    }
    update() {
        this.objectProvisionnerButtons.forEach((objectProvisionnerButton) => {
            objectProvisionnerButton.updateCount(this.getCount(objectProvisionnerButton.getName()));
        });
        this.sellerButtons.forEach((sellerButton) => {
            sellerButton.updateSprites();
        });
        this.addMissingButtons();
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
    setCurrentPhantom(phantom) {
        this.currentPhantom = phantom;
    }
    removeCurrentPhantom() {
        this.currentPhantom = null;
    }
    getCurrentPhantom() {
        return this.currentPhantom;
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
        const top = UserInterface_1.TOP_GAP + index * exports.OBJECT_SELLER_CELL_SIZE;
        this.objectName = game.add.text(left + exports.OBJECT_SELLER_CELL_SIZE + 10, top, this.objectInfo.getName(), TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        this.price = game.add.text(left + exports.OBJECT_SELLER_CELL_SIZE + 10, top + UserInfoPanel_1.SMALL_GAP_BETWEEN_LINES, this.objectInfo.getPrice().getStringValue(), TextStyle_1.TEXT_STYLE, groups[Play_1.GROUP_INTERFACE]);
        groups[Play_1.GROUP_INTERFACE].add(this.price);
        this.button = game.add.sprite(left + exports.OBJECT_SELLER_CELL_SIZE + 10, top + UserInfoPanel_1.SMALL_GAP_BETWEEN_LINES * 2 + 3, 'buy_button', 0, groups[Play_1.GROUP_INTERFACE]);
        this.button.inputEnabled = true;
        this.button.input.useHandCursor = true;
        this.button.events.onInputDown.add(this.buy, this, 0);
        this.button.events.onInputUp.add(this.up, this, 0);
        this.button.anchor.setTo(0, 0);
        groups[Play_1.GROUP_INTERFACE].add(this.button);
    }
    updateSprites() {
        if (this.isDown) {
            this.button.loadTexture(this.button.key, 1);
        }
        else {
            if (this.objectInfo.isSalable(this.worldKnowledge.getMoneyInWallet())) {
                this.button.loadTexture(this.button.key, 0);
            }
            else {
                this.button.loadTexture(this.button.key, 2);
            }
        }
    }
    buy() {
        if (this.objectInfo.isSalable(this.worldKnowledge.getMoneyInWallet())) {
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
        this.objectName.position.x += UserInterface_1.INTERFACE_WIDTH;
    }
    show() {
        this.price.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.button.position.x -= UserInterface_1.INTERFACE_WIDTH;
        this.objectName.position.x -= UserInterface_1.INTERFACE_WIDTH;
    }
}
class ObjectProvisionnerButton {
    constructor(objectSeller, objectInfo, worldKnowledge) {
        this.objectSeller = objectSeller;
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
        this.objectInfo.getUniqueCellOffsets(ObjectOrientation_1.DIRECTION_LOOP[0]).forEach((gap) => {
            width = Math.max(width, 1 + gap.x);
            height = Math.max(height, 1 + gap.y);
        });
        const scale = 2 / (width + height);
        if (height !== width) {
            // TODO, works not for every case.
            spriteOrigin.x = left + exports.OBJECT_SELLER_CELL_SIZE / (height + width) * (1);
            // W = 1 H = 2 => 1/3 1 - 2 = -1
            // W = 1 H = 1 => 1/2 1 - 1 = 0
            // W = 2 H = 1 => 2/3 2 - 1 = 1
            // Change sprite Origin
        }
        this.square = game.add.graphics(left, UserInterface_1.TOP_GAP + index * exports.OBJECT_SELLER_CELL_SIZE, groups[Play_1.GROUP_INTERFACE]);
        this.square.lineStyle(1, Pico8Colors_1.COLOR.WHITE);
        this.square.drawRect(0, 0, exports.OBJECT_SELLER_CELL_SIZE, exports.OBJECT_SELLER_CELL_SIZE);
        this.objectInfo.getUniqueCellOffsets(ObjectOrientation_1.DIRECTION_LOOP[0]).forEach((cellGap) => {
            const fakeCell = game.add.sprite(spriteOrigin.x - (cellGap.x - cellGap.y) * (PositionTransformer_1.CELL_WIDTH / 2) * scale, spriteOrigin.y - (cellGap.x + cellGap.y) * (PositionTransformer_1.CELL_HEIGHT / 2) * scale, 'casedefault');
            fakeCell.scale.set(scale, scale);
            fakeCell.anchor.set(0.5, 1);
            groups[Play_1.GROUP_INTERFACE].add(fakeCell);
            this.fakeCells.push(fakeCell);
        });
        this.objectInfo.getSpriteInfos(ObjectOrientation_1.DIRECTION_LOOP[0]).forEach((spriteInfo) => {
            const seller = game.add.sprite(spriteInfo.getRealPositionFromOrigin(spriteOrigin, ObjectOrientation_1.DIRECTION_LOOP[0], scale).x, spriteInfo.getRealPositionFromOrigin(spriteOrigin, ObjectOrientation_1.DIRECTION_LOOP[0], scale).y, spriteInfo.getSpriteKey());
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
        if (this.objectSeller.getCurrentPhantom() && this.objectSeller.getCurrentPhantom().getName() === this.objectInfo.getName()) {
            this.objectSeller.getCurrentPhantom().cancel(game);
            return;
        }
        if (this.objectSeller.getCurrentPhantom() && this.objectSeller.getCurrentPhantom().getName() !== this.objectInfo.getName()) {
            this.objectSeller.getCurrentPhantom().cancel(game);
        }
        if (this.worldKnowledge.getDepot().getCount(this.objectInfo.getName()) > 0) {
            this.worldKnowledge.getDepot().remove(this.objectInfo.getName());
            const phantom = new ObjectPhantom_1.ObjectPhantom(this.objectSeller, this.objectInfo.getName(), game, this.worldKnowledge);
            phantom.create(game, groups);
            this.objectSeller.setCurrentPhantom(phantom);
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