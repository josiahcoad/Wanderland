import React, { Component } from 'react';
import {
    Map, GoogleApiWrapper, InfoWindow, Marker,
} from 'google-maps-react';
import uuid from 'uuid';

const mapStyles = {
    width: '95%',
    height: '95%',
};

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i += 1) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export class PopupMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false, // Hides or the shows the infoWindow
            activeMarker: {}, // Shows the active marker upon click
            selectedPlace: {}, // Shows the infoWindow to the selected place upon a marker
            map: null,
        };
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onClose = this.onClose.bind(this);
        this.setBounds = this.setBounds.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (!arraysEqual(prevProps.placesScraped, this.props.placesScraped)) {
            this.setBounds();
        }
    }

    onMarkerClick(props, marker) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
        });
    }

    onClose() {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null,
            });
        }
    }

    setBounds() {
        const bounds = new this.props.google.maps.LatLngBounds();
        this.props.placesScraped.forEach((place) => {
            bounds.extend(new this.props.google.maps.LatLng(place.lat, place.lng));
        });
        if (this.state.map !== undefined && this.state.map !== null) {
            this.state.map.fitBounds(bounds);
        }
    }

    render() {
        return (
            <Map
                google={this.props.google}
                style={mapStyles}
                onReady={(props, map) => {
                    this.setState({ map });
                    this.setBounds();
                }}
            >
                {this.props.placesScraped
                    .filter(place => place.lat !== null && place.lng !== null)
                    .map(place => (
                        <Marker
                            onClick={this.onMarkerClick}
                            name={place.name}
                            position={new this.props.google.maps.LatLng(place.lat, place.lng)}
                            key={uuid.v4()}
                        />
                    ))}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyANvkYDq_yLEJVS0t_auv5afE8iHCuKnt8',
})(PopupMap);
