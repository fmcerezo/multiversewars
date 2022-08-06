import { Button } from 'react-bootstrap';

function HeroPanel(props) {
    return  <div className="row">
                <div className="col-6" style={{
                    backgroundColor: props.backColor,
                    border: '10px solid black',
                    textAlign: 'center'
                    }}>
                    <img 
                        src={props.heroImg.src}
                        height={'100px'}
                    />
                </div>
                <div className="col-6" style={{
                    textAlign: 'center'
                    }}>
                    <div>{props.points}</div>
                    <div>
                        <ItemInventory itemName="Hacha" />
                        <ItemInventory itemName="Coraza" />
                    </div>
                    <div>
                        <Button variant="primary">Inventory</Button>
                    </div>
                </div>
            </div>
}

function ItemInventory(props) {
    return <div>{props.itemName}</div>
}

export default HeroPanel;