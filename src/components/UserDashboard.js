import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import db from '../firebaseConfig';
import 'firebase/auth';
import './UserDashboard.css';

const UserDashboard = ({setIsLoggedIn, climbedMunros, munroData}) => {

    useEffect(() => {
        completedMunros()
    }, [climbedMunros])

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

    return (
        <>
        <p>User Dashboard</p>
    <p>Munros Climbed: {climbedMunros.length} / 282</p>
        <button onClick={() => handleLogout()}>Logout</button>
    
    </>
    )};

export default UserDashboard;
