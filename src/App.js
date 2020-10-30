import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './Main.js';
import RegisterPage from './RegisterPage.js';
import firebase from 'firebase/app';
import db from './firebaseConfig';
import 'firebase/auth';

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
			<h1>Welcome to Munro Bagger!</h1>
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
