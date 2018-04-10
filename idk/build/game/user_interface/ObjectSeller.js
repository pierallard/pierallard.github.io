"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserInterface_1 = require("./UserInterface");
const app_1 = require("../../app");
exports.OBJECT_SELLER_CELL_SIZE = 35;
var OBJECT;
(function (OBJECT) {
    OBJECT[OBJECT["SOFA"] = 0] = "SOFA";
    OBJECT[OBJECT["DESK"] = 1] = "DESK";
    OBJECT[OBJECT["DISPENSER"] = 2] = "DISPENSER";
})(OBJECT || (OBJECT = {}));
class ObjectSeller {
    constructor(worldKnowledge) {
        this.sellerButtons = [];
        this.worldKnowledge = worldKnowledge;
        ObjectSeller.objectProperties().forEach((objectProperties) => {
            this.sellerButtons.push(new SellerButton(objectProperties.type, objectProperties.class, objectProperties.sprite));
        });
    }
    create(game, interfaceGroup) {
        let i = 0;
        this.sellerButtons.forEach((sellerButton) => {
            sellerButton.create(game, interfaceGroup, i);
            i++;
        });
    }
    update() {
        this.sellerButtons.forEach((sellerButton) => {
            sellerButton.updateCount(this.getCount(sellerButton.getKlass()));
        });
    }
    static objectProperties() {
        let result = [];
        result.push({
            type: OBJECT.SOFA,
            class: 'Sofa',
            sprite: 'sofa'
        });
        result.push({
            type: OBJECT.DESK,
            class: 'Desk',
            sprite: 'desk'
        });
        result.push({
            type: OBJECT.DISPENSER,
            class: 'Dispenser',
            sprite: 'dispenser'
        });
        return result;
    }
    getCount(klass) {
        return this.worldKnowledge.getDepot().getCount(klass);
    }
}
exports.ObjectSeller = ObjectSeller;
class SellerButton {
    constructor(type, klass, sprite) {
        this.type = type;
        this.klass = klass;
        this.sprite = sprite;
    }
    create(game, interfaceGroup, index) {
        const left = app_1.CAMERA_WIDTH_PIXELS - UserInterface_1.INTERFACE_WIDTH;
        const seller = game.add.sprite(left + exports.OBJECT_SELLER_CELL_SIZE / 2, 10 + (index + 1) * exports.OBJECT_SELLER_CELL_SIZE - exports.OBJECT_SELLER_CELL_SIZE / 2, this.sprite);
        seller.anchor.set(0.5, 0.5);
        interfaceGroup.add(seller);
        const circle = game.add.graphics(left, index * exports.OBJECT_SELLER_CELL_SIZE + 10, interfaceGroup);
        circle.beginFill(0xff0000);
        circle.drawCircle(exports.OBJECT_SELLER_CELL_SIZE, 0, 10);
        interfaceGroup.add(circle);
        this.counter = game.add.text(left + exports.OBJECT_SELLER_CELL_SIZE - 4, index * exports.OBJECT_SELLER_CELL_SIZE + 10 - 6, '', {
            align: 'center',
            fill: "#ffffff",
            font: '16px 000webfont'
        }, interfaceGroup);
        interfaceGroup.add(this.counter);
        this.updateCount(0);
    }
    getKlass() {
        return this.klass;
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
}
//# sourceMappingURL=ObjectSeller.js.map