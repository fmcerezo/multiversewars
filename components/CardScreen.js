import { Button } from 'react-bootstrap';
import CardController from '../controllers/CardController';

export default function CardScreen(props) {
    const load = async () => {
        const gameCode = document.getElementById("gameCode").value;
        const savedGame = await CardController.load(gameCode);

        if (false !== savedGame && undefined !== savedGame.state) {
            props.restoreGame(savedGame);
        } else {
            alert('Error loading');
        }
        props.closeCardScreen();
    };

    const save = async () => {
        const gameCode = await CardController.save(props.state, props.controllerState);
        props.closeCardScreen();
    }

    if (props.state.showCardScreen) {
        return  <div className="h-100 col-6 offset-3 rounded position-absolute d-flex justify-content-center align-items-center" style={{
            backgroundColor: 'lightgrey',
            border: '10px solid black',
            zIndex: '1010'
        }}>
            <div className="text-center">
                <div className="row">
                    <Button
                        as="input"
                        onClick={save}
                        type="button"
                        value="Save game"
                        variant="primary"
                    />
                </div>
                <div className="row mt-5">
                    <label htmlFor="gameCode">Type your game code:</label>
                    <input 
                        className="form-control text-center"
                        defaultValue={CardController.getCookieGameCode()}
                        id="gameCode"
                        type="text"
                    />
                </div>
                <div className="row">
                    <Button
                        as="input"
                        className="mt-2"
                        onClick={load}
                        type="button"
                        value="Load game"
                        variant="primary"
                    />
                </div>
                <div className="row">
                    <Button
                        as="input"
                        className="mt-5"
                        onClick={props.closeCardScreen}
                        type="button"
                        value="Exit"
                        variant="primary"
                    />
                </div>
            </div>
        </div>
    }
}