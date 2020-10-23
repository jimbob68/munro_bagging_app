import React, { useEffect, useState } from 'react';
import MapComponent from './components/MapComponent.js';

const Main = () => {
	const [ munroData, setMunroData ] = useState([]);
	const [ regionNames, setRegionNames ] = useState([]);
	const [ selectedRegion, setSelectedRegion ] = useState('');

	useEffect(() => {
		fetch('https://munroapi.herokuapp.com/munros')
			.then((res) => res.json())
			.then((result) => {
				setMunroData(result);
				return result;
			})
			.then((result) => {
				const uniqueRegionNames = [];
				const regions = result.map((munro) => munro.region).sort();
				regions.forEach((region, index, array) => {
					if (array[index] !== array[index + 1]) {
						uniqueRegionNames.push(region);
					}
				});
				setRegionNames(uniqueRegionNames);
			});
	}, []);

	const populateRegionsDropbox = () => {
        const dropdownOptions = regionNames.map((regionName) => <option value={regionName}>{regionName}</option>);
        dropdownOptions.unshift(<option value="" disable selected>Select a Region</option>)
		return dropdownOptions;
	};

	const getMunrosByRegion = () => {
        const munrosByRegion = munroData.filter((munro) => munro.region === selectedRegion);
        const munroNamesByRegion = munrosByRegion.map(munro => {
            return( 
            <tr>
                <td>{munro.name}</td>
                <td> {munro.height} m</td>
                <td> {munro.meaning}</td>

                </tr>)
		})
		
	return <table>
		<tr>
		<th>Name:</th>
		<th>Height:</th>
		<th>Meaning:</th>
		</tr>{munroNamesByRegion}</table>
		// return munroNamesByRegion;
	};

    return (
        <>
		<select onChange={(event) => setSelectedRegion(event.target.value)}>{populateRegionsDropbox()}</select>

     	
         { munroData.length != 0 ? <MapComponent munroData={munroData} selectedRegion={selectedRegion}/> : <p></p>}
		{getMunrosByRegion()}
         </>
	)
}

export default Main;
