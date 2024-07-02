import React, {useState} from 'react'

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css';
import loginbg from '../assets/loginbg3.mp4';
import Navbar from './Navbar';

function LoginForm() 
{
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const handleLinkClick = (event) => {
    event.preventDefault();
    const path = event.target.getAttribute('href');
    navigate(path);
  };
  const handleUsernameChange = (event) =>{
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event)=> {
    setPassword(event.target.value);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://10.50.11.3:5000/api/login2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        const { token } = await response.json();
        localStorage.setItem('token',token); 
        console.log("item added to local storage")
        navigate("/grooovz");
      } else if (response.status === 401) {
        setLoginError("Invalid username or password");
      } else {
        const { message } = await response.json();
        setLoginError(message);
      }
    } catch (error) {
      console.error(error);
      setLoginError(
        "An error occurred while logging in. Please try again later."
      );
    }
  };

    return (
      <div>
      <Navbar />
      <div className='signupform'>
        <video src={loginbg} autoPlay loop muted id = "myVideo"/>
        <h1>WELCOME BACK</h1>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="username" text-color='white'>Username</label>
          <input type="text" name="username" className="form-control" placeholder="Enter username" required value={username} onChange={handleUsernameChange} />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" className="form-control" placeholder="Password" required value={password} onChange={handlePasswordChange} />
          <button type="submit" className="btn btn-primary text-left">Submit</button>
          <p><Link to='/sign-up' onClick={handleLinkClick} className="transition-link">New user?</Link></p>
          {loginError && <p className="error-message">{loginError}</p>}
        </form>
      </div>
      </div>
    );
}
  
export default LoginForm;

