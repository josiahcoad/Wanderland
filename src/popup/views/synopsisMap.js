import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import uuid from "uuid";
import { Grid } from "@material-ui/core";

const mapStyles = {
    width: "95%",
    height: "95%"
};

function googleGeometryAPIGet(location) {
    return new Promise((resolve, reject) => {
        const Http = new XMLHttpRequest();
        Http.responseType = "json";

        const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyANvkYDq_yLEJVS0t_auv5afE8iHCuKnt8&input=${encodeURI(
            location
        )}&inputtype=textquery&fields=geometry`;
        Http.open("GET", url);
        Http.onloadend = () => {
            if (Http.status === 200) {
                resolve(Http.response.candidates[0].geometry.location);
            } else {
                reject(Error(Http.status));
            }
        };
        // Handle network errors
        Http.onerror = () => {
            reject(Error("Network Error"));
        };
        Http.send();
    });
}

export class SynopsisMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false, // Hides or the shows the infoWindow
            activeMarker: {}, // Shows the active marker upon click
            selectedPlace: {}, // Shows the infoWindow to the selected place upon a marker
            places: [],
            _map: null
        };
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    componentDidMount() {
        this.props.placesScraped.forEach(location =>
            googleGeometryAPIGet(location).then(response => {
                this.setState(prevState => ({
                    places: [
                        ...prevState.places,
                        {
                            name: location,
                            lat: response.lat,
                            lng: response.lng
                        }
                    ]
                }));
            })
        );
    }

    componentDidUpdate() {
        const bounds = new this.props.google.maps.LatLngBounds();
        this.state.places.forEach(place => {
            bounds.extend(
                new this.props.google.maps.LatLng(place.lat, place.lng)
            );
        });
        if (typeof this.state._map !== "undefined") {
            this.state._map.fitBounds(bounds);
        }
    }

    onMarkerClick(props, marker) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onClose() {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }

    render() {
        return (
            <Grid container justify="center">
                <Grid item xs={12}>
                    <Map
                        google={this.props.google}
                        style={mapStyles}
                        onReady={(props, map) => this.setState({ _map: map })}
                    >
                        {this.state.places.map(place => (
                            <Marker
                                onClick={this.onMarkerClick}
                                name={place.name}
                                position={
                                    new this.props.google.maps.LatLng(
                                        place.lat,
                                        place.lng
                                    )
                                }
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
                </Grid>
            </Grid>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyANvkYDq_yLEJVS0t_auv5afE8iHCuKnt8"
})(SynopsisMap);
