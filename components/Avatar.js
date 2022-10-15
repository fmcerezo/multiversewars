import style from './Avatar.module.css';
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

    componentDidUpdate() {
        if (this.state.height != this.ref.current.clientHeight) {
            this.setState({
                width: this.ref.current.clientWidth,
                height: this.ref.current.clientHeight
            });
        }
    }

    render() {
        return  <div onClick={() => this.props.handleClick != null ? this.props.handleClick(this.props) : false}
                    className={`${'col-1 screenObject'} ${style.avatar}`}
                    ref={this.ref}
                    style={{
                        top: this.props.y,
                        left: this.props.x
                    }}
                >
                    <p>{this.props.points}</p>
                    <img src={this.props.imgSrc.default.src} />
                </div>;
    }
}

export default Avatar;