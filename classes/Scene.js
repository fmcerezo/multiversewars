import Avatar from './Avatar';
import EnemiesScene from './EnemiesScene';
import HeroPanel from './HeroPanel';
import React from 'react';

class Scene extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return  <div className="container" style={{height: '100vh'}}>
                <div className="row h-75">
                    <div className="col-12">
                        Scene {this.props.seconds} seconds - {this.props.clicks} Game clicks
                        {this.props.enemies.map((item, index) => <Avatar
                                                            key={index}
                                                            id={index}
                                                            name={item.name}
                                                            points={item.points}
                                                            handleClick={this.props.onClick}
                                                        />)}
                    </div>
                </div>
                <div className="row h-25">
                    <div className="col-4"><HeroPanel backColor={this.props.backColor} heroImg={this.props.heroImg} points={this.props.points} /></div>
                    <div className="col-8"><EnemiesScene enemies={this.props.enemies}/></div>
                </div>
            </div>
    }
}

export default Scene;