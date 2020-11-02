import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './Main.js';
import RegisterPage from './RegisterPage.js';
import firebase from 'firebase/app';
import db from './firebaseConfig';
import 'firebase/auth';
import logo from "./assets/munrobagger.png"

function App() {
	const [ isLoggedIn, setIsLoggedIn ] = useState(false);

	// useEffect(() => {
	// 	checkIfLoggedIn();
	// }, []);

	// const checkIfLoggedIn = () => {
	// 	if (firebase.auth().currentUser) {
	// 		setIsLoggedIn(true);
	// 	}
	// };

	return (
		<div className="App">
			<div className="App-header">
			<img src={logo} alt="logo" />
			<h1>Welcome to Munro-Bagger!</h1>
			</div>
			{firebase.auth().currentUser ? (
				<Main setIsLoggedIn={setIsLoggedIn} />
			) : (
				<RegisterPage setIsLoggedIn={setIsLoggedIn} />
			)}
			{/* <RegisterPage />
			<Main /> */}
		</div>
	);
}

export default App;
