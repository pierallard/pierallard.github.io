"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserInterface_1 = require("../user_interface/UserInterface");
class MoodRegister {
    constructor(humanRepository) {
        this.humanRepository = humanRepository;
        this.moods = [];
    }
    create(game) {
        game.time.events.loop(Phaser.Timer.SECOND * 2, this.updateMood, this);
    }
    updateMood() {
        const moods = this.humanRepository.humans.map((human) => {
            return human.getMood();
        });
        const avgMood = moods.reduce((prev, mood) => { return prev + mood; }, 0) / moods.length;
        this.moods.push(avgMood);
    }
    getLastMoods() {
        let result = [];
        for (let i = 0; i < UserInterface_1.INTERFACE_WIDTH; i++) {
            result.push(this.moods[this.moods.length - 1 - i]);
        }
        return result;
    }
}
exports.MoodRegister = MoodRegister;
//# sourceMappingURL=MoodRegister.js.map