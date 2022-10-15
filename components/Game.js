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
        this.pause(true);
        this.setState({ 
            backColor: 'red',
            showRegisterScreen: true
        });
    }

    handleCardClick(open) {
        //Continues game if it was started.
        if (open || 0 < this.state.seconds && !this.state.showRegisterScreen) {
            this.pause(open);
        }
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

                this.pause(false);
            }
        );
    }

    pause(start) {
        if (start) {
            document.removeEventListener('keydown', this.keyDownBind);
            document.removeEventListener('keyup', this.keyUpBind);

            clearInterval(this.interval);
        } else {
            this.keyDownBind = this.handleKeyDown.bind(this);
            document.addEventListener('keydown', this.keyDownBind);
            
            this.keyUpBind = this.handleKeyUp.bind(this);
            document.addEventListener('keyup', this.keyUpBind);

            var me = this;
            this.interval = setInterval(function () {
                me.refresh();
            }, 200);
        }
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
        const styles = "h-100 col-6 offset-3 rounded position-absolute d-flex justify-content-center align-items-center screen";

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
                            onClick={this.handleStartClick}
                            show={this.state.showStartScreen}
                            styles={styles}
                        />}
                        registerScreen={<RegisterScreen
                            onClick={this.handleStartClick}
                            points={this.state.points}
                            show={this.state.showRegisterScreen}
                            styles={styles}
                        />}
                        cardScreen={<CardScreen
                            closeCardScreen={() => this.handleCardClick(false)}
                            controllerState={this.gameController 
                                ? this.gameController.getState()
                                : null}
                            restoreGame={(savedGame) => this.restore(savedGame)}
                            state={this.state}
                            styles={styles}
                        />}
                    />
    }

    restore(savedGame) {
        const state = this.gameController.restore(savedGame);
        state.showCardScreen = false;
        this.setState(state);
        this.pause(false);
    }
}

export default Game;