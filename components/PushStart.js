import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function PushStart(props) {
    if (props.show) {
        return  <div className={props.styles}>
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