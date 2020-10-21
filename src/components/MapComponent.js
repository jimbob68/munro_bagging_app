import React, { useEffect } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import ApiKey from '../ApiKey.js';
import  '../../node_modules/@tomtom-international/web-sdk-maps/dist/maps.css';

const MapComponent = () => {

    useEffect(() => {
        const map = tt.map({
        key: ApiKey,
        container: 'map',
        style: 'tomtom://vector/1/basic-main'
        // dragPan: !isMobileOrTablet()
    });
    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());
    }, []) 

    
    
    return (
        <>
            <div class="container">
            <h1>Map</h1>
            {/* {map} */}
            <div id="map" style={{width: "100%", height: "100%"}}></div>
            </div>
    
    
        </>
    )
};

export default MapComponent;
