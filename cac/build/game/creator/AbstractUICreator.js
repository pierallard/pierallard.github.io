"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
const WIDTH = 33;
const HEIGHT = 36;
class AbstractUICreator {
    constructor(worldKnowledge, player, x) {
        this.buttons = [];
        this.player = player;
        this.worldKnowledge = worldKnowledge;
        this.x = x;
    }
    create(game, group, creator) {
        let top = 250;
        this.getConstructableItems().forEach((item) => {
            this.buttons.push(new CreationButton(this, game, top, item, group, this.x, this.getSpriteKey(item), this.getSpriteLayer(item), this.onClickFunction, this.onProductFinish));
            top += HEIGHT * Play_1.SCALE;
        });
        creator.create(game, this);
    }
    updateAllowedItems(allowedItems) {
        this.buttons.forEach((button) => {
            if (allowedItems.indexOf(button.getName()) > -1) {
                button.show();
            }
            else {
                button.hide();
            }
        });
    }
    resetButton(itemName) {
        this.getButton(itemName).reset();
    }
    setPendingButton(itemName) {
        this.getButton(itemName).setPending();
    }
    runProduction(itemName) {
        this.getButton(itemName).runProduction(this.getConstructionTime(itemName));
    }
    getPlayer() {
        return this.player;
    }
    getButton(itemName) {
        for (let i = 0; i < this.buttons.length; i++) {
            if (this.buttons[i].getName() === itemName) {
                return this.buttons[i];
            }
        }
        return null;
    }
}
exports.AbstractUICreator = AbstractUICreator;
class CreationButton {
    constructor(creator, game, top, itemName, group, x, spriteKey, spriteLayer, onClickFunction, onProductFinished) {
        this.itemName = itemName;
        this.onProductFinished = onProductFinished;
        this.creator = creator;
        this.button = new Phaser.Sprite(game, x, top, 'buttons', 0);
        this.button.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        this.button.inputEnabled = true;
        this.button.events.onInputDown.add(() => {
            onClickFunction.bind(creator)(this.itemName);
        }, creator);
        group.add(this.button);
        this.itemSprite = new Phaser.Sprite(game, x + WIDTH * Play_1.SCALE / 2, top + HEIGHT * Play_1.SCALE / 2, spriteKey, spriteLayer);
        this.itemSprite.scale.setTo(Play_1.SCALE / 2, Play_1.SCALE / 2);
        this.itemSprite.anchor.setTo(0.5, 0.7);
        group.add(this.itemSprite);
        this.progress = new CreationButtonProgress(game, top, x);
        group.add(this.progress);
        this.hide();
    }
    runProduction(constructionTime) {
        this.button.loadTexture(this.button.key, 1);
        const tween = this.progress.startProgress(constructionTime * Phaser.Timer.SECOND);
        tween.onComplete.add(() => {
            this.onProductFinished.bind(this.creator)(this.itemName);
        }, this.creator);
    }
    getName() {
        return this.itemName;
    }
    reset() {
        this.progress.resetProgress();
        this.button.loadTexture(this.button.key, 0);
    }
    setPending() {
        this.button.loadTexture(this.button.key, 2);
    }
    hide() {
        this.button.alpha = 0;
        this.itemSprite.alpha = 0;
        this.progress.alpha = 0;
    }
    show() {
        this.button.alpha = 1;
        this.itemSprite.alpha = 1;
        this.progress.alpha = 1;
    }
}
class CreationButtonProgress extends Phaser.Sprite {
    constructor(game, top, x) {
        super(game, x, top + 54, 'button-progress');
        this.scale.setTo(Play_1.SCALE);
        this.myCropRect = new Phaser.Rectangle(0, 0, 0, 8);
        this.crop(this.myCropRect, false);
    }
    update() {
        this.crop(this.myCropRect, false);
    }
    startProgress(time) {
        return this.game.add.tween(this.cropRect).to({ width: WIDTH }, time, "Linear", true);
    }
    resetProgress() {
        this.cropRect.width = 0;
        this.crop(this.myCropRect, false);
    }
}
//# sourceMappingURL=AbstractUICreator.js.map