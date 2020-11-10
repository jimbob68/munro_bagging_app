import React, { useEffect, useState } from 'react';
import MapComponent from './components/MapComponent.js';
import  firebase from 'firebase/app';
import db from './firebaseConfig';
import 'firebase/auth';
import './Main.css';
import UserDashboard from './components/UserDashboard.js';


const Main = ({setIsLoggedIn}) => {
	const [ munroData, setMunroData ] = useState([]);
	const [ regionNames, setRegionNames ] = useState([]);
	const [ selectedRegion, setSelectedRegion ] = useState('');
	const [ climbedMunros, setClimbedMunros ] = useState([]);

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
			retrieveClimbedMunros();
	}, []);

	const populateRegionsDropbox = () => {
        const dropdownOptions = regionNames.map((regionName, index) => <option id="dropbox" key={index} value={regionName}>{regionName}</option>);
        dropdownOptions.unshift(<option id="dropbox" value="" >Scotland</option>)
		return dropdownOptions;
	};

	const getMunrosByRegion = () => {
        const munrosByRegion = munroData.filter((munro) => munro.region === selectedRegion);
        const munroNamesByRegion = munrosByRegion.map(munro => {
            return( 
				<tr>
					<td>{munro.name}</td>
					<td>{munro.height} m</td>
					<td className="meaning">{munro.meaning}</td>
					{climbedMunros.includes(munro.smcid) ? 
						<td><button  id="conquered-button" onClick={() => handleUndo(munro)}>Conquered!</button>
							{/* <button onClick={() => handleUndo(munro)}>Undo</button> */}
						</td> :
						<td><button id="climbed-button" onClick={() => handleClimbed(munro)}>Climbed?</button></td>}
				</tr>
			)
		})
		
		
		return (
			munroNamesByRegion.length !== 0 ?
			<table>
				<thead>
					<tr>
					<th>Name:</th>
					<th>Height:</th>
					<th className="meaning">Meaning:</th>
					<th></th>
					</tr>
				</thead>
				<tbody>
				{munroNamesByRegion}
				</tbody>
			</table> : null
		)
	};
	const handleClimbed = (munro) => {
		let updatedClimbedMunros = climbedMunros.concat()
		updatedClimbedMunros.push(munro.smcid)
		setClimbedMunros(updatedClimbedMunros)
		console.log(firebase.auth().currentUser)
		const userRef = db.collection("users").doc(firebase.auth().currentUser.uid)
		return userRef.update({munros_bagged: updatedClimbedMunros})
		.catch(error => console.log(error))
	}
	const handleUndo = (munro) => {
		let updatedClimbedMunros = climbedMunros.concat()
		const index = updatedClimbedMunros.indexOf(munro.smcid)
		updatedClimbedMunros.splice(index, 1)
		setClimbedMunros(updatedClimbedMunros)
		const userRef = db.collection("users").doc(firebase.auth().currentUser.uid)
		return userRef.update({munros_bagged: updatedClimbedMunros})
		.catch(error => console.log(error))
	}

	const retrieveClimbedMunros = async () => {
		const userRef = db.collection("users").doc(firebase.auth().currentUser.uid)
		const doc = await userRef.get()
		if(!doc.exists){
			console.log("No such document!")
		}else{
			setClimbedMunros(doc.data().munros_bagged)
		}
	}

    return (
        <>
			<UserDashboard setIsLoggedIn={setIsLoggedIn} climbedMunros={climbedMunros} munroData={munroData}/>
			<label>Select A Region: </label>
			<select onChange={(event) => setSelectedRegion(event.target.value)}>{populateRegionsDropbox()}</select>

         	{ munroData.length != 0 ? <MapComponent climbedMunros={climbedMunros} munroData={munroData} selectedRegion={selectedRegion}/> : <p></p>}
			
			{getMunrosByRegion()}
        </>

         	
	)}	
	
	export default Main;