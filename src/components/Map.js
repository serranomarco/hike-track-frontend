import React from 'react';
import { GoogleMap } from 'react-google-maps'

const Map = () => {
    return (
        <GoogleMap defaultZoom={10} defaultCenter={{ lat: 45.516022, lng: -122.681427 }} />
    )
}

export default Map;
