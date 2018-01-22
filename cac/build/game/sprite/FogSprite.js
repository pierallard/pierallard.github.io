"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Play_1 = require("../game_state/Play");
const app_1 = require("../../app");
const UserInterface_1 = require("../interface/UserInterface");
const Cell_1 = require("../computing/Cell");
const GeneratedGround_1 = require("../map/GeneratedGround");
const SECURITY_MARGIN = 3;
class FogSprite {
    static getIndex(knownCells, x, y) {
        if (y + 1 >= knownCells.length) {
            return 12;
        }
        const topLeft = knownCells[y][x];
        const topRight = knownCells[y][x + 1];
        const bottomLeft = knownCells[y + 1][x];
        const bottomRight = knownCells[y + 1][x + 1];
        if (topLeft) {
            if (topRight) {
                if (bottomLeft) {
                    return bottomRight ? 13 : 8;
                }
                else {
                    return bottomRight ? 9 : 5;
                }
            }
            else {
                if (bottomLeft) {
                    return bottomRight ? 11 : 3;
                }
                else {
                    return bottomRight ? -2 : 4;
                }
            }
        }
        else {
            if (topRight) {
                if (bottomLeft) {
                    return bottomRight ? 10 : -3;
                }
                else {
                    return bottomRight ? 7 : 6;
                }
            }
            else {
                if (bottomLeft) {
                    return bottomRight ? 1 : 2;
                }
                else {
                    return bottomRight ? 0 : 12;
                }
            }
        }
    }
    create(game, group) {
        this.camera = game.camera;
        this.lastCameraPosition = new PIXI.Point(this.camera.position.x, this.camera.position.y);
        this.group = group;
        this.game = game;
        this.tilemap = new Phaser.Tilemap(game, null, 20, 20, GeneratedGround_1.GROUND_WIDTH, GeneratedGround_1.GROUND_HEIGHT);
        this.tilemap.addTilesetImage('Dark', 'Dark', 20, 20, 0, 0, 0);
        this.layer = this.tilemap.createLayer(0, (app_1.GAME_WIDTH - UserInterface_1.INTERFACE_WIDTH) / Play_1.SCALE, app_1.GAME_HEIGHT / Play_1.SCALE, group);
        this.layer.scale.setTo(Play_1.SCALE, Play_1.SCALE);
        this.tilemap.widthInPixels = GeneratedGround_1.GROUND_WIDTH * 20;
        this.tilemap.heightInPixels = GeneratedGround_1.GROUND_HEIGHT * 20;
        this.tilemap.format = 0;
        this.tilemap.layers[0].width = GeneratedGround_1.GROUND_WIDTH;
        this.tilemap.layers[0].height = GeneratedGround_1.GROUND_HEIGHT;
        this.tilemap.layers[0].data = [];
        for (let y = 0; y < GeneratedGround_1.GROUND_HEIGHT; y++) {
            let dataY = [];
            for (let x = 0; x < GeneratedGround_1.GROUND_WIDTH; x++) {
                dataY[x] = 0;
            }
            this.tilemap.layers[0].data[y] = dataY;
        }
        for (let y = 0; y < GeneratedGround_1.GROUND_HEIGHT; y++) {
            for (let x = 0; x < GeneratedGround_1.GROUND_WIDTH; x++) {
                this.tilemap.putTile(12, x, y, this.layer);
            }
        }
        this.layer.fixedToCamera = true;
        group.add(this.layer);
    }
    initialize(knownCells) {
        this.updateInner(knownCells, 0, 0, knownCells.length - 1, knownCells[0].length - 1);
    }
    update(knownCells, force) {
        if (force ||
            this.camera.position.x !== this.lastCameraPosition.x ||
            this.camera.position.y !== this.lastCameraPosition.y) {
            const top = Cell_1.Cell.realToCell(this.tilemap.game.camera.position.y);
            const left = Cell_1.Cell.realToCell(this.tilemap.game.camera.position.x);
            const height = Cell_1.Cell.realToCell(app_1.GAME_HEIGHT);
            const width = Cell_1.Cell.realToCell(app_1.GAME_WIDTH - UserInterface_1.INTERFACE_WIDTH);
            this.updateInner(knownCells, top, left, height, width);
            this.lastCameraPosition = new PIXI.Point(this.camera.position.x, this.camera.position.y);
        }
    }
    updateInner(knownCells, top, left, height, width) {
        for (let y = top - SECURITY_MARGIN; y < top + height + 1 + SECURITY_MARGIN; y++) {
            for (let x = left - SECURITY_MARGIN; x < left + width + 1 + SECURITY_MARGIN; x++) {
                if (undefined !== knownCells[y] && undefined !== knownCells[y][x]) {
                    const index = FogSprite.getIndex(knownCells, x, y);
                    if (index >= 0) {
                        const currentTile = this.tilemap.getTile(x, y, this.layer);
                        if (currentTile && currentTile.index !== index) {
                            this.tilemap.putTile(index, x, y, this.layer);
                        }
                    }
                }
            }
        }
    }
}
exports.FogSprite = FogSprite;
//# sourceMappingURL=FogSprite.js.map