import React, { useState } from 'react';
// import * as firebase from 'firebase';
import firebase from 'firebase/app';
import db from './firebaseConfig';
import './RegisterPage.css';

import 'firebase/auth';

const RegisterPage = ({ setIsLoggedIn }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ loginEmail, setLoginEmail ] = useState('');
	const [ loginPassword, setLoginPassword ] = useState('');

	const handleRegister = async () => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(async (data) => {
				const dataToAdd = { munros_bagged: [] };
				const addUser = await db.collection('users').doc(data.user.uid).set(dataToAdd);
			})
			.then(() => {
				setIsLoggedIn(true);
				setEmail('');
				setPassword('');
			})
			.catch((error) => alert(error));
	};

	const handleLogin = () => {
		firebase
			.auth()
			.signInWithEmailAndPassword(loginEmail, loginPassword)
			.then(() => {
				setIsLoggedIn(true);
				setLoginEmail('');
				setLoginPassword('');
			})
			.catch((error) => alert(error));
		// if(firebase.auth().currentUser){
		//     setIsLoggedIn(true)
		// }
	};

	return (
		<div className="register-page-container">
			<div className="login-wrapper">
				<h3>If you are NEW to Munro-Bagger please REGISTER with your e-mail address and password.</h3>
				<label>
					Email Address:{' '}
					<input type="text" value={email} onChange={(event) => setEmail(event.target.value)} name="Email" />
				</label>
				<label>
					Password:{' '}
					<input
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						name="Password"
					/>
				</label>
				<input type="submit" onClick={handleRegister} value="Register" />
				<br />

				<h3>If you have already registered with Munro-Bagger you can LOGIN below.</h3>

				<label>
					Email Address:{' '}
					<input
						type="text"
						value={loginEmail}
						onChange={(event) => setLoginEmail(event.target.value)}
						name="Email"
					/>
				</label>
				<label>
					Password:{' '}
					<input
						type="password"
						value={loginPassword}
						onChange={(event) => setLoginPassword(event.target.value)}
						name="Password"
					/>
				</label>
				<input type="submit" onClick={handleLogin} value="Login" />
			</div>
		</div>
	);
};

export default RegisterPage;
