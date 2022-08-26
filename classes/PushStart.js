import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function PushStart(props) {
    if (props.show) {
        return  <div className="h-100 col-6 offset-3 rounded position-absolute d-flex justify-content-center align-items-center" style={{
                    backgroundColor: 'lightgrey',
                    border: '10px solid black',
                    zIndex: '1010'
                }}>
                    <div className="text-center">
                        <p>Push button to start game</p>                    
                        <Button 
                            variant="primary"
                            onClick={props.onClick}
                        >Start
                        </Button>

                        <p className='mt-5'><Card.Link href="/records">Records</Card.Link></p>
                    </div>
                </div>
    }
}

export default PushStart;