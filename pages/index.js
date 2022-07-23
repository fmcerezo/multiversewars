import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Enemy from '../classes/Enemy';
import Game from '../classes/Game';
import Hero from '../classes/Hero';
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
        this.state = {game: new Game({
            maxEnemies: 4,
            enemies: props.data.enemies
        })};
    }

    render() {
        return  <div className="container" style={{height: '100vh'}}>
                <div className="row h-75">
                    <div className="col-12">Scene {this.state.game.state.totalEnemies} - {this.state.game.props.maxEnemies}</div>
                </div>
                <div className="row h-25">
                    <div className="col-4"><HeroPanel /></div>
                    <div className="col-8"><EnemiesScene /></div>
                </div>
            </div>
    }
}

export async function getServerSideProps() {
    // Fetch data from external API
    /*const res = await fetch(`https://.../data`)
    const data = await res.json()*/
    const data = {
        enemies: [
            { name: "vampire", points: 8},
            { name: "demon", points: 15},
        ]    
    };
  
    // Pass data to the page via props
    return { props: { data } }
  }
  
export default Scene;
