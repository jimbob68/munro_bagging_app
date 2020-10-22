import React, { useEffect, useState } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import ApiKey from '../ApiKey.js';
import './MapComponent.css'
import  '../../node_modules/@tomtom-international/web-sdk-maps/dist/maps.css';

const MapComponent = () => {

    const [ zoomLevel, setZoomLevel ] = useState(5)

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
    addMarkers(map, 0.5);
    console.log("zoom", map.getZoom())
    map.on("zoomend", () => zoomFunction(map))
    }, []) 

    const addMarkers = (map, size) => {
        let marker = 0;
        if(marker){marker.remove()}
            marker = new tt.Marker({scale: size})
            .setLngLat([-5.003525, 56.796849])
            .addTo(map)

        console.log("thing", marker.getElement())
        const x = marker.getElement()
        x.style.backgroundColor = "rgba(51, 170, 51)"
        // x.style.opacity = "0"
        x.style.height = "inherit"

        console.log("element", x.parentElement)
        const y = x.parentElement
        y.style.backgroundColor = "red"
    }

    const zoomFunction = (map) => {
        console.log("zoomedout")
        setZoomLevel(map.getZoom())
        addMarkers(map, (map.getZoom() / 10))
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
