"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TalkAction_1 = require("../actions/TalkAction");
const SceneObject_1 = require("../scene_objects/SceneObject");
const Translator_1 = require("../translations/Translator");
class InventoryObject extends SceneObject_1.SceneObject {
    constructor(play, texture) {
        super(play, texture, 0, 0, texture);
        this.sprite.anchor.setTo(0.5);
        this.active = false;
        this.hide();
        this.shouldDetach = false;
    }
    setActive(bool) {
        this.active = bool;
    }
    walkTo(origin, pointer) {
        this.attach();
        return [];
    }
    pickUp(origin, pointer) {
        return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), "MAIS JE L'AI DEJA, BANANE")];
    }
    use(origin, pointer) {
        let attachedObject = this.play.getCursor().getInventoryObject();
        if (null === attachedObject) {
            this.attach();
            return [];
        }
        else {
            return this.mixObjects(origin, pointer);
        }
    }
    lookAt(origin, pointer) {
        return [new TalkAction_1.TalkAction(this.play, this.play.getBaby(), this.getDescription())];
    }
    attach() {
        this.sprite.inputEnabled = false;
        this.oldPosition = new Phaser.Point(this.sprite.position.x, this.sprite.position.y);
        this.play.getCursor().attach(this);
    }
    detach() {
        this.sprite.position.setTo(this.oldPosition.x, this.oldPosition.y);
        this.sprite.inputEnabled = true;
    }
    updatePosition(x, y) {
        this.sprite.position.setTo(x, y);
    }
    mixObjects(origin, pointer) {
        this.play.getCursor().detach();
        return super.use(origin, pointer);
    }
    getLabel() {
        return Translator_1.Translator.t('inventory.' + this.getIdentifier() + '.label');
    }
    getDescription() {
        return Translator_1.Translator.t('inventory.' + this.getIdentifier() + '.description');
    }
    setPosition(x, y) {
        this.sprite.position.setTo(x, y);
    }
    isActive() {
        return this.active;
    }
}
exports.InventoryObject = InventoryObject;
//# sourceMappingURL=InventoryObject.js.map