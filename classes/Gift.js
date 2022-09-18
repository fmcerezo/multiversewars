import React from 'react';

class Gift extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0
        };

        this.ref = React.createRef();
    }

    componentDidMount() {
        this.setState({
            width: this.ref.current.clientWidth,
            height: this.ref.current.clientHeight
        });
    }

    render () {
        if ('powerup' === this.props.type) {
            return  <div
                        className="col-1"
                        ref={this.ref}
                        style={{
                            border: '2px solid black',
                            position: 'absolute',
                            textAlign: 'center',
                            top: this.props.y,
                            left: this.props.x
                            }}
                    >
                        <p>{this.props.points}</p>
                        <p>POWER UP</p>
                    </div>;
        }
    }
}

export default Gift;