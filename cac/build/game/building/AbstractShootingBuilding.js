"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConstructableBuilding_1 = require("./ConstructableBuilding");
const BuildingProperties_1 = require("./BuildingProperties");
const UnitProperties_1 = require("../unit/UnitProperties");
const Distance_1 = require("../computing/Distance");
class AbstractShootingBuilding extends ConstructableBuilding_1.ConstructableBuilding {
    constructor(worldKnowledge, cell, player) {
        super(worldKnowledge, cell, player);
        this.isFrozen = false;
    }
    create(game, groups) {
        this.timerEvents = game.time.events;
    }
    update() {
        if (!this.isFrozen) {
            const shootable = this.getClosestShootable();
            if (shootable) {
                this.shoot(shootable);
            }
        }
        super.update();
    }
    shoot(enemy) {
        this.sprite.doShoot(enemy.getCellPositions()[0]);
        enemy.lostLife(BuildingProperties_1.BuildingProperties.getOption(this.constructor.name, 'shoot_power'));
        this.freeze(BuildingProperties_1.BuildingProperties.getOption(this.constructor.name, 'shoot_cooldown') *
            Phaser.Timer.SECOND *
            UnitProperties_1.SHOOT_COOLDOWN_RATIO);
    }
    freeze(time) {
        this.isFrozen = true;
        this.timerEvents.add(time, () => {
            this.isFrozen = false;
        }, this);
    }
    getClosestShootable() {
        const enemies = this.worldKnowledge.getEnemyArmies(this.player);
        let minDistance = null;
        let closest = null;
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];
            if (enemy !== this) {
                if (enemy.isOnGround() || BuildingProperties_1.BuildingProperties.getOption(this.constructor.name, 'shoot_air_power') > 0) {
                    const distance = Distance_1.Distance.to(this.cellPosition, enemy.getCellPositions());
                    if (distance <= BuildingProperties_1.BuildingProperties.getOption(this.constructor.name, 'shoot_distance')) {
                        if (null === closest || minDistance > distance) {
                            minDistance = distance;
                            closest = enemy;
                        }
                    }
                }
            }
        }
        return closest;
    }
}
exports.AbstractShootingBuilding = AbstractShootingBuilding;
//# sourceMappingURL=AbstractShootingBuilding.js.map