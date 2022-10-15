import style from './HeroPanel.module.css';
import { Button } from 'react-bootstrap';

function HeroPanel(props) {
    return  <div className="row">
                <div className={`${'col-6'} ${style.heroPanel}`} style={{ backgroundColor: props.backColor }}>
                    <img src={props.heroImg.src} />
                </div>
                <div className="col-6 text-center">
                    <div>{props.points}</div>
                    <div>
                        <Button
                            className="mt-2"
                            as="input"
                            type="button"
                            variant="primary"
                            value="Inventory"
                        />
                    </div>
                    <div>
                        <Button
                            className="mt-2"
                            as="input"
                            onClick={props.openCardScreen}
                            type="button"
                            variant="primary"
                            value="Game"
                        />
                    </div>
                </div>
            </div>
}

function ItemInventory(props) {
    return <div>{props.itemName}</div>
}

export default HeroPanel;