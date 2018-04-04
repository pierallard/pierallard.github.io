"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TalkBubble {
    constructor() {
    }
    create(humanSprite, game, group) {
        this.parent = humanSprite;
        this.sprite = game.add.sprite(this.parent.position.x, this.parent.position.y, 'bubble', 0, group);
        this.sprite.anchor.set(1, 2.8);
        this.hide();
        group.add(this.sprite);
    }
    show() {
        this.sprite.alpha = 0.8;
    }
    hide() {
        this.sprite.alpha = 0;
    }
    update() {
        this.sprite.position = this.parent.position;
        this.sprite.scale.x = this.parent.scale.x;
    }
}
exports.TalkBubble = TalkBubble;
//# sourceMappingURL=TalkBubble.js.map