import React, { useState } from 'react';
// import * as firebase from 'firebase';
import  firebase from 'firebase/app';
import db from './firebaseConfig';


import 'firebase/auth';

const RegisterPage = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loginEmail, setLoginEmail ] = useState("");
    const [ loginPassword, setLoginPassword ] = useState("");

    const handleRegister = () => {
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(error => console.log(error))
    }

    const handleLogin = () => {
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => console.log(error))
    }

	return (
		<>
			<label>
				Email Address<input type="text" value={email} onChange={(event) => setEmail(event.target.value)} name="Email" />
			</label>
			<label>
				Password<input type="text" value={password} onChange={(event) => setPassword(event.target.value)} name="Password" />
			</label>
			<input type="submit" onClick={handleRegister}  value="Register" />

            <label>
				Email Address<input type="text" value={loginEmail} onChange={(event) => setLoginEmail(event.target.value)} name="Email" />
			</label>
			<label>
				Password<input type="text" value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} name="Password" />
			</label>
			<input type="submit" onClick={handleLogin}  value="Login" />
		</>
	);
};

export default RegisterPage;
