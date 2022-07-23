import heroImg from '../pages/img/zombi.jpg';
import React from 'react';

class Hero extends React.Component {
    constructor(props) {
        super(props);
        this.state = {points: 10};
    }

    render() {
        return <div className="col-6" style={{
            border: '10px solid black',
            textAlign: 'center'
            }}>
            <img 
                src={heroImg.src}
                height={'100px'}
            />
        </div>
    }
}

export default Hero;