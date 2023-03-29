import React from 'react'
import { Link } from 'react-router-dom';
import signupbg from '../image2.jpg'
import './SignUpForm.css'
import handleSubmit from './handleSubmit';


function SignUpForm() {
      
  return (
  
  <div className='signupform'>
      <img src={signupbg} alt="bg for signup form" className='bgimage'></img>
      <h1>FILL IT UP TO START YOUR JOURNEY</h1>
      <form onSubmit={handleSubmit}>
         <label for="email" text-color='white'>Email</label>
         <input type="email" name = "email" class="form-control" placeholder="Enter your Email"required/>
         <label for="username" text-color='white'>Username</label>
         <input type="text" name = "username" class="form-control" placeholder="Enter username"required/>
         <label for="password">Password</label>
         <input type="password" name = "password" class="form-control" placeholder="Password" required/>
         <label for="password">Re-type Password</label>
         <input type="password" name = "password2" class="form-control" placeholder="Re-type Old Password" required/>
         <button type="submit" class="btn btn-primary text-left" >Submit</button>
         <p> <Link to='/login'  className="transition-link">existing user?</Link> </p>
      </form>
      
</div>
    
 )
}

export default SignUpForm;
