import React, { Component } from 'react';
import $ from 'jquery';
import { Typography } from '@material-ui/core';
import ActivateButton from './activateButton';
import PopupMap from './popupMap';

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placesScraped: [],
        };
        this.setPlacesScraped = this.setPlacesScraped.bind(this);
    }

    componentDidMount() {
        chrome.storage.local.get(['lastPlacesScraped'], (result) => {
            if (result.lastPlacesScraped !== undefined && result.lastPlacesScraped !== null) {
                this.setState({ placesScraped: result.lastPlacesScraped });
            }
        });
    }

    componentDidUpdate() {
        if (this.state.placesScraped.length !== 0) {
            $('body').animate({ width: '800px', height: '400px' });
        }
    }

    setPlacesScraped(places) {
        this.setState({ placesScraped: places });
        chrome.storage.local.set({ lastPlacesScraped: places });
    }

    render() {
        return (
            <div>
                <Typography variant="h6" align="center">
                    See The World
                </Typography>
                <hr />
                <ActivateButton setPlacesScraped={this.setPlacesScraped} />
                {this.state.placesScraped.length !== 0
                && <PopupMap placesScraped={this.state.placesScraped} />}
            </div>
        );
    }
}

export default Popup;
