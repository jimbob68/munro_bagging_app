import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import db from '../firebaseConfig';
import 'firebase/auth';
import './UserDashboard.css';

const UserDashboard = ({setIsLoggedIn, climbedMunros, munroData}) => {

    const [ highestMunroData, setHighestMunroData ] = useState({});
    const [ heightClimbed, setHeightClimbed ] = useState(0);

    useEffect(() => {
        completedMunros()
        if(munroData.length && climbedMunros.length){
            getHighestMunro()
            totalHeightClimbed()
        } else if(climbedMunros.length === 0){
            setHighestMunroData({})
        } 
    }, [climbedMunros, munroData])

    const handleLogout = () => {
        firebase.auth().signOut()
        .then(() => {
            alert("You have successfully logged out.")
            setIsLoggedIn(false)})
            .catch(error => console.log(error))
    }
    const completedMunros = () => {
        if(climbedMunros.length === 141){
            alert("Well done you've climbed half of Scotland's Munros!")
        } else if (climbedMunros.length === 282){
            alert("Congratulations you've climbed all of Scotland's Munros!")
        }
    }
    const getHighestMunro = () => {
        const munroIdsWithoutLetter = climbedMunros.map(munro => {
         const munroIdWithoutLetter = munro.substring(1)
         return parseInt(munroIdWithoutLetter)
        })
        const lowestConqueredMunroId = Math.min(...munroIdsWithoutLetter)
        const highestMunroConquered = munroData.find(munro => {
            if(lowestConqueredMunroId < 100 && lowestConqueredMunroId >= 10){
               return munro.smcid === "M0" + lowestConqueredMunroId 
            }else if(lowestConqueredMunroId < 10){
                return munro.smcid === "M00" + lowestConqueredMunroId
            }else{
                return munro.smcid === "M" + lowestConqueredMunroId 

        }

        
    })
        
            setHighestMunroData(highestMunroConquered)
       
    }

    const totalHeightClimbed = () => {
        const munrosClimbedData = climbedMunros.map(munro => {
            const individualMunroData =  munroData.filter(munroDataObject => munroDataObject.smcid === munro)
            return individualMunroData[0].height
        })
        const reducer = (accumulator, currentValue) => accumulator + currentValue
        setHeightClimbed(munrosClimbedData.reduce(reducer))
    }
    return (
        <>
        <div className="dashboard-container">
        <h3 id="dashboard-title">User Dashboard</h3>
        <div className="dashboard-detail-container">
        <p id="dashboard-detail-text"><b>Munros Conquered:</b> {climbedMunros.length} / 282</p>
        <p id="dashboard-detail-text"><b>Total Height Climbed:</b> {heightClimbed}m</p>
        { highestMunroData.name && <p id="dashboard-detail-text"><b>Highest Munro Conquered:</b> {highestMunroData.name} {highestMunroData.height}m</p>}
        </div>
        
        <button id="logout-button" onClick={() => handleLogout()}>Logout</button>
        </div>
        
    
    </>
    )};

export default UserDashboard;
