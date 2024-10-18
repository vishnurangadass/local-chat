import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import "./Signin.css";

const Signin = ({setAuthenticated, setUser }) => {
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.get(`http://localhost:8000/profile?email=${email}&password=${password}`);
            const user = response.data[0];
            localStorage.setItem('loggedInUser', JSON.stringify(user)); // Optionally store in localStorage
            if (user) {
                // If the user exists, authenticate and store their info
                setAuthenticated(true);
                setUser(user); // Store the user object in the parent component
               
                navigate('/chat'); // Redirect to the Chat page
            } else {
                setError("Invalid email or password");
            }

            if(response.data.length > 0){
                setAuthenticated(true)
            }
            else{
                setError("Credentials not matched")
            }
        } catch (err){
            console.error("error while fetching",err);
            setError("Error while fetching",err)
            
        }
    }
  return (
    <div className='loginForm'>
        <form className='formData' onSubmit={handleSubmit}>
            <h2>Log in</h2>
            <input className='textbox' type='email' placeholder='email' value={email}
            onChange={(e) => setEmail(e.target.value)} required autoFocus/>
            <input className='textbox' type='password' placeholder='password' value={password}
            onChange={(e) => setPassword(e.target.value)} required/>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button className='submitButton' type='submit' >Submit</button>
            <p style={{ color: "white"}}>You Don't have a account? No worries <Link to="/signup">click here</Link> to signup</p>
        </form>
    </div>
  )
}


export default Signin