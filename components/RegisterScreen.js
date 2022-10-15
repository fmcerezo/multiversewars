import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import RegisterController from "../controllers/RegisterController";
import RegisterScreenForm from './RegisterScreenForm';

export default function RegisterScreen(props) {
    const [submitResponse, setSubmitResponse] = useState(0);
    
    const restart = () => {
        props.onClick();
        setSubmitResponse(0);
    };

    const submit = async (event) => {
        const responseStatus = await RegisterController.save(event);
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
        return  <div className={props.styles}>
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