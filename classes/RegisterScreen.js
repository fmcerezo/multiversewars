import registerSubmit from "../controllers/RegisterController";
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';

export default function RegisterScreen(props) {
    const restart = () => {
        props.onClick();
        setVarContent(formContent);
    };

    const submit = async (event) => {
        const responseStatus = await registerSubmit(event);
        setSubmitResponse(responseStatus);
    };

    const formContent = <form onSubmit={submit}>
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

    const [varContent, setVarContent] = useState(formContent);
    const [submitResponse, setSubmitResponse] = useState(0);

    useEffect(() => {
        if (200 === submitResponse) {
            setVarContent(<div>Points recorded!</div>);
            setSubmitResponse(0);
        } else if (0 < submitResponse) {
            setVarContent(<div>Sorry, your points could not be registered.</div>);
            setSubmitResponse(0);
        }
    }, [submitResponse, varContent]);

    if (props.show) {
        return  <div className="h-100 col-6 offset-3 rounded position-absolute d-flex justify-content-center align-items-center" style={{
            backgroundColor: 'lightgrey',
            border: '10px solid black',
            zIndex: '1010'
        }}>
            <div className="text-center">
                {varContent}
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