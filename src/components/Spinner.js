import React, { Component } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react';

class Spinner extends Component {
    render() {
       
        return (
            <div>
                <Dimmer active={this.props.isLoad}>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
                {this.props.children}
            </div>
        )
    }
}

export default Spinner;