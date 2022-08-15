import React from 'react';

class Avatar extends React.Component {
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

    render() {
        return  <div onClick={() => this.props.handleClick != null ? this.props.handleClick(this.props) : false}
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
                    <p>{this.props.name}</p>
                </div>;
    }
}

export default Avatar;