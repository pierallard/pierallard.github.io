"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
class SoundSwitcher {
    constructor(play) {
        this.play = play;
        this.synth = new beepbox.Synth("5s6kbl00e0ftbm0a7g0fj7i0r1w1111f0000d1113c0000h0000v0000o3210b000i4x8i000i4N8j000i4N4h8y80014h4h4y8x4h8y8p21SFzR8idlgqaH0Q1F3g7n0MdlgqaE0c26Oyyw2Cv430Rl3EGM0W1QzE7F7oeMK2Cv5555555dcurGqqqqqqqqqqqoiI2C9N6EzihF8WgMt5lllRgqwRRRlw0");
        this.synth.volume = 0.05;
        this.synth.play();
        this.playing = true;
    }
    create() {
        this.icon = this.play.game.add.sprite(600, 12, 'sound');
        this.icon.scale.setTo(app_1.SimpleGame.SCALE);
        this.icon.inputEnabled = true;
        this.icon.events.onInputDown.add(this.toggleSound, this);
    }
    toggleSound() {
        if (this.playing) {
            this.synth.pause();
            this.icon.loadTexture('sounddisabled');
        }
        else {
            this.synth.play();
            this.icon.loadTexture('sound');
        }
        this.playing = !this.playing;
    }
}
exports.SoundSwitcher = SoundSwitcher;
//# sourceMappingURL=SoundSwitcher.js.map