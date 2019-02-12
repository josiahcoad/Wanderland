/**
 * The box that appears above a marker when you click it in the Google map.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { InfoWindow } from 'google-maps-react';

class InfoWindowExtention extends Component {
    constructor(props) {
        super(props);
        this.infoWindowRef = React.createRef();
        this.onInfoWindowOpen = this.onInfoWindowOpen.bind(this);
        if (!this.containerElement) {
            this.containerElement = document.createElement('div');
        }
    }

    onInfoWindowOpen() {
        ReactDOM.render(React.Children.only(this.props.children), this.containerElement);
        this.infoWindowRef.current.infowindow.setContent(this.containerElement);
    }

    render() {
        return (
            <InfoWindow onOpen={this.onInfoWindowOpen} ref={this.infoWindowRef} {...this.props} />
        );
    }
}

export default InfoWindowExtention;
