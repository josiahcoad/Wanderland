import React, { Component } from 'react';
import ActivateButton from './activateButton';
import SynopsisMap from './synopsisMap';

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placesScraped: [],
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
                {this.state.placesScraped.length !== 0 && <SynopsisMap placesScraped={this.state.placesScraped} />}
            </div>
        );
    }
}

export default Popup;
