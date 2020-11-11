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

	const validatePassword = (passwordToValidate) => {
		const passwordValidator = require('password-validator');

		// Create a schema
		const schema = new passwordValidator();

		// Add properties to it
		schema
			.is()
			.min(6) // Minimum length 8
			.is()
			.max(20) // Maximum length 100
			.has()
			.uppercase() // Must have uppercase letters
			.has()
			.lowercase() // Must have lowercase letters
			.has()
			.digits(1) // Must have at least 2 digits
			.has()
			.not()
			.spaces(); // Should not have spaces
		// .is()
		// .not()
		// .oneOf([ 'Passw0rd', 'Password123' ]); // Blacklist these values

		// Validate against a password string
		// console.log(schema.validate('validPASS123'));
		// // => true
		// console.log(schema.validate('invalidPASS'));
		// // => false

		// // Get a full list of rules which failed
		// console.log(schema.validate('joke', { list: true }));
		// => [ 'min', 'uppercase', 'digits' ]
		console.log(schema.validate(passwordToValidate, { list: true }));
		const validationResult = schema.validate(passwordToValidate, { list: true });
		let alertText = [];
		if (validationResult.includes('digits')) alertText.push('at least one number');
		if (validationResult.includes('min')) alertText.push('at least six characters');
		if (validationResult.includes('uppercase')) alertText.push('at least one capital letter');
		if (validationResult.includes('max')) alertText.push('less than twenty characters');
		if (validationResult.includes('spaces')) alertText.push('no spaces');
		if (validationResult.includes('lowercase')) alertText.push('at least one lowercase letter');

		let alertMessage = 'Your password must contain ' + alertText.join(', ');
		if (alertText.length > 0) alert(alertMessage);

		return schema.validate(passwordToValidate);
	};

	const handleRegister = async () => {
		if (validatePassword(password)) {
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
		}
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
