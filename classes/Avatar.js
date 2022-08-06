import React from 'react';

class Avatar extends React.Component {
    constructor(props) {
        super(props);

        //this.state = {points: 10};
    }

    render() {
        return  <div onClick={() => this.props.handleClick(this.props)}
                    className="col-1"
                    style={{
                        border: '2px solid black',
                        textAlign: 'center'
                        }}
                >
                    <p>{this.props.points}</p>
                    <p>{this.props.name}</p>
                </div>;
    }
}

export default Avatar;