"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PositionTransformer_1 = require("../PositionTransformer");
const ClosestPathFinder_1 = require("./ClosestPathFinder");
const Direction_1 = require("../Direction");
const HumanAnimationManager_1 = require("./HumanAnimationManager");
const HumanStateManager_1 = require("./HumanStateManager");
const ObjectSelector_1 = require("../objects/ObjectSelector");
const TalkBubble_1 = require("./TalkBubble");
const HumanMoodManager_1 = require("./HumanMoodManager");
const MoodSprite_1 = require("./MoodSprite");
const Play_1 = require("../game_state/Play");
const ThoughtBubble_1 = require("./ThoughtBubble");
const Pico8Colors_1 = require("../Pico8Colors");
const AbstractObject_1 = require("../objects/AbstractObject");
const ObjectOrientation_1 = require("../objects/ObjectOrientation");
const MAX_WALK_CELL_DURATION = 1500;
const MIN_WALK_CELL_DURATION = 800;
const DAY_LENGTH = 60 * Phaser.Timer.SECOND;
const MAX_RETRIES = 3;
const MIN_RETRIES = 0;
const GAP_FROM_BOTTOM = -8;
const PATH_DEBUG = false;
exports.HUMAN_SPRITE_VARIATIONS = ['human1', 'human2', 'human3'];
exports.HUMAN_SPRITE_COLORS = ['green', 'pink', 'red'];
class Employee {
    constructor(cell, humanProperties) {
        this.cell = cell;
        this.moving = false;
        this.path = [];
        this.stateManager = new HumanStateManager_1.HumanStateManager(this);
        this.anchorPixels = new PIXI.Point(0, GAP_FROM_BOTTOM);
        this.animationManager = new HumanAnimationManager_1.HumanAnimationManager();
        this.talkBubble = new TalkBubble_1.TalkBubble();
        this.thoughtBubble = new ThoughtBubble_1.ThoughtBubble();
        this.moodManager = new HumanMoodManager_1.HumanMoodManager();
        this.moodSprite = new MoodSprite_1.MoodSprite();
        this.humanProperties = humanProperties;
    }
    create(game, groups, worldKnowledge) {
        this.game = game;
        this.worldKnowledge = worldKnowledge;
        this.moodManager.create(game);
        this.sprite = game.add.tileSprite(PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).x + this.anchorPixels.x, PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).y + this.anchorPixels.y, 24, 25, this.humanProperties.getSpriteKey());
        this.animationManager.create(this.sprite);
        this.sprite.anchor.set(0.5, 1.0);
        ObjectSelector_1.ObjectSelector.makeSelectable([this.sprite], () => {
            this.worldKnowledge.setSelectedHuman(this);
        }, () => {
            this.worldKnowledge.unselectHuman();
        });
        groups[Play_1.GROUP_OBJECTS_AND_HUMANS].add(this.sprite);
        this.animationManager.loadAnimation(HumanAnimationManager_1.ANIMATION.FREEZE, true, false);
        this.closestPathFinder = new ClosestPathFinder_1.ClosestPathFinder(game, worldKnowledge);
        this.stateManager.create(game, worldKnowledge, this.animationManager);
        this.talkBubble.create(this.sprite, this.game, groups[Play_1.GROUP_OBJECTS_AND_HUMANS]);
        this.thoughtBubble.create(this.sprite, this.game, groups[Play_1.GROUP_OBJECTS_AND_HUMANS]);
        this.moodSprite.create(this.sprite, this.game, groups[Play_1.GROUP_INFOS]);
        if (PATH_DEBUG || AbstractObject_1.SPRITE_DEBUG) {
            this.debugGraphics = game.add.graphics(0, 0, groups[Play_1.GROUP_INTERFACE]);
        }
        this.worldKnowledge.addMoneyInWallet(this.humanProperties.getRealWage(), 3 * Phaser.Timer.SECOND);
        this.game.time.events.loop(DAY_LENGTH, () => {
            this.worldKnowledge.addMoneyInWallet(this.humanProperties.getRealWage(), 3 * Phaser.Timer.SECOND);
        });
    }
    update() {
        this.talkBubble.update();
        this.thoughtBubble.update();
        this.stateManager.updateState(this.game);
        this.moodManager.update();
        this.moodSprite.update(this.moodManager.getGeneralMood(), [
            this.moodManager.getMood(HumanMoodManager_1.MOOD.HUNGER),
            this.moodManager.getMood(HumanMoodManager_1.MOOD.SOCIAL),
            this.moodManager.getMood(HumanMoodManager_1.MOOD.RELAXATION)
        ]);
        if (PATH_DEBUG) {
            this.debugGraphics.clear();
            this.debugGraphics.lineStyle(2, Pico8Colors_1.COLOR.LIGHT_GREEN);
            if (this.path !== null && this.path.length > 0) {
                this.debugGraphics.moveTo(this.sprite.position.x, this.sprite.position.y);
                this.path.forEach((pathItem) => {
                    this.debugGraphics.lineTo(PositionTransformer_1.PositionTransformer.getRealPosition(pathItem).x, PositionTransformer_1.PositionTransformer.getRealPosition(pathItem).y - PositionTransformer_1.CELL_HEIGHT / 2);
                });
            }
        }
        if (AbstractObject_1.SPRITE_DEBUG) {
            this.debugGraphics.clear();
            this.debugGraphics.lineStyle(1, Pico8Colors_1.COLOR.LIGHT_BLUE);
            const realPosition = this.sprite.position;
            this.debugGraphics.moveTo(realPosition.x - 1.5, realPosition.y + 0.5);
            this.debugGraphics.lineTo(realPosition.x + 2.5, realPosition.y + 0.5);
            this.debugGraphics.moveTo(realPosition.x + 0.5, realPosition.y - 1.5);
            this.debugGraphics.lineTo(realPosition.x + 0.5, realPosition.y + 2.5);
        }
    }
    goMeeting(meeting) {
        return this.stateManager.goMeeting(this.game, meeting);
    }
    goSitMeeting(meeting) {
        return this.stateManager.goSitMeeting(this.game, meeting);
    }
    moveTo(cell) {
        const path = this.closestPathFinder.getPath(this.cell, cell);
        if (path === null) {
            this.stateManager.reset(this.game);
            return false;
        }
        this.path = path;
        if (!this.moving) {
            this.popPath();
        }
        return true;
    }
    moveToClosest(cell, entries = [Direction_1.DIRECTION.BOTTOM, Direction_1.DIRECTION.RIGHT, Direction_1.DIRECTION.TOP, Direction_1.DIRECTION.LEFT]) {
        const path = this.closestPathFinder.getNeighborPath(this.cell, cell, entries);
        if (path === null) {
            this.stateManager.reset(this.game);
            return false;
        }
        this.path = path;
        if (!this.moving) {
            this.popPath();
        }
        return true;
    }
    animateMove(direction) {
        const isLeftLooking = Employee.isHumanLeftLooking(direction);
        const isTopLooking = Employee.isHumanTopLooking(direction);
        this.animationManager.loadAnimation(HumanAnimationManager_1.ANIMATION.WALK, isLeftLooking, isTopLooking);
        this.moving = true;
        this.game.add.tween(this.sprite.position).to({
            x: PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).x + this.anchorPixels.x,
            y: PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).y + this.anchorPixels.y
        }, this.getWalkDuration(), 'Linear', true).onComplete.add(() => {
            this.popPath();
        }, this);
    }
    getWalkDuration() {
        return MIN_WALK_CELL_DURATION + (MAX_WALK_CELL_DURATION - MIN_WALK_CELL_DURATION) * (1 - this.humanProperties.getSpeed());
    }
    popPath() {
        this.moving = false;
        let humanPositions = [this.cell];
        if (this.path !== null && this.path.length > 0) {
            const next = this.path.shift();
            const direction = Direction_1.Direction.getNeighborDirection(this.cell, next);
            if (!this.moving) {
                this.cell = next;
                this.anchorPixels.x = 0;
                this.anchorPixels.y = GAP_FROM_BOTTOM;
                this.animateMove(direction);
            }
            humanPositions.push(this.cell);
        }
        this.worldKnowledge.humanMoved(humanPositions);
    }
    getPosition() {
        return this.cell;
    }
    isMoving() {
        return this.moving;
    }
    interactWith(objectReferer, isLeft = null) {
        const direction = Direction_1.Direction.getNeighborDirection(this.cell, objectReferer.getPosition());
        const side = (isLeft !== null) ? isLeft : Employee.isHumanLeftLooking(direction);
        // Employee has to gap 5px from the sofa to be sit properly, and 1px from the bottom.
        this.anchorPixels.x = objectReferer.getPositionGap().x + (side ? -5 : 5);
        this.anchorPixels.y = objectReferer.getPositionGap().y - 1;
        this.cell = objectReferer.getPosition();
        objectReferer.setUsed(this);
        this.animateMove(direction);
    }
    static isHumanLeftLooking(direction) {
        return ObjectOrientation_1.ObjectOrientation.isHorizontalMirror(direction);
    }
    static isHumanTopLooking(direction) {
        return ObjectOrientation_1.ObjectOrientation.isVerticalMirror(direction);
    }
    goToFreeCell(objectReferer) {
        objectReferer.setUnused();
        const cells = [];
        objectReferer.getEntries().forEach((direction) => {
            const tryCell = Direction_1.Direction.getNeighbor(this.cell, direction);
            if (this.worldKnowledge.isFree(tryCell)) {
                cells.push(tryCell);
            }
        });
        if (cells.length === 0) {
            console.log('oops');
            return;
        }
        this.path = [cells[Math.floor(Math.random() * cells.length)]];
        if (!this.moving) {
            this.popPath();
        }
    }
    loadAnimation(animation, isLeftLooking = null, isTopLooking = null) {
        this.animationManager.loadAnimation(animation, isLeftLooking, isTopLooking);
    }
    isSelected() {
        return ObjectSelector_1.ObjectSelector.isSelected(this.sprite);
    }
    getSprite() {
        return this.sprite;
    }
    resetAStar(newNonEmptyCell) {
        this.closestPathFinder.reset();
        if (this.path !== null) {
            // If human wants to go to a non-empty cell
            const matchingPath = this.path.filter((cell) => {
                return cell.x === newNonEmptyCell.x && cell.y === newNonEmptyCell.y;
            });
            if (matchingPath.length > 0) {
                const goal = this.path[this.path.length - 1];
                this.moveTo(goal);
                return;
            }
        }
    }
    resetStateIfCellEmpty(newEmptyCell) {
        if (this.cell.x == newEmptyCell.x && this.cell.y == newEmptyCell.y) {
            this.stateManager.reset(this.game);
        }
    }
    isFree() {
        return [HumanStateManager_1.STATE.MOVE_RANDOM, HumanStateManager_1.STATE.FREEZE, HumanStateManager_1.STATE.SMOKE].indexOf(this.getState()) > -1;
    }
    getState() {
        return this.stateManager.getState();
    }
    showTalkBubble() {
        this.talkBubble.show();
    }
    hideTalkBubble() {
        this.talkBubble.hide();
    }
    updateMoodFromState() {
        this.moodManager.updateFromState(this.getState());
    }
    getMood(mood = null) {
        if (mood === null) {
            return this.moodManager.getGeneralMood();
        }
        return this.moodManager.getMood(mood);
    }
    stopWalk() {
        this.path = null;
    }
    getMaxRetries() {
        return Math.ceil(MIN_RETRIES + (MAX_RETRIES - MIN_RETRIES) * this.humanProperties.getPerseverance());
    }
    getType() {
        return this.humanProperties.getType();
    }
    getName() {
        return this.humanProperties.getName();
    }
    showThoughtBubble(rageImage) {
        this.thoughtBubble.showRage(rageImage);
    }
    hideThoughtBubble() {
        this.thoughtBubble.hide();
    }
    getNextProbabilities() {
        return this.stateManager.getNextProbabilities();
    }
    unselect() {
        if (this.isSelected()) {
            ObjectSelector_1.ObjectSelector.click(this.sprite, null, [this.sprite]);
        }
    }
}
exports.Employee = Employee;
//# sourceMappingURL=Employee.js.map