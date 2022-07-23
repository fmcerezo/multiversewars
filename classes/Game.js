import React from 'react';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalEnemies: 0,
            enemies: props.enemies
        };
    }
}

export default Game;