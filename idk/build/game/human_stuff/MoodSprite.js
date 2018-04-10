"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GAP_X = -7;
const GAP_Y = 1;
const DEBUG = false;
class MoodSprite {
    constructor() {
    }
    create(humanSprite, game, group) {
        this.parent = humanSprite;
        this.sprite = game.add.graphics(this.parent.position.x, this.parent.position.y, group);
        group.add(this.sprite);
    }
    update(generalMood, moods) {
        this.sprite.position.x = Math.ceil(this.parent.position.x + GAP_X);
        this.sprite.position.y = Math.ceil(this.parent.position.y + GAP_Y);
        this.sprite.clear();
        if (!DEBUG) {
            moods = [generalMood];
        }
        for (let i = 0; i < moods.length; i++) {
            this.sprite.moveTo(0, i * 2);
            if (moods[i] < 0.1) {
                this.sprite.lineStyle(2, 0xff004d);
            }
            else if (moods[i] < 0.5) {
                this.sprite.lineStyle(2, 0xfca203);
            }
            else {
                this.sprite.lineStyle(2, 0x00de2d);
            }
            this.sprite.lineTo(moods[i] * 15 + 1, i * 2);
        }
    }
}
exports.MoodSprite = MoodSprite;
//# sourceMappingURL=MoodSprite.js.map