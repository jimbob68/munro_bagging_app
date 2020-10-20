import React, { useEffect, useState } from 'react';

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
		return dropdownOptions;
	};

	return <select onChange={(event) => setSelectedRegion(event.target.value)}>{populateRegionsDropbox()}</select>;
};

export default Main;
