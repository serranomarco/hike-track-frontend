import React from 'react';
import { withScriptjs, withGoogleMap } from 'react-google-maps';

import Map from './Map';

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap;
