import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import EnemiesScene from './EnemiesScene';
import Game from './Game';
import Hero from './Hero';
import React from 'react';

function HeroPanel() {
    return      <div className="row">
                    <Hero />
                    <HeroStatePanel />
                </div>
}

function HeroStatePanel() {
    return  <div className="col-6" style={{
                textAlign: 'center'
                }}>
                <div>48</div>
                <div>
                    <ItemInventory itemName="Hacha" />
                    <ItemInventory itemName="Coraza" />
                </div>
                <div>
                    <Button variant="primary" >Inventory</Button>
                </div>
            </div>
}

function ItemInventory(props) {
    return <div>{props.itemName}</div>
}

class Scene extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return  <div className="container" style={{height: '100vh'}}>
                <div className="row h-75">
                    <div className="col-12">Scene {this.props.seconds} seconds</div>
                </div>
                <div className="row h-25">
                    <div className="col-4"><HeroPanel /></div>
                    <div className="col-8"><EnemiesScene /></div>
                </div>
            </div>
    }
}

export default Scene;