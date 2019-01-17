import React, { Component } from "react";
import $ from "jquery";
import { Typography } from "@material-ui/core";
import ActivateButton from "./activateButton";
import PopupMap from "./popupMap";

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placesScraped: []
        };
        this.setPlacesScraped = this.setPlacesScraped.bind(this);
    }

    componentDidUpdate() {
        if (this.state.placesScraped.length !== 0) {
            $("body").animate({ width: "800px", height: "400px" });
        }
    }

    setPlacesScraped(value) {
        this.setState({ placesScraped: value });
    }

    render() {
        return (
            <div>
                <Typography variant="h6" align="center">
                    See The World
                </Typography>
                <hr />
                {this.state.placesScraped.length === 0 ? (
                    <ActivateButton setPlacesScraped={this.setPlacesScraped} />
                ) : (
                    <PopupMap placesScraped={this.state.placesScraped} />
                )}
            </div>
        );
    }
}

export default Popup;
