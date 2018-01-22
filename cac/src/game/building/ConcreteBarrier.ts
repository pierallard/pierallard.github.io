import {ConstructableBuilding} from "./ConstructableBuilding";
import {Cell} from "../computing/Cell";
import {GROUP, SCALE} from "../game_state/Play";
import {GROUND_SIZE} from "../map/Ground";
import {LifeRectangle} from "../sprite/LifeRectangle";
import {SelectRectangle} from "../sprite/SelectRectangle";

export class ConcreteBarrier extends ConstructableBuilding {
    private topLeftSprite: Phaser.Sprite;
    private topRightSprite: Phaser.Sprite;
    private bottomRightSprite: Phaser.Sprite;
    private bottomLeftSprite: Phaser.Sprite;
    private lifeRectangle: LifeRectangle;
    private selectedRectable: SelectRectangle;

    create(game: Phaser.Game, groups: Phaser.Group[]) {
        const positionX = Cell.cellToReal(this.cellPosition.x);
        const positionY = Cell.cellToReal(this.cellPosition.y);
        this.topLeftSprite = new Phaser.Sprite(game, positionX, positionY, 'Wall', this.getTopLeftLayer());
        this.topLeftSprite.anchor.setTo(1, 1);
        this.topRightSprite = new Phaser.Sprite(game, positionX, positionY, 'Wall', this.getTopRightLayer());
        this.topRightSprite.anchor.setTo(0, 1);
        this.bottomRightSprite = new Phaser.Sprite(game, positionX, positionY, 'Wall', this.getBottomRightLayer());
        this.bottomRightSprite.anchor.setTo(0, 0.5);
        this.bottomLeftSprite = new Phaser.Sprite(game, positionX, positionY, 'Wall', this.getBottomLeftLayer());
        this.bottomLeftSprite.anchor.setTo(1, 0.5);

        this.getSprites().forEach((sprite) => {
            sprite.scale.setTo(SCALE / 2, SCALE / 2); // Wall texture should be resized by 50%
            groups[GROUP.UNIT].add(sprite);
        });

        this.updateConcretes();

        this.selectedRectable = new SelectRectangle(game, GROUND_SIZE / SCALE, GROUND_SIZE / SCALE);
        groups[GROUP.UNIT].add(this.selectedRectable);

        this.lifeRectangle = new LifeRectangle(game, GROUND_SIZE / SCALE, GROUND_SIZE / SCALE);
        groups[GROUP.UNIT].add(this.lifeRectangle);
    }

    updateTileLayers() {
        this.topLeftSprite.loadTexture(this.topLeftSprite.key, this.getTopLeftLayer());
        this.topRightSprite.loadTexture(this.topRightSprite.key, this.getTopRightLayer());
        this.bottomRightSprite.loadTexture(this.bottomRightSprite.key, this.getBottomRightLayer());
        this.bottomLeftSprite.loadTexture(this.bottomLeftSprite.key, this.getBottomLeftLayer());
    }

    destroy(): void {
        this.getSprites().forEach((sprite) => {
            sprite.destroy(true);
        });

        this.updateConcretes();
    }

    isInside(left: number, right: number, top: number, bottom: number): boolean {
        return this.topLeftSprite.x + GROUND_SIZE / 2 > left &&
            this.topLeftSprite.x - GROUND_SIZE / 2 < right &&
            this.topLeftSprite.y + GROUND_SIZE / 2 > top &&
            this.topLeftSprite.y - GROUND_SIZE / 2 < bottom;
    }

    setSelected(value: boolean): void {
        this.selected = value;
        this.selectedRectable.setVisible(value);
        this.lifeRectangle.setVisible(value);
    }

    private getSprites(): Phaser.Sprite[] {
        return [
            this.topLeftSprite,
            this.topRightSprite,
            this.bottomRightSprite,
            this.bottomLeftSprite,
        ];
    }

    private getTopLeftLayer(): number {
        // left, top left, top
        switch ([this.getNeighbours()[3], this.getNeighbours()[0], this.getNeighbours()[1]].toString()) {
            case [true, true, true].toString():
                return 15;
            case [true, false, false].toString():
                return 2;
            case [false, false, true].toString():
                return 13;
            case [true, true, false].toString():
                return 2;
            case [false, true, true].toString():
                return 13;
            case [true, false, true].toString():
                return 41;
            default:
                return 0;
        }
    }

    private getTopRightLayer(): number {
        // right, top right, top
        switch ([this.getNeighbours()[4], this.getNeighbours()[2], this.getNeighbours()[1]].toString()) {
            case [true, true, true].toString():
                return 15;
            case [true, false, false].toString():
                return 2;
            case [false, false, true].toString():
                return 17;
            case [true, true, false].toString():
                return 2;
            case [false, true, true].toString():
                return 17;
            case [true, false, true].toString():
                return 39;
            default:
                return 4;
        }
    }

    private getBottomRightLayer(): number {
        // right, bottom right, bottom
        switch ([this.getNeighbours()[4], this.getNeighbours()[7], this.getNeighbours()[6]].toString()) {
            case [true, true, true].toString():
                return 15;
            case [true, false, false].toString():
                return 28;
            case [false, false, true].toString():
                return 17;
            case [true, true, false].toString():
                return 28;
            case [false, true, true].toString():
                return 17;
            case [true, false, true].toString():
                return 43;
            default:
                return 30;
        }
    }

    private getBottomLeftLayer(): number {
        // left, bottom left, bottom
        switch ([this.getNeighbours()[3], this.getNeighbours()[5], this.getNeighbours()[6]].toString()) {
            case [true, true, true].toString():
                return 15;
            case [true, false, false].toString():
                return 28;
            case [false, false, true].toString():
                return 13;
            case [true, true, false].toString():
                return 28;
            case [false, true, true].toString():
                return 13;
            case [true, false, true].toString():
                return 45;
            default:
                return 26;
        }
    }

    private getNeighbours(): boolean[] {
        return [
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x - 1, this.cellPosition.y - 1)),
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x, this.cellPosition.y - 1)),
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x + 1, this.cellPosition.y - 1)),
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x - 1, this.cellPosition.y)),
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x + 1, this.cellPosition.y)),
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x - 1, this.cellPosition.y + 1)),
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x, this.cellPosition.y + 1)),
            this.hasConcreteNeighbourAt(new PIXI.Point(this.cellPosition.x + 1, this.cellPosition.y + 1)),
        ];
    }

    private hasConcreteNeighbourAt(cell: PIXI.Point): boolean {
        const building = this.worldKnowledge.getGroundArmyAt(cell);

        return (
            null !== building &&
            building.constructor.name === this.constructor.name &&
            building.getPlayer() === this.getPlayer()
        );
    }

    private updateConcretes() {
        this.worldKnowledge.getPlayerArmies(this.player, this.constructor.name).forEach((building) => {
            const concreteBarrier = <ConcreteBarrier> building;
            if (concreteBarrier !== this) {
                concreteBarrier.updateTileLayers();
            }
        });
    }
}
