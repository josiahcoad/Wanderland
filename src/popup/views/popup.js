import React, { Component } from 'react';
import ActivateButton from './activateButton';
import SynopsisMap from './synopsisMap';

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placesScraped: false,
        };
        this.setPlacesScraped = this.setPlacesScraped.bind(this);
    }

    setPlacesScraped(value) {
        this.setState({ placesScraped: value });
    }

    render() {
        return (
            <div>
                <ActivateButton setPlacesScraped={this.setPlacesScraped} />
                {this.state.placesScraped && <SynopsisMap />}
            </div>
        );
    }
}

export default Popup;
