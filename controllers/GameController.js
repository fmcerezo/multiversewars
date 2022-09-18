import CollissionHelper from '../helpers/CollisionHelper';
import EnemiesValidatorHelper from '../helpers/EnemiesValidatorHelper';
import PositionHelper from '../helpers/PositionHelper';
import GiftController from './GiftController';
import React from 'react';

const initialEnemyDistance = 0;
const initialMaxEnemies = 3;
const initialPoints = 1;
const maxEnemyDistance = 6;
const heroDistance = 1;

class GameController {
    static getGameParams(showStartScreen) {
        return {
            backColor: 'transparent',
            clicks: 0,
            enemies: [],
            gifts: [],
            points: initialPoints,
            showRegisterScreen: false,
            showStartScreen: showStartScreen,
            screen: 1,
            seconds: 0,
            x: 500,
            y: 200
        };
    }

    constructor(game) {
        this.game = game;
        this.reset();
    }

    calculateEnemies(enemies) {
        const totalEnemiesToAdd = this.calculateTotalNewEnemies();

        if (0 < totalEnemiesToAdd) {
            this.increaseDifficult();

            const heightDistance = this.game.refScene.current.state.refPlayer.current.state.height * 3;
            const widthDistance = this.game.refScene.current.state.refPlayer.current.state.width * 3;

            const hero = PositionHelper.get(this.game.state, this.game.refScene.current.state.refPlayer.current.state);
            const limits = PositionHelper.getExtended(hero, widthDistance, heightDistance);
            
            let newEnemies = [];
            for (let i = 0; i < totalEnemiesToAdd; i++) {
                const posAddedEnemyType = Math.floor(Math.random() * this.game.props.characters.length);
                
                let newEnemyLocation = PositionHelper.getRandomAroundReference(
                    limits,
                    this.game.refScene.current.state.refPlayer.current.state,
                    this.game.refScene.current.state.ref.current
                );
                while (CollissionHelper.collision(this.game.state.enemies, newEnemyLocation, true) !== false
                || CollissionHelper.collision(newEnemies, newEnemyLocation, false) !== false) {
                    newEnemyLocation = PositionHelper.getRandomAroundReference(
                        limits,
                        this.game.refScene.current.state.refPlayer.current.state,
                        this.game.refScene.current.state.ref.current
                    );
                }
                newEnemies.push(newEnemyLocation);
                enemies.push({
                    name: this.game.props.characters[posAddedEnemyType]["name"],
                    points: parseInt(this.game.props.characters[posAddedEnemyType]["points"] * this.game.state.points),
                    ref: React.createRef(),
                    x: newEnemyLocation.left,
                    y: newEnemyLocation.top
                });
            }
        }

        return enemies;
    }

    calculateTotalNewEnemies() {
        return this.maxEnemies - this.game.state.enemies.length;
    }

    collision() {
        const hero = PositionHelper.get(this.game.state, this.game.refScene.current.state.refPlayer.current.state);
        return CollissionHelper.collision(this.game.state.enemies, hero, true);
    }

    collisionGift() {
        return this.giftController.collision();
    }

    fight(selectedEnemy) {
        let result = {
            win: false,
            enemies: [],
            points: 0
        };

        this.giftController.setLastSecondFight(this.game.state.seconds);

        if (selectedEnemy.points <= this.game.state.points) {
            let enemies = this.game.state.enemies;
            enemies.splice(selectedEnemy.id, 1);

            result = {
                win: true,
                enemies: enemies,
                points: this.game.state.points + parseInt(selectedEnemy.points / 10) + initialPoints
            };
        }
        
        return result;
    }

    getGifts() {
        return this.giftController.get();
    }

    increaseDifficult() {
        if (maxEnemyDistance >= this.enemyDistance 
            && (this.lastClickIncreaseDifficult < this.game.state.clicks || 0 === this.game.state.clicks)
            && this.game.state.clicks % 10 === 0) {
            this.lastClickIncreaseDifficult = this.game.state.clicks;
            this.enemyDistance++;
            
            if (this.enemyDistance % 2 === 0) {
                this.maxEnemies++;
            }
        }
    }

    move(keyCode, pushed) {
        switch (keyCode) {
            case 37:
                this.keys.left = pushed;
                break;

            case 39:
                this.keys.right = pushed;
                break;

            case 38:
                this.keys.up = pushed;
                break;

            case 40:
                this.keys.down = pushed;
                break;
        }

        let enemies = this.game.state.enemies;
        for (let i = 0; i < enemies.length; i++) {
            enemies[i]["x"] -= this.keys.left && this.keys.right ? 0 : this.keys.left ? -heroDistance : this.keys.right ? heroDistance : 0;
            enemies[i]["y"] -= this.keys.up && this.keys.down ? 0 : this.keys.up ? -heroDistance : this.keys.down ? heroDistance : 0;
        }

        let gifts = this.game.state.gifts;
        for (let i = 0; i < gifts.length; i++) {
            gifts[i]["x"] -= this.keys.left && this.keys.right ? 0 : this.keys.left ? -heroDistance : this.keys.right ? heroDistance : 0;
            gifts[i]["y"] -= this.keys.up && this.keys.down ? 0 : this.keys.up ? -heroDistance : this.keys.down ? heroDistance : 0;
        }

        return {
            enemies: enemies,
            gifts: gifts
        };
    }

    reset() {
        this.enemyDistance = initialEnemyDistance;
        this.giftController = new GiftController(this.game);
        this.lastClickIncreaseDifficult = 0;
        this.maxEnemies = initialMaxEnemies;
        this.keys = {
            up: false,
            down: false,
            left: false,
            right: false
        };
    }

    updateEnemiesPosition() {
        let enemies = this.game.state.enemies;
        for (let i = 0; i < enemies.length; i++) {
            enemies[i]["x"] = this.game.state.x + this.enemyDistance >= enemies[i]["x"]
                                    && this.game.state.x - this.enemyDistance <= enemies[i]["x"]
                                ? this.game.state.x
                                : this.game.state.x < enemies[i]["x"]
                                ? enemies[i]["x"] - this.enemyDistance
                                : enemies[i]["x"] + this.enemyDistance;
            enemies[i]["y"] = this.game.state.y + this.enemyDistance >= enemies[i]["y"]
                                    && this.game.state.y - this.enemyDistance <= enemies[i]["y"]
                                ? this.game.state.y
                                : this.game.state.y < enemies[i]["y"]
                                ? enemies[i]["y"] - this.enemyDistance
                                : enemies[i]["y"] + this.enemyDistance;
        }
        
        return enemies;
    }

    validateEnemies(enemies) {
        return EnemiesValidatorHelper.validate(enemies, this.game.state.points);
    }
}

export default GameController;