"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WIDTH = 33;
const HEIGHT = 36;
const TOP = 244;
class AbstractUICreator {
    static getUIText(itemName) {
        return itemName.split('').reduce((previousText, letter) => {
            if (/^[A-Z]$/.test(letter)) {
                if (previousText !== '') {
                    return previousText + "\n" + letter;
                }
                else {
                    return letter;
                }
            }
            else {
                return previousText + letter;
            }
        }, '');
    }
    constructor(worldKnowledge, player, x) {
        this.buttons = [];
        this.player = player;
        this.worldKnowledge = worldKnowledge;
        this.x = x;
        this.index = 0;
    }
    create(game, group) {
        this.game = game;
        this.group = group;
        this.bottomButton = new Phaser.Sprite(game, this.x + 3 * 2, 305 * 2, 'interfacebuttons', 3);
        this.bottomButton.scale.setTo(2);
        this.bottomButton.events.onInputDown.add(() => {
            this.goDown();
        }, this);
        this.topButton = new Phaser.Sprite(game, this.x + 18 * 2, 305 * 2, 'interfacebuttons', 2);
        this.topButton.scale.setTo(2);
        this.topButton.events.onInputDown.add(() => {
            this.goUp();
        }, this);
        group.add(this.bottomButton);
        group.add(this.topButton);
    }
    update() {
        this.createButtons(this.getPossibleButtons());
        const productionStatus = this.getProductionStatus();
        this.buttons.forEach((button) => {
            if (productionStatus && button.getName() === productionStatus.getItemName()) {
                button.updateProgress(productionStatus.percentage);
            }
            else {
                button.setAvailable(this.canProduct(button.getName()));
                button.updateProgress(0);
            }
        });
    }
    getPlayer() {
        return this.player;
    }
    createButton(itemName) {
        this.buttons.push(new CreationButton(this, this.game, this.buttons.length > 0 ? this.buttons[this.buttons.length - 1].getTop() + HEIGHT * 2 : TOP, itemName, this.group, this.x, this.getSpriteKey(itemName), this.getSpriteLayer(itemName), this.onClickFunction, this.onRightClickFunction));
    }
    goDown() {
        this.index += 1;
        this.buttons.forEach((button) => {
            button.goUp();
        });
        this.updateVisibleButtons();
    }
    goUp() {
        this.index -= 1;
        this.buttons.forEach((button) => {
            button.goDown();
        });
        this.updateVisibleButtons();
    }
    updateVisibleButtons() {
        let displayTop = false;
        let displayBottom = false;
        for (let i = 0; i < this.buttons.length; i++) {
            if (i < this.index) {
                this.buttons[i].setVisible(false);
                displayTop = true;
            }
            else if (i > this.index + 4) {
                this.buttons[i].setVisible(false);
                displayBottom = true;
            }
            else {
                this.buttons[i].setVisible(true);
            }
        }
        this.topButton.loadTexture(this.topButton.key, displayTop ? 0 : 2);
        this.topButton.inputEnabled = displayTop;
        this.bottomButton.loadTexture(this.bottomButton.key, displayBottom ? 1 : 3);
        this.bottomButton.inputEnabled = displayBottom;
    }
    createButtons(itemNames) {
        itemNames.forEach((itemName) => {
            if (!this.buttons.some((button) => {
                return button.getName() === itemName;
            })) {
                this.createButton(itemName);
            }
        });
        this.updateVisibleButtons();
    }
}
exports.AbstractUICreator = AbstractUICreator;
class CreationButton {
    constructor(creator, game, top, itemName, group, x, spriteKey, spriteLayer, onClickFunction, onRightClickFunction) {
        this.itemName = itemName;
        this.uiCreator = creator;
        this.button = new Phaser.Sprite(game, x, top, 'buttons', 2);
        this.button.scale.setTo(2, 2);
        this.button.inputEnabled = true;
        this.button.events.onInputDown.add(() => {
            if (game.input.activePointer.rightButton.isDown) {
                onRightClickFunction.bind(creator)(this.itemName);
            }
            else {
                onClickFunction.bind(creator)(this.itemName);
            }
        }, creator);
        group.add(this.button);
        this.itemSprite = new Phaser.Sprite(game, x + WIDTH, top + HEIGHT, spriteKey, spriteLayer);
        this.itemSprite.anchor.setTo(0.5, 0.7);
        group.add(this.itemSprite);
        this.text = new Phaser.Text(game, x, top, AbstractUICreator.getUIText(this.itemName), { align: 'center', fill: "#ffffff", font: '14px 000webfont' });
        group.add(this.text);
        this.progress = new CreationButtonProgress(game, top, x);
        group.add(this.progress);
        this.constructAllowed = true;
    }
    updateProgress(percentage) {
        this.setPending(percentage > 0);
        this.progress.setProgress(percentage);
    }
    getName() {
        return this.itemName;
    }
    setPending(value) {
        this.button.loadTexture(this.button.key, value ? 3 : this.constructAllowed ? 2 : 0);
    }
    setVisible(value) {
        this.applyAllElement((element) => {
            element.visible = value;
        });
    }
    goDown() {
        this.applyAllElement((element) => {
            element.y = element.y + HEIGHT * 2;
        });
    }
    goUp() {
        this.applyAllElement((element) => {
            element.y = element.y - HEIGHT * 2;
        });
    }
    setAvailable(value) {
        this.constructAllowed = value;
    }
    getTop() {
        return this.button.y;
    }
    applyAllElement(a) {
        [this.button, this.itemSprite, this.progress, this.text].forEach((element) => {
            a(element);
        });
    }
}
class CreationButtonProgress extends Phaser.Sprite {
    constructor(game, top, x) {
        super(game, x, top + 54, 'button-progress');
        this.scale.setTo(2);
        this.myCropRect = new Phaser.Rectangle(0, 0, 0, 8);
        this.crop(this.myCropRect, false);
    }
    update() {
        this.crop(this.myCropRect, false);
    }
    setProgress(percentage) {
        this.cropRect.width = WIDTH * percentage;
    }
}
//# sourceMappingURL=AbstractUICreator.js.map