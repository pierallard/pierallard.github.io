"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
const GeneratedGround_1 = require("./GeneratedGround");
const UserInterface_1 = require("../interface/UserInterface");
const Ground_1 = require("./Ground");
const SIZE = 60;
const X = 571;
const Y = 9;
const REFRESH_TIME = 0.25 * Phaser.Timer.SECOND;
const TILE_SIZE = 20;
const IDONTKNOW = 1;
var MINIMAP_STATE;
(function (MINIMAP_STATE) {
    MINIMAP_STATE[MINIMAP_STATE["HIDDEN"] = 0] = "HIDDEN";
    MINIMAP_STATE[MINIMAP_STATE["VISIBLE"] = 1] = "VISIBLE";
    MINIMAP_STATE[MINIMAP_STATE["NO_ENERGY"] = 2] = "NO_ENERGY";
})(MINIMAP_STATE || (MINIMAP_STATE = {}));
class Minimap {
    constructor(worldKnowledge, player) {
        this.hasRenderedRecently = false;
        this.worldKnowledge = worldKnowledge;
        this.player = player;
    }
    static rectsContains(rects, pos) {
        for (let i = 0; i < rects.length; i++) {
            if (rects[i].x === pos.x && rects[i].y === pos.y) {
                return true;
            }
        }
        return false;
    }
    create(game, group) {
        this.timerEvents = game.time.events;
        let data = this.worldKnowledge.getGroundCSV();
        game.cache.addTilemap('minimap', null, data, Phaser.Tilemap.CSV);
        let map = game.add.tilemap('minimap', IDONTKNOW, IDONTKNOW, GeneratedGround_1.GROUND_WIDTH * 2, GeneratedGround_1.GROUND_HEIGHT * 2);
        map.addTilesetImage('GrasClif', 'GrasClif', TILE_SIZE, TILE_SIZE, 0, 0, 0);
        map.addTilesetImage('GrssMisc', 'GrssMisc', TILE_SIZE, TILE_SIZE, 0, 0, 100);
        map.addTilesetImage('Ice2Snow', 'Ice2Snow', TILE_SIZE, TILE_SIZE, 0, 0, 200);
        map.addTilesetImage('Snow', 'Snow', TILE_SIZE, TILE_SIZE, 0, 0, 300);
        map.addTilesetImage('Snw2Crtb', 'Snw2Crtb', TILE_SIZE, TILE_SIZE, 0, 0, 400);
        map.addTilesetImage('IceBrk2', 'IceBrk2', TILE_SIZE, TILE_SIZE, 0, 0, 500);
        map.addTilesetImage('Grs2Watr', 'Grs2Watr', TILE_SIZE, TILE_SIZE, 0, 0, 600);
        map.addTilesetImage('Grs2Mnt', 'Grs2Mnt', TILE_SIZE, TILE_SIZE, 0, 0, 700);
        map.addTilesetImage('Snw2Mnt', 'Snw2Mnt', TILE_SIZE, TILE_SIZE, 0, 0, 800);
        map.addTilesetImage('Stn2SnwB', 'Stn2SnwB', TILE_SIZE, TILE_SIZE, 0, 0, 900);
        this.layer = map.createLayer(0, GeneratedGround_1.GROUND_WIDTH * IDONTKNOW, GeneratedGround_1.GROUND_HEIGHT * IDONTKNOW, group);
        this.scale = SIZE / Math.max(GeneratedGround_1.GROUND_WIDTH, GeneratedGround_1.GROUND_HEIGHT) * 2;
        let position = new PIXI.Point(X * 2, Y * 2);
        if (GeneratedGround_1.GROUND_WIDTH > GeneratedGround_1.GROUND_HEIGHT) {
            position.y = position.y + (SIZE * 2 - GeneratedGround_1.GROUND_HEIGHT * this.scale) / 2;
        }
        else {
            position.x = position.x + (SIZE * 2 - GeneratedGround_1.GROUND_WIDTH * this.scale) / 2;
        }
        this.layer.scale.setTo(this.scale, this.scale);
        this.layer.fixedToCamera = false;
        this.layer.position.setTo(position.x, position.y);
        this.layer.scrollFactorX = 0;
        this.layer.scrollFactorY = 0;
        const secondScale = SIZE * 2 / Math.max(GeneratedGround_1.GROUND_WIDTH, GeneratedGround_1.GROUND_HEIGHT);
        this.unitAndBuildingGraphics = new Phaser.Graphics(game);
        this.unitAndBuildingGraphics.position.setTo(position.x, position.y);
        this.unitAndBuildingGraphics.fixedToCamera = true;
        this.unitAndBuildingGraphics.scale.set(secondScale, secondScale);
        game.add.existing(this.unitAndBuildingGraphics);
        this.fogGraphics = new Phaser.Graphics(game);
        this.fogGraphics.position.setTo(position.x, position.y);
        this.fogGraphics.fixedToCamera = true;
        this.fogGraphics.scale.set(secondScale, secondScale);
        game.add.existing(this.fogGraphics);
        this.rectGraphics = new Phaser.Graphics(game);
        this.rectGraphics.position.setTo(position.x, position.y);
        this.rectGraphics.fixedToCamera = true;
        game.add.existing(this.rectGraphics);
        this.layer.inputEnabled = true;
        this.layer.events.onInputDown.add(() => {
            const scaleCamera = this.scale / Play_1.SCALE / Ground_1.GROUND_SIZE;
            const cameraView = this.layer.game.camera.view;
            const cameraWidth = (cameraView.width - UserInterface_1.INTERFACE_WIDTH) * scaleCamera;
            const cameraHeight = cameraView.height * scaleCamera;
            const x = (game.input.mousePointer.x - X * 2 - cameraWidth / 2) / this.scale * Ground_1.GROUND_SIZE * Play_1.SCALE;
            const y = (game.input.mousePointer.y - Y * 2 - cameraHeight / 2) / this.scale * Ground_1.GROUND_SIZE * Play_1.SCALE;
            game.camera.setPosition(x, y);
        });
        this.multiplicator = Math.ceil(Math.sqrt(GeneratedGround_1.GROUND_WIDTH * GeneratedGround_1.GROUND_HEIGHT / 1000));
        this.snow = game.add.sprite(X * 2, Y * 2, 'snow');
        this.snow.scale.setTo(2);
        this.snow.fixedToCamera = true;
        this.updateState();
    }
    update() {
        if (this.hasRenderedRecently) {
            return;
        }
        this.updateState();
        this.updateUnitAndBuildingGraphics();
        this.updateFogGraphics();
        this.updateRectGraphics();
        this.hasRenderedRecently = true;
        this.timerEvents.add(REFRESH_TIME, () => {
            this.hasRenderedRecently = false;
        }, this);
    }
    updateUnitAndBuildingGraphics() {
        this.unitAndBuildingGraphics.clear();
        this.unitAndBuildingGraphics.lineStyle(null);
        let rects = [];
        this.worldKnowledge.getArmies().forEach((unit) => {
            if (null !== unit.getPlayer()) {
                const color = unit.getPlayer().getColor();
                if (!rects[color]) {
                    rects[color] = [];
                }
                unit.getCellPositions().forEach((cellPosition) => {
                    const pos = new PIXI.Point(Math.round(cellPosition.x / this.multiplicator), Math.round(cellPosition.y / this.multiplicator));
                    if (!Minimap.rectsContains(rects[color], pos)) {
                        rects[color].push(pos);
                    }
                });
            }
        });
        for (let i = 0; i < Object.keys(rects).length; i++) {
            this.unitAndBuildingGraphics.beginFill(+Object.keys(rects)[i]);
            rects[+Object.keys(rects)[i]].forEach((rect) => {
                this.unitAndBuildingGraphics.drawRect(rect.x * this.multiplicator, rect.y * this.multiplicator, this.multiplicator, this.multiplicator);
            });
        }
    }
    updateFogGraphics() {
        this.fogGraphics.clear();
        this.fogGraphics.beginFill(0x000000);
        const fogKnownCells = this.worldKnowledge.getFogKnownCells(this.player);
        for (let y = 0; y < fogKnownCells.length; y += this.multiplicator) {
            for (let x = 0; x < fogKnownCells[y].length; x += this.multiplicator) {
                let addRect = false;
                for (let gapX = 0; !addRect && gapX < this.multiplicator; gapX++) {
                    for (let gapY = 0; !addRect && gapY < this.multiplicator; gapY++) {
                        if (!fogKnownCells[y][x]) {
                            addRect = true;
                        }
                    }
                }
                if (addRect) {
                    this.fogGraphics.drawRect(x, y, this.multiplicator, this.multiplicator);
                }
            }
        }
    }
    updateRectGraphics() {
        this.rectGraphics.clear();
        const cameraView = this.layer.game.camera.view;
        const scaleCamera = this.scale / Play_1.SCALE / Ground_1.GROUND_SIZE;
        this.rectGraphics.lineStyle(1, 0xffffff);
        this.rectGraphics.endFill();
        this.rectGraphics.drawRect(cameraView.x * scaleCamera, cameraView.y * scaleCamera, (cameraView.width - UserInterface_1.INTERFACE_WIDTH) * scaleCamera, cameraView.height * scaleCamera);
    }
    updateState() {
        let state = MINIMAP_STATE.HIDDEN;
        if (this.hasCommunicationCenter()) {
            if (this.hasPower()) {
                state = MINIMAP_STATE.VISIBLE;
            }
            else {
                state = MINIMAP_STATE.NO_ENERGY;
            }
        }
        switch (state) {
            case MINIMAP_STATE.HIDDEN:
                this.layer.alpha = 0;
                this.unitAndBuildingGraphics.alpha = 0;
                this.fogGraphics.alpha = 0;
                this.rectGraphics.alpha = 0;
                this.snow.alpha = 0;
                break;
            case MINIMAP_STATE.VISIBLE:
                this.layer.alpha = 1;
                this.unitAndBuildingGraphics.alpha = 1;
                this.fogGraphics.alpha = 1;
                this.rectGraphics.alpha = 1;
                this.snow.alpha = 0;
                break;
            case MINIMAP_STATE.NO_ENERGY: {
                this.layer.alpha = 0;
                this.unitAndBuildingGraphics.alpha = 0;
                this.fogGraphics.alpha = 0;
                this.rectGraphics.alpha = 0;
                this.snow.alpha = 1;
                break;
            }
        }
    }
    hasCommunicationCenter() {
        return this.worldKnowledge.getPlayerArmies(this.player, 'CommunicationCenter').length > 0;
    }
    hasPower() {
        return this.worldKnowledge.getPlayerNeededPower(this.player) <=
            this.worldKnowledge.getPlayerProvidedPower(this.player);
    }
}
exports.Minimap = Minimap;
//# sourceMappingURL=Minimap.js.map