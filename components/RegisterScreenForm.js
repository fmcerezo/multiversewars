import { Button } from 'react-bootstrap';

export default function RegisterScreenForm(props) {
    if (200 === props.status) {
        return  <div>Points recorded!</div>;
    } else if (0 < props.status) {
        return  <div>Sorry, your points could not be registered.</div>;
    } else {
        return  <form onSubmit={props.submit}>
                    <input id="points" type="hidden" value={props.points} />
                    <div className="mb-2">
                        <label htmlFor="name">Type your name to save your register:</label>
                        <input className="form-control" id="name" type="text" minLength="3" />
                    </div>
                    <Button 
                        as="input"
                        type="submit"
                        variant="primary"
                        value="Submit"
                    />
                </form>;
    }
}