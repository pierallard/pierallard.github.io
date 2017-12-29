import {SCALE} from "../game_state/Play";
import {Cell} from "../computing/Cell";
import {BuildingProperties} from "../building/BuildingProperties";
import {WorldKnowledge} from "../map/WorldKnowledge";
import {GROUND_SIZE} from "../map/Ground";
import {GAME_WIDTH} from "../../app";
import {INTERFACE_WIDTH} from "./UserInterface";
import {BuildingCreator} from "../creator/BuildingCreator";
import {Player} from "../player/Player";

export class BuildingPositioner {
    private graphics: BuildingPositionerGraphics;
    private worldKnowledge: WorldKnowledge;
    private player: Player;

    constructor(worldKnowledge: WorldKnowledge, player: Player) {
        this.worldKnowledge = worldKnowledge;
        this.player = player;
    }

    create(game: Phaser.Game) {
        this.graphics = new BuildingPositionerGraphics(game, this.worldKnowledge);
    }

    activate(buildingCreator: BuildingCreator, buildingName: string) {
        this.graphics.activate(buildingCreator, buildingName);
    }
}

class BuildingPositionerGraphics extends Phaser.Graphics {
    private buildingCreator: BuildingCreator;
    private buildingName: string = null;
    private worldKnowledge: WorldKnowledge;

    constructor(game: Phaser.Game, worldKnowledge: WorldKnowledge) {
        super(game, 0, 0);

        this.worldKnowledge = worldKnowledge;

        this.scale.set(SCALE, SCALE);
        game.add.existing(this);
    }

    activate(buildingCreator: BuildingCreator, buildingName: string) {
        this.buildingCreator = buildingCreator;
        this.buildingName = buildingName;
    }

    deactivate() {
        this.buildingName = null;
    }

    update() {
        this.clear();
        if (null !== this.buildingName) {
            if (this.isInBounds(this.game.input.mousePointer.x)) {
                let cellX = Cell.realToCell(this.game.input.mousePointer.x + this.game.camera.position.x);
                let cellY = Cell.realToCell(this.game.input.mousePointer.y + this.game.camera.position.y);

                const allowedToBuild = this.isAccessible(cellX, cellY);
                if (allowedToBuild && this.game.input.activePointer.leftButton.isDown) {
                    this.buildingCreator.runCreation(this.buildingName, new PIXI.Point(cellX, cellY));
                    this.deactivate();
                    return;
                }

                BuildingProperties.getCellPositions(this.buildingName).forEach((position) => {
                    let cellGapX = cellX + position.x;
                    let cellGapY = cellY + position.y;

                    let realCellGapX = Cell.cellToReal(cellGapX) / SCALE;
                    let realCellGapY = Cell.cellToReal(cellGapY) / SCALE;

                    this.lineStyle(1, allowedToBuild ? 0xffffff : 0xff0000, 0.8);
                    this.moveTo(realCellGapX - GROUND_SIZE / 2, realCellGapY - GROUND_SIZE / 4);
                    this.lineTo(realCellGapX - GROUND_SIZE / 4, realCellGapY - GROUND_SIZE / 2);

                    this.moveTo(realCellGapX - GROUND_SIZE / 2, realCellGapY);
                    this.lineTo(realCellGapX, realCellGapY - GROUND_SIZE / 2);

                    this.moveTo(realCellGapX - GROUND_SIZE / 2, realCellGapY + GROUND_SIZE / 4);
                    this.lineTo(realCellGapX + GROUND_SIZE / 4, realCellGapY - GROUND_SIZE / 2);

                    this.moveTo(realCellGapX - GROUND_SIZE / 2, realCellGapY + GROUND_SIZE / 2);
                    this.lineTo(realCellGapX + GROUND_SIZE / 2, realCellGapY - GROUND_SIZE / 2);

                    this.moveTo(realCellGapX - GROUND_SIZE / 4, realCellGapY + GROUND_SIZE / 2);
                    this.lineTo(realCellGapX + GROUND_SIZE / 2, realCellGapY - GROUND_SIZE / 4);

                    this.moveTo(realCellGapX, realCellGapY + GROUND_SIZE / 2);
                    this.lineTo(realCellGapX + GROUND_SIZE / 2, realCellGapY);

                    this.moveTo(realCellGapX + GROUND_SIZE / 4, realCellGapY + GROUND_SIZE / 2);
                    this.lineTo(realCellGapX + GROUND_SIZE / 2, realCellGapY + GROUND_SIZE / 4);
                });
            }
        }
    }

    private isAccessible(cellX: number, cellY: number) {
        const cellPositions = BuildingProperties.getCellPositions(this.buildingName);
        for (let i = 0; i < cellPositions.length; i++) {
            const position = cellPositions[i];
            let cell = new PIXI.Point(cellX + position.x, cellY + position.y);
            if (!this.worldKnowledge.isCellAccessible(cell)) {
                return false;
            }
        }

        return true;
    }

    private isInBounds(x: number) {
        return x < GAME_WIDTH - INTERFACE_WIDTH;
    }
}
