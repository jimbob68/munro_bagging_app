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
        console.log("climbedMunros", climbedMunros)
        console.log("munroData", munroData)
        const munroIdsWithoutLetter = climbedMunros.map(munro => {
         const munroIdWithoutLetter = munro.substring(1)
         return parseInt(munroIdWithoutLetter)
        })
        console.log(munroIdsWithoutLetter)
        const lowestConqueredMunroId = Math.min(...munroIdsWithoutLetter)
        console.log(lowestConqueredMunroId)
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
            console.log(individualMunroData)
            return individualMunroData[0].height
        })
        console.log(munrosClimbedData)
        const reducer = (accumulator, currentValue) => accumulator + currentValue
        setHeightClimbed(munrosClimbedData.reduce(reducer))
    }
    return (
        <>
        <p>User Dashboard</p>
    <p>Munros Conquered: {climbedMunros.length} / 282</p>
    <p>Total Height Climbed: {heightClimbed}m</p>
    { highestMunroData.name && <p>Highest Munro Conquered: {highestMunroData.name} {highestMunroData.height}m</p>}

        <button onClick={() => handleLogout()}>Logout</button>
    
    </>
    )};

export default UserDashboard;
