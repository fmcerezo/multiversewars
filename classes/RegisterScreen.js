import registerSubmit from "../controllers/RegisterController";
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';

export default function RegisterScreen(props) {
    const [submitResponse, setSubmitResponse] = useState(0);
    
    const restart = () => {
        props.onClick();
        setSubmitResponse(0);
    };

    const submit = async (event) => {
        const responseStatus = await registerSubmit(event);
        setSubmitResponse(responseStatus);
    };

    useEffect(() => {
        if (props.show) {
            const input = document.getElementById("name");
            if (null != input) {
                input.focus();
            }
        }
    }, [submitResponse, props.show]);

    if (props.show) {
        return  <div className="h-100 col-6 offset-3 rounded position-absolute d-flex justify-content-center align-items-center" style={{
            backgroundColor: 'lightgrey',
            border: '10px solid black',
            zIndex: '1010'
        }}>
            <div className="text-center">
                <RegisterScreenForm
                    status={submitResponse}
                    submit={submit}
                    points={props.points}
                />
                <Button 
                    className="mt-5"
                    as="input"
                    type="button"
                    variant="primary"
                    onClick={restart}
                    value="Play again"
                />
                <p className="mt-5"><Card.Link href="/records">Records</Card.Link></p>
            </div>
        </div>
    }
}

function RegisterScreenForm(props) {
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