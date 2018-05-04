"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HumanRepository_1 = require("./repositories/HumanRepository");
const Sofa_1 = require("./objects/Sofa");
const Employee_1 = require("./human_stuff/Employee");
const Desk_1 = require("./objects/Desk");
const Dispenser_1 = require("./objects/Dispenser");
const WallRepository_1 = require("./repositories/WallRepository");
const Cell_1 = require("./Cell");
const PositionTransformer_1 = require("./PositionTransformer");
const Play_1 = require("./game_state/Play");
const Depot_1 = require("./objects/Depot");
const Direction_1 = require("./Direction");
const MoodRegister_1 = require("./human_stuff/MoodRegister");
const Table_1 = require("./objects/Table");
const LevelManager_1 = require("./user_interface/LevelManager");
const HumanPropertiesFactory_1 = require("./human_stuff/HumanPropertiesFactory");
const Price_1 = require("./objects/Price");
const ObjectDescriptionRegistry_1 = require("./objects/ObjectDescriptionRegistry");
const SmoothValue_1 = require("./SmoothValue");
const UserInterface_1 = require("./user_interface/UserInterface");
const ObjectOrientation_1 = require("./objects/ObjectOrientation");
const Couch_1 = require("./objects/Couch");
const EmployeeCountRegister_1 = require("./human_stuff/EmployeeCountRegister");
exports.GRID_WIDTH = 16;
exports.GRID_HEIGHT = 16;
exports.DEBUG_WORLD = false;
class WorldKnowledge {
    constructor() {
        this.cells = [];
        this.objects = [];
        for (let y = 0; y < exports.GRID_HEIGHT; y++) {
            for (let x = 0; x < exports.GRID_WIDTH; x++) {
                this.cells.push(new Cell_1.Cell(new PIXI.Point(x, y)));
            }
        }
        this.wallRepository = new WallRepository_1.WallRepository();
        this.levelManager = new LevelManager_1.LevelManager();
        this.depot = new Depot_1.Depot();
        this.wallet = new SmoothValue_1.SmoothValue(1500);
        if (exports.DEBUG_WORLD) {
            this.wallRepository.addWall(new PIXI.Point(5, 5));
            this.wallRepository.addWall(new PIXI.Point(6, 5));
            this.objects.push(new Desk_1.Desk(new PIXI.Point(4, 5), this, ObjectOrientation_1.DIRECTION_LOOP[0]));
            this.objects.push(new Desk_1.Desk(new PIXI.Point(4, 6), this, ObjectOrientation_1.DIRECTION_LOOP[0]));
            this.objects.push(new Dispenser_1.Dispenser(new PIXI.Point(5, 4), this, ObjectOrientation_1.DIRECTION_LOOP[0]));
        }
        else {
            for (let x = 0; x < exports.GRID_WIDTH; x++) {
                this.wallRepository.addWall(new PIXI.Point(x, 0));
                this.wallRepository.addWall(new PIXI.Point(x, exports.GRID_HEIGHT - 1));
            }
            for (let y = 1; y < (exports.GRID_HEIGHT - 1); y++) {
                this.wallRepository.addWall(new PIXI.Point(0, y));
                this.wallRepository.addWall(new PIXI.Point(exports.GRID_WIDTH - 1, y));
            }
            for (let x = 1; x < 3 - 1; x++) {
                this.wallRepository.addWall(new PIXI.Point(x, exports.GRID_WIDTH / 2 + 1));
            }
            for (let x = 5; x < exports.GRID_WIDTH - 1; x++) {
                this.wallRepository.addWall(new PIXI.Point(x, exports.GRID_WIDTH / 2 + 1));
            }
            [
                new PIXI.Point(4, 3),
                new PIXI.Point(4, 4),
                new PIXI.Point(3, 4),
                new PIXI.Point(3, 3),
            ].forEach((cell) => {
                this.wallRepository.addWall(cell);
            });
        }
        this.humanRepository = new HumanRepository_1.HumanRepository(this);
        this.moodRegister = new MoodRegister_1.MoodRegister(this.humanRepository);
        this.employeeCountRegister = new EmployeeCountRegister_1.EmployeeCountRegister(this.humanRepository);
    }
    create(game, groups) {
        this.game = game;
        this.groups = groups;
        const floor = groups[Play_1.GROUP_FLOOR];
        const noname = groups[Play_1.GROUP_OBJECTS_AND_HUMANS];
        this.cells.forEach((cell) => {
            cell.create(game, floor);
        });
        this.objects.forEach((object) => {
            object.create(game, groups);
        });
        this.wallRepository.create(game, noname);
        this.humanRepository.create(game, groups, this);
        this.moodRegister.create(game);
        this.employeeCountRegister.create(game);
    }
    update() {
        this.humanRepository.update();
        if (this.levelManager.update()) {
            this.addMoneyInWallet(this.levelManager.getEarnedMoney());
        }
    }
    humanMoved(positions) {
        const walls = this.wallRepository.getWalls();
        walls.forEach((wall) => {
            let visible = true;
            positions.forEach((position) => {
                if (this.anyHumanIsAboveWall(wall)) {
                    visible = false;
                }
            });
            wall.setVisibility(visible);
        });
    }
    anyHumanIsAboveWall(wall) {
        const humans = this.humanRepository.humans;
        for (let i = 0; i < humans.length; i++) {
            if (WorldKnowledge.humanIsAboveWall(humans[i].getPosition(), wall)) {
                return true;
            }
        }
        return false;
    }
    static humanIsAboveWall(humanPosition, wall) {
        const wallPosition = wall.getPosition();
        return (humanPosition.x == wallPosition.x + 1 && humanPosition.y == wallPosition.y + 1) ||
            (humanPosition.x == wallPosition.x && humanPosition.y == wallPosition.y + 1) ||
            (humanPosition.x == wallPosition.x + 1 && humanPosition.y == wallPosition.y);
    }
    getMoneyInWallet() {
        return new Price_1.Price(this.wallet.getValue());
    }
    resetAStar(position) {
        this.humanRepository.humans.forEach((human) => {
            human.resetAStar(position);
        });
    }
    resetStates(positions) {
        this.humanRepository.humans.forEach((human) => {
            positions.forEach((position) => {
                human.resetStateIfCellEmpty(position);
            });
        });
    }
    getAnotherFreeHuman(human) {
        const freeHuman = this.getAnotherFreeHumans(human, 1);
        if (freeHuman.length == 0) {
            return null;
        }
        return freeHuman[0];
    }
    getAnotherFreeHumans(human, max) {
        let availableHumans = this.humanRepository.humans.filter((anotherHuman) => {
            return anotherHuman !== human && anotherHuman.isFree();
        });
        if (availableHumans.length === 0) {
            return [];
        }
        availableHumans = availableHumans.sort(() => {
            return Math.random() - 0.5;
        });
        let result = [];
        for (let i = 0; i < max; i++) {
            if (availableHumans[i] !== undefined) {
                result.push(availableHumans[i]);
            }
        }
        return result;
    }
    getRandomCell() {
        const acceptableIndexes = this.getAcceptables();
        const random = Math.floor(Math.random() * acceptableIndexes.length);
        return this.cells[acceptableIndexes[random]].getPosition();
    }
    getAcceptables() {
        let acceptables = [];
        for (let i = 0; i < this.cells.length; i++) {
            if (this.isFree(this.cells[i].getPosition())) {
                acceptables.push(i);
            }
        }
        return acceptables;
    }
    getMeetingCells(cells) {
        const acceptableIndexes = this.getAcceptables();
        let result = null;
        let dist = null;
        for (let i = 0; i < acceptableIndexes.length; i++) {
            const position1 = this.cells[acceptableIndexes[i]].getPosition();
            for (let j = i + 1; j < acceptableIndexes.length; j++) {
                const position2 = this.cells[acceptableIndexes[j]].getPosition();
                if (PositionTransformer_1.PositionTransformer.isNeighbor(position1, position2)) {
                    const newDist = WorldKnowledge.getDist(cells, position1);
                    if (result === null || newDist < dist) {
                        dist = newDist;
                        result = [position1, position2];
                    }
                }
            }
        }
        return result;
    }
    getGrid() {
        let grid = [];
        for (let i = 0; i < this.cells.length; i++) {
            if (undefined === grid[this.cells[i].getPosition().y]) {
                grid[this.cells[i].getPosition().y] = [];
            }
            grid[this.cells[i].getPosition().y][this.cells[i].getPosition().x] = {
                index: i
            };
        }
        return grid;
    }
    isFree(point, object = null) {
        if (point.x < 0 || point.y < 0 || point.x >= exports.GRID_WIDTH || point.y >= exports.GRID_HEIGHT) {
            return false;
        }
        for (let j = 0; j < this.objects.length; j++) {
            for (let k = 0; k < this.objects[j].getPositions().length; k++) {
                if (this.objects[j].getPositions()[k].x === point.x &&
                    this.objects[j].getPositions()[k].y === point.y &&
                    this.objects[j] !== object) {
                    return false;
                }
            }
        }
        if (this.wallRepository.hasWall(point.x, point.y)) {
            return false;
        }
        return true;
    }
    getClosestReferer(types, referersCountPerObject = 1, position = null) {
        let freeReferers = [];
        this.objects.forEach((object) => {
            if (types.indexOf(object.constructor.name) > -1) {
                const unusedReferers = object.getUnusedReferers();
                if (unusedReferers.length >= referersCountPerObject) {
                    freeReferers = freeReferers.concat(unusedReferers);
                }
            }
        });
        if (freeReferers.length === 0) {
            return null;
        }
        if (position === null) {
            return freeReferers[Math.floor(Math.random() * freeReferers.length)];
        }
        return freeReferers.sort((referer1, referer2) => {
            return PositionTransformer_1.PositionTransformer.dist(position, PositionTransformer_1.PositionTransformer.getCentroid([referer1.getPosition()]))
                - PositionTransformer_1.PositionTransformer.dist(position, PositionTransformer_1.PositionTransformer.getCentroid([referer2.getPosition()]));
        })[0];
    }
    static getDist(sources, point) {
        let dist = 0;
        sources.forEach((source) => {
            dist += PositionTransformer_1.PositionTransformer.dist(source, point);
        });
        return dist;
    }
    moveToDepot(object) {
        this.resetStates(object.getPositions());
        const index = this.objects.indexOf(object, 0);
        if (index > -1) {
            this.objects.splice(index, 1);
        }
        else {
            throw "Impossible to delete the object!";
        }
        this.depot.add(object.constructor.name);
    }
    getDepot() {
        return this.depot;
    }
    buy(objectName, price) {
        this.depot.add(objectName);
        this.wallet.add(-price.getValue());
    }
    canPutHere(objectInfo, origin, orientation) {
        return this.areAllTheCellsFree(objectInfo, origin, orientation) &&
            this.areAllSpritesEnterable(objectInfo, origin, orientation) &&
            this.isNewObjectNotBlockingExistingOne(objectInfo, origin, orientation);
    }
    ;
    areAllTheCellsFree(objectInfo, origin, orientation) {
        for (let i = 0; i < objectInfo.getSpriteInfos(orientation).length; i++) {
            const spriteInfo = objectInfo.getSpriteInfo(orientation, i);
            const gap = spriteInfo.getCellOffset(orientation);
            if (!this.isFree(new PIXI.Point(origin.x + gap.x, origin.y + gap.y))) {
                return false;
            }
        }
        return true;
    }
    areAllSpritesEnterable(objectInfo, origin, orientation) {
        for (let i = 0; i < objectInfo.getInteractivePoints(orientation).length; i++) {
            const interactivePoint = objectInfo.getInteractivePoints(orientation)[i];
            let isEntryPossible = false;
            interactivePoint.getEntryPoints(orientation).forEach((entry) => {
                const gap = interactivePoint.getCellOffset(orientation);
                isEntryPossible = isEntryPossible || this.isEntryAccessibleForObject(origin, gap, entry);
            });
            if (isEntryPossible === false) {
                return false;
            }
        }
        return true;
    }
    isNewObjectNotBlockingExistingOne(objectInfo, origin, orientation) {
        const cellOffsets = objectInfo.getUniqueCellOffsets(orientation);
        const cellPositions = cellOffsets.map((offset) => {
            return new PIXI.Point(origin.x + offset.x, origin.y + offset.y);
        });
        for (let o = 0; o < this.objects.length; o++) {
            const object = this.objects[o];
            const objectInfo = ObjectDescriptionRegistry_1.ObjectDescriptionRegistry.getObjectDescription(object.constructor.name);
            const interactivePoints = objectInfo.getInteractivePoints(object.getOrientation());
            for (let i = 0; i < interactivePoints.length; i++) {
                const cellOffset = interactivePoints[i].getCellOffset(object.getOrientation());
                const cell = new PIXI.Point(object.getOrigin().x + cellOffset.x, object.getOrigin().y + cellOffset.y);
                const entryPoints = interactivePoints[i].getEntryPoints(object.getOrientation());
                let isEntryPossible = false;
                for (let j = 0; j < entryPoints.length; j++) {
                    const entryCell = Direction_1.Direction.getNeighbor(cell, entryPoints[j]);
                    if (this.isFree(entryCell)) {
                        let isNewObjectNotBlockingThisEntry = true;
                        cellPositions.forEach((cellPosition) => {
                            if (cellPosition.x === entryCell.x && cellPosition.y === entryCell.y) {
                                isNewObjectNotBlockingThisEntry = false;
                            }
                        });
                        isEntryPossible = isEntryPossible || isNewObjectNotBlockingThisEntry;
                    }
                }
                if (isEntryPossible === false) {
                    return false;
                }
            }
        }
        return true;
    }
    isEntryAccessibleForObject(origin, gap, entry) {
        const gappedPosition = new PIXI.Point(origin.x + gap.x, origin.y + gap.y);
        return this.isFree(Direction_1.Direction.getNeighbor(gappedPosition, entry));
    }
    add(name, position, orientation) {
        let object = null;
        switch (name) {
            case 'Desk':
                object = new Desk_1.Desk(position, this, orientation);
                break;
            case 'Sofa':
                object = new Sofa_1.Sofa(position, this, orientation);
                break;
            case 'Dispenser':
                object = new Dispenser_1.Dispenser(position, this, orientation);
                break;
            case 'Table':
                object = new Table_1.Table(position, this, orientation);
                break;
            case 'Couch':
                object = new Couch_1.Couch(position, this, orientation);
                break;
            default: throw 'Unknown object ' + name;
        }
        this.objects.push(object);
        object.create(this.game, this.groups);
        this.resetAStar(position);
    }
    addEmployee(humanProperties) {
        const employee = new Employee_1.Employee(this.getRandomCell(), humanProperties);
        employee.create(this.game, this.groups, this);
        this.humanRepository.humans.push(employee);
    }
    getLastMoods() {
        return this.moodRegister.getLastMoods();
    }
    hasObject(interactiveObject) {
        return this.objects.indexOf(interactiveObject) > -1;
    }
    getLevelProgress(type) {
        return this.levelManager.getLevelProgress(type);
    }
    addProgress(type, value, time) {
        this.levelManager.addLevelProgress(type, value, time);
        if (type === HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE) {
            this.addMoneyInWallet(new Price_1.Price(value * this.levelManager.getSoftwarePrice().getValue()), time);
        }
    }
    addMoneyInWallet(price, milliseconds = Phaser.Timer.SECOND) {
        this.wallet.add(price.getValue(), milliseconds);
    }
    setSelectedHuman(employee) {
        this.userInterface.setSelectedHuman(employee);
        this.humanRepository.humans.forEach((human) => {
            if (human !== employee) {
                human.unselect();
            }
        });
    }
    setUserInterface(userInterface) {
        this.userInterface = userInterface;
    }
    unselectHuman(switchPanel = true) {
        if (switchPanel) {
            this.userInterface.selectPanel(UserInterface_1.PANEL.INFO);
        }
        this.humanRepository.humans.forEach((human) => {
            human.unselect();
        });
    }
    getLevelValue(type) {
        return this.levelManager.getLevelValue(type);
    }
    getLevelGoal(type) {
        return this.levelManager.getGoal(type);
    }
    getLevel() {
        return this.levelManager.getLevel();
    }
    getSoftwarePrice() {
        return this.levelManager.getSoftwarePrice();
    }
    getEmployeeCount(type) {
        return this.humanRepository.getCount(type);
    }
    getLastEmployeesCount() {
        return this.employeeCountRegister.getLastCounts();
    }
}
exports.WorldKnowledge = WorldKnowledge;
//# sourceMappingURL=WorldKnowledge.js.map