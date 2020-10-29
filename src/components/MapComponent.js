import React, { useEffect, useState } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import ApiKey from '../ApiKey.js';
import './MapComponent.css'
import  '../../node_modules/@tomtom-international/web-sdk-maps/dist/maps.css';

const MapComponent = ({ munroData, selectedRegion, climbedMunros }) => {

    // const [ zoomLevel, setZoomLevel ] = useState(5)
    const [clicked, setClicked] = useState(null)

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
        // addMarkers(map, 0.5);
        // console.log("zoom", map.getZoom())
        // map.on("zoomend", () => zoomFunction(map))
        displayMarkersOnMap(map)

    }, [selectedRegion, climbedMunros]) 

    const displayMarkersOnMap = (map) => {
        let markersForMap = munroData
        if(selectedRegion){
            const filteredMarkers = munroData.filter(munro => munro.region === selectedRegion)
            markersForMap = filteredMarkers
            if(selectedRegion === "The Islands"){
                map.flyTo({center: [-6.15, 56.89], zoom: 7.5})
            } else {
                map.flyTo({center: [markersForMap[0].latlng_lng, markersForMap[0].latlng_lat], zoom: 8})
            }
        }
        markersForMap.forEach(munro => {
            // const handleClimbed = () => {
            //     console.log("Climbed")
            // }
            const popup = new tt.Popup({offset: 30})
                .setHTML(`<h2>${munro.name} </h2>  <p> Height: ${munro.height}m </p>`)

            if(climbedMunros.includes(munro.name)) {
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

            // const marker = new tt.Marker({scale: 0.5, color: "green"})
            //     .setLngLat([munro.latlng_lng, munro.latlng_lat])
            //     .setPopup(popup)
            //     .addTo(map)
        })

    }

    const handleClimbed = () => {
        console.log("Climbed")
    }



    // const addMarkers = (map, size) => {
    //     let marker = 0;
    //     if(marker){marker.remove()}
    //         marker = new tt.Marker({scale: size})
    //         .setLngLat([-5.003525, 56.796849])
    //         .addTo(map)

        // console.log("thing", marker.getElement())
        // const x = marker.getElement()
        // x.style.backgroundColor = "rgba(51, 170, 51)"
        // // x.style.opacity = "0"
        // x.style.height = "inherit"

    //    console.log("element", x.parentElement)
    //     const y = x.parentElement
    //     y.style.backgroundColor = "red"
     

    // const zoomFunction = (map) => {
    //     console.log("zoomedout")
    //     setZoomLevel(map.getZoom())
    //     addMarkers(map, (map.getZoom() / 10))
    // }

    const buttonTest = () => {
        console.log("TEST")
    }
    
    
    return (
        <>
            <div className="container">
                <button onClick={ () => buttonTest()}>Click Here</button>
                <div id="map"></div>
            </div>
        </>
    )
};

export default MapComponent;
