import React, { useEffect } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import ApiKey from '../ApiKey.js';
import './MapComponent.css'
import  '../../node_modules/@tomtom-international/web-sdk-maps/dist/maps.css';

const MapComponent = () => {

    useEffect(() => {
        const map = tt.map({
        key: ApiKey,
        container: 'map',
        center: [-4.0000, 56.0000],
        zoom: 5,
        style: 'tomtom://vector/1/basic-main',
        dragPan: true
    });
    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());
    addMarkers(map);
    }, []) 

    const addMarkers = (map) => {
        const marker = new tt.Marker({scale: 0.5})
            .setLngLat([-5.003525, 56.796849])
            .addTo(map)
    }

    
    
    return (
        <>
            <div class="container">
                <div id="map"></div>
            </div>
    
    
        </>
    )
};

export default MapComponent;
