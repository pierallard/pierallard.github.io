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
const MeetingTable_1 = require("./objects/MeetingTable");
const LevelManager_1 = require("./user_interface/LevelManager");
const HumanPropertiesFactory_1 = require("./human_stuff/HumanPropertiesFactory");
const Price_1 = require("./objects/Price");
const SmoothValue_1 = require("./SmoothValue");
const UserInterface_1 = require("./user_interface/UserInterface");
const Couch_1 = require("./objects/Couch");
const EmployeeCountRegister_1 = require("./human_stuff/EmployeeCountRegister");
const Console_1 = require("./objects/Console");
const Floor_1 = require("./Floor");
const Infobox_1 = require("./user_interface/Infobox");
const ObjectDescriptionRegistry_1 = require("./objects/ObjectDescriptionRegistry");
exports.GRID_WIDTH = 37;
exports.GRID_HEIGHT = 15;
exports.DEBUG_WORLD = false;
class WorldKnowledge {
    constructor() {
        this.cells = [];
        this.objects = [];
        this.floors = [];
        this.wallRepository = new WallRepository_1.WallRepository();
        this.levelManager = new LevelManager_1.LevelManager();
        this.depot = new Depot_1.Depot();
        this.wallet = new SmoothValue_1.SmoothValue(1500);
        const walls = "" +
            "  XXXWXXXXXWXXXXXXXXXXXXXWXXXXXWXXX  \n" +
            "  X      X     D       X   X      X  \n" +
            "  W      D     X       XXDXX      W  \n" +
            "  X      XXXXXXX       D   D      X  \n" +
            "  X      X     XXXDXXXXXXXXX      X  \n" +
            "  X      X     X           X      X  \n" +
            "  W      X     X           X      W  \n" +
            "  X      X     X           D      X  \n" +
            "XXXXXXDXXX     D           XXXDXXXXXX\n" +
            "X X      D     X           D        X\n" +
            "X X      X     X           X        X\n" +
            "X X      XXXWXXXXXDXXXXXWXXX        X\n" +
            "X X      D                 D        X\n" +
            "X D      X                 X        X\n" +
            "XXXWXXXWXX                 XXWXXXWXXX";
        const floors = "" +
            "  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  \n" +
            "  X,,,,,,,,,,,,,,,,,,,,,...........  \n" +
            "  X,,,,,,,,,,,,,,,,,,,,,...........  \n" +
            "  X,,,,,,,,,,,,,,,,,,,,,...........  \n" +
            "  X,,,,,,,.....,,,,,,,,,...........  \n" +
            "  X,,,,,,,.........................  \n" +
            "  X,,,,,,,.........................  \n" +
            "  X,,,,,,,.........................  \n" +
            "XXX,,,,,,,.........................XX\n" +
            "X....................................\n" +
            "X....................................\n" +
            "X....................................\n" +
            "X.........,,,,,,,,,,,,,,,,,,.........\n" +
            "X.........,,,,,,,,,,,,,,,,,,.........\n" +
            "X.........,,,,,,,,,,,,,,,,,,.........";
        const wallLines = walls.split("\n");
        const floorLines = floors.split("\n");
        for (let y = 0; y < exports.GRID_HEIGHT; y++) {
            let wallLine = wallLines[wallLines.length - 1 - y];
            let floorLine = floorLines[floorLines.length - 1 - y];
            if (wallLine === undefined) {
                wallLine = Array(wallLines[0].length).join(' ');
            }
            if (floorLine === undefined) {
                floorLine = Array(wallLines[0].length).join(' ');
            }
            for (let x = 0; x < exports.GRID_WIDTH; x++) {
                const wallCell = wallLine[wallLine.length - 1 - x];
                const floorCell = floorLine[floorLine.length - 1 - x];
                if (floorCell !== ' ') {
                    this.cells.push(new Cell_1.Cell(new PIXI.Point(x, y)));
                }
                if (floorCell === '.') {
                    this.floors.push(new Floor_1.Floor(new PIXI.Point(x, y), 'woodcell'));
                }
                else if (floorCell === ',') {
                    this.floors.push(new Floor_1.Floor(new PIXI.Point(x, y), 'case_floortile'));
                }
                if (wallCell === 'X') {
                    this.wallRepository.addWall(new PIXI.Point(x, y));
                }
                else if (wallCell === 'W') {
                    this.wallRepository.addWindow(new PIXI.Point(x, y));
                }
                else if (wallCell === 'D') {
                    this.wallRepository.addDoor(new PIXI.Point(x, y));
                }
            }
        }
        this.humanRepository = new HumanRepository_1.HumanRepository(this);
        this.moodRegister = new MoodRegister_1.MoodRegister(this.humanRepository);
        this.employeeCountRegister = new EmployeeCountRegister_1.EmployeeCountRegister(this.humanRepository);
    }
    create(game, groups) {
        this.game = game;
        this.groups = groups;
        const floorGroup = groups[Play_1.GROUP_FLOOR];
        const noname = groups[Play_1.GROUP_OBJECTS_AND_HUMANS];
        this.floors.forEach((floors) => {
            floors.create(game, floorGroup);
        });
        this.cells.forEach((cell) => {
            cell.create(game, floorGroup);
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
        this.wallet.update();
        this.humanRepository.update();
        if (this.levelManager.update()) {
            this.addMoneyInWallet(this.levelManager.getEarnedMoney());
            this.displayLevelInfoBox();
        }
    }
    humanMoved() {
        const walls = this.wallRepository.getWalls();
        walls.forEach((wall) => {
            wall.setVisibility(!this.anyHumanIsAboveWall(wall));
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
    resetAStar(position = null) {
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
        if (this.wallRepository.hasWall(point.x, point.y, false)) {
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
            const objectInfo = object.getDescription();
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
            case 'Meeting Table':
                object = new MeetingTable_1.MeetingTable(position, this, orientation);
                break;
            case 'Couch':
                object = new Couch_1.Couch(position, this, orientation);
                break;
            case 'Console':
                object = new Console_1.Console(position, this, orientation);
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
    // pause() {
    //     this.humanRepository.humans.forEach((human) => {
    //         human.pause();
    //     });
    // }
    //
    // resume() {
    //     this.humanRepository.humans.forEach((human) => {
    //         human.resume();
    //     });
    // }
    getSelectedHumanSprite() {
        for (let i = 0; i < this.humanRepository.humans.length; i++) {
            if (this.humanRepository.humans[i].isSelected()) {
                return this.humanRepository.humans[i].getSprite();
            }
        }
        return null;
    }
    selectFirstHuman() {
        this.humanRepository.humans[0].select();
    }
    displayLevelInfoBox() {
        let strings = [
            '- ' + this.levelManager.getGoal(HumanPropertiesFactory_1.EMPLOYEE_TYPE.DEVELOPER) + ' lines to code',
            '- ' + this.levelManager.getGoal(HumanPropertiesFactory_1.EMPLOYEE_TYPE.SALE) + ' licences to sell',
        ];
        if (this.levelManager.getGoal(HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING) > 0) {
            strings.push('- ' + this.levelManager.getGoal(HumanPropertiesFactory_1.EMPLOYEE_TYPE.MARKETING) + ' campaigns to to');
        }
        let availables = [];
        if (this.getLevel() === 2) {
            availables.push('- Sales employees');
        }
        if (this.getLevel() === 3) {
            availables.push('- Marketing employees');
        }
        ObjectDescriptionRegistry_1.ObjectDescriptionRegistry.getSalableObjects(this.getLevel()).forEach((objectDescription) => {
            if (objectDescription.getMinLevel() === this.getLevel()) {
                availables.push('- ' + objectDescription.getName());
            }
        });
        const infoBox = new Infobox_1.InfoBox('Next level!', [
            'Congratulations! You reached the level ' + this.getLevel() + '!',
            'Next goals:'
        ].concat(strings).concat([
            '',
            'Now available:'
        ]).concat(availables), 'Oh yeah!');
        infoBox.create(this.game, this.groups);
    }
}
exports.WorldKnowledge = WorldKnowledge;
//# sourceMappingURL=WorldKnowledge.js.map