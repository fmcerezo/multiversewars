import RegisterController from "../controllers/RegisterController";
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function RegisterScreen(props) {
    if (props.show) {
        return  <div className="h-100 col-6 offset-3 rounded position-absolute d-flex justify-content-center align-items-center" style={{
            backgroundColor: 'lightgrey',
            border: '10px solid black',
            zIndex: '1010'
        }}>
            <div className="text-center">
                <form onSubmit={RegisterController}>
                    <label htmlFor="playerName">Type your name to save your register:</label>
                    <input id="name" type="text" minLength="3" />
                    <input id="points" type="hidden" value={props.points} />
                    <Button 
                        className="mt-4"
                        as="input"
                        type="submit"
                        variant="primary"
                        value="Submit"
                    />
                </form>
                <Button 
                    className="mt-5"
                    as="input"
                    type="button"
                    variant="primary"
                    onClick={props.onClick}
                    value="Play again"
                />
                <p className="mt-5"><Card.Link href="/records">Records</Card.Link></p>
            </div>
        </div>
    }
}