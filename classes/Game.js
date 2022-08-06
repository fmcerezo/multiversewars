import heroImg from '../pages/img/zombi.jpg';
import Scene from './Scene';
import React from 'react';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            backColor: 'transparent',
            clicks: 0,
            enemies: [],
            maxEnemies: 3,
            points: 10,
            screen: 1,
            seconds: 0
        };
        
        this.handleClick = this.handleClick.bind(this);

        var me = this;
        this.interval = setInterval(function () {
            me.calculateEnemies();
        }, 1000);
    }

    calculateEnemies() {
        let newState = { seconds: this.state.seconds + 1 };

        const totalNewEnemies = 0 == this.state.seconds
            ? this.state.maxEnemies
            : this.state.maxEnemies - this.state.enemies.length;

        if (0 < totalNewEnemies && this.state.maxEnemies > this.state.enemies.length) {
            let newEnemies = this.state.enemies;

            for (let i = 0; i < totalNewEnemies; i++) {
                const posAddedEnemy = Math.floor(Math.random() * this.props.data.enemies.length);

                newEnemies.push({
                    name: this.props.data.enemies[posAddedEnemy]["name"],
                    points: this.props.data.enemies[posAddedEnemy]["points"] * (parseInt(this.state.clicks/2)+1) + this.state.points - 10
                });
            }
            
            const newState = { 
                enemies: newEnemies,
                seconds: this.state.seconds + 1
            };
        }

        this.setState(newState);
    }

    handleClick(selectedEnemy) {
        if (selectedEnemy.points <= this.state.points) {
            let enemies = this.state.enemies;
            enemies.splice(selectedEnemy.id, 1);

            this.setState({
                clicks: this.state.clicks + 1,
                enemies: enemies,
                points: this.state.points + parseInt(selectedEnemy.points / 2)
            });
        } else {
            this.setState({ backColor: 'red' });
            clearInterval(this.interval);
        }
    }

    render() {
        return  <Scene 
                    backColor={this.state.backColor}
                    heroImg={heroImg}
                    points={this.state.points} 
                    seconds={this.state.seconds} 
                    enemies={this.state.enemies}
                    clicks={this.state.clicks}
                    onClick={this.handleClick}
                />
    }
}

export default Game;