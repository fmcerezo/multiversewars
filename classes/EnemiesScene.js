import Enemy from './Enemy';
import React from 'react';

class EnemiesScene extends React.Component {
    render() {
        return  <div className="row">
                    <Enemy />
                    <Enemy />
                    <Enemy />
                </div>
    }
}

export default EnemiesScene;