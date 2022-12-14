import { Button } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { useEffect} from 'react';
import CardController from '../controllers/CardController';
import CookieController from '../controllers/CookieController';

export default function CardScreen(props) {
    const checkButtonsState = () => {
        try {
            const disabled = !CardController.validGameCode();
            document.getElementById("deleteGameButton").disabled = disabled;
            document.getElementById("loadGameButton").disabled = disabled;
        } catch (Exception) {}
    };

    const erase = () => {
        confirmAlert({
            title: 'Delete game',
            message: 'You selected delete game, are you sure?',
            buttons: [
              {
                label: 'Yes',
                onClick: async () => {
                    const gameCode = document.getElementById("gameCode").value;
                    await CardController.delete(gameCode);
                    document.getElementById("gameCode").value = "";
                    checkButtonsState();
                }
              },
              {
                label: 'No'
              }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true
          });
    };

    const load = async () => {
        const gameCode = document.getElementById("gameCode").value;
        const savedGame = await CardController.load(gameCode);

        if (false !== savedGame && undefined !== savedGame.state) {
            props.restoreGame(savedGame);
        } else {
            alert('Error loading');
        }
    };

    const save = async () => {
        const gameCode = await CardController.save(props.state, props.controllerState);
        props.closeCardScreen();
    }

    useEffect(checkButtonsState);

    if (props.state.showCardScreen) {
        return  <div className={props.styles}>
            <div className="text-center">
                {!props.state.showStartScreen && !props.state.showRegisterScreen
                ?
                <div className="row">
                    <Button
                        as="input"
                        onClick={save}
                        type="button"
                        value="Save game"
                        variant="primary"
                    />
                </div>
                : null}
                <div className="row mt-5">
                    <label htmlFor="gameCode">Type your game code:</label>
                    <input 
                        className="form-control text-center"
                        defaultValue={CookieController.get()}
                        id="gameCode"
                        type="text"
                        onChange={checkButtonsState}
                    />
                </div>
                <div className="row">
                    <Button
                        as="input"
                        id="loadGameButton"
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
                        id="deleteGameButton"
                        className="mt-4"
                        onClick={erase}
                        type="button"
                        value="Delete game"
                        variant="danger"
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