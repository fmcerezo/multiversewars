import heroImg from '../pages/img/zombi.jpg';
import GameController from '../controllers/GameController';
import PushStart from './PushStart';
import Scene from './Scene';
import React from 'react';
import RegisterScreen from './RegisterScreen';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            backColor: 'transparent',
            clicks: 0,
            enemies: [],
            maxEnemies: 3,
            points: GameController.getInitialPoints(),
            showRegisterScreen: false,
            startButtonClik: false,            
            screen: 1,
            seconds: 0,
            x: 500,
            y: 200
        };
        
        this.handleClick = this.handleClick.bind(this);
        this.handleStartClick = this.handleStartClick.bind(this);
        this.refScene = React.createRef();
    }

    componentDidMount() {
        document.title = "Multiverse wars";
        this.gameController = new GameController(this);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDownBind);
        document.removeEventListener('keyup', this.keyUpBind);
        this.setState({ 
            backColor: 'red',
            showRegisterScreen: true
        });
        clearInterval(this.interval);
    }

    handleClick(selectedEnemy) {
        const fightResult = this.gameController.fight(selectedEnemy);

        if (fightResult.win) {
            this.setState({
                clicks: this.state.clicks + 1,
                enemies: fightResult.enemies,
                points: fightResult.points
            });
        } else {
            this.componentWillUnmount();
        }
    }

    handleKeyDown(e) {
        this.setState({ enemies: this.gameController.move(e.keyCode, true) });
    }

    handleKeyUp(e) {
        this.setState({ enemies: this.gameController.move(e.keyCode, false) });
    }

    handleStartClick() {
        this.keyDownBind = this.handleKeyDown.bind(this);
        document.addEventListener('keydown', this.keyDownBind);
        
        this.keyUpBind = this.handleKeyUp.bind(this);
        document.addEventListener('keyup', this.keyUpBind);

        this.setState({
            backColor: 'transparent',
            clicks: 0,
            enemies: [],
            maxEnemies: 3,
            points: GameController.getInitialPoints(),
            showRegisterScreen: false,
            startButtonClik: true,            
            screen: 1,
            seconds: 0
        }, () => {
            let enemies;
            do {
                enemies = [];
                enemies = this.gameController.calculateEnemies(enemies, this.state.maxEnemies);
            } while (!this.gameController.readyToStart(enemies));
            
            this.setState({
                enemies: enemies,
            });
    
            var me = this;
            this.interval = setInterval(function () {
                me.refresh();
            }, 200);
        });
    }

    refresh() {
        this.setState({ enemies: this.gameController.updateEnemiesPosition() });
        
        if (this.gameController.collision()) {
            this.componentWillUnmount();
        } else {
            let newState = { seconds: this.state.seconds + 1 };

            const totalNewEnemies = this.gameController.calculateTotalNewEnemies();

            if (0 < totalNewEnemies) {
                newState = { 
                    enemies: this.gameController.calculateEnemies(this.state.enemies, totalNewEnemies),
                    seconds: this.state.seconds + 1
                };
            }

            this.setState(newState);
        }
    }

    render() {
        return      <Scene 
                        ref={this.refScene}
                        backColor={this.state.backColor}
                        heroImg={heroImg}
                        points={this.state.points} 
                        seconds={this.state.seconds} 
                        enemies={this.state.enemies}
                        clicks={this.state.clicks}
                        onClick={this.state.backColor == 'transparent' ? this.handleClick : null}
                        x={this.state.x}
                        y={this.state.y}
                        startScreen={<PushStart
                            show={!this.state.startButtonClik}
                            onClick={this.handleStartClick}
                        />}
                        registerScreen={<RegisterScreen
                            onClick={this.handleStartClick}
                            points={this.state.points}
                            show={this.state.showRegisterScreen}
                        />}
                    />
    }
}

export default Game;