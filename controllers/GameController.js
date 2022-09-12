import CollissionHelper from '../helpers/CollisionHelper';
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
            const sceneHeight = this.game.refScene.current.state.ref.current.clientHeight;
            const sceneWidth = this.game.refScene.current.state.ref.current.clientWidth;

            const limits = {
                top: this.game.state.y - heightDistance,
                bottom: this.game.state.y + this.game.refScene.current.state.refPlayer.current.state.height + heightDistance,
                left: this.game.state.x - widthDistance,
                right: this.game.state.x + this.game.refScene.current.state.refPlayer.current.state.width + widthDistance
            };
            
            let newEnemies = [];
            for (let i = 0; i < totalEnemiesToAdd; i++) {
                const posAddedEnemyType = Math.floor(Math.random() * this.game.props.characters.length);
                
                let newEnemySize = this.getRandomEnemyPos(limits, sceneWidth, sceneHeight);
                while (CollissionHelper.collision(this.game.state.enemies, newEnemySize) 
                || CollissionHelper.collisionNewEnemy(newEnemySize, newEnemies)) {
                    newEnemySize = this.getRandomEnemyPos(limits, sceneWidth, sceneHeight);
                }
                newEnemies.push(newEnemySize);
                enemies.push({
                    name: this.game.props.characters[posAddedEnemyType]["name"],
                    points: parseInt(this.game.props.characters[posAddedEnemyType]["points"] * this.game.state.points),
                    ref: React.createRef(),
                    x: newEnemySize.left,
                    y: newEnemySize.top
                });
            }
        }

        return enemies;
    }

    calculateTotalNewEnemies() {
        return this.maxEnemies - this.game.state.enemies.length;
    }

    collision() {
        const hero = {
            top: this.game.state.y,
            bottom: this.game.state.y + this.game.refScene.current.state.refPlayer.current.state.height,
            left: this.game.state.x,
            right: this.game.state.x + this.game.refScene.current.state.refPlayer.current.state.width
        };

        return CollissionHelper.collision(this.game.state.enemies, hero);
    }

    fight(selectedEnemy) {
        let result = {
            win: false,
            enemies: [],
            points: 0
        };

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

    getRandomEnemyPos(limits, sceneWidth, sceneHeight) {
        const pos = {
            x:  Math.floor(Math.random() * 2) === 1 
                ? Math.floor(Math.random() * limits.left) 
                : limits.right + Math.floor(Math.random() * (sceneWidth - limits.right)),

            y:  Math.floor(Math.random() * 2) === 1 
                ? Math.floor(Math.random() * limits.top) 
                : limits.bottom + Math.floor(Math.random() * (sceneHeight - limits.bottom))
        }

        // Using hero size as reference, we are not looking for to be exact.
        return {
            top: pos.y,
            bottom: pos.y + this.game.refScene.current.state.refPlayer.current.state.height,
            left: pos.x,
            right: pos.x + this.game.refScene.current.state.refPlayer.current.state.width
        };
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

        return enemies;
    }

    reset() {
        this.enemyDistance = initialEnemyDistance;
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

    /**
     * To use at start game. Check at least one enemy can be defeated by player.
     * @param {object} enemies
     * @returns {bool}
     */
    validateInitialEnemies(enemies) {
        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i].points <= this.game.state.points) {
                return true;
            }
        }

        return false;
    }
}

export default GameController;