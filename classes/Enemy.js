import React from 'react';

class Enemy extends React.Component {
    render() {
        return  <div className="row col-2" id={this.props.id}>
                    <div className="col-6">
                        <img 
                            src={''}
                            height={'100px'}
                        />
                    </div>
                    <div className="col-6">
                        <div className="col-12">
                            {this.props.points}
                        </div>
                        <div className="col-12">
                            {this.props.name}
                        </div>
                    </div>
                </div>
    }
}

export default Enemy;