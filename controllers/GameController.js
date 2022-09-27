import CollissionHelper from '../helpers/CollisionHelper';
import EnemiesValidatorHelper from '../helpers/EnemiesValidatorHelper';
import GameParamsHelper from '../helpers/GameParamsHelper';
import GiftController from './GiftController';
import PositionHelper from '../helpers/PositionHelper';
import React from 'react';
import UpdateEnemiesPositionController from './UpdateEnemiesPositionController';

class GameController {
    static getInitialGameParams() {
        return GameParamsHelper.getInitialGameParams();
    }

    constructor(game) {
        this.game = game;
        this.reset();
        this.charactersImg = [];
        this.game.props.characters.forEach((item => {
            this.charactersImg.push(require('../pages/img/' + item.name.toLowerCase().replace(" ", "-") + '.jpg'));
        }));
    }

    calculateEnemies(enemies) {
        const totalEnemiesToAdd = this.calculateTotalNewEnemies();

        if (0 < totalEnemiesToAdd) {
            this.increaseDifficult();

            const heightDistance = this.game.refScene.current.state.refPlayer.current.state.height * 2;
            const widthDistance = this.game.refScene.current.state.refPlayer.current.state.width * 2;

            const hero = PositionHelper.get(this.game.state, this.game.refScene.current.state.refPlayer.current.state);
            const limits = PositionHelper.getExtended(hero, widthDistance, heightDistance);
            
            let newEnemies = [];
            for (let i = 0; i < totalEnemiesToAdd; i++) {
                const posAddedEnemyType = Math.floor(Math.random() * this.game.props.characters.length);
                
                let newEnemyLocation = PositionHelper.getRandomAroundReference(
                    limits,
                    this.game.refScene.current.state.refPlayer.current.state
                );
                while (CollissionHelper.collision(this.game.state.enemies, newEnemyLocation, true) !== false
                || CollissionHelper.collision(newEnemies, newEnemyLocation, false) !== false) {
                    newEnemyLocation = PositionHelper.getRandomAroundReference(
                        limits,
                        this.game.refScene.current.state.refPlayer.current.state
                    );
                }
                newEnemies.push(newEnemyLocation);
                enemies.push({
                    imgSrc: this.charactersImg[posAddedEnemyType],
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
                points: this.game.state.points + parseInt(selectedEnemy.points / 10) + GameParamsHelper.initialPoints
            };
        }
        
        return result;
    }

    getGameParams() {
        return GameParamsHelper.getGameParams(
            this.game.refScene.current.state.ref.current,
            this.game.refScene.current.state.refPlayer.current.state
        );
    }

    getGifts() {
        return this.giftController.get();
    }

    increaseDifficult() {
        if (GameParamsHelper.maxEnemyDistance >= this.enemyDistance 
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
            enemies[i]["x"] -= this.keys.left && this.keys.right ? 0 : this.keys.left ? -GameParamsHelper.heroDistance : this.keys.right ? GameParamsHelper.heroDistance : 0;
            enemies[i]["y"] -= this.keys.up && this.keys.down ? 0 : this.keys.up ? -GameParamsHelper.heroDistance : this.keys.down ? GameParamsHelper.heroDistance : 0;
        }

        let gifts = this.game.state.gifts;
        for (let i = 0; i < gifts.length; i++) {
            gifts[i]["x"] -= this.keys.left && this.keys.right ? 0 : this.keys.left ? -GameParamsHelper.heroDistance : this.keys.right ? GameParamsHelper.heroDistance : 0;
            gifts[i]["y"] -= this.keys.up && this.keys.down ? 0 : this.keys.up ? -GameParamsHelper.heroDistance : this.keys.down ? GameParamsHelper.heroDistance : 0;
        }

        return {
            enemies: enemies,
            gifts: gifts
        };
    }

    reset() {
        this.enemyDistance = GameParamsHelper.initialEnemyDistance;
        this.giftController = new GiftController(this.game);
        this.lastClickIncreaseDifficult = 0;
        this.maxEnemies = GameParamsHelper.initialMaxEnemies;
        this.keys = {
            up: false,
            down: false,
            left: false,
            right: false
        };
    }

    updateEnemiesPosition() {
        return UpdateEnemiesPositionController.getUpdated(
            {
                x: this.game.state.x,
                y: this.game.state.y
            },
            this.game.state.enemies,
            this.enemyDistance
        );
    }

    validateEnemies(enemies) {
        return EnemiesValidatorHelper.validate(enemies, this.game.state.points);
    }
}

export default GameController;