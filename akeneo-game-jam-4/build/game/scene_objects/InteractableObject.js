"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MoveAction_1 = require("../actions/MoveAction");
const Verb_1 = require("../verbs/Verb");
const TalkAction_1 = require("../actions/TalkAction");
const ExtendedSprite_1 = require("../ExtendedSprite");
class InteractableObject extends ExtendedSprite_1.ExtendedSprite {
    constructor(play, identifier, x, y, key) {
        super(play.game, x, y, key);
        this.identifier = identifier;
        this.scale.setTo(4);
        this.inputEnabled = true;
        this.events.onInputDown.add(this.executeVerb, this);
        this.events.onInputOver.add(this.mouseOver, this);
        this.events.onInputOut.add(this.mouseOut, this);
        this.play_ = play;
        this.shouldDetach = true;
    }
    getIdentifier() {
        return this.identifier;
    }
    display() {
        this.visible = true;
    }
    hide() {
        this.visible = false;
    }
    mouseOver() {
        if (null !== this.play_.getCursor().getInventoryObject()) {
            this.play_.getSentence().setSecondaryObject(this);
        }
        else {
            this.play_.getSentence().setObject(this);
        }
    }
    mouseOut() {
        if (!this.play_.getCursor().getInventoryObject()) {
            this.play_.getSentence().setObject(null);
        }
        this.play_.getSentence().setSecondaryObject(null);
    }
    executeVerb(origin, pointer) {
        if (!this.play_.hasAction()) {
            switch (this.play_.getCurrentVerb()) {
                case Verb_1.Verb.WALK_TO:
                    this.play_.addActions(this.walkTo(origin, pointer));
                    break;
                case Verb_1.Verb.PICK_UP:
                    this.play_.addActions(this.pickUp(origin, pointer));
                    break;
                case Verb_1.Verb.USE:
                    this.play_.addActions(this.use(origin, pointer));
                    break;
                case Verb_1.Verb.LOOK_AT:
                    this.play_.addActions(this.lookAt(origin, pointer));
                    break;
            }
            if (this.shouldDetach) {
                this.play_.getCursor().detach();
            }
        }
    }
    walkTo(origin, pointer) {
        return [
            new MoveAction_1.MoveAction(this.play_, pointer.position.x)
        ];
    }
    pickUp(origin, pointer) {
        let noPickUpMessages = [
            'Je peux pas prendre ca!',
            "Mmmh... Non, c'est pas une bonne idee.",
            "T'es sur de toi la ?",
            'Haha, mais tu es vraiment debile en fait',
            'Non.',
            'Jamais de la vie Michel'
        ];
        return [
            new TalkAction_1.TalkAction(this.play_, this.play_.getBaby(), noPickUpMessages[Math.floor(Math.random() * noPickUpMessages.length)])
        ];
    }
    use(origin, pointer) {
        let noUseMessages = [
            'Je peux pas faire ca!',
            "J'ai aucune idee de ce que tu veux faire.",
            "Arrete de cliquouiller partout la",
            "Oui oui c'est ca oui",
            "Et la marmotte elle met le chocholat dans le papier d'alu"
        ];
        return [
            new TalkAction_1.TalkAction(this.play_, this.play_.getBaby(), noUseMessages[Math.floor(Math.random() * noUseMessages.length)])
        ];
    }
    lookAt(origin, pointer) {
        let lookAtMessages = [
            "C'est tres beau, non?",
            "Pas cher chez Amazon",
            "Tu veux me faire regarder toute la maison comme ca?",
            "C'est vraiment tres interessant",
            "Tu me fatigues Michel",
            "Areuh areuh"
        ];
        return [
            new TalkAction_1.TalkAction(this.play_, this.play_.getBaby(), lookAtMessages[Math.floor(Math.random() * lookAtMessages.length)]),
        ];
    }
    toFrench() {
        return 'un truc';
    }
}
exports.InteractableObject = InteractableObject;
//# sourceMappingURL=InteractableObject.js.map
