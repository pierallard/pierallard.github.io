import {Player} from "./player/Player";
import {WorldKnowledge} from "./map/WorldKnowledge";
import {GROUND_HEIGHT, GROUND_WIDTH} from "./map/GeneratedGround";
import {Distance} from "./computing/Distance";
import {FogSprite} from "./sprite/FogSprite";
import {UnitProperties} from "./unit/UnitProperties";
import {BuildingProperties} from "./building/BuildingProperties";
import {Unit} from "./unit/Unit";

const REFRESH_TIME = 0.25 * Phaser.Timer.SECOND;
const SIGHT_RATIO = 2;

export class Fog {
    private worldKnowledge: WorldKnowledge;
    private player: Player;
    private knownCells: boolean[][];
    private sprite: FogSprite;
    private timeEvents: Phaser.Timer;
    private hasRenderedRecently: boolean = false;

    constructor(worldKnowledge: WorldKnowledge, player: Player) {
        this.worldKnowledge = worldKnowledge;
        this.player = player;
        this.sprite = null;
        this.knownCells = [];

        for (let y = 0; y < GROUND_HEIGHT; y++) {
            this.knownCells[y] = [];
            for (let x = 0; x < GROUND_WIDTH; x++) {
                this.knownCells[y][x] = false;
            }
        }
    }

    create(game: Phaser.Game, group: Phaser.Group, addSprite: boolean) {
        this.timeEvents = game.time.events;
        if (addSprite) {
            this.sprite = new FogSprite();
            this.sprite.create(game, group);

            this.updateKnownCells();
            this.sprite.initialize(this.knownCells);
        }
    }

    update() {
        if (!this.hasRenderedRecently) {
            this.updateKnownCells();

            this.hasRenderedRecently = true;
            this.timeEvents.add(REFRESH_TIME, () => {
                this.hasRenderedRecently = false;
            }, this);

            if (this.sprite) {
                this.sprite.update(this.knownCells, true);
            }
        } else {
            if (this.sprite) {
                this.sprite.update(this.knownCells, false);
            }
        }
    }

    getPlayer() {
        return this.player;
    }

    getKnownCells(): boolean[][] {
        return this.knownCells;
    }

    private updateKnownCells() {
        this.worldKnowledge.getPlayerArmies(this.player).forEach((unit) => {
            const sight = (
                (unit instanceof Unit) ?
                    UnitProperties.getSight(unit.constructor.name) :
                    BuildingProperties.getSight(unit.constructor.name)
                ) * SIGHT_RATIO;
            unit.getCellPositions().forEach((unitCell) => {
                Distance.getDisc(sight).forEach((cell) => {
                    const y = unitCell.y + cell.y;
                    if (undefined !== this.knownCells[y]) {
                        const x = unitCell.x + cell.x;
                        if (undefined !== this.knownCells[y][x]) {
                            this.knownCells[y][x] = true;
                        }
                    }
                });
            });
        });
    }
}
