import Avatar from './Avatar';
import EnemiesScene from './EnemiesScene';
import HeroPanel from './HeroPanel';
import React from 'react';

class Scene extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ref: React.createRef(),
            refPlayer: React.createRef()
        };
    }
    
    render() {
        return  <div className="container" style={{height: '100vh'}}>
                <div className="row h-75" style={{
                    border: '1px solid black',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {this.props.startScreen}
                    {this.props.registerScreen}
                    <div className="col-12" ref={this.state.ref}>
                        Scene {this.props.seconds} seconds - {this.props.clicks} Game clicks - X: {this.props.x} Y: {this.props.y}
                        {this.props.enemies.map((item, index) => <Avatar
                                                            key={index}
                                                            id={index}
                                                            name={item.name}
                                                            points={item.points}
                                                            ref={item.ref}
                                                            handleClick={this.props.onClick}
                                                            x={item.x}
                                                            y={item.y}
                                                        />)}
                        <Avatar
                            ref={this.state.refPlayer}
                            name={'Hero'}
                            points={this.props.points}
                            x={this.props.x}
                            y={this.props.y}
                        />
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