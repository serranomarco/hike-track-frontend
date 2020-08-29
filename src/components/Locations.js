import React from 'react';

import WrappedMap from './WrappedMap';
import FeedNav from './FeedNav'
import BottomNav from './BottomNav';
import LocationForm from './LocationForm';

const googleApiKey = process.env.REACT_APP_GOOGLE_KEY

const Locations = () => {
    return (
        <div>
            <FeedNav />
            <div style={{ position: 'fixed', top: '75px', bottom: '115px', right: '0px', left: '0px', display: 'flex' }}>
                <div style={{ height: '100%', width: '67%' }}>
                    <WrappedMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${googleApiKey}`}
                        loadingElement={<div style={{ height: '100%', width: '100%' }} />}
                        containerElement={<div style={{ height: '100%' }} />}
                        mapElement={<div style={{ height: '100%' }} />}
                    />
                </div>
                <div style={{
                    width: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    < LocationForm />
                </div>
            </div>
            <BottomNav />
        </div>
    )
}

export default Locations;
