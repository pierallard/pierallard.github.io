"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Translator_1 = require("../translations/Translator");
const WALK_TO = 'walk_to';
const LOOK_AT = 'look_at';
const PICK_UP = 'pick_up';
const USE = 'use';
class Verb extends Phaser.Text {
    constructor(verbRepository, game, x, y, name) {
        let style = {
            font: "28px 3dventuremedium",
            align: "center",
        };
        super(game, x, y, '', style);
        this.name_ = name;
        this.text = this.getLabel();
        this.verbRepository = verbRepository;
        this.inputEnabled = true;
        this.events.onInputDown.add(this.setCurrentVerb, this);
        this.anchor.setTo(0.5);
    }
    setCurrentVerb() {
        this.verbRepository.setCurrentVerb(this);
    }
    getName() {
        return this.name_;
    }
    static get WALK_TO() {
        return WALK_TO;
    }
    static get LOOK_AT() {
        return LOOK_AT;
    }
    static get PICK_UP() {
        return PICK_UP;
    }
    static get USE() {
        return USE;
    }
    getLabel() {
        return Translator_1.Translator.t('verbs.' + this.name_);
    }
}
exports.Verb = Verb;
//# sourceMappingURL=Verb.js.map