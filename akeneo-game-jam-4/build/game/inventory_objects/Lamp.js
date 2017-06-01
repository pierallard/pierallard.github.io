"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InventoryObject_1 = require("./InventoryObject");
const Battery_1 = require("./Battery");
class Lamp extends InventoryObject_1.InventoryObject {
    constructor(play) {
        super(play, Lamp.IDENTIFIER);
    }
    mixObjects(origin, pointer) {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Battery_1.Battery.IDENTIFIER) {
            this.play.getInventory().activeItem('lampePiles');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();
            return [];
        }
        return super.mixObjects(origin, pointer);
    }
    static get IDENTIFIER() {
        return 'neon';
    }
}
exports.Lamp = Lamp;
//# sourceMappingURL=Lamp.js.map