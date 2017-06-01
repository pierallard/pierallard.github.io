"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MoveAction_1 = require("../actions/MoveAction");
const Verb_1 = require("../verbs/Verb");
const TalkAction_1 = require("../actions/TalkAction");
const InteractiveObject_1 = require("../InteractiveObject");
const Translator_1 = require("../translations/Translator");
class SceneObject extends InteractiveObject_1.InteractiveObject {
    constructor(play, identifier, x, y, key) {
        super(play);
        this.setSprite(new Phaser.Sprite(play.game, x, y, key));
        this.identifier = identifier;
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.executeVerb, this);
        this.sprite.events.onInputOver.add(this.mouseOver, this);
        this.sprite.events.onInputOut.add(this.mouseOut, this);
        this.shouldDetach = true;
    }
    getIdentifier() {
        return this.identifier;
    }
    display() {
        this.sprite.visible = true;
    }
    mouseOver() {
        if (null !== this.play.getCursor().getInventoryObject()) {
            this.play.getSentence().setSecondaryObject(this);
        }
        else {
            this.play.getSentence().setObject(this);
        }
    }
    mouseOut() {
        if (!this.play.getCursor().getInventoryObject()) {
            this.play.getSentence().setObject(null);
        }
        this.play.getSentence().setSecondaryObject(null);
    }
    executeVerb(ignore, pointer) {
        let actions = [];
        if (!this.play.getActionManager().hasAction()) {
            switch (this.play.getCurrentVerb()) {
                case Verb_1.Verb.WALK_TO:
                    actions = this.walkTo(this, pointer);
                    break;
                case Verb_1.Verb.PICK_UP:
                    actions = this.pickUp(this, pointer);
                    break;
                case Verb_1.Verb.USE:
                    actions = this.use(this, pointer);
                    break;
                case Verb_1.Verb.LOOK_AT:
                    actions = this.lookAt(this, pointer);
                    break;
            }
            this.play.getActionManager().addActions(actions);
            if (this.shouldDetach) {
                this.play.getCursor().detach();
            }
        }
    }
    walkTo(origin, pointer) {
        return [
            new MoveAction_1.MoveAction(this.play, pointer.position.x)
        ];
    }
    pickUp(origin, pointer) {
        let defaultValues = Translator_1.Translator.t('scene.default.no_pick_up');
        return [
            new TalkAction_1.TalkAction(this.play, this.play.getBaby(), defaultValues[Math.floor(Math.random() * defaultValues.length)])
        ];
    }
    use(origin, pointer) {
        let defaultValues = Translator_1.Translator.t('scene.default.no_use');
        return [
            new TalkAction_1.TalkAction(this.play, this.play.getBaby(), defaultValues[Math.floor(Math.random() * defaultValues.length)])
        ];
    }
    lookAt(origin, pointer) {
        let defaultValues = Translator_1.Translator.t('scene.default.no_look_at');
        return [
            new TalkAction_1.TalkAction(this.play, this.play.getBaby(), defaultValues[Math.floor(Math.random() * defaultValues.length)]),
        ];
    }
    getLabel() {
        return Translator_1.Translator.t('scene.' + this.getIdentifier() + '.label');
    }
    getSprite() {
        return this.sprite;
    }
}
exports.SceneObject = SceneObject;
//# sourceMappingURL=SceneObject.js.map