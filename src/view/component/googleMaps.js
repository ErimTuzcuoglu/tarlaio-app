import React from 'react';
import { connect } from 'react-redux'

class GoogleMaps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapIsReady: false,
        };
    }

    componentDidMount() {
        const script = document.createElement("script");
        const API = 'AIzaSyCmmKygTpBzHGOZEciJpAdxC9v_tWHagnE';
        script.src = "https://maps.googleapis.com/maps/api/js?key=" + API + "&callback=initMap";
        script.async = true;
        script.defer = true;
        script.addEventListener('load', () => {
            this.setState({ mapIsReady: true });
        });
        document.body.appendChild(script);
    };

    componentDidUpdate() {
        const { locations } = this.props;
        if (this.state.mapIsReady) {
            // Display the map
            this.map = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: 39.9334, lng: 32.8597 },
                zoom: 12,
                mapTypeId: 'roadmap',
                mapTypeControl: false,
                streetViewControl: false

            });
            // You also can add markers on the map below
            this.map.setZoom(1);
            if (locations) {
                for (let i = 0; i < locations.length; i++) {
                    new window.google.maps.Marker({
                        position: new window.google.maps.LatLng(locations[i][1], locations[i][2]),
                        map: this.map,
                        title: locations.name
                    })
                }

            }
        }
    }

    render() {

        return (
            <div id="map" style={{ width: '100%', height: '90%', marginTop: '3%', minHeight:300, minWidth:300 }}></div>
        )
    }
}
const mapStateToProps = state => {
    const { locations } = state
    return {
        locations
    }
}

export default connect(mapStateToProps)(GoogleMaps)
