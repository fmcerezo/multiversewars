import Scene from './Scene';
import React from 'react';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            enemies: props.data.enemies,
            seconds: 0,
            totalEnemies: 0
        };

        var me = this;
        this.interval = setInterval(function () {
            me.tick();
        }, 1000);
    }

    tick() {
        this.setState({ seconds: this.state.seconds + 1 });
    }

    render() {
        return <Scene seconds={this.state.seconds} />
    }
}

export default Game;