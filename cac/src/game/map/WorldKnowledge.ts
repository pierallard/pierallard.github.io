import {Player, START_POWER} from "../player/Player";
import {Building} from "../building/Building";
import {ArmyRepository} from "../repository/ArmyRepository";
import {GeneratedGround} from "./GeneratedGround";
import {MiniAppear} from "../sprite/MiniAppear";
import {TiberiumPlant} from "../sprite/TiberiumPlant";
import {BuildingProperties} from "../building/BuildingProperties";
import {UnitCreator} from "../creator/UnitCreator";
import {BuildingCreator} from "../creator/BuildingCreator";
import {ProductionStatus} from "../creator/AbstractCreator";
import {Fog} from "../Fog";
import {Army} from "../Army";
import {Appear} from "../sprite/Appear";
import {GROUP} from "../game_state/Play";

export class WorldKnowledge {
    private game: Phaser.Game;
    private ground: GeneratedGround;
    private groups: Phaser.Group[];
    private armyRepository: ArmyRepository;
    private unitCreators: UnitCreator[];
    private buildingCreators: BuildingCreator[];
    private players: Player[];
    private groundRepository: TiberiumPlant[];
    private fogs: Fog[];
    private fogGroup: Phaser.Group;

    constructor() {
        this.ground = new GeneratedGround();
        this.armyRepository = new ArmyRepository();
        this.groundRepository = [];
        this.unitCreators = [];
        this.buildingCreators = [];
        this.players = [];
        this.fogs = [];
        this.groups = [];
    }

    create(game: Phaser.Game, startPositions: PIXI.Point[], player: Player) {
        this.game = game;
        this.ground.create(this.game, startPositions);

        this.groups[GROUP.GROUND] = this.game.add.group();
        this.groups[GROUP.UNIT] = this.game.add.group();
        this.groups[GROUP.SHADOW] = this.game.add.group();
        this.groups[GROUP.EFFECTS] = this.game.add.group();
        this.groups[GROUP.AERIAL] = this.game.add.group();

        this.groups.forEach((group) => {
            group.fixedToCamera = false;
        });

        this.unitCreators.forEach((unitCreator) => {
            unitCreator.create(game);
        });
        this.buildingCreators.forEach((buildingCreator) => {
            buildingCreator.create(game);
        });

        this.fogGroup = this.game.add.group();

        this.fogs.forEach((fog) => {
            fog.create(game, this.fogGroup, fog.getPlayer() === player);
        });
    }

    update() {
        this.groups[GROUP.UNIT].sort('y');
        this.armyRepository.getItems().forEach((army) => {
            army.update();
        });
        this.fogs.forEach((fog) => {
            fog.update();
        });
    }

    isGroundCellAccessible(position: PIXI.Point) {
        return this.ground.isCellAccessible(position) && this.armyRepository.isGroundCellAccessible(position);
    }

    isAerialCellAccessible(position: PIXI.Point) {
        return this.armyRepository.isAerialCellAccessible(position);
    }

    getGroundWidth() {
        return this.ground.getGroundWidth();
    }

    getGroundHeight() {
        return this.ground.getGroundHeight();
    }

    addArmy(army: Army, appear: boolean = false, appearSize: number = 1) {
        this.armyRepository.add(army);
        army.create(this.game, this.groups);
        if (appear) {
            army.setVisible(false);
            let appearSprite = appearSize === 1 ?
                new MiniAppear(army.getCellPositions()[0]) :
                new Appear(army.getCellPositions()[0]);
            appearSprite.create(this.game, this.groups[GROUP.UNIT]);
            this.game.time.events.add(Phaser.Timer.SECOND * (appearSize === 1 ? 2 : 1.2), () => {
                army.setVisible(true);
            }, this);
        }
    }

    removeArmy(army: Army, delay: number = 0) {
        if (delay === 0) {
            this.armyRepository.removeArmy(army);
        } else {
            this.game.time.events.add(delay, () => {
                this.armyRepository.removeArmy(army);
            });
        }
    }

    getArmyAt(cell: PIXI.Point) {
        const aerial = this.armyRepository.aerialItemAt(cell);

        return aerial ? aerial : this.armyRepository.groundItemAt(cell);
    }

    getGroundArmyAt(cell: PIXI.Point) {
        return this.armyRepository.groundItemAt(cell);
    }

    getGroundAt(cell: PIXI.Point): TiberiumPlant {
        for (let i = 0; i < this.groundRepository.length; i++) {
            if (this.groundRepository[i].getCellPositions()[0].x === cell.x &&
                this.groundRepository[i].getCellPositions()[0].y === cell.y) {
                return this.groundRepository[i];
            }
        }

        return null;
    }

    getArmies(): Army[] {
        return this.armyRepository.getItems();
    }

    getSelectedArmies(): Army[] {
        return this.armyRepository.getSelectedArmies();
    }

    getPlayerArmies(player: Player, type: string = null): Army[] {
        return this.armyRepository.getItems(type).filter((army) => {
            return army.getPlayer() === player;
        });
    }

    getEnemyArmies(player: Player, type: string = null): Army[] {
        return this.armyRepository.getItems(type).filter((army) => {
            return army.getPlayer() !== null && army.getPlayer() !== player;
        });
    }

    getCreatorOf(buildingName: string, player: Player): Building {
        const creators = this.armyRepository.getCreatorOf(buildingName).filter((building) => {
            return building.getPlayer() === player;
        });
        return creators.length > 0 ? creators[0] : null;
    }

    getGroundCSV() {
        return this.ground.getCSV();
    }

    addGroundElement(newPlant: TiberiumPlant) {
        this.groups[GROUP.GROUND].add(newPlant);
        this.groundRepository.push(newPlant);
    }

    getGrounds(): TiberiumPlant[] {
        return this.groundRepository;
    }

    getPlayerNeededPower(player: Player): number {
        return -this.getPlayerArmies(player).reduce((power, building) => {
            return power + Math.min(0, BuildingProperties.getPower(building.constructor.name));
        }, 0);
    }

    getPlayerProvidedPower(player: Player): number {
        return START_POWER + this.getPlayerArmies(player).reduce((power, building) => {
            return power + Math.max(0, BuildingProperties.getPower(building.constructor.name));
        }, 0);
    }

    addPlayer(player: Player) {
        this.players.push(player);
        this.unitCreators.push(player.getUnitCreator());
        this.buildingCreators.push(player.getBuildingCreator());
        this.fogs.push(new Fog(this, player));
    }

    getPlayers(): Player[] {
        return this.players;
    }

    productUnit(player: Player, unitName: string) {
        this.getPlayerUnitCreator(player).orderProduction(unitName);
    }

    productBuilding(player: Player, unitName: string) {
        this.getPlayerBuildingCreator(player).orderProduction(unitName);
    }

    isBuildingProduced(player: Player, buildingName: string) {
        return this.getPlayerBuildingCreator(player).isProduced(buildingName);
    }

    runBuildingCreation(player: Player, buildingName: string, cell: PIXI.Point) {
        this.getPlayerBuildingCreator(player).runCreation(buildingName, cell);
    }

    getPlayerAllowedBuildings(player: Player): string[] {
        return this.getPlayerBuildingCreator(player).getAllowedBuildings();
    }

    getPlayerAllowedUnits(player: Player) {
        return this.getPlayerUnitCreator(player).getAllowedUnits();
    }

    getBuildingProductionStatus(player: Player): ProductionStatus {
        return this.getPlayerBuildingCreator(player).getProductionStatus();
    }

    canProductBuilding(player: Player, buildingName: string) {
        return this.getPlayerBuildingCreator(player).canProduct(buildingName);
    }

    getUnitProductionStatus(player: Player) {
        return this.getPlayerUnitCreator(player).getProductionStatus();
    }

    canProductUnit(player: Player, unitName: string) {
        return this.getPlayerUnitCreator(player).canProduct(unitName);
    }

    holdBuilding(player: Player, itemName: string) {
        return this.getPlayerBuildingCreator(player).hold(itemName);
    }

    holdUnit(player: Player, itemName: string) {
        return this.getPlayerUnitCreator(player).hold(itemName);
    }

    isBuildingProducing(player: Player, itemName: string) {
        return this.getPlayerBuildingCreator(player).isProducing(itemName);
    }

    isBuildingHold(player: Player, itemName: string) {
        return this.getPlayerBuildingCreator(player).isHold(itemName);
    }

    isUnitHold(player: Player, itemName: string) {
        return this.getPlayerUnitCreator(player).isHold(itemName);
    }

    isUnitProducing(player: Player, itemName: string) {
        return this.getPlayerUnitCreator(player).isProducing(itemName);
    }

    cancelBuilding(player: Player, itemName: string) {
        return this.getPlayerBuildingCreator(player).cancel(itemName);
    }

    cancelUnit(player: Player, itemName: string) {
        return this.getPlayerUnitCreator(player).cancel(itemName);
    }

    getFogKnownCells(player: Player): boolean[][] {
        return this.fogs.filter((fog) => {
            return fog.getPlayer() === player;
        })[0].getKnownCells();
    }

    private getPlayerUnitCreator(player: Player): UnitCreator {
        return this.unitCreators.filter((unitCreator) => {
            return unitCreator.getPlayer() === player;
        })[0];
    }

    private getPlayerBuildingCreator(player: Player): BuildingCreator {
        return this.buildingCreators.filter((buildingCreator) => {
            return buildingCreator.getPlayer() === player;
        })[0];
    }
}
