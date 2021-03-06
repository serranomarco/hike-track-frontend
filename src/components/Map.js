import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import HikeTrackContext from '../context/HikeTrackContext';

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL;


const Map = () => {
    const { token } = useContext(HikeTrackContext);
    const [locations, setLocations] = useState([]);
    const [selected, setSelected] = useState(null);

    const getLocations = async () => {
        try {
            const res = await fetch(`${apiUrl}/locations`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.ok) {
                const data = await res.json();
                setLocations(data)
            }
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        getLocations()
        // eslint-disable-next-line
    }, [setLocations])

    return (
        <GoogleMap defaultZoom={10} defaultCenter={{ lat: 45.516022, lng: -122.681427 }} >
            {locations.map((location) => {
                return (
                    <Marker key={location.id} position={{ lat: location.latitude, lng: location.longitude }} onClick={() => {
                        setSelected(location)
                    }} >
                        {selected && selected.id === location.id && (
                            <InfoWindow
                                zIndex={-1}
                                onCloseClick={() => {
                                    setSelected(null);
                                }} position={{ lat: selected.latitude, lng: selected.longitude }}>
                                <div>
                                    <p style={{ fontWeight: '600' }}>{selected.name}</p>
                                    <p>Location: {selected.city}, {selected.state}, {selected.country}</p>
                                    <p>Description: {selected.description}</p>
                                </div>
                            </InfoWindow>
                        )}
                    </Marker>
                )
            })}
        </GoogleMap>
    )
}

export default Map;
