import React, { Component } from 'react';
import {
    Map, GoogleApiWrapper, Marker,
} from 'google-maps-react';
import uuid from 'uuid';
import InfoWindowExtention from './infoWindowExtention';
import { removeWhere } from '../../utils';

const mapStyles = {
    width: '100%',
    height: '400px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    borderRadius: '3px',
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
            showingInfoWindow: false, // Hides or shows the infoWindow
            activeMarker: {}, // Shows the active marker upon click
            map: null,
            selectedPlace: null,
        };
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.setBounds = this.setBounds.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (!arraysEqual(prevProps.placesScraped, this.props.placesScraped)) {
            this.setBounds();
        }
    }

    onMarkerClick(props, marker) {
        this.props.setSelectedPlace(this.props.placesScraped.find(x => x.name === marker.name));
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
        });
    }

    onRemove() {
        this.props.setSelectedPlace(null);
        this.props.setLastPlacesScraped(
            removeWhere(this.props.placesScraped, 'name', this.state.selectedPlace.name),
        );
        this.onClose();
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
                zoomControl={false}
                mapTypeControl={false}
                scaleControl={false}
                streetViewControl={false}
                rotateControl={false}
                fullscreenControl={false}
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
                <InfoWindowExtention
                    marker={this.state.activeMarker}
                    visible={this.state.selectedPlace !== null && this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <>
                        <button
                            type="button"
                            className="icon-button remove-button"
                            onClick={this.onRemove}
                        >
                            <span className="glyphicon glyphicon-remove-circle" />
                        </button>
                        <h4 style={{ display: 'inline-block' }}>
                            {this.state.selectedPlace === null ? '' : this.state.selectedPlace.name}
                        </h4>
                    </>
                </InfoWindowExtention>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyANvkYDq_yLEJVS0t_auv5afE8iHCuKnt8',
})(PopupMap);
