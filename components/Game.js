import CardScreen from './CardScreen';
import imgHero from '../pages/img/hero.jpg';
import GameController from '../controllers/GameController';
import PushStart from './PushStart';
import Scene from './Scene';
import React from 'react';
import RegisterScreen from './RegisterScreen';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = GameController.getInitialGameParams();
        
        this.handleClick = this.handleClick.bind(this);
        this.handleCardClick = this.handleCardClick.bind(this);
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

    handleCardClick(open) {
        this.setState({ showCardScreen: open });
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
        this.setState(this.gameController.move(e.keyCode, true));
    }

    handleKeyUp(e) {
        this.setState(this.gameController.move(e.keyCode, false));
    }

    handleStartClick() {
        this.keyDownBind = this.handleKeyDown.bind(this);
        document.addEventListener('keydown', this.keyDownBind);
        
        this.keyUpBind = this.handleKeyUp.bind(this);
        document.addEventListener('keyup', this.keyUpBind);

        this.setState(
            this.gameController.getGameParams(),
            () => {
                this.gameController.reset();

                let enemies;
                do {
                    enemies = [];
                    enemies = this.gameController.calculateEnemies(enemies);
                } while (!this.gameController.validateEnemies(enemies));
                
                this.setState({
                    enemies: enemies,
                });
        
                var me = this;
                this.interval = setInterval(function () {
                    me.refresh();
                }, 200);
            }
        );
    }

    refresh() {
        const gifts = this.gameController.getGifts();
        if (0 < gifts.length) {
            this.setState({ gifts: gifts });
        }
        this.setState({ enemies: this.gameController.updateEnemiesPosition() });
        const collectedGift = this.gameController.collisionGift();
        if (collectedGift != false && collectedGift.collected) {
            this.setState(collectedGift.data);
        }
        
        if (this.gameController.collision() !== false) {
            this.componentWillUnmount();
        } else {
            let newState = { seconds: this.state.seconds + 1 };

            const totalNewEnemies = this.gameController.calculateTotalNewEnemies();

            if (0 < totalNewEnemies) {
                newState = { 
                    enemies: this.gameController.calculateEnemies(this.state.enemies),
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
                        heroImg={imgHero}
                        points={this.state.points} 
                        seconds={this.state.seconds} 
                        enemies={this.state.enemies}
                        gifts={this.state.gifts}
                        clicks={this.state.clicks}
                        onClick={this.state.backColor == 'transparent' ? this.handleClick : null}
                        openCardScreen={() => this.handleCardClick(true)}
                        x={this.state.x}
                        y={this.state.y}
                        startScreen={<PushStart
                            show={this.state.showStartScreen}
                            onClick={this.handleStartClick}
                        />}
                        registerScreen={<RegisterScreen
                            onClick={this.handleStartClick}
                            points={this.state.points}
                            show={this.state.showRegisterScreen}
                        />}
                        cardScreen={<CardScreen
                            closeCardScreen={() => this.handleCardClick(false)}
                            controllerState={this.gameController 
                                ? this.gameController.getState()
                                : null}
                            restoreGame={(savedGame) => this.restore(savedGame)}
                            state={this.state}
                        />}
                    />
    }

    restore(savedGame) {
        this.setState(this.gameController.restore(savedGame));
    }
}

export default Game;