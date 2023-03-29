import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css'
import loginbg from '../image4.jpg'




function LoginForm() {

  const history = useNavigate();
    
  const handleLinkClick = (event) => {
    event.preventDefault();
    const path = event.target.getAttribute('href');
    history(path);
  }
  return (
    <div className='signupform'>
      <img src={loginbg} alt="bg for signup form" className='bgimage'></img>
      <h1>WELCOME BACK</h1>
      <form>
         <label for="username" text-color='white'>Username</label>
         <input type="text" name = "username" class="form-control" placeholder="Enter username" required/>
         <label for="password">Password</label>
         <input type="password" name = "password" class="form-control" placeholder="Password" required />
         <button type="submit" class="btn btn-primary text-left">Submit</button>
         <p> <Link to='/sign-up' onClick={handleLinkClick} className="transition-link">new user?</Link> </p>
      </form>
    </div>
  )
}

export default LoginForm;

