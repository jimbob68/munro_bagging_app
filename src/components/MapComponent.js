import React, { useEffect, useState } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import ApiKey from '../ApiKey.js';
import './MapComponent.css'
import  '../../node_modules/@tomtom-international/web-sdk-maps/dist/maps.css';

const MapComponent = ({ munroData, selectedRegion, climbedMunros }) => {
    
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
        displayMarkersOnMap(map)
    }, [selectedRegion, climbedMunros]) 

    const displayMarkersOnMap = (map) => {
        let markersForMap = munroData
        let zoomLevel = 8
        if(window.innerWidth <= 450){
            zoomLevel = 7
        }
        if(selectedRegion){
            const filteredMarkers = munroData.filter(munro => munro.region === selectedRegion)
            markersForMap = filteredMarkers
            if(selectedRegion === "The Islands"){
                map.flyTo({center: [-6.15, 56.89], zoom: 7.5})
            } else {
                map.flyTo({center: [markersForMap[0].latlng_lng, markersForMap[0].latlng_lat], zoom: zoomLevel})
            }
        }
        markersForMap.forEach(munro => {
            let popup 
            if(selectedRegion === ""){
                popup = new tt.Popup({offset: 20})
                .setHTML(`<h2 class="popup-header">${munro.name} </h2> 
                 <p class="popup-height"> <b>Height:</b> ${munro.height}m </p> <p class="popup-region"><b>Region:</b> ${munro.region}</p>`) 
            } else {
                popup = new tt.Popup({offset: 20})
                .setHTML(`<h2 class="popup-header">${munro.name} </h2> 
                 <p class="popup-height"> <b>Height:</b> ${munro.height}m </p> <p class="popup-meaning"><b>Meaning:</b> ${munro.meaning}</p> `)}
            if(climbedMunros.includes(munro.smcid)) {
                const marker = new tt.Marker({scale: 0.5, color: "green"})
                    .setLngLat([munro.latlng_lng, munro.latlng_lat])
                    .setPopup(popup)
                    .addTo(map) 
            }else{
                const marker = new tt.Marker({scale: 0.5, color: "red"})
                    .setLngLat([munro.latlng_lng, munro.latlng_lat])
                    .setPopup(popup)
                    .addTo(map)
            }
        })

    }
    
    return (
        <>
            <div className="container">
                
                <div id="map"></div>
            </div>
        </>
    )
};

export default MapComponent;
