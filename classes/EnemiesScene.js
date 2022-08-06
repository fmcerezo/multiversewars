import Enemy from './Enemy';
import React from 'react';

class EnemiesScene extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return  <div className="row">
                    {this.props.enemies.map((item, index) => <Enemy 
                                                        key={index} 
                                                        id={index} 
                                                        name={item.name} 
                                                        points={item.points} 
                                                    />)
                    }
                </div>
    }
}

export default EnemiesScene;