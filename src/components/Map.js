import React, { useState, useEffect } from 'react';
import { GoogleMap } from 'react-google-maps'

const Map = () => {
    const [lat, setLat] = useState(45.516022);
    const [lng, setLng] = useState(-122.681427);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)
        })
    }, [setLat, setLng])

    console.log(lat)
    console.log(lng)

    return (
        <GoogleMap defaultZoom={10} center={{ lat: lat, lng: lng }} />
    )
}

export default Map;
