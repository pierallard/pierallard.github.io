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
const MAX_WALK_CELL_DURATION = 1500;
const MIN_WALK_CELL_DURATION = 800;
const MAX_RETRIES = 3;
const MIN_RETRIES = 0;
const GAP_FROM_BOTTOM = -8;
const PATH_DEBUG = false;
class Employee {
    constructor(cell, humanProperties) {
        this.cell = cell;
        this.moving = false;
        this.path = [];
        this.stateManager = new HumanStateManager_1.HumanStateManager(this);
        this.anchorPixels = new PIXI.Point(0, GAP_FROM_BOTTOM);
        this.animationManager = new HumanAnimationManager_1.HumanAnimationManager();
        this.talkBubble = new TalkBubble_1.TalkBubble();
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
        ObjectSelector_1.ObjectSelector.makeSelectable([this.sprite]);
        groups[Play_1.GROUP_OBJECTS_AND_HUMANS].add(this.sprite);
        this.animationManager.loadAnimation(HumanAnimationManager_1.ANIMATION.FREEZE, true, false);
        this.closestPathFinder = new ClosestPathFinder_1.ClosestPathFinder(game, worldKnowledge);
        this.stateManager.create(game, worldKnowledge, this.animationManager);
        this.talkBubble.create(this.sprite, this.game, groups[Play_1.GROUP_OBJECTS_AND_HUMANS]);
        this.moodSprite.create(this.sprite, this.game, groups[Play_1.GROUP_INFOS]);
        if (PATH_DEBUG) {
            this.pathGraphics = game.add.graphics(0, 0, groups[Play_1.GROUP_INFOS]);
            groups[Play_1.GROUP_INFOS].add(this.pathGraphics);
        }
    }
    update() {
        this.talkBubble.update();
        this.stateManager.updateState(this.game);
        this.moodManager.update();
        this.moodSprite.update(this.moodManager.getGeneralMood(), [
            this.moodManager.getMood(HumanMoodManager_1.MOOD.HUNGER),
            this.moodManager.getMood(HumanMoodManager_1.MOOD.SOCIAL),
            this.moodManager.getMood(HumanMoodManager_1.MOOD.RELAXATION)
        ]);
        if (PATH_DEBUG) {
            this.pathGraphics.clear();
            this.pathGraphics.lineStyle(2, 0x00ff00);
            if (this.path !== null && this.path.length > 0) {
                this.pathGraphics.moveTo(this.sprite.position.x, this.sprite.position.y);
                this.path.forEach((pathItem) => {
                    this.pathGraphics.lineTo(PositionTransformer_1.PositionTransformer.getRealPosition(pathItem).x, PositionTransformer_1.PositionTransformer.getRealPosition(pathItem).y - PositionTransformer_1.CELL_HEIGHT / 2);
                });
            }
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
            this.popPath(null, null);
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
            this.popPath(null, null);
        }
        return true;
    }
    animateMove(direction) {
        const isLeft = Employee.isHumanLeft(direction);
        const isTop = Employee.isHumanTop(direction);
        this.animationManager.loadAnimation(HumanAnimationManager_1.ANIMATION.WALK, isLeft, isTop);
        this.moving = true;
        this.game.add.tween(this.sprite.position).to({
            x: PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).x + this.anchorPixels.x,
            y: PositionTransformer_1.PositionTransformer.getRealPosition(this.cell).y + this.anchorPixels.y
        }, this.getWalkDuration(), 'Linear', true)
            .onComplete.add((_tweenValues, _game, isLeft, isTop) => {
            this.popPath(isLeft, isTop);
        }, this, 0, isLeft, isTop);
    }
    getWalkDuration() {
        return MIN_WALK_CELL_DURATION + (MAX_WALK_CELL_DURATION - MIN_WALK_CELL_DURATION) * (1 - this.humanProperties.getSpeed());
    }
    popPath(isLeft, isTop) {
        this.moving = false;
        let humanPositions = [this.cell];
        if (this.path === null || this.path.length == 0) {
            // this.animationManager.loadAnimation(ANIMATION.FREEZE, isLeft, isTop);
        }
        else {
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
        const side = (isLeft !== null) ? isLeft : Employee.isHumanLeft(direction);
        // Employee has to gap 5px from the sofa to be sit properly, and 1px from the bottom.
        this.anchorPixels.x = objectReferer.getPositionGap().x + (side ? -5 : 5);
        this.anchorPixels.y = objectReferer.getPositionGap().y - 1;
        this.cell = objectReferer.getPosition();
        objectReferer.setUsed(this);
        this.animateMove(direction);
    }
    static isHumanLeft(direction) {
        return [Direction_1.DIRECTION.LEFT, Direction_1.DIRECTION.BOTTOM].indexOf(direction) > -1;
    }
    static isHumanTop(direction) {
        return [Direction_1.DIRECTION.LEFT, Direction_1.DIRECTION.TOP].indexOf(direction) > -1;
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
            this.popPath(null, null);
        }
    }
    loadAnimation(animation, isLeft = null, isTop = null) {
        this.animationManager.loadAnimation(animation, isLeft, isTop);
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
}
exports.Employee = Employee;
//# sourceMappingURL=Employee.js.map